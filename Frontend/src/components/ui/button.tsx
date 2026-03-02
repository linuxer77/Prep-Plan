import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 border-[#2A2A2A] font-display text-[10px] uppercase transition-all duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid:
          "bg-[#FFFFFF] text-[#000000] shadow-[2px_2px_0_0_#2A2A2A] hover:-translate-y-px hover:translate-x-px hover:shadow-none",
        subtle:
          "bg-[#0A0A0A] text-[#FFFFFF] shadow-[2px_2px_0_0_#2A2A2A] hover:-translate-y-px hover:translate-x-px hover:bg-[#111111] hover:shadow-none",
        ghost:
          "border-transparent bg-transparent text-[#A3A3A3] hover:bg-[#111111] hover:text-[#FFFFFF]",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "subtle",
      size: "md",
    },
  },
);

interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
