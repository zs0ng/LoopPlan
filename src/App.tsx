import { useMemo, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { tasks, templates, timeBlocks } from "./data";
import { endHour, shiftDate, startHour } from "./utils";
import type { CategoryKey, Language, NavKey, Task, TimeBlock, ViewMode } from "./types";
import { PlanningPage } from "./pages/PlanningPage";
import { TaskLibraryPage } from "./pages/TaskLibraryPage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { StatsPage } from "./pages/StatsPage";
import { SettingsPage } from "./pages/SettingsPage";

const todayDate = "2026-06-17";
type DraggedTimelineItem =
  | { kind: "task"; task: Task }
  | { kind: "block"; blockId: string };
const formatTime = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

const getScheduledRange = (dropHour: number, dropMinute: number, duration: number) => {
  const requestedStart = dropHour * 60 + dropMinute;
  const latestStart = Math.max(startHour * 60, endHour * 60 - duration);
  const boundedStart = Math.min(Math.max(requestedStart, startHour * 60), latestStart);

  return {
    start: formatTime(boundedStart),
    end: formatTime(boundedStart + duration),
    duration
  };
};

function App() {
  const [activeNav, setActiveNav] = useState<NavKey>("today");
  const [language, setLanguage] = useState<Language>("zh");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>("tb-1");
  const [timelineBlocks, setTimelineBlocks] = useState<TimeBlock[]>(timeBlocks);
  const [draggedItem, setDraggedItem] = useState<DraggedTimelineItem | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("day");

  const visibleTasks = useMemo<Task[]>(() => {
    if (activeCategory === "all") {
      return tasks;
    }

    return tasks.filter((task) => task.category === activeCategory);
  }, [activeCategory]);

  const visibleBlocks = useMemo<TimeBlock[]>(
    () => timelineBlocks.filter((block) => block.date === selectedDate),
    [selectedDate, timelineBlocks]
  );

  const selectedBlock = visibleBlocks.find((block) => block.id === selectedBlockId) ?? visibleBlocks[0] ?? null;

  const handleBrandClick = () => {
    setActiveNav("today");
    setSelectedDate(todayDate);
    setSelectedBlockId("tb-1");
  };

  const handleNavChange = (key: NavKey) => {
    setActiveNav(key);

    if (key === "today") {
      setSelectedDate(todayDate);
    }

    if (key === "tomorrow") {
      setSelectedDate(shiftDate(todayDate, 1));
    }
  };

  const handleTimelineDrop = (dropHour: number, dropMinute: number) => {
    if (!draggedItem) {
      return;
    }

    if (draggedItem.kind === "task") {
      const nextRange = getScheduledRange(dropHour, dropMinute, draggedItem.task.duration);
      const newBlock: TimeBlock = {
        id: `tb-${crypto.randomUUID()}`,
        taskId: draggedItem.task.id,
        title: draggedItem.task.title,
        date: selectedDate,
        start: nextRange.start,
        end: nextRange.end,
        duration: nextRange.duration,
        category: draggedItem.task.category,
        icon: draggedItem.task.icon,
        color: draggedItem.task.color,
        note: {
          zh: "从任务库拖拽创建",
          en: "Created by dragging from the task library."
        },
        status: "planned"
      };

      setTimelineBlocks((current) => [...current, newBlock]);
      setSelectedBlockId(newBlock.id);
      setDraggedItem(null);
      return;
    }

    setTimelineBlocks((current) =>
      current.map((block) => {
        if (block.id !== draggedItem.blockId) {
          return block;
        }

        const nextRange = getScheduledRange(dropHour, dropMinute, block.duration);
        return {
          ...block,
          date: selectedDate,
          start: nextRange.start,
          end: nextRange.end,
          duration: nextRange.duration
        };
      })
    );
    setSelectedBlockId(draggedItem.blockId);
    setDraggedItem(null);
  };

  return (
    <div className="app-shell">
      <div className="window-frame">
        <Sidebar
          activeNav={activeNav}
          language={language}
          sidebarCollapsed={sidebarCollapsed}
          onBrandClick={handleBrandClick}
          onNavChange={handleNavChange}
          onToggleSidebar={() => setSidebarCollapsed((value) => !value)}
        />
        {renderPage({
          activeCategory,
          activeNav,
          draggedTaskTitle:
            draggedItem?.kind === "task"
              ? draggedItem.task.title[language]
              : timelineBlocks.find((block) => block.id === draggedItem?.blockId)?.title[language] ?? null,
          language,
          selectedBlock,
          selectedBlockId,
          selectedDate,
          tasks: visibleTasks,
          templates,
          timeBlocks: visibleBlocks,
          viewMode,
          onCategoryChange: setActiveCategory,
          onDateChange: setSelectedDate,
          onDropTask: handleTimelineDrop,
          onLanguageChange: setLanguage,
          onSelectBlock: setSelectedBlockId,
          onTaskDragEnd: () => setDraggedItem(null),
          onTaskDragStart: (task) => setDraggedItem({ kind: "task", task }),
          onTimeBlockDragStart: (blockId) => setDraggedItem({ kind: "block", blockId }),
          onViewModeChange: setViewMode
        })}
      </div>
    </div>
  );
}

type RenderPageProps = {
  activeCategory: CategoryKey;
  activeNav: NavKey;
  draggedTaskTitle: string | null;
  language: Language;
  selectedBlock: TimeBlock | null;
  selectedBlockId: string | null;
  selectedDate: string;
  tasks: Task[];
  templates: typeof templates;
  timeBlocks: TimeBlock[];
  viewMode: ViewMode;
  onCategoryChange: (category: CategoryKey) => void;
  onDateChange: (date: string) => void;
  onDropTask: (dropHour: number, dropMinute: number) => void;
  onLanguageChange: (language: Language) => void;
  onSelectBlock: (blockId: string) => void;
  onTaskDragEnd: () => void;
  onTaskDragStart: (task: Task) => void;
  onTimeBlockDragStart: (blockId: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
};

function renderPage(props: RenderPageProps) {
  switch (props.activeNav) {
    case "today":
      return (
        <PlanningPage
          activeCategory={props.activeCategory}
          draggedTaskTitle={props.draggedTaskTitle}
          language={props.language}
          pageKey="today"
          selectedBlock={props.selectedBlock}
          selectedBlockId={props.selectedBlockId}
          selectedDate={props.selectedDate}
          tasks={props.tasks}
          timeBlocks={props.timeBlocks}
          viewMode={props.viewMode}
          onCategoryChange={props.onCategoryChange}
          onDateChange={props.onDateChange}
          onDropTask={props.onDropTask}
          onSelectBlock={props.onSelectBlock}
          onTaskDragEnd={props.onTaskDragEnd}
          onTaskDragStart={props.onTaskDragStart}
          onTimeBlockDragStart={props.onTimeBlockDragStart}
          onViewModeChange={props.onViewModeChange}
        />
      );
    case "tomorrow":
      return (
        <PlanningPage
          activeCategory={props.activeCategory}
          draggedTaskTitle={props.draggedTaskTitle}
          language={props.language}
          pageKey="tomorrow"
          selectedBlock={props.selectedBlock}
          selectedBlockId={props.selectedBlockId}
          selectedDate={props.selectedDate}
          tasks={props.tasks}
          timeBlocks={props.timeBlocks}
          viewMode={props.viewMode}
          onCategoryChange={props.onCategoryChange}
          onDateChange={props.onDateChange}
          onDropTask={props.onDropTask}
          onSelectBlock={props.onSelectBlock}
          onTaskDragEnd={props.onTaskDragEnd}
          onTaskDragStart={props.onTaskDragStart}
          onTimeBlockDragStart={props.onTimeBlockDragStart}
          onViewModeChange={props.onViewModeChange}
        />
      );
    case "library":
      return (
        <TaskLibraryPage
          activeCategory={props.activeCategory}
          language={props.language}
          tasks={props.tasks}
          templates={props.templates}
          onCategoryChange={props.onCategoryChange}
        />
      );
    case "templates":
      return <TemplatesPage language={props.language} templates={props.templates} />;
    case "stats":
      return <StatsPage language={props.language} />;
    case "settings":
      return <SettingsPage language={props.language} onLanguageChange={props.onLanguageChange} />;
    default:
      return null;
  }
}

export default App;
