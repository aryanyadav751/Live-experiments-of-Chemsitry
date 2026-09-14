import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";
import { Reaction } from "../../types";
import {
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Atom,
  Info,
  Layers,
  Sparkles,
  ChevronRight,
  Eye,
  CheckCircle2,
  HelpCircle,
  Gauge
} from "lucide-react";

interface ReactionAnimationEngineProps {
  reaction: Reaction;
  onClose?: () => void;
  height?: number | string;
}

// Visual and physical properties of chemical elements
export const ELEMENT_PROPERTIES: Record<string, { name: string; z: number; color: number; radius: number; hex: string }> = {
  H: { name: "Hydrogen", z: 1, color: 0xf1f5f9, radius: 0.38, hex: "#f1f5f9" },
  C: { name: "Carbon", z: 6, color: 0x334155, radius: 0.77, hex: "#334155" },
  N: { name: "Nitrogen", z: 7, color: 0x3b82f6, radius: 0.71, hex: "#3b82f6" },
  O: { name: "Oxygen", z: 8, color: 0xef4444, radius: 0.66, hex: "#ef4444" },
  Na: { name: "Sodium", z: 11, color: 0xa855f7, radius: 1.02, hex: "#a855f7" },
  Mg: { name: "Magnesium", z: 12, color: 0x10b981, radius: 0.95, hex: "#10b981" },
  Al: { name: "Aluminium", z: 13, color: 0x94a3b8, radius: 0.92, hex: "#94a3b8" },
  Si: { name: "Silicon", z: 14, color: 0xf59e0b, radius: 0.88, hex: "#f59e0b" },
  S: { name: "Sulphur", z: 16, color: 0xeab308, radius: 0.84, hex: "#eab308" },
  Cl: { name: "Chlorine", z: 17, color: 0x22c55e, radius: 0.82, hex: "#22c55e" },
  K: { name: "Potassium", z: 19, color: 0x8b5cf6, radius: 1.15, hex: "#8b5cf6" },
  Ca: { name: "Calcium", z: 20, color: 0x06b6d4, radius: 1.05, hex: "#06b6d4" },
  Fe: { name: "Iron", z: 26, color: 0xf97316, radius: 0.96, hex: "#f97316" },
  Cu: { name: "Copper", z: 29, color: 0xd97706, radius: 0.94, hex: "#d97706" },
  Zn: { name: "Zinc", z: 30, color: 0x64748b, radius: 0.94, hex: "#64748b" },
  Ag: { name: "Silver", z: 47, color: 0xe2e8f0, radius: 1.00, hex: "#e2e8f0" },
  Ba: { name: "Barium", z: 56, color: 0x84cc16, radius: 1.18, hex: "#84cc16" },
  Pb: { name: "Lead", z: 82, color: 0x475569, radius: 1.12, hex: "#475569" },
  I: { name: "Iodine", z: 53, color: 0x7e22ce, radius: 0.98, hex: "#7e22ce" },
  Br: { name: "Bromine", z: 35, color: 0xb45309, radius: 0.90, hex: "#b45309" }
};

export function getElementProp(symbol: string) {
  return ELEMENT_PROPERTIES[symbol] || { name: symbol, z: 0, color: 0x6366f1, radius: 0.8, hex: "#6366f1" };
}

export interface GenericMolecularScene {
  atoms: {
    id: string;
    symbol: string;
    role: "reactant" | "leaving" | "attacking" | "spectator" | "product";
    initial: [number, number, number];
    transition: [number, number, number];
    final: [number, number, number];
  }[];
  bonds: {
    from: string;
    to: string;
    order: 1 | 2 | 3;
    phase: "reactant" | "product" | "both";
  }[];
  mechanismDescription: string;
  energyStatus: string;
}

/**
 * Creates 2D text sprite label for element symbol
 */
function createTextSprite(text: string, colorHex: string): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  
  // Background badge
  ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
  ctx.beginPath();
  ctx.arc(64, 64, 48, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = colorHex;
  ctx.stroke();

  // Text
  ctx.font = "bold 52px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.SpriteMaterial({ map: texture, depthTest: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.9, 0.9, 1);
  return sprite;
}

/**
 * Builds data-driven 3D molecular coordinates and connectivity based on reaction type & reactants
 */
