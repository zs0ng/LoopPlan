import { useMemo, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { tasks, templates, timeBlocks } from "./data";
import { endHour, shiftDate } from "./utils";
import type { CategoryKey, Language, NavKey, Task, TimeBlock, ViewMode } from "./types";
import { TodayPlanPage } from "./pages/TodayPlanPage";
import { TomorrowPlanPage } from "./pages/TomorrowPlanPage";
import { TaskLibraryPage } from "./pages/TaskLibraryPage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { StatsPage } from "./pages/StatsPage";
import { SettingsPage } from "./pages/SettingsPage";

const todayDate = "2026-06-17";

function App() {
  const [activeNav, setActiveNav] = useState<NavKey>("today");
  const [language, setLanguage] = useState<Language>("zh");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>("tb-1");
  const [timelineBlocks, setTimelineBlocks] = useState<TimeBlock[]>(timeBlocks);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
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

  const handleDropTask = (dropHour: number, dropMinute: number) => {
    if (!draggedTask) {
      return;
    }

    const startMinutes = dropHour * 60 + dropMinute;
    const endMinutes = startMinutes + draggedTask.duration;
    const clampedEnd = Math.min(endHour * 60, endMinutes);
    const newBlock: TimeBlock = {
      id: `tb-${crypto.randomUUID()}`,
      taskId: draggedTask.id,
      title: draggedTask.title,
      date: selectedDate,
      start: `${String(dropHour).padStart(2, "0")}:${String(dropMinute).padStart(2, "0")}`,
      end: `${String(Math.floor(clampedEnd / 60)).padStart(2, "0")}:${String(clampedEnd % 60).padStart(2, "0")}`,
      duration: clampedEnd - startMinutes,
      category: draggedTask.category,
      icon: draggedTask.icon,
      color: draggedTask.color,
      note: {
        zh: "从任务库拖拽创建",
        en: "Created by dragging from the task library."
      },
      status: "planned"
    };

    setTimelineBlocks((current) => [...current, newBlock]);
    setSelectedBlockId(newBlock.id);
    setDraggedTask(null);
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
          draggedTask,
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
          onDropTask: handleDropTask,
          onLanguageChange: setLanguage,
          onSelectBlock: setSelectedBlockId,
          onTaskDragEnd: () => setDraggedTask(null),
          onTaskDragStart: setDraggedTask,
          onViewModeChange: setViewMode
        })}
      </div>
    </div>
  );
}

type RenderPageProps = {
  activeCategory: CategoryKey;
  activeNav: NavKey;
  draggedTask: Task | null;
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
  onViewModeChange: (mode: ViewMode) => void;
};

function renderPage(props: RenderPageProps) {
  switch (props.activeNav) {
    case "today":
      return (
        <TodayPlanPage
          activeCategory={props.activeCategory}
          draggedTaskTitle={props.draggedTask?.title[props.language] ?? null}
          language={props.language}
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
          onViewModeChange={props.onViewModeChange}
        />
      );
    case "tomorrow":
      return (
        <TomorrowPlanPage
          activeCategory={props.activeCategory}
          draggedTaskTitle={props.draggedTask?.title[props.language] ?? null}
          language={props.language}
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
