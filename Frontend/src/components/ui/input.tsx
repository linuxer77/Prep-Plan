import type { InputHTMLAttributes } from "react";

import { cn } from "../../lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-9 w-full border border-[#2A2A2A] bg-[#000000] px-3 text-sm text-[#FFFFFF] placeholder:text-[#A3A3A3] transition-colors duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000]",
        className,
      )}
      {...props}
    />
  );
}
