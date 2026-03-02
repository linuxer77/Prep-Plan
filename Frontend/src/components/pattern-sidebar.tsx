import { Pencil, Plus, Trash2 } from "lucide-react";

import type { PatternRecord } from "../types/tracker";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface PatternSidebarProps {
  patternRecords: PatternRecord[];
  activePatternId: string;
  pendingPatternName: string;
  setPendingPatternName: (value: string) => void;
  onCreatePattern: () => void;
  onActivatePattern: (patternId: string) => void;
  onRenamePattern: (patternId: string, nextPatternName: string) => void;
  onDeletePattern: (patternId: string) => void;
}

export function PatternSidebar({
  patternRecords,
  activePatternId,
  pendingPatternName,
  setPendingPatternName,
  onCreatePattern,
  onActivatePattern,
  onRenamePattern,
  onDeletePattern,
}: PatternSidebarProps) {
  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col border-r border-[#2A2A2A] bg-[#0A0A0A] px-4 py-8">
      <header className="mb-6 px-2">
        <p className="text-xs uppercase tracking-tight text-[#A3A3A3]">
          Patterns
        </p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-[#FFFFFF]">
          Pattern Tracker
        </h1>
      </header>

      <div className="mb-6 flex gap-2 px-2">
        <Input
          placeholder="Add pattern"
          value={pendingPatternName}
          onChange={(event) => setPendingPatternName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onCreatePattern();
            }
          }}
        />
        <Button
          variant="solid"
          size="sm"
          onClick={onCreatePattern}
          aria-label="Add Pattern"
        >
          <Plus size={14} />
        </Button>
      </div>

      <ul className="space-y-1 overflow-y-auto px-1">
        {patternRecords.map((patternRecord) => {
          const totalProblems = patternRecord.problems.length;
          const completedMetrics = patternRecord.problems.filter(
            (problemRecord) => problemRecord.isCompleted,
          ).length;
          const isActivePattern = patternRecord.id === activePatternId;

          return (
            <li key={patternRecord.id}>
              <button
                type="button"
                onClick={() => onActivatePattern(patternRecord.id)}
                className={`group w-full border px-3 py-2 text-left transition-colors duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000] ${
                  isActivePattern
                    ? "border-[#FFFFFF] bg-[#000000]"
                    : "border-[#2A2A2A] bg-[#0A0A0A] hover:bg-[#111111]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium tracking-tight text-[#FFFFFF]">
                      {patternRecord.name}
                    </p>
                    <p className="text-xs text-[#A3A3A3]">
                      Problems • {completedMetrics}/{totalProblems}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 transition-opacity duration-100 group-hover:opacity-100 group-focus-within:opacity-100">
                    <button
                      type="button"
                      className="p-1 text-[#A3A3A3] transition-colors duration-100 hover:bg-[#111111] hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000]"
                      onClick={(event) => {
                        event.stopPropagation();
                        const nextPatternName = window.prompt(
                          "Rename pattern",
                          patternRecord.name,
                        );
                        if (nextPatternName) {
                          onRenamePattern(patternRecord.id, nextPatternName);
                        }
                      }}
                      aria-label={`Rename ${patternRecord.name}`}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      className="p-1 text-[#A3A3A3] transition-colors duration-100 hover:bg-[#111111] hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000]"
                      onClick={(event) => {
                        event.stopPropagation();
                        onDeletePattern(patternRecord.id);
                      }}
                      aria-label={`Delete ${patternRecord.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
