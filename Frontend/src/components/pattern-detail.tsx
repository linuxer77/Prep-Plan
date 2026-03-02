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
        <header className="mb-10 flex items-end justify-between gap-8 border-b-2 border-[#2A2A2A] pb-6">
          <div>
            <p className="font-display text-[9px] uppercase text-[#A3A3A3]">
              Pattern Workspace
            </p>
            <h2 className="mt-2 text-2xl font-semibold uppercase text-[#FFFFFF] md:text-3xl">
              {activePatternRecord.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onOpenCreateProblem}
            className="inline-flex h-10 items-center gap-2 border-2 border-[#2A2A2A] bg-[#0A0A0A] px-3 font-display text-[10px] uppercase text-[#FFFFFF] shadow-[2px_2px_0_0_#2A2A2A] transition-all duration-100 hover:-translate-y-px hover:translate-x-px hover:bg-[#111111] hover:shadow-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000]"
          >
            <Plus size={14} />
            Add Problem
          </button>
        </header>

        <section className="retro-cinematic-panel retro-scanlines mb-10 overflow-hidden border-2 border-[#2A2A2A] bg-[#0A0A0A] p-6">
          <div className="retro-stars" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl">
            <div className="space-y-2">
              <p className="font-display text-[9px] uppercase text-[#A3A3A3]">
                Neo Practice Mode // 修行
              </p>
              <h3 className="retro-hud-glow mt-3 text-xl font-semibold uppercase text-[#FFFFFF] md:text-2xl">
                {activePatternRecord.name} Arc
              </h3>
              <p className="mt-2 text-xl text-[#A3A3A3]">
                Every solved problem unlocks your next form.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-12">
          <section>
            <h3 className="mb-4 font-display text-[10px] font-semibold uppercase text-[#FFFFFF]">
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
                    className="border-2 border-[#2A2A2A] bg-[#0A0A0A] p-4 transition-colors duration-100 hover:bg-[#111111]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h4 className="text-2xl font-medium text-[#FFFFFF]">
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
            <h3 className="mb-4 font-display text-[10px] font-semibold uppercase text-[#FFFFFF]">
              Completed Problems ({completedProblems.length})
            </h3>
            <div className="space-y-2 border-t-2 border-[#2A2A2A] pt-6">
              {completedProblems.length === 0 ? (
                <p className="border border-[#2A2A2A] bg-[#0A0A0A] p-4 text-sm text-[#A3A3A3]">
                  No completed problems yet.
                </p>
              ) : (
                completedProblems.map((completedProblem) => (
                  <article
                    key={completedProblem.id}
                    className="border-2 border-[#2A2A2A] bg-[#0A0A0A] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h4 className="text-2xl font-medium text-[#FFFFFF]">
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
