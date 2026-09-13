declare global {
  interface Window {
    gapi?: any;
    google?: any;
  }
}

export interface LabReportExport {
  title: string;
  chapter: string;
  aim: string;
  apparatus: string;
  reactions: string[];
  observations: string;
  inference: string;
  safetyPrecautions: string;
  dateStr?: string;
  mode?: "guided" | "discovery" | "challenge";
}

let isGapiLoaded = false;

export const loadGooglePickerScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.gapi && window.google?.picker) {
      resolve();
      return;
    }

    if (document.getElementById("gapi-picker-script")) {
      // Check if already loading
      const checkInterval = setInterval(() => {
        if (window.gapi && window.google?.picker) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      return;
    }

    const script = document.createElement("script");
    script.id = "gapi-picker-script";
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.gapi) {
        window.gapi.load("picker", {
          callback: () => {
            isGapiLoaded = true;
            resolve();
          }
        });
      } else {
        reject(new Error("Failed to load gapi"));
      }
    };
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });
};

/**
 * Open Google Picker to select a document from Google Drive
 */
export const openGooglePicker = async (
  accessToken: string,
  onPicked: (file: { id: string; name: string; url?: string; description?: string }) => void,
  onCancel?: () => void
): Promise<void> => {
  await loadGooglePickerScript();

  if (!window.google?.picker) {
    throw new Error("Google Picker API is not available.");
  }

  const pickerOrigin =
    window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0
      ? window.location.ancestorOrigins[window.location.ancestorOrigins.length - 1]
      : window.location.origin;

  const view = new window.google.picker.DocsView(window.google.picker.ViewId.DOCS);
  view.setIncludeFolders(true);

  const picker = new window.google.picker.PickerBuilder()
    .addView(view)
    .setOAuthToken(accessToken)
    .setCallback((data: any) => {
      if (data.action === window.google.picker.Action.PICKED) {
        const file = data.docs?.[0];
        if (file) {
          onPicked({
            id: file.id,
            name: file.name,
            url: file.url,
            description: file.description
          });
        }
      } else if (data.action === window.google.picker.Action.CANCEL) {
        if (onCancel) onCancel();
      }
    })
    .setOrigin(pickerOrigin)
    .setTitle("Select a Chemistry Lab Report or Notes from Google Drive")
    .build();

  picker.setVisible(true);
};

/**
 * Export a structured chemistry lab practical report directly to Google Drive
 */
export const exportReportToGoogleDrive = async (
  accessToken: string,
  report: LabReportExport
): Promise<{ fileId: string; webViewLink: string }> => {
  const currentDate = report.dateStr || new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const formattedContent = `# CBSE CLASS 10 SCIENCE — VIRTUAL CHEMISTRY LAB REPORT
**Date of Simulation:** ${currentDate}
**Curriculum:** NCERT Class 10 Chemistry (${report.chapter || "General Practice"})
**Lab Mode:** ${report.mode === "discovery" ? "🔬 Discovery Lab" : report.mode === "challenge" ? "🎮 Challenge Lab" : "📚 Guided Experiment"}

---

## 1. AIM OF EXPERIMENT
${report.aim}

## 2. APPARATUS & REAGENTS
${report.apparatus}

## 3. BALANCED CHEMICAL EQUATION(S)
${report.reactions.map((r, i) => `${i + 1}. \`${r}\``).join("\n")}

## 4. EXPERIMENTAL OBSERVATIONS
${report.observations}

## 5. CHEMICAL INFERENCE & MECHANISM
${report.inference}

## 6. LABORATORY SAFETY PRECAUTIONS & PROTOCOLS
${report.safetyPrecautions}

---
*Generated via Virtual Chemistry Lab — Experiment Anything (CBSE Class 10 NCERT Science Simulator)*
`;

  const fileName = `Chemistry_Lab_Report_${report.title.replace(/[^a-zA-Z0-9_-]/g, "_")}.md`;

  const metadata = {
    name: fileName,
    mimeType: "text/markdown",
    description: `Virtual Chemistry Lab practical report for CBSE Class 10: ${report.title}`
  };

  const boundary = "-------314159265358979323846";
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
    JSON.stringify(metadata) +
    delimiter +
    "Content-Type: text/markdown\r\n\r\n" +
    formattedContent +
    closeDelimiter;

  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `multipart/related; boundary=${boundary}`
      },
      body: multipartRequestBody
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Drive upload failed (${response.status}): ${errText}`);
  }

  const result = await response.json();
  return {
    fileId: result.id,
    webViewLink: result.webViewLink || `https://drive.google.com/file/d/${result.id}/view`
  };
};

/**
 * Fetch text content of a file from Google Drive
 */
export const fetchGoogleDriveFileContent = async (
  accessToken: string,
  fileId: string
): Promise<string> => {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!res.ok) {
    throw new Error(`Failed to load file content: ${res.statusText}`);
  }
  return await res.text();
};
