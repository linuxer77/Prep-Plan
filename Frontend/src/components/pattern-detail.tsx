import { Check, Pencil, Plus, Trash2 } from "lucide-react";

import type { PatternRecord, ProblemRecord } from "../types/tracker";
import { DifficultyBadge } from "./ui/difficulty-badge";

interface PatternDetailProps {
  activePatternRecord: PatternRecord;
  pendingProblems: ProblemRecord[];
  completedProblems: ProblemRecord[];
  onOpenProblemWorkspace: (problemId: string) => void;
  onOpenCreateProblem: () => void;
  onOpenEditProblem: (problemId: string) => void;
  onDeleteProblem: (problemId: string) => void;
  onOpenCompleteProblem: (problemId: string) => void;
}

export function PatternDetail({
  activePatternRecord,
  pendingProblems,
  completedProblems,
  onOpenProblemWorkspace,
  onOpenCreateProblem,
  onOpenEditProblem,
  onDeleteProblem,
  onOpenCompleteProblem,
}: PatternDetailProps) {
  function renderProblem(problem: ProblemRecord, isCompletedSection: boolean) {
    return (
      <article
        key={problem.id}
        className="border-2 border-[#2A2A2A] bg-[#0A0A0A] p-4 transition-colors duration-100 hover:bg-[#111111]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h4 className="text-2xl font-medium text-[#FFFFFF]">
              {problem.name}
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#A3A3A3]">
              <DifficultyBadge difficulty={problem.difficulty} />
              {isCompletedSection ? (
                <>
                  <span>{problem.solvedStatus}</span>
                  <span>Time: {problem.timeTakenMinutes} min</span>
                  <span>Date: {problem.completedAt}</span>
                </>
              ) : null}
            </div>
            {problem.url ? (
              <a
                href={problem.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-xs text-[#A3A3A3] underline underline-offset-2 hover:text-[#FFFFFF]"
              >
                Open problem link
              </a>
            ) : null}
          </div>

          <div className="flex items-center gap-1">
            {!isCompletedSection ? (
              <button
                type="button"
                onClick={() => onOpenCompleteProblem(problem.id)}
                className="p-2 text-[#A3A3A3] transition-colors duration-100 hover:bg-[#111111] hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000]"
                aria-label={`Complete ${problem.name}`}
              >
                <Check size={14} />
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => onOpenProblemWorkspace(problem.id)}
              className="inline-flex items-center gap-1 p-2 text-[#A3A3A3] transition-colors duration-100 hover:bg-[#111111] hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000]"
              aria-label={`Open workspace for ${problem.name}`}
            >
              Open
            </button>
            <button
              type="button"
              onClick={() => onOpenEditProblem(problem.id)}
              className="p-2 text-[#A3A3A3] transition-colors duration-100 hover:bg-[#111111] hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000]"
              aria-label={`Edit ${problem.name}`}
            >
              <Pencil size={14} />
            </button>
            <button
              type="button"
              onClick={() => onDeleteProblem(problem.id)}
              className="p-2 text-[#A3A3A3] transition-colors duration-100 hover:bg-[#111111] hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF] focus-visible:ring-offset-1 focus-visible:ring-offset-[#000000]"
              aria-label={`Delete ${problem.name}`}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </article>
    );
  }

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
                pendingProblems.map((pendingProblem) =>
                  renderProblem(pendingProblem, false),
                )
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
                completedProblems.map((completedProblem) =>
                  renderProblem(completedProblem, true),
                )
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
