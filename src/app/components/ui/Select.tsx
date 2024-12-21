import React from "react";

export const Select = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`select ${className}`}>{children}</div>
);

export const SelectTrigger = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <button className={`select-trigger ${className}`}>{children}</button>
);

export const SelectContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`select-content ${className}`}>{children}</div>
);

export const SelectItem = ({
  children,
  value,
  className,
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
}) => (
  <div className={`select-item ${className}`} data-value={value}>
    {children}
  </div>
);
