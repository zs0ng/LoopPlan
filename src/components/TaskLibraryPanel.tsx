import { localize, t, categoryLabel } from "../i18n";
import type { CategoryKey, Language, Task } from "../types";

type TaskLibraryPanelProps = {
  activeCategory: CategoryKey;
  language: Language;
  subtitle: string;
  tasks: Task[];
  title: string;
  onCategoryChange: (category: CategoryKey) => void;
};

const categories: CategoryKey[] = ["all", "study", "work", "life", "fitness"];

export function TaskLibraryPanel({
  activeCategory,
  language,
  subtitle,
  tasks,
  title,
  onCategoryChange
}: TaskLibraryPanelProps) {
  return (
    <section className="task-panel">
      <div className="panel-heading">
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <button className="primary-button ghost">+ {t(language, "newTask")}</button>
      </div>

      <div className="filter-row">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-pill ${activeCategory === category ? "active" : ""}`}
            onClick={() => onCategoryChange(category)}
          >
            {categoryLabel(language, category)}
          </button>
        ))}
        <button className="icon-button small-button">…</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <button key={task.id} className="task-card">
            <span className="task-icon" style={{ background: `${task.color}20`, color: task.color }}>
              {task.icon}
            </span>
            <span className="task-copy">
              <strong>{localize(language, task.title)}</strong>
              <span>
                {task.duration} {t(language, "minutes")}
              </span>
            </span>
            <span className="drag-handle">⋮⋮</span>
          </button>
        ))}
      </div>

      <button className="dropzone-card">
        <strong>{t(language, "taskDropTitle")}</strong>
        <span>{t(language, "taskDropHint")}</span>
      </button>
    </section>
  );
}
