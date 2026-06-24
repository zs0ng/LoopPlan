import { useMemo, useRef, useState, type CSSProperties } from "react";
import { localize, t } from "../i18n";
import type { Language, TimeBlock, ViewMode } from "../types";
import {
  endHour,
  formatDisplayDate,
  getDateMetaLabel,
  getVisualBlockHeight,
  hourHeight,
  minutesFromTime,
  startHour,
  shiftDate
} from "../utils";

type TimelineBoardProps = {
  draggedTaskTitle?: string | null;
  language: Language;
  selectedBlockId: string | null;
  selectedDate: string;
  timeBlocks: TimeBlock[];
  viewMode: ViewMode;
  onDateChange: (date: string) => void;
  onDropTask: (dropHour: number, dropMinute: number) => void;
  onSelectBlock: (blockId: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
};

export function TimelineBoard({
  draggedTaskTitle,
  language,
  selectedBlockId,
  selectedDate,
  timeBlocks,
  viewMode,
  onDateChange,
  onDropTask,
  onSelectBlock,
  onViewModeChange
}: TimelineBoardProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dropPreview, setDropPreview] = useState<{ hour: number; minute: number } | null>(null);
  const timelineGridHeight = (endHour - startHour + 1) * hourHeight;

  const previewLabel = useMemo(() => {
    if (!dropPreview) {
      return null;
    }

    return `${String(dropPreview.hour).padStart(2, "0")}:${String(dropPreview.minute).padStart(2, "0")}`;
  }, [dropPreview]);

  const getDropPreviewFromClientY = (clientY: number) => {
    if (!gridRef.current) {
      return null;
    }

    const rect = gridRef.current.getBoundingClientRect();
    const relativeY = Math.min(Math.max(clientY - rect.top, 0), rect.height);
    const totalMinutes = startHour * 60 + Math.round(relativeY / (hourHeight / 2)) * 30;
    const clampedMinutes = Math.max(startHour * 60, Math.min((endHour - 1) * 60 + 30, totalMinutes));
    return {
      hour: Math.floor(clampedMinutes / 60),
      minute: clampedMinutes % 60
    };
  };

  return (
    <main className="timeline-panel">
      <header className="timeline-toolbar">
        <div className="toolbar-group">
          <button className="icon-button" onClick={() => onDateChange(shiftDate(selectedDate, -1))}>
            ‹
          </button>
          <button className="icon-button" onClick={() => onDateChange(shiftDate(selectedDate, 1))}>
            ›
          </button>
        </div>

        <div className="toolbar-date">
          <span className="calendar-icon">◷</span>
          <strong>{formatDisplayDate(language, selectedDate)}</strong>
          <span className="muted">{getDateMetaLabel(language, selectedDate)}</span>
        </div>

        <div className="toolbar-group">
          <button
            className={`view-switch ${viewMode === "day" ? "active" : ""}`}
            onClick={() => onViewModeChange("day")}
          >
            {t(language, "dayView")}
          </button>
          <button
            className={`view-switch ${viewMode === "week" ? "active" : ""}`}
            onClick={() => onViewModeChange("week")}
          >
            {t(language, "weekView")}
          </button>
          <button className="icon-button">…</button>
        </div>
      </header>

      <div className="timeline-header">
        <button className="primary-button">+ {t(language, "addTimeBlock")}</button>
      </div>

      <div
        ref={gridRef}
        className={`timeline-grid ${isDragOver ? "drag-over" : ""}`}
        style={
          {
            "--timeline-hour-height": `${hourHeight}px`,
            minHeight: `${timelineGridHeight}px`
          } as CSSProperties
        }
        onDragOver={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = "copy";
          setIsDragOver(true);
          setDropPreview(getDropPreviewFromClientY(event.clientY));
        }}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsDragOver(false);
            setDropPreview(null);
          }
        }}
        onDrop={(event) => {
          event.preventDefault();
          const nextDropPreview = getDropPreviewFromClientY(event.clientY);

          if (nextDropPreview) {
            onDropTask(nextDropPreview.hour, nextDropPreview.minute);
          }

          setIsDragOver(false);
          setDropPreview(null);
        }}
      >
        {Array.from({ length: endHour - startHour + 1 }, (_, index) => {
          const hour = startHour + index;
          const label = `${String(hour).padStart(2, "0")}:00`;
          return (
            <div key={label} className="timeline-row">
              <div className="hour-label">{label}</div>
              <div className="hour-line" />
            </div>
          );
        })}

        {timeBlocks.map((block) => (
          <TimeBlockCard
            key={block.id}
            block={block}
            language={language}
            selected={block.id === selectedBlockId}
            onSelect={() => onSelectBlock(block.id)}
          />
        ))}

        {isDragOver && dropPreview ? (
          <div
            className="timeline-drop-preview"
            style={{
              top: `${((dropPreview.hour * 60 + dropPreview.minute - startHour * 60) / 60) * hourHeight}px`
            }}
          >
            <span>{previewLabel}</span>
            <strong>{draggedTaskTitle ?? t(language, "taskDropTitle")}</strong>
          </div>
        ) : null}

        <div className="timeline-drop-hint">
          <span>☾</span>
          <span>{t(language, "timelineDropHint")}</span>
        </div>
      </div>
    </main>
  );
}

function TimeBlockCard({
  block,
  language,
  selected,
  onSelect
}: {
  block: TimeBlock;
  language: Language;
  selected: boolean;
  onSelect: () => void;
}) {
  const top = ((minutesFromTime(block.start) - startHour * 60) / 60) * hourHeight;
  const height = getVisualBlockHeight(block.duration);

  return (
    <button
      className={`time-block ${selected ? "selected" : ""} ${block.status}`}
      style={
        {
          "--block-color": block.color,
          top: `${top}px`,
          height: `${height}px`
        } as CSSProperties
      }
      onClick={onSelect}
    >
      <span className="time-block-icon">{block.icon}</span>
      <span className="time-block-copy">
        <small>
          {block.start} - {block.end}
        </small>
        <strong>{localize(language, block.title)}</strong>
      </span>
      <span className={`time-block-check ${block.status === "completed" ? "done" : ""}`}>
        {block.status === "completed" ? "✓" : ""}
      </span>
    </button>
  );
}
