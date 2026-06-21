import { TaskLibraryPanel } from "../components/TaskLibraryPanel";
import { localize, t } from "../i18n";
import type { CategoryKey, Language, Task, Template } from "../types";

type TaskLibraryPageProps = {
  activeCategory: CategoryKey;
  language: Language;
  tasks: Task[];
  templates: Template[];
  onCategoryChange: (category: CategoryKey) => void;
};

export function TaskLibraryPage({ activeCategory, language, tasks, templates, onCategoryChange }: TaskLibraryPageProps) {
  return (
    <>
      <TaskLibraryPanel
        activeCategory={activeCategory}
        language={language}
        subtitle={t(language, "pages").library.subtitle}
        tasks={tasks}
        title={t(language, "pages").library.title}
        onCategoryChange={onCategoryChange}
      />
      <section className="page-panel">
        <div className="page-card">
          <h2>{t(language, "quickSections").queue}</h2>
          <p>{t(language, "pageCards").libraryOverview}</p>
        </div>
        <div className="page-card">
          <h2>{t(language, "quickSections").guide}</h2>
          <ul className="info-list">
            <li>{t(language, "quickLabels").splitPages}</li>
            <li>{t(language, "quickLabels").localeReady}</li>
            <li>{t(language, "quickLabels").storageReady}</li>
          </ul>
        </div>
      </section>
      <aside className="detail-panel">
        <div className="detail-header">
          <div>
            <h2>{t(language, "quickSections").presets}</h2>
            <p>{t(language, "myTemplates")}</p>
          </div>
        </div>
        <div className="template-board">
          {templates.map((template) => (
            <div key={template.id} className="page-card compact">
              <div className="template-board-title">
                <span style={{ color: template.accent }}>{template.icon}</span>
                <strong>{localize(language, template.name)}</strong>
              </div>
              <p>{localize(language, template.description)}</p>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
