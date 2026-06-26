import type { CategoryKey, Language, LocalizedText, NavKey } from "./types";

const copy = {
  zh: {
    appName: "LoopPlan",
    brandSubtitle: "循环任务计划板",
    nav: {
      planning: "计划安排",
      library: "任务库",
      templates: "模板",
      stats: "统计",
      settings: "设置"
    },
    categories: {
      all: "全部",
      study: "学习",
      work: "工作",
      life: "生活",
      fitness: "运动"
    },
    language: "语言",
    chinese: "中文",
    english: "English",
    myTemplates: "我的模板",
    streakDays: "连续完成天数",
    weeklyRate: "本周完成率",
    newTask: "新建任务",
    addTimeBlock: "添加时间块",
    dayView: "日视图",
    weekView: "周视图",
    statusCompleted: "已完成",
    statusPlanned: "待执行",
    doneAt: "完成于",
    notDone: "尚未完成",
    emptyDay: "当前日期还没有时间块。",
    detailTitle: "时间块详情",
    detailHint: "右侧即时编辑与确认完成状态",
    detailEmptyHint: "请选择一个时间块",
    detailDate: "日期",
    detailTime: "时间",
    detailDuration: "时长",
    detailCategory: "分类",
    detailNote: "备注",
    detailCompletion: "完成情况",
    edit: "编辑",
    delete: "删除",
    copyToDate: "复制到其他日期",
    timelineDropHint: "拖动任务到这里安排当天",
    taskDropTitle: "拖动任务到时间线",
    taskDropHint: "Phase 1 可以直接接入 dnd-kit 和空白投放区",
    todayMeta: "今天",
    tomorrowMeta: "明天",
    yesterdayMeta: "昨天",
    daysLater: "天后",
    daysAgo: "天前",
    minutes: "分钟",
    workInProgress: "后续可接入真实完成记录与统计计算",
    pages: {
      planning: {
        title: "计划安排",
        subtitle: "拖到时间线上安排任务，用顶部日期切换管理今天和之后的计划"
      },
      library: {
        title: "任务库",
        subtitle: "维护可复用任务，作为所有排程的起点"
      },
      templates: {
        title: "模板",
        subtitle: "把常用的一整组时间块沉淀成固定节奏"
      },
      stats: {
        title: "统计",
        subtitle: "从完成情况和节奏稳定性看自己的计划质量"
      },
      settings: {
        title: "设置",
        subtitle: "管理语言、桌面偏好和后续本地持久化开关"
      }
    },
    pageCards: {
      libraryOverview: "任务库页面现在独立成单独文件，后续可以在这里接任务 CRUD、分类管理和归档逻辑。",
      templatesOverview: "模板页面聚焦保存当前计划、应用模板以及冲突处理，适合继续接 Dexie 数据层。",
      statsOverview: "统计页面预留了连续完成天数、完成率和分类分布等区域，后续只需要接真实数据聚合。",
      settingsOverview: "设置页面已经可切换中英双语，后续适合继续加入侧边栏记忆、时间粒度与通知偏好。"
    },
    quickSections: {
      queue: "任务队列",
      guide: "页面说明",
      presets: "模板集合",
      metrics: "关键指标",
      preferences: "偏好项"
    },
    quickLabels: {
      openToday: "点击 Logo 返回今日计划",
      localeReady: "全局文案已接入中英双语",
      splitPages: "每个标签页已拆成独立页面文件",
      storageReady: "已预留本地持久化接入位"
    }
  },
  en: {
    appName: "LoopPlan",
    brandSubtitle: "Cycle Planning Board",
    nav: {
      planning: "Planning",
      library: "Task Library",
      templates: "Templates",
      stats: "Stats",
      settings: "Settings"
    },
    categories: {
      all: "All",
      study: "Study",
      work: "Work",
      life: "Life",
      fitness: "Fitness"
    },
    language: "Language",
    chinese: "中文",
    english: "English",
    myTemplates: "My Templates",
    streakDays: "Streak",
    weeklyRate: "Weekly Completion",
    newTask: "New Task",
    addTimeBlock: "Add Time Block",
    dayView: "Day View",
    weekView: "Week View",
    statusCompleted: "Completed",
    statusPlanned: "Planned",
    doneAt: "Done at",
    notDone: "Not completed",
    emptyDay: "No time blocks scheduled for this date yet.",
    detailTitle: "Time Block Details",
    detailHint: "Edit and confirm status directly on the right.",
    detailEmptyHint: "Select a time block to inspect it here.",
    detailDate: "Date",
    detailTime: "Time",
    detailDuration: "Duration",
    detailCategory: "Category",
    detailNote: "Note",
    detailCompletion: "Completion",
    edit: "Edit",
    delete: "Delete",
    copyToDate: "Copy to another date",
    timelineDropHint: "Drop a task here to schedule it for the day",
    taskDropTitle: "Drag tasks onto the timeline",
    taskDropHint: "Phase 1 can plug dnd-kit and the blank drop zone straight in.",
    todayMeta: "Today",
    tomorrowMeta: "Tomorrow",
    yesterdayMeta: "Yesterday",
    daysLater: "days later",
    daysAgo: "days ago",
    minutes: "min",
    workInProgress: "Wire real completion records and aggregated stats in the next phase.",
    pages: {
      planning: {
        title: "Planning",
        subtitle: "Drag tasks onto the timeline and switch dates from the header to manage today and upcoming plans."
      },
      library: {
        title: "Task Library",
        subtitle: "Maintain reusable tasks that feed every planning flow."
      },
      templates: {
        title: "Templates",
        subtitle: "Capture repeatable daily rhythms as reusable block groups."
      },
      stats: {
        title: "Stats",
        subtitle: "Track completion quality and whether your rhythm is actually stable."
      },
      settings: {
        title: "Settings",
        subtitle: "Control locale, desktop preferences, and future local persistence toggles."
      }
    },
    pageCards: {
      libraryOverview: "The task library now lives in its own page file and is ready for CRUD, filtering, and archiving work.",
      templatesOverview: "The templates page is isolated for applying saved routines, saving current plans, and handling merge conflicts later.",
      statsOverview: "The stats page reserves space for streaks, completion rate, and category distribution once real aggregation is added.",
      settingsOverview: "The settings page already switches between Chinese and English and is the right home for sidebar, notification, and time-slot preferences."
    },
    quickSections: {
      queue: "Task Queue",
      guide: "Page Notes",
      presets: "Template Set",
      metrics: "Core Metrics",
      preferences: "Preferences"
    },
    quickLabels: {
      openToday: "Click the logo to jump back to Today",
      localeReady: "All UI copy is wired for Chinese and English",
      splitPages: "Each tab now lives in its own page file",
      storageReady: "Local persistence integration points are reserved"
    }
  }
} as const;

export const t = <K extends keyof typeof copy.zh>(language: Language, key: K) => copy[language][key];

export const navLabel = (language: Language, key: NavKey) => copy[language].nav[key];

export const categoryLabel = (language: Language, key: CategoryKey) => copy[language].categories[key];

export const localize = (language: Language, text: LocalizedText) => text[language];
