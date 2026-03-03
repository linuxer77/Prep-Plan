export type ProblemDifficulty = "Easy" | "Medium" | "Hard";

export type SolvedStatus =
  | "Solved Independently"
  | "Needed Hint"
  | "Saw Solution";

export interface ProblemRecord {
  id: string;
  name: string;
  url?: string;
  difficulty: ProblemDifficulty;
  isCompleted: boolean;
  myApproach?: string;
  optimalSolution?: string;
  notes?: string;
  timeTakenMinutes?: number;
  completedAt?: string;
  solvedStatus?: SolvedStatus;
}

export interface PatternRecord {
  id: string;
  name: string;
  problems: ProblemRecord[];
}

export interface ProblemDraft {
  name: string;
  url: string;
  difficulty: ProblemDifficulty;
}
