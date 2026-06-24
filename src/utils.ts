import type { Language } from "./types";
import { t } from "./i18n";

export const startHour = 8;
export const endHour = 22;
export const hourHeight = 96;
export const minimumVisualBlockMinutes = 60;

export const minutesFromTime = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
};

export const getVisualBlockHeight = (durationMinutes: number) => {
  const visualMinutes = Math.max(durationMinutes, minimumVisualBlockMinutes);
  return (visualMinutes / 60) * hourHeight;
};

export const shiftDate = (value: string, offset: number) => {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
};

export const formatDisplayDate = (language: Language, value: string) => {
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en-AU", {
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(date);
};

export const getDateMetaLabel = (language: Language, value: string) => {
  const current = new Date();
  const target = new Date(`${value}T00:00:00`);
  const today = new Date(current.getFullYear(), current.getMonth(), current.getDate());
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000);

  if (diff === 0) return t(language, "todayMeta");
  if (diff === 1) return t(language, "tomorrowMeta");
  if (diff === -1) return t(language, "yesterdayMeta");

  return diff > 0
    ? `${diff} ${t(language, "daysLater")}`
    : `${Math.abs(diff)} ${t(language, "daysAgo")}`;
};
