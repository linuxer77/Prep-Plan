import { Check, Pencil, Plus, Trash2 } from "lucide-react";

import type { PatternRecord, ProblemRecord } from "../types/tracker";
import { DifficultyBadge } from "./ui/difficulty-badge";

interface PatternDetailProps {
  activePatternRecord: PatternRecord;
  pendingProblems: ProblemRecord[];
  completedProblems: ProblemRecord[];
  onOpenCreateProblem: () => void;
  onOpenEditProblem: (problemId: string) => void;
  onDeleteProblem: (problemId: string) => void;
  onOpenCompleteProblem: (problemId: string) => void;
}

export function PatternDetail({
  activePatternRecord,
  pendingProblems,
  completedProblems,
  onOpenCreateProblem,
  onOpenEditProblem,
  onDeleteProblem,
  onOpenCompleteProblem,
}: PatternDetailProps) {
  return (
    <main className="h-screen flex-1 overflow-y-auto bg-[#000000] px-8 py-12">
      <section className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-end justify-between gap-8 border-b border-[#2A2A2A] pb-6">
          <div>
            <p className="text-xs uppercase tracking-tight text-[#A3A3A3]">
              Pattern Workspace
            </p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-[#FFFFFF]">
              {activePatternRecord.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onOpenCreateProblem}
            className="inline-flex h-9 items-center gap-2 border border-[#2A2A2A] bg-[#0A0A0A] px-3 text-sm tracking-tight text-[#FFFFFF] transition-colors duration-100 hover:bg-[#111111] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000]"
          >
            <Plus size={14} />
            Add Problem
          </button>
        </header>

        <div className="grid gap-12">
          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-tight text-[#FFFFFF]">
              Pending Problems ({pendingProblems.length})
            </h3>
            <div className="space-y-2">
              {pendingProblems.length === 0 ? (
                <p className="border border-[#2A2A2A] bg-[#0A0A0A] p-4 text-sm text-[#A3A3A3]">
                  No pending problems in this pattern.
                </p>
              ) : (
                pendingProblems.map((pendingProblem) => (
                  <article
                    key={pendingProblem.id}
                    className="border border-[#2A2A2A] bg-[#0A0A0A] p-4 transition-colors duration-100 hover:bg-[#111111]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h4 className="text-base font-medium tracking-tight text-[#FFFFFF]">
                          {pendingProblem.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
                          <DifficultyBadge
                            difficulty={pendingProblem.difficulty}
                          />
                          <span>
                            Est. {pendingProblem.estimatedMinutes} min
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            onOpenCompleteProblem(pendingProblem.id)
                          }
                          className="p-2 text-[#A3A3A3] transition-colors duration-100 hover:bg-[#111111] hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000]"
                          aria-label={`Complete ${pendingProblem.name}`}
                        >
                          <Check size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenEditProblem(pendingProblem.id)}
                          className="p-2 text-[#A3A3A3] transition-colors duration-100 hover:bg-[#111111] hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000]"
                          aria-label={`Edit ${pendingProblem.name}`}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteProblem(pendingProblem.id)}
                          className="p-2 text-[#A3A3A3] transition-colors duration-100 hover:bg-[#111111] hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000]"
                          aria-label={`Delete ${pendingProblem.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-tight text-[#FFFFFF]">
              Completed Problems ({completedProblems.length})
            </h3>
            <div className="space-y-2 border-t border-[#2A2A2A] pt-6">
              {completedProblems.length === 0 ? (
                <p className="border border-[#2A2A2A] bg-[#0A0A0A] p-4 text-sm text-[#A3A3A3]">
                  No completed problems yet.
                </p>
              ) : (
                completedProblems.map((completedProblem) => (
                  <article
                    key={completedProblem.id}
                    className="border border-[#2A2A2A] bg-[#0A0A0A] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h4 className="text-base font-medium tracking-tight text-[#FFFFFF]">
                          {completedProblem.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#A3A3A3]">
                          <DifficultyBadge
                            difficulty={completedProblem.difficulty}
                          />
                          <span>{completedProblem.solvedStatus}</span>
                          <span>
                            Time: {completedProblem.timeTakenMinutes} min
                          </span>
                          <span>Date: {completedProblem.completedAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onOpenEditProblem(completedProblem.id)}
                          className="p-2 text-[#A3A3A3] transition-colors duration-100 hover:bg-[#111111] hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000]"
                          aria-label={`Edit ${completedProblem.name}`}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteProblem(completedProblem.id)}
                          className="p-2 text-[#A3A3A3] transition-colors duration-100 hover:bg-[#111111] hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000]"
                          aria-label={`Delete ${completedProblem.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
