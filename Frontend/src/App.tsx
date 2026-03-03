import { useEffect, useMemo, useState } from "react";

import { CompleteProblemDialog } from "./components/complete-problem-dialog";
import { PatternDetail } from "./components/pattern-detail";
import { PatternSidebar } from "./components/pattern-sidebar";
import { ProblemFormDialog } from "./components/problem-form-dialog";
import { ProblemWorkspace } from "./components/problem-workspace";
import type {
  PatternRecord,
  ProblemDraft,
  ProblemRecord,
  SolvedStatus,
} from "./types/tracker";

const API_BASE_URL = "/api";

interface ApiPattern {
  id: string;
  name: string;
  desc: string;
}

interface ApiProblem {
  id: string;
  name: string;
  is_done: boolean;
  pattern: string;
  approachCode?: string;
  solcode?: string;
  timetaken?: string | null;
  difficulty?: string | null;
  note?: string;
  url?: string;
}

const emptyProblemDraft: ProblemDraft = {
  name: "",
  url: "",
  difficulty: "Easy",
};

function App() {
  const [patternRecords, setPatternRecords] = useState<PatternRecord[]>([]);
  const [activePatternId, setActivePatternId] = useState<string>("");
  const [pendingPatternName, setPendingPatternName] = useState("");

  const [isProblemFormOpen, setIsProblemFormOpen] = useState(false);
  const [problemFormMode, setProblemFormMode] = useState<"create" | "edit">(
    "create",
  );
  const [activeProblemId, setActiveProblemId] = useState<string | null>(null);
  const [focusedProblemId, setFocusedProblemId] = useState<string | null>(null);

  const [isCompletePromptOpen, setIsCompletePromptOpen] = useState(false);
  const [completePromptProblemId, setCompletePromptProblemId] = useState<
    string | null
  >(null);

  function toProblemRecord(problem: ApiProblem): ProblemRecord {
    let difficulty: ProblemRecord["difficulty"] = "Easy";
    let notes = "";
    let myApproach = problem.approachCode ?? "";
    let optimalSolution = problem.solcode ?? "";
    let solvedStatus: ProblemRecord["solvedStatus"] | undefined;
    let timeTakenMinutes: number | undefined;
    const completedAt = problem.timetaken
      ? new Date(problem.timetaken).toLocaleDateString()
      : undefined;

    if (
      problem.difficulty === "Easy" ||
      problem.difficulty === "Medium" ||
      problem.difficulty === "Hard"
    ) {
      difficulty = problem.difficulty;
    }

    if (problem.note) {
      try {
        const parsed = JSON.parse(problem.note) as {
          difficulty?: ProblemRecord["difficulty"];
          notes?: string;
          myApproach?: string;
          optimalSolution?: string;
          solvedStatus?: ProblemRecord["solvedStatus"];
          timeTakenMinutes?: number;
        };

        if (
          parsed.difficulty === "Easy" ||
          parsed.difficulty === "Medium" ||
          parsed.difficulty === "Hard"
        ) {
          difficulty = parsed.difficulty;
        }

        if (typeof parsed.notes === "string") {
          notes = parsed.notes;
        }

        if (typeof parsed.myApproach === "string") {
          myApproach = parsed.myApproach;
        }

        if (typeof parsed.optimalSolution === "string") {
          optimalSolution = parsed.optimalSolution;
        }

        if (
          parsed.solvedStatus === "Solved Independently" ||
          parsed.solvedStatus === "Needed Hint" ||
          parsed.solvedStatus === "Saw Solution"
        ) {
          solvedStatus = parsed.solvedStatus;
        }

        if (
          typeof parsed.timeTakenMinutes === "number" &&
          Number.isFinite(parsed.timeTakenMinutes)
        ) {
          timeTakenMinutes = parsed.timeTakenMinutes;
        }
      } catch {
        // keep defaults when metadata is missing or malformed
      }
    }

    return {
      id: problem.id,
      name: problem.name,
      url: problem.url,
      difficulty,
      isCompleted: problem.is_done,
      notes,
      myApproach,
      optimalSolution,
      solvedStatus,
      timeTakenMinutes,
      completedAt,
    };
  }

  async function loadPatternRecords() {
    try {
      const patternsResponse = await fetch(`${API_BASE_URL}/pattern/list`);
      if (!patternsResponse.ok) {
        return;
      }

      const patterns = (await patternsResponse.json()) as ApiPattern[];

      const patternsWithProblems = await Promise.all(
        patterns.map(async (pattern): Promise<PatternRecord> => {
          const problemsResponse = await fetch(
            `${API_BASE_URL}/problem/${pattern.id}`,
          );

          const problems = problemsResponse.ok
            ? (((await problemsResponse.json()) as ApiProblem[]).map(
                toProblemRecord,
              ) ?? [])
            : [];

          return {
            id: pattern.id,
            name: pattern.name,
            problems,
          };
        }),
      );

      setPatternRecords(patternsWithProblems);
      setActivePatternId((currentActivePatternId) => {
        if (
          currentActivePatternId &&
          patternsWithProblems.some(
            (patternRecord) => patternRecord.id === currentActivePatternId,
          )
        ) {
          return currentActivePatternId;
        }

        return patternsWithProblems[0]?.id ?? "";
      });
    } catch {
      // ignore network errors for now and keep current UI state
    }
  }

  useEffect(() => {
    void loadPatternRecords();
  }, []);

  const activePatternRecord = patternRecords.find(
    (patternRecord) => patternRecord.id === activePatternId,
  );

  const editableProblemRecord = useMemo(() => {
    if (!activePatternRecord || !activeProblemId) {
      return null;
    }

    return (
      activePatternRecord.problems.find(
        (problemRecord) => problemRecord.id === activeProblemId,
      ) ?? null
    );
  }, [activePatternRecord, activeProblemId]);

  const focusedProblemRecord = useMemo(() => {
    if (!activePatternRecord || !focusedProblemId) {
      return null;
    }

    return (
      activePatternRecord.problems.find(
        (problemRecord) => problemRecord.id === focusedProblemId,
      ) ?? null
    );
  }, [activePatternRecord, focusedProblemId]);

  const completePromptProblem = useMemo(() => {
    if (!activePatternRecord || !completePromptProblemId) {
      return null;
    }

    return (
      activePatternRecord.problems.find(
        (problemRecord) => problemRecord.id === completePromptProblemId,
      ) ?? null
    );
  }, [activePatternRecord, completePromptProblemId]);

  const pendingProblems = useMemo(
    () =>
      activePatternRecord?.problems.filter(
        (problemRecord) => !problemRecord.isCompleted,
      ) ?? [],
    [activePatternRecord],
  );

  const completedProblems = useMemo(
    () =>
      activePatternRecord?.problems.filter(
        (problemRecord) => problemRecord.isCompleted,
      ) ?? [],
    [activePatternRecord],
  );

  useEffect(() => {
    if (!focusedProblemId || !activePatternRecord) {
      return;
    }

    const hasFocusedProblem = activePatternRecord.problems.some(
      (problemRecord) => problemRecord.id === focusedProblemId,
    );

    if (!hasFocusedProblem) {
      setFocusedProblemId(null);
    }
  }, [activePatternRecord, focusedProblemId]);

  const activeProblemDraft: ProblemDraft = editableProblemRecord
    ? {
        name: editableProblemRecord.name,
        url: editableProblemRecord.url ?? "",
        difficulty: editableProblemRecord.difficulty,
      }
    : emptyProblemDraft;

  async function createPattern() {
    const nextPatternName = pendingPatternName.trim();
    if (!nextPatternName) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/pattern/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nextPatternName,
          desc: nextPatternName,
        }),
      });

      if (!response.ok) {
        return;
      }

      setPendingPatternName("");
      await loadPatternRecords();
    } catch {
      // ignore network errors for now and keep current UI state
    }
  }

  function renamePattern(patternId: string, nextPatternName: string) {
    const cleanedPatternName = nextPatternName.trim();
    if (!cleanedPatternName) {
      return;
    }

    setPatternRecords((currentPatterns) =>
      currentPatterns.map((patternRecord) =>
        patternRecord.id === patternId
          ? { ...patternRecord, name: cleanedPatternName }
          : patternRecord,
      ),
    );
  }

  async function deletePattern(patternId: string) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/pattern/delete/${patternId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        return;
      }

      await loadPatternRecords();
    } catch {
      // ignore network errors for now and keep current UI state
    }
  }

  function openCreateProblem() {
    setProblemFormMode("create");
    setActiveProblemId(null);
    setIsProblemFormOpen(true);
  }

  function openEditProblem(problemId: string) {
    setProblemFormMode("edit");
    setActiveProblemId(problemId);
    setIsProblemFormOpen(true);
  }

  async function saveProblem(problemDraft: ProblemDraft) {
    if (!activePatternRecord) {
      return;
    }

    if (problemFormMode === "create") {
      try {
        const response = await fetch(`${API_BASE_URL}/problem/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: problemDraft.name,
            desc: problemDraft.name,
            pattern: activePatternRecord.id,
            is_done: false,
            difficulty: problemDraft.difficulty,
            url: problemDraft.url || undefined,
            note: JSON.stringify({
              difficulty: problemDraft.difficulty,
            }),
          }),
        });

        if (!response.ok) {
          return;
        }

        setIsProblemFormOpen(false);
        setActiveProblemId(null);
        await loadPatternRecords();
      } catch {
        // ignore network errors for now and keep current UI state
      }

      return;
    }

    setPatternRecords((currentPatterns) =>
      currentPatterns.map((patternRecord) => {
        if (patternRecord.id !== activePatternRecord.id) {
          return patternRecord;
        }

        return {
          ...patternRecord,
          problems: patternRecord.problems.map((problemRecord) =>
            problemRecord.id === activeProblemId
              ? {
                  ...problemRecord,
                  name: problemDraft.name,
                  difficulty: problemDraft.difficulty,
                  url: problemDraft.url || undefined,
                }
              : problemRecord,
          ),
        };
      }),
    );

    setIsProblemFormOpen(false);
    setActiveProblemId(null);
  }

  async function deleteProblem(problemId: string) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/problem/delete/${problemId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        return;
      }

      await loadPatternRecords();
    } catch {
      // ignore network errors for now and keep current UI state
    }
  }

  function openCompleteProblem(problemId: string) {
    setCompletePromptProblemId(problemId);
    setIsCompletePromptOpen(true);
  }

  function completeProblem(
    solvedStatus: SolvedStatus,
    timeTakenMinutes: number,
  ) {
    if (!activePatternRecord || !completePromptProblemId) {
      return;
    }

    setPatternRecords((currentPatterns) =>
      currentPatterns.map((patternRecord) =>
        patternRecord.id === activePatternRecord.id
          ? {
              ...patternRecord,
              problems: patternRecord.problems.map((problemRecord) =>
                problemRecord.id === completePromptProblemId
                  ? {
                      ...problemRecord,
                      isCompleted: true,
                      solvedStatus,
                      timeTakenMinutes,
                      completedAt: new Date().toLocaleDateString(),
                    }
                  : problemRecord,
              ),
            }
          : patternRecord,
      ),
    );

    setIsCompletePromptOpen(false);
    setCompletePromptProblemId(null);
  }

  function updateProblemWorkspace(
    problemId: string,
    changes: Pick<ProblemRecord, "myApproach" | "optimalSolution" | "notes">,
  ) {
    if (!activePatternRecord) {
      return;
    }

    setPatternRecords((currentPatterns) =>
      currentPatterns.map((patternRecord) =>
        patternRecord.id === activePatternRecord.id
          ? {
              ...patternRecord,
              problems: patternRecord.problems.map((problemRecord) =>
                problemRecord.id === problemId
                  ? {
                      ...problemRecord,
                      ...changes,
                    }
                  : problemRecord,
              ),
            }
          : patternRecord,
      ),
    );
  }

  return (
    <div className="flex h-screen bg-[#000000] text-[#FFFFFF]">
      <PatternSidebar
        patternRecords={patternRecords}
        activePatternId={activePatternId}
        pendingPatternName={pendingPatternName}
        setPendingPatternName={setPendingPatternName}
        onCreatePattern={createPattern}
        onActivatePattern={(nextPatternId) => {
          setFocusedProblemId(null);
          setActivePatternId(nextPatternId);
        }}
        onRenamePattern={renamePattern}
        onDeletePattern={deletePattern}
      />

      {activePatternRecord ? (
        focusedProblemRecord ? (
          <ProblemWorkspace
            patternName={activePatternRecord.name}
            problem={focusedProblemRecord}
            onBack={() => setFocusedProblemId(null)}
            onUpdateProblemWorkspace={updateProblemWorkspace}
            onOpenEditProblem={openEditProblem}
            onDeleteProblem={deleteProblem}
            onOpenCompleteProblem={openCompleteProblem}
          />
        ) : (
          <PatternDetail
            activePatternRecord={activePatternRecord}
            pendingProblems={pendingProblems}
            completedProblems={completedProblems}
            onOpenProblemWorkspace={setFocusedProblemId}
            onOpenCreateProblem={openCreateProblem}
            onOpenEditProblem={openEditProblem}
            onDeleteProblem={deleteProblem}
            onOpenCompleteProblem={openCompleteProblem}
          />
        )
      ) : (
        <main className="flex h-screen flex-1 items-center justify-center bg-[#000000] px-8 py-12">
          <div className="w-full max-w-xl border border-[#2A2A2A] bg-[#0A0A0A] p-8">
            <p className="text-xs uppercase text-[#A3A3A3]">
              Pattern Workspace
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-[#FFFFFF]">
              No Active Pattern
            </h2>
            <p className="mt-3 text-sm text-[#A3A3A3]">
              Create a pattern from the sidebar to start organizing your pending
              problems.
            </p>
          </div>
        </main>
      )}

      <ProblemFormDialog
        isOpen={isProblemFormOpen}
        initialProblemDraft={activeProblemDraft}
        mode={problemFormMode}
        onClose={() => {
          setIsProblemFormOpen(false);
          setActiveProblemId(null);
        }}
        onSubmit={saveProblem}
      />

      <CompleteProblemDialog
        isOpen={isCompletePromptOpen}
        problemName={completePromptProblem?.name ?? ""}
        onClose={() => {
          setIsCompletePromptOpen(false);
          setCompletePromptProblemId(null);
        }}
        onConfirm={completeProblem}
      />
    </div>
  );
}

export default App;
