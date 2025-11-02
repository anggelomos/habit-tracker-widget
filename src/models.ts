// ==================== Core Types ====================

export type HabitId =
  | "sunlight"
  | "strength"
  | "balance"
  | "journaling"
  | "shower"
  | "fruit"
  | "reading";

export type StatsMetric = "ftw" | "ftp" | "ftr" | "lt";

export const CheckinStatus = {
  Completed: "completed",
  Skipped: "skipped",
} as const;

export type CheckinStatus = (typeof CheckinStatus)[keyof typeof CheckinStatus];

export const WaterStatus = {
  Empty: "empty",
  Half: "half",
  Full: "full",
} as const;

export type WaterStatus = (typeof WaterStatus)[keyof typeof WaterStatus];

// ==================== Date Models ====================

export interface CurrentDate {
  date: Date;
  weekday: string;
  formattedDate: string;
  dayOfYear: number;
  weekOfYear: number;
}
// ==================== Habit Models ====================

export interface Habits {
  date: Date;
  brushSessions: BrushSession[];
  waterIntakes: WaterIntake[];
  habitCheckins: HabitCheckin[];
}

export interface BrushSession {
  id: string;
  timestamp: Date;
  status: CheckinStatus;
}

export interface WaterIntake {
  id: string;
  timestamp: Date;
  status: WaterStatus;
}

export interface HabitCheckin {
  id: string;
  timestamp: Date;
  status: CheckinStatus;
}


// ==================== Statistics ====================

export interface TimeStats {
  focusedTimeWork: number;
  focusedTimePersonal: number;
  focusedTimeRescuetime: number;
  leisureTime: number;
}
