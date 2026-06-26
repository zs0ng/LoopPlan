import type { CategoryKey, NavKey, Task, Template, TimeBlock } from "./types";

export const navItems: Array<{ key: NavKey; icon: string }> = [
  { key: "planning", icon: "◫" },
  { key: "library", icon: "▤" },
  { key: "templates", icon: "▣" },
  { key: "stats", icon: "◩" },
  { key: "settings", icon: "◎" }
];

export const categories: CategoryKey[] = ["all", "study", "work", "life", "fitness"];

export const tasks: Task[] = [
  {
    id: "task-1",
    title: { zh: "背单词", en: "Vocabulary Drill" },
    category: "study",
    duration: 30,
    icon: "📗",
    color: "#61d67a"
  },
  {
    id: "task-2",
    title: { zh: "Anki 复习", en: "Anki Review" },
    category: "study",
    duration: 20,
    icon: "🟪",
    color: "#8a6cff"
  },
  {
    id: "task-3",
    title: { zh: "阅读", en: "Reading" },
    category: "study",
    duration: 40,
    icon: "📙",
    color: "#ff9a3d"
  },
  {
    id: "task-4",
    title: { zh: "写作业 / 写代码", en: "Homework / Coding" },
    category: "work",
    duration: 60,
    icon: "💻",
    color: "#5f8fff"
  },
  {
    id: "task-5",
    title: { zh: "画图 / 作品集", en: "Drawing / Portfolio" },
    category: "life",
    duration: 60,
    icon: "🎨",
    color: "#ff73a6"
  },
  {
    id: "task-6",
    title: { zh: "健身", en: "Workout" },
    category: "fitness",
    duration: 45,
    icon: "🏋️",
    color: "#4cc95c"
  },
  {
    id: "task-7",
    title: { zh: "整理房间", en: "Tidy the Room" },
    category: "life",
    duration: 20,
    icon: "🏠",
    color: "#ff9a3d"
  },
  {
    id: "task-8",
    title: { zh: "冥想", en: "Meditation" },
    category: "life",
    duration: 15,
    icon: "🧘",
    color: "#7c67ff"
  }
];

export const templates: Template[] = [
  {
    id: "tpl-1",
    name: { zh: "晨间学习模板", en: "Morning Study Template" },
    description: { zh: "适合启动一天的复习节奏", en: "A focused study arc to start the day." },
    count: 6,
    accent: "#ffad43",
    icon: "☀️"
  },
  {
    id: "tpl-2",
    name: { zh: "工作专注模板", en: "Deep Work Template" },
    description: { zh: "适合作业与写代码时段", en: "Blocks for coding and assignment sessions." },
    count: 5,
    accent: "#ff6588",
    icon: "🧠"
  },
  {
    id: "tpl-3",
    name: { zh: "夜间复习模板", en: "Night Review Template" },
    description: { zh: "晚间复盘与整理计划", en: "A calm evening review cadence." },
    count: 4,
    accent: "#5f8fff",
    icon: "🌙"
  },
  {
    id: "tpl-4",
    name: { zh: "周末生活模板", en: "Weekend Life Template" },
    description: { zh: "生活事务与恢复节奏", en: "A lighter layout for chores and recovery." },
    count: 4,
    accent: "#7c67ff",
    icon: "🪴"
  }
];

export const timeBlocks: TimeBlock[] = [
  {
    id: "tb-1",
    taskId: "task-1",
    title: { zh: "背单词", en: "Vocabulary Drill" },
    date: "2026-06-17",
    start: "09:00",
    end: "09:30",
    duration: 30,
    category: "study",
    icon: "📗",
    color: "#61d67a",
    note: { zh: "使用 App 背 30 个新词", en: "Review 30 new words inside the app." },
    status: "completed",
    completedAt: "09:32"
  },
  {
    id: "tb-2",
    taskId: "task-4",
    title: { zh: "写作业 / 写代码", en: "Homework / Coding" },
    date: "2026-06-17",
    start: "10:00",
    end: "11:00",
    duration: 60,
    category: "work",
    icon: "💻",
    color: "#7c67ff",
    note: { zh: "继续整理应用框架和数据模型", en: "Continue refining the app shell and data model." },
    status: "planned"
  },
  {
    id: "tb-3",
    taskId: "task-2",
    title: { zh: "Anki 复习", en: "Anki Review" },
    date: "2026-06-17",
    start: "14:00",
    end: "14:30",
    duration: 30,
    category: "study",
    icon: "🟪",
    color: "#ffad43",
    note: { zh: "复习昨天记错的卡片", en: "Repeat the cards missed yesterday." },
    status: "planned"
  },
  {
    id: "tb-4",
    taskId: "task-3",
    title: { zh: "阅读", en: "Reading" },
    date: "2026-06-17",
    start: "15:00",
    end: "16:00",
    duration: 60,
    category: "study",
    icon: "📘",
    color: "#5f8fff",
    note: { zh: "阅读一章并记录摘要", en: "Read one chapter and capture a short summary." },
    status: "planned"
  },
  {
    id: "tb-5",
    taskId: "task-5",
    title: { zh: "画图 / 作品集", en: "Drawing / Portfolio" },
    date: "2026-06-17",
    start: "19:00",
    end: "20:00",
    duration: 60,
    category: "life",
    icon: "🎨",
    color: "#ff7cab",
    note: { zh: "完善首页视觉稿", en: "Polish the landing screen visual draft." },
    status: "planned"
  },
  {
    id: "tb-6",
    taskId: "task-8",
    title: { zh: "冥想", en: "Meditation" },
    date: "2026-06-17",
    start: "20:30",
    end: "21:00",
    duration: 30,
    category: "life",
    icon: "🧘",
    color: "#8a6cff",
    note: { zh: "结束前整理第二天计划", en: "Reset before planning tomorrow." },
    status: "planned"
  },
  {
    id: "tb-7",
    taskId: "task-1",
    title: { zh: "背单词", en: "Vocabulary Drill" },
    date: "2026-06-18",
    start: "08:30",
    end: "09:00",
    duration: 30,
    category: "study",
    icon: "📗",
    color: "#61d67a",
    note: { zh: "明日预热复习", en: "A short warm-up session for tomorrow." },
    status: "planned"
  },
  {
    id: "tb-8",
    taskId: "task-6",
    title: { zh: "健身", en: "Workout" },
    date: "2026-06-18",
    start: "18:00",
    end: "18:45",
    duration: 45,
    category: "fitness",
    icon: "🏋️",
    color: "#4cc95c",
    note: { zh: "下班后力量训练", en: "Strength training after work." },
    status: "planned"
  }
];
