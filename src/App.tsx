import { useMemo, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { tasks, templates, timeBlocks } from "./data";
import { shiftDate } from "./utils";
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
  const [viewMode, setViewMode] = useState<ViewMode>("day");

  const visibleTasks = useMemo<Task[]>(() => {
    if (activeCategory === "all") {
      return tasks;
    }

    return tasks.filter((task) => task.category === activeCategory);
  }, [activeCategory]);

  const visibleBlocks = useMemo<TimeBlock[]>(
    () => timeBlocks.filter((block) => block.date === selectedDate),
    [selectedDate]
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
          onLanguageChange: setLanguage,
          onSelectBlock: setSelectedBlockId,
          onViewModeChange: setViewMode
        })}
      </div>
    </div>
  );
}

type RenderPageProps = {
  activeCategory: CategoryKey;
  activeNav: NavKey;
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
  onLanguageChange: (language: Language) => void;
  onSelectBlock: (blockId: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
};

function renderPage(props: RenderPageProps) {
  switch (props.activeNav) {
    case "today":
      return (
        <TodayPlanPage
          activeCategory={props.activeCategory}
          language={props.language}
          selectedBlock={props.selectedBlock}
          selectedBlockId={props.selectedBlockId}
          selectedDate={props.selectedDate}
          tasks={props.tasks}
          timeBlocks={props.timeBlocks}
          viewMode={props.viewMode}
          onCategoryChange={props.onCategoryChange}
          onDateChange={props.onDateChange}
          onSelectBlock={props.onSelectBlock}
          onViewModeChange={props.onViewModeChange}
        />
      );
    case "tomorrow":
      return (
        <TomorrowPlanPage
          activeCategory={props.activeCategory}
          language={props.language}
          selectedBlock={props.selectedBlock}
          selectedBlockId={props.selectedBlockId}
          selectedDate={props.selectedDate}
          tasks={props.tasks}
          timeBlocks={props.timeBlocks}
          viewMode={props.viewMode}
          onCategoryChange={props.onCategoryChange}
          onDateChange={props.onDateChange}
          onSelectBlock={props.onSelectBlock}
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
