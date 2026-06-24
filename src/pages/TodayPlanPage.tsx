import { DetailPanel } from "../components/DetailPanel";
import { TaskLibraryPanel } from "../components/TaskLibraryPanel";
import { TimelineBoard } from "../components/TimelineBoard";
import { t } from "../i18n";
import type { CategoryKey, Language, Task, TimeBlock, ViewMode } from "../types";

type TodayPlanPageProps = {
  activeCategory: CategoryKey;
  draggedTaskTitle?: string | null;
  language: Language;
  selectedBlock: TimeBlock | null;
  selectedBlockId: string | null;
  selectedDate: string;
  tasks: Task[];
  timeBlocks: TimeBlock[];
  viewMode: ViewMode;
  onCategoryChange: (category: CategoryKey) => void;
  onDateChange: (date: string) => void;
  onDropTask: (dropHour: number, dropMinute: number) => void;
  onSelectBlock: (blockId: string) => void;
  onTaskDragEnd: () => void;
  onTaskDragStart: (task: Task) => void;
  onViewModeChange: (mode: ViewMode) => void;
};

export function TodayPlanPage(props: TodayPlanPageProps) {
  const { activeCategory, draggedTaskTitle, language, selectedBlock, selectedBlockId, selectedDate, tasks, timeBlocks, viewMode } = props;

  return (
    <>
      <TaskLibraryPanel
        activeCategory={activeCategory}
        language={language}
        subtitle={t(language, "pages").today.subtitle}
        tasks={tasks}
        title={t(language, "pages").today.title}
        onCategoryChange={props.onCategoryChange}
        onTaskDragEnd={props.onTaskDragEnd}
        onTaskDragStart={props.onTaskDragStart}
      />
      <TimelineBoard
        draggedTaskTitle={draggedTaskTitle}
        language={language}
        selectedBlockId={selectedBlockId}
        selectedDate={selectedDate}
        timeBlocks={timeBlocks}
        viewMode={viewMode}
        onDateChange={props.onDateChange}
        onDropTask={props.onDropTask}
        onSelectBlock={props.onSelectBlock}
        onViewModeChange={props.onViewModeChange}
      />
      <DetailPanel block={selectedBlock} language={language} />
    </>
  );
}
