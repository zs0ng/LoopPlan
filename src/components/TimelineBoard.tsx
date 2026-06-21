import type { CSSProperties } from "react";
import { localize, t } from "../i18n";
import type { Language, TimeBlock, ViewMode } from "../types";
import { endHour, formatDisplayDate, getDateMetaLabel, hourHeight, minutesFromTime, startHour, shiftDate } from "../utils";

type TimelineBoardProps = {
  language: Language;
  selectedBlockId: string | null;
  selectedDate: string;
  timeBlocks: TimeBlock[];
  viewMode: ViewMode;
  onDateChange: (date: string) => void;
  onSelectBlock: (blockId: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
};

export function TimelineBoard({
  language,
  selectedBlockId,
  selectedDate,
  timeBlocks,
  viewMode,
  onDateChange,
  onSelectBlock,
  onViewModeChange
}: TimelineBoardProps) {
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

      <div className="timeline-grid">
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
  const height = (block.duration / 60) * hourHeight;

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
