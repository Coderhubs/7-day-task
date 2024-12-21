// components/ui/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={`rounded-md px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

