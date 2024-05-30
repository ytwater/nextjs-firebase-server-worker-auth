"use client";

export const Button = ({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`p-1 border  border-slate-600 rounded ${className}`}
  >
    {children}
  </button>
);
