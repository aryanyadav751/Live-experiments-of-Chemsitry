import React from "react";
import { Reaction } from "../types";
import { ReactionAnimationEngine } from "./molecular/ReactionAnimationEngine";

interface Molecular3DViewerProps {
  reaction: Reaction;
  height?: number | string;
  onClose?: () => void;
}

/**
 * Genuine Three.js WebGL 3D Ball-and-Stick Molecular Viewer
 * Provides full orbit controls, mouse/touch rotation, pan, zoom,
 * stoichiometric bond formation/cleavage, and playback controls.
 */
export const Molecular3DViewer: React.FC<Molecular3DViewerProps> = ({
  reaction,
  height = 420,
  onClose
}) => {
  return (
    <ReactionAnimationEngine
      reaction={reaction}
      height={height}
      onClose={onClose}
    />
  );
};
