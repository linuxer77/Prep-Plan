import { useEffect, useState } from "react";

import type { SolvedStatus } from "../types/tracker";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ModalShell } from "./ui/modal-shell";

const solvedStatusOptions: SolvedStatus[] = [
  "Solved Independently",
  "Needed Hint",
  "Saw Solution",
];

interface CompleteProblemDialogProps {
  isOpen: boolean;
  problemName: string;
  estimatedMinutes: number;
  onClose: () => void;
  onConfirm: (solvedStatus: SolvedStatus, timeTakenMinutes: number) => void;
}

export function CompleteProblemDialog({
  isOpen,
  problemName,
  estimatedMinutes,
  onClose,
  onConfirm,
}: CompleteProblemDialogProps) {
  const [selectedSolvedStatus, setSelectedSolvedStatus] =
    useState<SolvedStatus>("Solved Independently");
  const [timeTakenMinutes, setTimeTakenMinutes] =
    useState<number>(estimatedMinutes);

  useEffect(() => {
    if (isOpen) {
      setSelectedSolvedStatus("Solved Independently");
      setTimeTakenMinutes(estimatedMinutes);
    }
  }, [estimatedMinutes, isOpen]);

  return (
    <ModalShell
      isOpen={isOpen}
      title="Mark Problem Complete"
      description={problemName}
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          onConfirm(selectedSolvedStatus, timeTakenMinutes);
        }}
      >
        <label className="block space-y-2">
          <span className="text-xs uppercase tracking-tight text-[#A3A3A3]">
            Solved Status
          </span>
          <select
            className="h-9 w-full border border-[#2A2A2A] bg-[#000000] px-3 text-sm text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000]"
            value={selectedSolvedStatus}
            onChange={(event) =>
              setSelectedSolvedStatus(event.target.value as SolvedStatus)
            }
          >
            {solvedStatusOptions.map((solvedStatusOption) => (
              <option key={solvedStatusOption} value={solvedStatusOption}>
                {solvedStatusOption}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-xs uppercase tracking-tight text-[#A3A3A3]">
            Time Taken (min)
          </span>
          <Input
            type="number"
            min={1}
            value={timeTakenMinutes}
            onChange={(event) =>
              setTimeTakenMinutes(Number(event.target.value))
            }
          />
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="solid">
            Confirm
          </Button>
        </div>
      </form>
    </ModalShell>
  );
}
