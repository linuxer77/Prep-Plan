import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, Check, Pencil, Trash2 } from "lucide-react";

import type { ProblemRecord } from "../types/tracker";
import { DifficultyBadge } from "./ui/difficulty-badge";

interface ProblemWorkspaceProps {
  patternName: string;
  problem: ProblemRecord;
  onBack: () => void;
  onUpdateProblemWorkspace: (
    problemId: string,
    changes: Pick<ProblemRecord, "myApproach" | "optimalSolution" | "notes">,
  ) => void;
  onOpenCompleteProblem: (problemId: string) => void;
  onOpenEditProblem: (problemId: string) => void;
  onDeleteProblem: (problemId: string) => void;
}

interface CodeWorkspaceColumnProps {
  title: string;
  placeholder: string;
  draftValue: string;
  onChange: (value: string) => void;
  onSave: () => void;
  hasChanges: boolean;
}

interface NoteWorkspaceColumnProps {
  title: string;
  placeholder: string;
  draftValue: string;
  onChange: (value: string) => void;
  onSave: () => void;
  hasChanges: boolean;
}

const pythonTokenPattern =
  /(#.*$)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b(False|None|True|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b|\b\d+(?:\.\d+)?\b/gm;

function renderPythonHighlightedCode(code: string) {
  pythonTokenPattern.lastIndex = 0;
  const nodes: Array<ReactNode> = [];
  let lastIndex = 0;
  let tokenIndex = 0;

  for (const match of code.matchAll(pythonTokenPattern)) {
    const tokenStart = match.index ?? 0;
    if (tokenStart > lastIndex) {
      nodes.push(
        <span key={`plain-${tokenIndex}`} className="text-[#E4E4E7]">
          {code.slice(lastIndex, tokenStart)}
        </span>,
      );
      tokenIndex += 1;
    }

    const [fullMatch, comment, stringToken, keyword] = match;

    let tokenClassName = "text-[#E4E4E7]";
    if (comment) {
      tokenClassName = "text-[#6A9955]";
    } else if (stringToken) {
      tokenClassName = "text-[#CE9178]";
    } else if (keyword) {
      tokenClassName = "text-[#C586C0]";
    } else {
      tokenClassName = "text-[#9CDCFE]";
    }

    nodes.push(
      <span key={`token-${tokenIndex}`} className={tokenClassName}>
        {fullMatch}
      </span>,
    );
    tokenIndex += 1;
    lastIndex = tokenStart + fullMatch.length;
  }

  if (lastIndex < code.length) {
    nodes.push(
      <span key={`plain-tail-${tokenIndex}`} className="text-[#E4E4E7]">
        {code.slice(lastIndex)}
      </span>,
    );
  }

  return nodes;
}

function CodeWorkspaceColumn({
  title,
  placeholder,
  draftValue,
  onChange,
  onSave,
  hasChanges,
}: CodeWorkspaceColumnProps) {
  const highlightedPreview = renderPythonHighlightedCode(draftValue);

  return (
    <section className="relative overflow-hidden border border-[#2A2A2A] bg-[#050505]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.08), transparent 38%), radial-gradient(circle at 100% 100%, rgba(255,255,255,0.04), transparent 42%)",
        }}
      />
      <div className="relative flex items-center justify-between border-b border-[#2A2A2A] bg-[#000000] px-4 py-3">
        <p className="font-display text-[9px] uppercase tracking-wide text-[#A3A3A3]">
          {title} (Python)
        </p>
        <button
          type="button"
          onClick={onSave}
          disabled={!hasChanges}
          className="inline-flex h-8 items-center border border-[#2A2A2A] bg-[#0A0A0A] px-3 text-[10px] uppercase text-[#FFFFFF] transition-colors duration-100 hover:bg-[#111111] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save Code
        </button>
      </div>

      <div className="relative min-h-[25rem] bg-[#080808]">
        <textarea
          value={draftValue}
          onChange={(event) => onChange(event.target.value)}
          wrap="off"
          spellCheck={false}
          placeholder={placeholder}
          className="relative z-10 h-56 w-full resize-y border-b border-[#2A2A2A] bg-transparent p-4 font-mono text-sm text-[#FFFFFF] outline-none ring-0 focus-visible:ring-1 focus-visible:ring-[#FFFFFF]"
        />

        <div className="h-56 overflow-auto bg-[#060606] p-4">
          <p className="mb-2 text-[10px] uppercase tracking-wide text-[#71717A]">
            Python Preview
          </p>
          <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-6">
            <code>{highlightedPreview}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

function NoteWorkspaceColumn({
  title,
  placeholder,
  draftValue,
  onChange,
  onSave,
  hasChanges,
}: NoteWorkspaceColumnProps) {
  return (
    <section className="relative overflow-hidden border border-[#2A2A2A] bg-[#050505]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.08), transparent 38%), radial-gradient(circle at 100% 100%, rgba(255,255,255,0.04), transparent 42%)",
        }}
      />

      <div className="relative flex items-center justify-between border-b border-[#2A2A2A] bg-[#000000] px-4 py-3">
        <p className="font-display text-[9px] uppercase tracking-wide text-[#A3A3A3]">
          {title}
        </p>
        <button
          type="button"
          onClick={onSave}
          disabled={!hasChanges}
          className="inline-flex h-8 items-center border border-[#2A2A2A] bg-[#0A0A0A] px-3 text-[10px] uppercase text-[#FFFFFF] transition-colors duration-100 hover:bg-[#111111] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save Note
        </button>
      </div>

      <div className="relative min-h-[25rem] bg-[#080808]">
        <textarea
          value={draftValue}
          onChange={(event) => onChange(event.target.value)}
          wrap="soft"
          spellCheck
          placeholder={placeholder}
          className="relative z-10 h-[25rem] w-full resize-y bg-transparent p-4 text-sm text-[#FFFFFF] outline-none ring-0 focus-visible:ring-1 focus-visible:ring-[#FFFFFF]"
        />
      </div>
    </section>
  );
}