export function generateGenericScene(reaction: Reaction): GenericMolecularScene {
  const cat = reaction.reactionType.join(" ").toLowerCase();
  const id = reaction.id;

  // 1. COMBINATION (e.g., 2Mg + O2 -> 2MgO or CaO + H2O -> Ca(OH)2)
  if (cat.includes("combination")) {
    if (id.includes("magnesium")) {
      return {
        atoms: [
          { id: "mg1", symbol: "Mg", role: "reactant", initial: [-3.5, 0.8, 0], transition: [-1.2, 0.6, 0], final: [-1.0, 0, 0] },
          { id: "mg2", symbol: "Mg", role: "reactant", initial: [-3.5, -0.8, 0], transition: [-1.2, -0.6, 0], final: [1.0, 0, 0] },
          { id: "o1", symbol: "O", role: "reactant", initial: [3.2, 0.7, 0], transition: [1.2, 0.6, 0], final: [-2.1, 0, 0] },
          { id: "o2", symbol: "O", role: "reactant", initial: [3.2, -0.7, 0], transition: [1.2, -0.6, 0], final: [2.1, 0, 0] }
        ],
        bonds: [
          { from: "o1", to: "o2", order: 2, phase: "reactant" },
          { from: "mg1", to: "o1", order: 1, phase: "product" },
          { from: "mg2", to: "o2", order: 1, phase: "product" }
        ],
        mechanismDescription: "Magnesium atoms transfer valence electrons to diatomic oxygen molecule; covalent O=O bond breaks and ionic MgO crystal lattice forms.",
        energyStatus: "Exothermic: Releases intense radiant light & heat"
      };
    }

    if (id.includes("quicklime") || id.includes("slaked")) {
      return {
        atoms: [
          { id: "ca", symbol: "Ca", role: "reactant", initial: [-3.0, 0, 0], transition: [-1.0, 0, 0], final: [0, 0, 0] },
          { id: "o1", symbol: "O", role: "reactant", initial: [-4.2, 0, 0], transition: [-1.8, 0.8, 0], final: [-1.3, 0.9, 0] },
          { id: "h1", symbol: "H", role: "reactant", initial: [3.8, 0.8, 0], transition: [1.5, 0.8, 0], final: [-1.9, 1.4, 0] },
          { id: "o2", symbol: "O", role: "reactant", initial: [3.0, 0, 0], transition: [1.0, 0, 0], final: [1.3, -0.9, 0] },
          { id: "h2", symbol: "H", role: "reactant", initial: [3.8, -0.8, 0], transition: [1.5, -0.8, 0], final: [1.9, -1.4, 0] }
        ],
        bonds: [
          { from: "ca", to: "o1", order: 1, phase: "both" },
          { from: "o2", to: "h1", order: 1, phase: "reactant" },
          { from: "o2", to: "h2", order: 1, phase: "both" },
          { from: "o1", to: "h1", order: 1, phase: "product" },
          { from: "ca", to: "o2", order: 1, phase: "product" }
        ],
        mechanismDescription: "Polar H₂O attacks basic CaO: proton transfer produces two hydroxide groups coordinated to Ca²⁺ in Ca(OH)₂.",
        energyStatus: "Exothermic: Heat of hydration raises temperature >50°C"
      };
    }
  }

  // 2. DISPLACEMENT (e.g. Fe + CuSO4 -> FeSO4 + Cu, Zn + H2SO4 -> ZnSO4 + H2)
  if (cat.includes("displacement") && !cat.includes("double")) {
    if (id.includes("zinc") || id.includes("acid")) {
      return {
        atoms: [
          { id: "zn", symbol: "Zn", role: "attacking", initial: [-3.8, 0, 0], transition: [-1.0, 0, 0], final: [0, 0, 0] },
          { id: "s", symbol: "S", role: "spectator", initial: [2.0, 0, 0], transition: [1.5, 0, 0], final: [1.5, 0, 0] },
          { id: "o1", symbol: "O", role: "spectator", initial: [2.0, 1.2, 0], transition: [1.5, 1.2, 0], final: [1.5, 1.2, 0] },
          { id: "o2", symbol: "O", role: "spectator", initial: [2.0, -1.2, 0], transition: [1.5, -1.2, 0], final: [1.5, -1.2, 0] },
          { id: "h1", symbol: "H", role: "leaving", initial: [0.8, 0.7, 0], transition: [-0.2, 1.8, 0], final: [-3.0, 1.2, 0] },
          { id: "h2", symbol: "H", role: "leaving", initial: [0.8, -0.7, 0], transition: [-0.2, -1.8, 0], final: [-3.0, 0.6, 0] }
        ],
        bonds: [
          { from: "s", to: "o1", order: 1, phase: "both" },
          { from: "s", to: "o2", order: 1, phase: "both" },
          { from: "s", to: "h1", order: 1, phase: "reactant" },
          { from: "s", to: "h2", order: 1, phase: "reactant" },
          { from: "zn", to: "s", order: 1, phase: "product" },
          { from: "h1", to: "h2", order: 1, phase: "product" }
        ],
        mechanismDescription: "Zinc metal donates two electrons to 2H⁺ cations. Zinc dissolves as Zn²⁺ while hydrogen gas (H₂) bubbles off.",
        energyStatus: "Redox: Oxidation of Zn(s) and reduction of H⁺(aq)"
      };
    }

    return {
      atoms: [
        { id: "fe", symbol: "Fe", role: "attacking", initial: [-4.0, 0, 0], transition: [-1.0, 0, 0], final: [0.2, 0, 0] },
        { id: "cu", symbol: "Cu", role: "leaving", initial: [0.5, 0, 0], transition: [2.0, 1.2, 0], final: [4.0, 1.5, 0] },
        { id: "s", symbol: "S", role: "spectator", initial: [2.2, 0, 0], transition: [1.8, -0.2, 0], final: [1.7, 0, 0] },
        { id: "o1", symbol: "O", role: "spectator", initial: [2.2, 1.2, 0], transition: [1.8, 1.0, 0], final: [1.7, 1.2, 0] },
        { id: "o2", symbol: "O", role: "spectator", initial: [2.2, -1.2, 0], transition: [1.8, -1.4, 0], final: [1.7, -1.2, 0] }
      ],
      bonds: [
        { from: "cu", to: "s", order: 1, phase: "reactant" },
        { from: "s", to: "o1", order: 1, phase: "both" },
        { from: "s", to: "o2", order: 1, phase: "both" },
        { from: "fe", to: "s", order: 1, phase: "product" }
      ],
      mechanismDescription: "More reactive Fe atom donates two electrons to Cu²⁺. Cu²⁺ deposits as copper metal; Fe²⁺ enters solution as green FeSO₄.",
      energyStatus: "Single Displacement: Driven by metal reactivity differences"
    };
  }

  // 3. DOUBLE DISPLACEMENT & PRECIPITATION (e.g. Pb(NO3)2 + 2KI -> PbI2 + 2KNO3, Na2SO4 + BaCl2 -> BaSO4 + 2NaCl)
  if (cat.includes("double") || cat.includes("precipitat")) {
    if (id.includes("barium") || id.includes("sulphate")) {
      return {
        atoms: [
          { id: "ba", symbol: "Ba", role: "reactant", initial: [-3.2, 1.0, 0], transition: [-0.8, 0.4, 0], final: [0, 0.8, 0] },
          { id: "cl", symbol: "Cl", role: "reactant", initial: [-4.5, 1.0, 0], transition: [-3.0, 2.0, 0], final: [-2.8, -1.2, 0] },
          { id: "na", symbol: "Na", role: "reactant", initial: [4.5, -1.0, 0], transition: [3.0, -2.0, 0], final: [-1.4, -1.2, 0] },
          { id: "s", symbol: "S", role: "reactant", initial: [2.5, -1.0, 0], transition: [0.8, -0.4, 0], final: [0, -0.8, 0] },
          { id: "o1", symbol: "O", role: "reactant", initial: [2.5, 0.2, 0], transition: [0.8, 0.6, 0], final: [1.1, -0.4, 0] },
          { id: "o2", symbol: "O", role: "reactant", initial: [2.5, -2.2, 0], transition: [0.8, -1.4, 0], final: [-1.1, -0.4, 0] }
        ],
        bonds: [
          { from: "ba", to: "cl", order: 1, phase: "reactant" },
          { from: "na", to: "s", order: 1, phase: "reactant" },
          { from: "s", to: "o1", order: 1, phase: "both" },
          { from: "s", to: "o2", order: 1, phase: "both" },
          { from: "ba", to: "s", order: 1, phase: "product" },
          { from: "na", to: "cl", order: 1, phase: "product" }
        ],
        mechanismDescription: "Ions exchange partners in aqueous medium. Ba²⁺ and SO₄²⁻ combine to form an insoluble crystalline precipitate (BaSO₄).",
        energyStatus: "Precipitation: High lattice energy drives precipitate formation"
      };
    }

    return {
      atoms: [
        { id: "pb", symbol: "Pb", role: "reactant", initial: [-3.2, 1.2, 0], transition: [-0.6, 0.5, 0], final: [0, 0.8, 0] },
        { id: "no3", symbol: "N", role: "reactant", initial: [-4.6, 1.2, 0], transition: [-3.2, 1.8, 0], final: [-2.5, -1.2, 0] },
        { id: "k", symbol: "K", role: "reactant", initial: [4.4, -1.2, 0], transition: [3.0, -1.8, 0], final: [-1.2, -1.2, 0] },
        { id: "i1", symbol: "I", role: "reactant", initial: [2.6, -0.5, 0], transition: [0.8, 0.2, 0], final: [-1.1, 0.3, 0] },
        { id: "i2", symbol: "I", role: "reactant", initial: [2.6, -1.9, 0], transition: [0.8, -0.8, 0], final: [1.1, 0.3, 0] }
      ],
      bonds: [
        { from: "pb", to: "no3", order: 1, phase: "reactant" },
        { from: "k", to: "i1", order: 1, phase: "reactant" },
        { from: "pb", to: "i1", order: 1, phase: "product" },
        { from: "pb", to: "i2", order: 1, phase: "product" },
        { from: "k", to: "no3", order: 1, phase: "product" }
      ],
      mechanismDescription: "Pb²⁺ cations encounter I⁻ anions in solution. Insoluble yellow lead(II) iodide (PbI₂) precipitates out instantly.",
      energyStatus: "Double Decomposition: Mutual exchange of anions"
    };
  }

  // 4. DECOMPOSITION (e.g. 2FeSO4 -> Fe2O3 + SO2 + SO3, 2Pb(NO3)2 -> 2PbO + 4NO2 + O2, CaCO3 -> CaO + CO2)
  if (cat.includes("decomposition")) {
    return {
      atoms: [
        { id: "ca", symbol: "Ca", role: "product", initial: [-0.8, 0, 0], transition: [-1.6, 0.5, 0], final: [-3.0, 0.8, 0] },
        { id: "o1", symbol: "O", role: "product", initial: [-1.9, 0, 0], transition: [-2.4, -0.2, 0], final: [-4.1, 0.8, 0] },
        { id: "c", symbol: "C", role: "product", initial: [0.8, 0, 0], transition: [1.8, -0.4, 0], final: [2.8, -0.8, 0] },
        { id: "o2", symbol: "O", role: "product", initial: [0.8, 1.2, 0], transition: [1.8, 0.8, 0], final: [1.8, -0.8, 0] },
        { id: "o3", symbol: "O", role: "product", initial: [0.8, -1.2, 0], transition: [1.8, -1.6, 0], final: [3.8, -0.8, 0] }
      ],
      bonds: [
        { from: "ca", to: "o1", order: 1, phase: "both" },
        { from: "ca", to: "c", order: 1, phase: "reactant" },
        { from: "c", to: "o2", order: 2, phase: "both" },
        { from: "c", to: "o3", order: 2, phase: "both" }
      ],
      mechanismDescription: "Thermal excitation breaks the ionic-covalent network of the single parent reactant, fragmenting into simpler stable products.",
      energyStatus: "Endothermic: Requires sustained thermal heat energy"
    };
  }

  // 5. COMBUSTION / OXIDATION (e.g. CH4 + 2O2 -> CO2 + 2H2O, 2Cu + O2 -> 2CuO)
  if (cat.includes("combustion") || cat.includes("oxidation")) {
    return {
      atoms: [
        { id: "c", symbol: "C", role: "reactant", initial: [-3.0, 0, 0], transition: [-0.5, 0, 0], final: [0, 0, 0] },
        { id: "h1", symbol: "H", role: "reactant", initial: [-3.0, 1.2, 0], transition: [-1.5, 1.8, 0], final: [3.2, 1.4, 0] },
        { id: "h2", symbol: "H", role: "reactant", initial: [-3.0, -1.2, 0], transition: [-1.5, -1.8, 0], final: [3.2, -1.4, 0] },
        { id: "o1", symbol: "O", role: "reactant", initial: [3.0, 0.8, 0], transition: [0.8, 0.6, 0], final: [-1.2, 0, 0] },
        { id: "o2", symbol: "O", role: "reactant", initial: [3.0, -0.8, 0], transition: [0.8, -0.6, 0], final: [1.2, 0, 0] },
        { id: "o3", symbol: "O", role: "reactant", initial: [4.2, 0, 0], transition: [2.5, 0, 0], final: [2.6, 0, 0] }
      ],
      bonds: [
        { from: "c", to: "h1", order: 1, phase: "reactant" },
        { from: "c", to: "h2", order: 1, phase: "reactant" },
        { from: "o1", to: "o2", order: 2, phase: "reactant" },
        { from: "c", to: "o1", order: 2, phase: "product" },
        { from: "c", to: "o2", order: 2, phase: "product" },
        { from: "o3", to: "h1", order: 1, phase: "product" },
        { from: "o3", to: "h2", order: 1, phase: "product" }
      ],
      mechanismDescription: "Oxygen oxidizes the substrate, breaking C-H bonds to establish stable, low-energy carbonyl C=O and O-H bonds.",
      energyStatus: "Highly Exothermic: Massive heat and light release"
    };
  }

  // 6. ADDITION (e.g. Ethene + H2 -> Ethane with Ni catalyst)
  if (cat.includes("addition")) {
    return {
      atoms: [
        { id: "c1", symbol: "C", role: "reactant", initial: [-1.0, 0, 0], transition: [-0.9, 0, 0], final: [-0.8, 0, 0] },
        { id: "c2", symbol: "C", role: "reactant", initial: [1.0, 0, 0], transition: [0.9, 0, 0], final: [0.8, 0, 0] },
        { id: "h1", symbol: "H", role: "reactant", initial: [-1.8, 1.0, 0], transition: [-1.7, 0.9, 0], final: [-1.5, 0.9, 0] },
        { id: "h2", symbol: "H", role: "reactant", initial: [-1.8, -1.0, 0], transition: [-1.7, -0.9, 0], final: [-1.5, -0.9, 0] },
        { id: "h_add1", symbol: "H", role: "attacking", initial: [-0.7, 3.0, 0], transition: [-0.8, 1.6, 0], final: [-0.8, 1.1, 0] },
        { id: "h_add2", symbol: "H", role: "attacking", initial: [0.7, 3.0, 0], transition: [0.8, 1.6, 0], final: [0.8, 1.1, 0] }
      ],
      bonds: [
        { from: "c1", to: "c2", order: 2, phase: "reactant" },
        { from: "c1", to: "c2", order: 1, phase: "product" },
        { from: "c1", to: "h1", order: 1, phase: "both" },
        { from: "c1", to: "h2", order: 1, phase: "both" },
        { from: "h_add1", to: "h_add2", order: 1, phase: "reactant" },
        { from: "c1", to: "h_add1", order: 1, phase: "product" },
        { from: "c2", to: "h_add2", order: 1, phase: "product" }
      ],
      mechanismDescription: "The weaker pi (π) bond in the C=C double bond breaks over the nickel catalyst surface, adding two hydrogen atoms to yield saturated alkane.",
      energyStatus: "Addition across unsaturated bond"
    };
  }

  // Default Fallback
  return {
    atoms: [
      { id: "a1", symbol: "Na", role: "reactant", initial: [-3.0, 0, 0], transition: [-1.2, 0, 0], final: [-0.8, 0, 0] },
      { id: "a2", symbol: "Cl", role: "reactant", initial: [3.0, 0, 0], transition: [1.2, 0, 0], final: [0.8, 0, 0] }
    ],
    bonds: [
      { from: "a1", to: "a2", order: 1, phase: "product" }
    ],
    mechanismDescription: "Reactants collide with sufficient activation energy to reorganize bonding electrons into stable product configuration.",
    energyStatus: "Standard Chemical Transformation"
  };
}

