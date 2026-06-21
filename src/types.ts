export type Language = "zh" | "en";

export type NavKey = "today" | "tomorrow" | "library" | "templates" | "stats" | "settings";

export type CategoryKey = "all" | "study" | "work" | "life" | "fitness";

export type ViewMode = "day" | "week";

export type LocalizedText = {
  zh: string;
  en: string;
};

export type Task = {
  id: string;
  title: LocalizedText;
  category: Exclude<CategoryKey, "all">;
  duration: number;
  icon: string;
  color: string;
};

export type TimeBlockStatus = "planned" | "completed";

export type TimeBlock = {
  id: string;
  taskId: string;
  title: LocalizedText;
  date: string;
  start: string;
  end: string;
  duration: number;
  category: Exclude<CategoryKey, "all">;
  icon: string;
  color: string;
  note: LocalizedText;
  status: TimeBlockStatus;
  completedAt?: string;
};

export type Template = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  count: number;
  accent: string;
  icon: string;
};