export function ProblemWorkspace({
  patternName,
  problem,
  onBack,
  onUpdateProblemWorkspace,
  onOpenCompleteProblem,
  onOpenEditProblem,
  onDeleteProblem,
}: ProblemWorkspaceProps) {
  const [myApproachDraft, setMyApproachDraft] = useState(problem.myApproach ?? "");
  const [optimalSolutionDraft, setOptimalSolutionDraft] = useState(
    problem.optimalSolution ?? "",
  );
  const [notesDraft, setNotesDraft] = useState(problem.notes ?? "");

  useEffect(() => {
    setMyApproachDraft(problem.myApproach ?? "");
    setOptimalSolutionDraft(problem.optimalSolution ?? "");
    setNotesDraft(problem.notes ?? "");
  }, [problem.id, problem.myApproach, problem.notes, problem.optimalSolution]);

  return (
    <main className="h-screen flex-1 overflow-y-auto bg-[#000000] px-8 py-10">
      <section className="mx-auto max-w-[96rem]">
        <header className="mb-8 border-b-2 border-[#2A2A2A] pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 border border-[#2A2A2A] bg-[#0A0A0A] px-3 py-2 font-display text-[9px] uppercase text-[#A3A3A3] transition-colors duration-100 hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF]"
              >
                <ArrowLeft size={13} />
                Back to Pattern
              </button>

              <p className="mt-5 font-display text-[9px] uppercase text-[#A3A3A3]">
                {patternName} / Problem Workspace
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#FFFFFF]">
                {problem.name}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {!problem.isCompleted ? (
                <button
                  type="button"
                  onClick={() => onOpenCompleteProblem(problem.id)}
                  className="inline-flex items-center gap-2 border border-[#2A2A2A] bg-[#0A0A0A] px-3 py-2 text-[#A3A3A3] transition-colors duration-100 hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF]"
                >
                  <Check size={14} />
                  Complete
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => onOpenEditProblem(problem.id)}
                className="inline-flex items-center gap-2 border border-[#2A2A2A] bg-[#0A0A0A] px-3 py-2 text-[#A3A3A3] transition-colors duration-100 hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF]"
              >
                <Pencil size={14} />
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDeleteProblem(problem.id)}
                className="inline-flex items-center gap-2 border border-[#2A2A2A] bg-[#0A0A0A] px-3 py-2 text-[#A3A3A3] transition-colors duration-100 hover:text-[#FFFFFF] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFFFFF]"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#A3A3A3]">
            <DifficultyBadge difficulty={problem.difficulty} />
            {problem.isCompleted ? (
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
              className="mt-2 inline-block text-xs text-[#A3A3A3] underline underline-offset-2 hover:text-[#FFFFFF]"
            >
              Open problem link
            </a>
          ) : null}
        </header>

        <section className="mb-6 overflow-hidden border border-[#2A2A2A] bg-[#050505] p-4">
          <div className="grid grid-cols-4 gap-2">
            <div className="h-1 animate-pulse bg-[#FFFFFF]" />
            <div className="h-1 animate-pulse bg-[#777777] [animation-delay:120ms]" />
            <div className="h-1 animate-pulse bg-[#B0B0B0] [animation-delay:180ms]" />
            <div className="h-1 animate-pulse bg-[#3A3A3A] [animation-delay:260ms]" />
          </div>
          <p className="mt-3 font-display text-[9px] uppercase text-[#A3A3A3]">
            Neural Workspace Matrix // write, compare, distill
          </p>
        </section>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <CodeWorkspaceColumn
            title="My Approach"
            placeholder="Write your own path to the solution..."
            draftValue={myApproachDraft}
            onChange={setMyApproachDraft}
            onSave={() =>
              onUpdateProblemWorkspace(problem.id, {
                myApproach: myApproachDraft,
              })
            }
            hasChanges={myApproachDraft !== (problem.myApproach ?? "")}
          />

          <CodeWorkspaceColumn
            title="Optimal Solution"
            placeholder="Store the strongest known implementation..."
            draftValue={optimalSolutionDraft}
            onChange={setOptimalSolutionDraft}
            onSave={() =>
              onUpdateProblemWorkspace(problem.id, {
                optimalSolution: optimalSolutionDraft,
              })
            }
            hasChanges={optimalSolutionDraft !== (problem.optimalSolution ?? "")}
          />

          <NoteWorkspaceColumn
            title="Note"
            placeholder="Complexity, gotchas, and pattern-level takeaways..."
            draftValue={notesDraft}
            onChange={setNotesDraft}
            onSave={() =>
              onUpdateProblemWorkspace(problem.id, {
                notes: notesDraft,
              })
            }
            hasChanges={notesDraft !== (problem.notes ?? "")}
          />
        </div>
      </section>
    </main>
  );
}
