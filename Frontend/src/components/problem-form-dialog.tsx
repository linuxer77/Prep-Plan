import { useEffect, useState } from "react";

import type { ProblemDifficulty, ProblemDraft } from "../types/tracker";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ModalShell } from "./ui/modal-shell";

const difficultyOptions: ProblemDifficulty[] = ["Easy", "Medium", "Hard"];

interface ProblemFormDialogProps {
  isOpen: boolean;
  initialProblemDraft: ProblemDraft;
  mode: "create" | "edit";
  onClose: () => void;
  onSubmit: (problemDraft: ProblemDraft) => void;
}

export function ProblemFormDialog({
  isOpen,
  initialProblemDraft,
  mode,
  onClose,
  onSubmit,
}: ProblemFormDialogProps) {
  const [problemDraft, setProblemDraft] =
    useState<ProblemDraft>(initialProblemDraft);

  useEffect(() => {
    setProblemDraft(initialProblemDraft);
  }, [initialProblemDraft]);

  const submitLabel = mode === "create" ? "Add Problem" : "Save Changes";

  return (
    <ModalShell
      isOpen={isOpen}
      title={mode === "create" ? "Add Problem" : "Edit Problem"}
      description="Capture the practice metadata for this pattern."
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(problemDraft);
        }}
      >
        <label className="block space-y-2">
          <span className="text-xs uppercase tracking-tight text-[#A3A3A3]">
            Problem Name
          </span>
          <Input
            value={problemDraft.name}
            onChange={(event) =>
              setProblemDraft((currentDraft) => ({
                ...currentDraft,
                name: event.target.value,
              }))
            }
            required
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-tight text-[#A3A3A3]">
              Difficulty
            </span>
            <select
              className="h-9 w-full border border-[#2A2A2A] bg-[#000000] px-3 text-sm text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000]"
              value={problemDraft.difficulty}
              onChange={(event) =>
                setProblemDraft((currentDraft) => ({
                  ...currentDraft,
                  difficulty: event.target.value as ProblemDifficulty,
                }))
              }
            >
              {difficultyOptions.map((difficultyOption) => (
                <option key={difficultyOption} value={difficultyOption}>
                  {difficultyOption}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-tight text-[#A3A3A3]">
              Estimated Time (min)
            </span>
            <Input
              type="number"
              min={5}
              value={problemDraft.estimatedMinutes}
              onChange={(event) =>
                setProblemDraft((currentDraft) => ({
                  ...currentDraft,
                  estimatedMinutes: Number(event.target.value),
                }))
              }
              required
            />
          </label>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="solid">
            {submitLabel}
          </Button>
        </div>
      </form>
    </ModalShell>
  );
}
