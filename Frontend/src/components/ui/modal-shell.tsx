import type { ReactNode } from "react";

import { cn } from "../../lib/utils";

interface ModalShellProps {
  isOpen: boolean;
  title: string;
  description: string;
  children: ReactNode;
}

export function ModalShell({
  isOpen,
  title,
  description,
  children,
}: ModalShellProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/80 p-4 transition-opacity duration-100">
      <div
        className={cn(
          "w-full max-w-md border border-[#2A2A2A] bg-[#0A0A0A] p-6",
          "focus-within:ring-1 focus-within:ring-[#FFFFFF] focus-within:ring-offset-1 focus-within:ring-offset-[#000000]",
        )}
      >
        <div className="mb-6 space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-[#FFFFFF]">
            {title}
          </h2>
          <p className="text-sm text-[#A3A3A3]">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
