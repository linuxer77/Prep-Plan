import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";
import type { ProblemDifficulty } from "../../types/tracker";

const difficultyBadgeVariants = cva(
  "inline-flex items-center border px-2 py-1 text-[11px] uppercase tracking-tight text-[#FFFFFF]",
  {
    variants: {
      difficulty: {
        Easy: "border-[#2A2A2A] font-normal",
        Medium: "border-[#A3A3A3] border-dashed font-medium",
        Hard: "border-[#FFFFFF] border-2 font-semibold",
      },
    },
  },
);

interface DifficultyBadgeProps {
  difficulty: ProblemDifficulty;
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return (
    <span className={cn(difficultyBadgeVariants({ difficulty }))}>
      {difficulty}
    </span>
  );
}
