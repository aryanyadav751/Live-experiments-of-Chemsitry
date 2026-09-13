import React, { useState } from "react";
import { User } from "firebase/auth";
import {
  exportReportToGoogleDrive,
  openGooglePicker,
  fetchGoogleDriveFileContent,
  LabReportExport
} from "../services/googleDriveService";
import { auth, signInWithGoogle, getAccessToken, saveReportToCloud } from "../lib/firebase";
import {
  HardDrive,
  FileText,
  CheckCircle2,
  ExternalLink,
  X,
  UploadCloud,
  FolderOpen,
  Copy,
  AlertCircle,
  FileSearch,
  ShieldCheck,
  Download
} from "lucide-react";

interface GoogleDriveReportModalProps {
  report: LabReportExport;
  onClose: () => void;
}

export const GoogleDriveReportModal: React.FC<GoogleDriveReportModalProps> = ({
  report,
  onClose
}) => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportedFile, setExportedFile] = useState<{ id: string; webViewLink: string } | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Google Picker state
  const [pickedFile, setPickedFile] = useState<{
    name: string;
    id: string;
    url?: string;
    content?: string;
  } | null>(null);
  const [pickerLoading, setPickerLoading] = useState<boolean>(false);
  const [pickerError, setPickerError] = useState<string | null>(null);

  const currentUser = auth.currentUser;

  // Handle Export to Google Drive
  const handleExportToDrive = async () => {
    try {
      setIsExporting(true);
      setExportError(null);

      let token = getAccessToken();
      let user = currentUser;

      if (!token || !user) {
        // Trigger Google Sign-In with OAuth scopes
        const authRes = await signInWithGoogle();
        user = authRes.user;
        token = authRes.accessToken;
      }

      if (!token) {
        throw new Error(
          "Google Drive access token was not returned. Please grant Drive permissions during sign-in."
        );
      }

      // 1. Upload to Google Drive
      const driveResult = await exportReportToGoogleDrive(token, report);
      setExportedFile(driveResult);

      // 2. Persist record to Firestore
      if (user?.uid) {
        await saveReportToCloud(user.uid, {
          title: report.title,
          chapter: report.chapter,
          aim: report.aim,
          apparatus: report.apparatus,
          reactions: report.reactions,
          observations: report.observations,
          inference: report.inference,
          safetyPrecautions: report.safetyPrecautions,
          googleDriveFileId: driveResult.fileId,
          googleDriveWebViewLink: driveResult.webViewLink
        });
      }
    } catch (err: any) {
      console.error("Failed to export report to Google Drive:", err);
      setExportError(err?.message || "Failed to export report to Google Drive.");
    } finally {
      setIsExporting(false);
    }
  };

  // Handle Google Picker
  const handleOpenGooglePicker = async () => {
    try {
      setPickerLoading(true);
      setPickerError(null);

      let token = getAccessToken();
      if (!token) {
        const authRes = await signInWithGoogle();
        token = authRes.accessToken;
      }

      if (!token) {
        throw new Error("Please sign in to Google to open Google Picker.");
      }

      await openGooglePicker(
        token,
        async (file) => {
          setPickedFile({
            name: file.name,
            id: file.id,
            url: file.url
          });

          // Try fetching text preview if it's text or markdown
          try {
            if (file.name.endsWith(".md") || file.name.endsWith(".txt")) {
              const text = await fetchGoogleDriveFileContent(token!, file.id);
              setPickedFile((prev) => (prev ? { ...prev, content: text } : null));
            }
          } catch (e) {
            // Ignore preview fetch failure for binary formats
          }
        },
        () => {
          // User closed picker
        }
      );
    } catch (err: any) {
      console.error("Picker error:", err);
      setPickerError(err?.message || "Could not launch Google Picker.");
    } finally {
      setPickerLoading(false);
    }
  };

  const handleCopyMarkdown = () => {
    const text = `# ${report.title}\n\n## Aim\n${report.aim}\n\n## Apparatus\n${report.apparatus}\n\n## Equations\n${report.reactions.join("\n")}\n\n## Observations\n${report.observations}\n\n## Inference\n${report.inference}\n\n## Safety Precautions\n${report.safetyPrecautions}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/25">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Practical Chemistry Lab Report
                </h3>
                <span className="text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                  NCERT Class 10
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Export to Google Drive or browse saved lab files with Google Picker
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6 text-xs">
          {/* Export Status Banner */}
          {exportedFile && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Successfully Exported to Google Drive!</span>
                </div>
                <a
                  href={exportedFile.webViewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <span>Open in Google Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-mono">
                File ID: {exportedFile.id} • Stored permanently in your Google Drive and synced to Firebase.
              </p>
            </div>
          )}

          {/* Error Banner */}
          {(exportError || pickerError) && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{exportError || pickerError}</span>
            </div>
          )}

          {/* Google Picker Selected File Preview */}
          {pickedFile && (
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-slate-900 dark:text-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-blue-700 dark:text-blue-300">
                  <FileSearch className="w-4 h-4" />
                  <span>Google Picker: Selected File</span>
                </div>
                {pickedFile.url && (
                  <a
                    href={pickedFile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-bold"
                  >
                    <span>View in Drive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <div className="font-mono text-xs font-semibold">{pickedFile.name}</div>
              {pickedFile.content && (
                <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-[11px] max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {pickedFile.content}
                </div>
              )}
            </div>
          )}

          {/* Formatted NCERT Practical Record Preview */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-5 space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Title of Experiment
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {report.title}
              </h4>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                {report.chapter}
              </p>
            </div>

            <div>
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block mb-1">
                1. Aim
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{report.aim}</p>
            </div>

            <div>
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block mb-1">
                2. Apparatus & Reagents
              </span>
              <p className="text-slate-700 dark:text-slate-300">{report.apparatus}</p>
            </div>

            <div>
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block mb-1">
                3. Balanced Chemical Equation(s)
              </span>
              <div className="space-y-1">
                {report.reactions.map((eq, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-emerald-600 dark:text-emerald-400 font-bold"
                  >
                    {eq}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block mb-1">
                4. Observations
              </span>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {report.observations}
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block mb-1">
                5. Inference & Chemical Principle
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{report.inference}</p>
            </div>

            <div>
              <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                6. Laboratory Safety Precautions
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {report.safetyPrecautions}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold transition-all"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? "Copied!" : "Copy Text"}</span>
            </button>

            <button
              onClick={handleOpenGooglePicker}
              disabled={pickerLoading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-bold transition-all disabled:opacity-50"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>{pickerLoading ? "Loading Picker..." : "Open with Google Picker"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportToDrive}
              disabled={isExporting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-md shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{isExporting ? "Exporting to Drive..." : "Export to Google Drive"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
