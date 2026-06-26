import { DetailPanel } from "../components/DetailPanel";
import { TaskLibraryPanel } from "../components/TaskLibraryPanel";
import { TimelineBoard } from "../components/TimelineBoard";
import { t } from "../i18n";
import type { CategoryKey, Language, Task, TimeBlock, ViewMode } from "../types";

type PlanningPageProps = {
  activeCategory: CategoryKey;
  draggedTaskTitle?: string | null;
  language: Language;
  pageKey: "today" | "tomorrow";
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
  onTimeBlockDragStart: (blockId: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
};

export function PlanningPage(props: PlanningPageProps) {
  const { activeCategory, draggedTaskTitle, language, pageKey, selectedBlock, selectedBlockId, selectedDate, tasks, timeBlocks, viewMode } = props;

  return (
    <>
      <TaskLibraryPanel
        activeCategory={activeCategory}
        language={language}
        subtitle={t(language, "pages")[pageKey].subtitle}
        tasks={tasks}
        title={t(language, "pages")[pageKey].title}
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
        onTaskDragEnd={props.onTaskDragEnd}
        onTimeBlockDragStart={props.onTimeBlockDragStart}
        onViewModeChange={props.onViewModeChange}
      />
      <DetailPanel block={selectedBlock} language={language} />
    </>
  );
}
