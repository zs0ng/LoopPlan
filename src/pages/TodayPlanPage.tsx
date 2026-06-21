import { DetailPanel } from "../components/DetailPanel";
import { TaskLibraryPanel } from "../components/TaskLibraryPanel";
import { TimelineBoard } from "../components/TimelineBoard";
import { t } from "../i18n";
import type { CategoryKey, Language, Task, TimeBlock, ViewMode } from "../types";

type TodayPlanPageProps = {
  activeCategory: CategoryKey;
  language: Language;
  selectedBlock: TimeBlock | null;
  selectedBlockId: string | null;
  selectedDate: string;
  tasks: Task[];
  timeBlocks: TimeBlock[];
  viewMode: ViewMode;
  onCategoryChange: (category: CategoryKey) => void;
  onDateChange: (date: string) => void;
  onSelectBlock: (blockId: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
};

export function TodayPlanPage(props: TodayPlanPageProps) {
  const { activeCategory, language, selectedBlock, selectedBlockId, selectedDate, tasks, timeBlocks, viewMode } = props;

  return (
    <>
      <TaskLibraryPanel
        activeCategory={activeCategory}
        language={language}
        subtitle={t(language, "pages").today.subtitle}
        tasks={tasks}
        title={t(language, "pages").today.title}
        onCategoryChange={props.onCategoryChange}
      />
      <TimelineBoard
        language={language}
        selectedBlockId={selectedBlockId}
        selectedDate={selectedDate}
        timeBlocks={timeBlocks}
        viewMode={viewMode}
        onDateChange={props.onDateChange}
        onSelectBlock={props.onSelectBlock}
        onViewModeChange={props.onViewModeChange}
      />
      <DetailPanel block={selectedBlock} language={language} />
    </>
  );
}