export const ReactionAnimationEngine: React.FC<ReactionAnimationEngineProps> = ({
  reaction,
  onClose,
  height = 420
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Scene objects refs for animation updates
  const atomMeshesRef = useRef<Map<string, { mesh: THREE.Mesh; sprite: THREE.Sprite }>>(new Map());
  const bondMeshesRef = useRef<{ line: THREE.Mesh; from: string; to: string; order: number; phase: string }[]>([]);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 (reactants) to 1 (products)
  const [speed, setSpeed] = useState<0.5 | 1 | 2>(1);
  const [activeStage, setActiveStage] = useState<"reactants" | "transition" | "products">("reactants");

  // Interaction controls and decoupled animation refs
  const progressRef = useRef(0);
  const speedRef = useRef<number>(speed);
  speedRef.current = speed;
  const isPlayingRef = useRef<boolean>(isPlaying);
  isPlayingRef.current = isPlaying;
  const lastStageRef = useRef<"reactants" | "transition" | "products">("reactants");
  const lastSliderUpdateRef = useRef<number>(0);

  const isDraggingRef = useRef(false);
  const isPanningRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraDistanceRef = useRef(9);
  const cameraRotationRef = useRef({ x: 0.2, y: 0 });
  const cameraTargetRef = useRef(new THREE.Vector3(0, 0, 0));

  const sceneData = useMemo(() => generateGenericScene(reaction), [reaction]);

  // Position interpolator
  const getAtomPosition = useCallback((atom: GenericMolecularScene["atoms"][0], t: number): [number, number, number] => {
    let x = 0, y = 0, z = 0;
    if (t <= 0.5) {
      const alpha = t / 0.5;
      // easeInOutCubic
      const factor = alpha < 0.5 ? 4 * alpha * alpha * alpha : 1 - Math.pow(-2 * alpha + 2, 3) / 2;
      x = atom.initial[0] + (atom.transition[0] - atom.initial[0]) * factor;
      y = atom.initial[1] + (atom.transition[1] - atom.initial[1]) * factor;
      z = atom.initial[2] + (atom.transition[2] - atom.initial[2]) * factor;
    } else {
      const alpha = (t - 0.5) / 0.5;
      const factor = alpha < 0.5 ? 4 * alpha * alpha * alpha : 1 - Math.pow(-2 * alpha + 2, 3) / 2;
      x = atom.transition[0] + (atom.final[0] - atom.transition[0]) * factor;
      y = atom.transition[1] + (atom.final[1] - atom.transition[1]) * factor;
      z = atom.transition[2] + (atom.final[2] - atom.transition[2]) * factor;
    }
    return [x, y, z];
  }, []);

  // Update Camera Matrix based on spherical coords
  const updateCameraPosition = useCallback(() => {
    if (!cameraRef.current) return;
    const dist = cameraDistanceRef.current;
    const rx = cameraRotationRef.current.x;
    const ry = cameraRotationRef.current.y;
    const target = cameraTargetRef.current;

    cameraRef.current.position.x = target.x + dist * Math.sin(ry) * Math.cos(rx);
    cameraRef.current.position.y = target.y + dist * Math.sin(rx);
    cameraRef.current.position.z = target.z + dist * Math.cos(ry) * Math.cos(rx);
    cameraRef.current.lookAt(target);
  }, []);

  // Update positions of atoms & bonds in Three.js scene
  const updateMeshes = useCallback((t: number) => {
    const atomPosMap = new Map<string, THREE.Vector3>();

    sceneData.atoms.forEach(atomData => {
      const entry = atomMeshesRef.current.get(atomData.id);
      if (!entry) return;
      const [x, y, z] = getAtomPosition(atomData, t);
      entry.mesh.position.set(x, y, z);
      const prop = getElementProp(atomData.symbol);
      entry.sprite.position.set(x, y + prop.radius + 0.35, z);
      atomPosMap.set(atomData.id, new THREE.Vector3(x, y, z));
    });

    // Update Bonds
    bondMeshesRef.current.forEach(bond => {
      const p1 = atomPosMap.get(bond.from);
      const p2 = atomPosMap.get(bond.to);
      if (!p1 || !p2) return;

      // Determine bond visibility according to phase
      let visible = true;
      if (bond.phase === "reactant" && t > 0.65) visible = false;
      if (bond.phase === "product" && t < 0.45) visible = false;
      bond.line.visible = visible;

      if (visible) {
        const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
        bond.line.position.copy(mid);

        const dir = new THREE.Vector3().subVectors(p2, p1);
        const len = dir.length();
        bond.line.scale.set(1, len, 1);

        const up = new THREE.Vector3(0, 1, 0);
        const axis = new THREE.Vector3().crossVectors(up, dir.clone().normalize()).normalize();
        const angle = Math.acos(up.dot(dir.clone().normalize()));
        bond.line.quaternion.setFromAxisAngle(axis, angle);
      }
    });

    // Render frame
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  }, [sceneData, getAtomPosition]);

  // Handle explicit progress adjustment from user
  const handleSetProgress = useCallback((val: number, playing = false) => {
    progressRef.current = val;
    setProgress(val);
    setIsPlaying(playing);
    const newStage: "reactants" | "transition" | "products" =
      val < 0.35 ? "reactants" : val < 0.7 ? "transition" : "products";
    if (newStage !== lastStageRef.current) {
      lastStageRef.current = newStage;
      setActiveStage(newStage);
    }
    updateMeshes(val);
  }, [updateMeshes]);

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || container.offsetWidth || 360;
    const heightPx = typeof height === "number" ? height : container.clientHeight || 400;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0f1d); // Deep slate midnight

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100);
    cameraRef.current = camera;
    cameraDistanceRef.current = 9.5;
    cameraRotationRef.current = { x: 0.2, y: 0.3 };
    cameraTargetRef.current.set(0, 0, 0);
    updateCameraPosition();

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    rendererRef.current = renderer;
    renderer.setSize(width, heightPx, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.maxWidth = "100%";
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.6);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // 5. Build Atoms
    atomMeshesRef.current.clear();
    const sphereGeoCache = new Map<number, THREE.SphereGeometry>();

    sceneData.atoms.forEach(atomData => {
      const prop = getElementProp(atomData.symbol);
      let geo = sphereGeoCache.get(prop.radius);
      if (!geo) {
        geo = new THREE.SphereGeometry(prop.radius, 32, 32);
        sphereGeoCache.set(prop.radius, geo);
      }

      const mat = new THREE.MeshStandardMaterial({
        color: prop.color,
        roughness: 0.3,
        metalness: 0.15,
        emissive: prop.color,
        emissiveIntensity: 0.05
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(atomData.initial[0], atomData.initial[1], atomData.initial[2]);
      scene.add(mesh);

      // Label sprite
      const sprite = createTextSprite(atomData.symbol, prop.hex);
      sprite.position.set(atomData.initial[0], atomData.initial[1] + prop.radius + 0.35, atomData.initial[2]);
      scene.add(sprite);

      atomMeshesRef.current.set(atomData.id, { mesh, sprite });
    });

    // 6. Build Bonds
    bondMeshesRef.current = [];
    const cylinderGeo = new THREE.CylinderGeometry(0.08, 0.08, 1, 16);
    const bondMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4 });

    sceneData.bonds.forEach(bondData => {
      const cylinder = new THREE.Mesh(cylinderGeo, bondMat);
      scene.add(cylinder);
      bondMeshesRef.current.push({
        line: cylinder,
        from: bondData.from,
        to: bondData.to,
        order: bondData.order,
        phase: bondData.phase
      });
    });

    // Initial render
    updateMeshes(progressRef.current);

    // Dedicated non-passive wheel listener for smooth zoom without browser event interference
    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraDistanceRef.current = Math.max(3, Math.min(18, cameraDistanceRef.current + e.deltaY * 0.008));
      updateCameraPosition();
      updateMeshes(progressRef.current);
    };
    container.addEventListener("wheel", handleNativeWheel, { passive: false });

    // Resize observer
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0 && rendererRef.current && cameraRef.current) {
          cameraRef.current.aspect = newW / newH;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newW, newH, false);
          updateMeshes(progressRef.current);
        }
      }
    });
    resizeObserver.observe(container);

    // Clean up
    return () => {
      container.removeEventListener("wheel", handleNativeWheel);
      resizeObserver.disconnect();
      sphereGeoCache.forEach(g => g.dispose());
      cylinderGeo.dispose();
      bondMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [sceneData, height, updateCameraPosition, updateMeshes]);

  // Decoupled Animation Loop (60fps Three.js updates without 60 React re-renders/second)
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (isPlayingRef.current) {
        const next = (progressRef.current + delta * 0.22 * speedRef.current) % 1;
        progressRef.current = next;

        // Stage boundary checks (only triggers React state when crossing stage boundary)
        const newStage: "reactants" | "transition" | "products" =
          next < 0.35 ? "reactants" : next < 0.7 ? "transition" : "products";
        if (newStage !== lastStageRef.current) {
          lastStageRef.current = newStage;
          setActiveStage(newStage);
        }

        // Throttle UI slider React state updates to 10Hz to prevent render loops
        if (time - lastSliderUpdateRef.current > 100) {
          lastSliderUpdateRef.current = time;
          setProgress(next);
        }
      }

      updateMeshes(progressRef.current);

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };
  }, [updateMeshes]);

  // Pointer interaction handlers: rotate, pan, zoom with pointer capture
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    if (e.button === 2 || e.shiftKey) {
      isPanningRef.current = true;
    } else {
      isDraggingRef.current = true;
    }
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };

    if (isDraggingRef.current) {
      cameraRotationRef.current.y -= deltaX * 0.008;
      cameraRotationRef.current.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, cameraRotationRef.current.x + deltaY * 0.008));
      updateCameraPosition();
      updateMeshes(progressRef.current);
    } else if (isPanningRef.current) {
      cameraTargetRef.current.x -= deltaX * 0.008;
      cameraTargetRef.current.y += deltaY * 0.008;
      updateCameraPosition();
      updateMeshes(progressRef.current);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    isDraggingRef.current = false;
    isPanningRef.current = false;
  };

  const resetCamera = () => {
    cameraDistanceRef.current = 9.5;
    cameraRotationRef.current = { x: 0.2, y: 0.3 };
    cameraTargetRef.current.set(0, 0, 0);
    updateCameraPosition();
    updateMeshes(progressRef.current);
  };

  return (
    <div className="relative w-full min-w-0 rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 text-white shadow-2xl flex flex-col select-none">
      {/* Top HUD Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md z-10 min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="p-1.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
            <Atom className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-blue-400 uppercase tracking-wider shrink-0">
                3D WebGL Molecular View
              </span>
              {reaction.reactionType[0] && (
                <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono shrink-0">
                  {reaction.reactionType[0]}
                </span>
              )}
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {reaction.title}
            </h4>
          </div>
        </div>

        {/* Stage Pills */}
        <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] sm:text-xs font-mono shrink-0">
          <button
            onClick={() => handleSetProgress(0, false)}
            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg transition-all ${
              activeStage === "reactants" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            1. Reactants
          </button>
          <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600" />
          <button
            onClick={() => handleSetProgress(0.5, false)}
            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg transition-all ${
              activeStage === "transition" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            2. Transition
          </button>
          <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600" />
          <button
            onClick={() => handleSetProgress(0.99, false)}
            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg transition-all ${
              activeStage === "products" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            3. Products
          </button>
        </div>
      </div>

      {/* WebGL Canvas Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onContextMenu={e => e.preventDefault()}
        style={{ height }}
        className="w-full min-w-0 relative cursor-grab active:cursor-grabbing overflow-hidden"
      />

      {/* Overlay Chemical Mechanism Box */}
      <div className="absolute bottom-16 left-3 right-3 sm:left-4 sm:right-auto sm:max-w-xs md:max-w-sm pointer-events-none z-10">
        <div className="p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs text-slate-200 shadow-xl space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-sky-400 font-mono text-[11px]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MOLECULAR REORGANIZATION</span>
          </div>
          <p className="leading-relaxed text-[11px] line-clamp-3 sm:line-clamp-none">
            {sceneData.mechanismDescription}
          </p>
          <div className="text-[10px] font-mono text-amber-400 pt-0.5">
            ⚡ {sceneData.energyStatus}
          </div>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-900/95 border-t border-slate-800 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 z-10 min-w-0">
        {/* Playback buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 active:scale-95"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>

          <button
            onClick={() => handleSetProgress(0, true)}
            className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all"
            title="Replay Animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Replay</span>
          </button>

          {/* Speed selector */}
          <div className="flex items-center gap-0.5 bg-slate-950 p-0.5 sm:p-1 rounded-xl border border-slate-800 text-[10px] sm:text-[11px] font-mono">
            {([0.5, 1, 2] as const).map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-1.5 py-0.5 rounded-lg transition-all ${
                  speed === s ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Progress Timeline Slider */}
        <div className="flex-1 min-w-[90px] sm:min-w-[120px] max-w-xs flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-slate-400">0%</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={progress}
            onChange={e => {
              handleSetProgress(parseFloat(e.target.value), false);
            }}
            className="w-full accent-blue-500 cursor-pointer h-1.5 rounded-lg bg-slate-800"
          />
          <span className="text-[10px] font-mono text-slate-400">100%</span>
        </div>

        {/* Camera Tools */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => {
              cameraDistanceRef.current = Math.max(3, cameraDistanceRef.current - 1.2);
              updateCameraPosition();
            }}
            className="p-1 sm:p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              cameraDistanceRef.current = Math.min(18, cameraDistanceRef.current + 1.2);
              updateCameraPosition();
            }}
            className="p-1 sm:p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetCamera}
            className="px-1.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] sm:text-[11px] font-mono transition-all"
            title="Reset Camera View"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
