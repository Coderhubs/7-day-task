import React from "react";

interface SeparatorProps {
  className?: string;  // Allow optional className prop
}

export const Separator: React.FC<SeparatorProps> = ({ className }) => (
  <div className={`separator ${className || ""}`}></div>  // Merge the className with a default class
);
