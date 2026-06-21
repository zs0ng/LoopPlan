import { localize, t } from "../i18n";
import type { Language, Template } from "../types";

type TemplatesPageProps = {
  language: Language;
  templates: Template[];
};

export function TemplatesPage({ language, templates }: TemplatesPageProps) {
  return (
    <>
      <section className="task-panel solo-panel">
        <div className="panel-heading">
          <div>
            <h1>{t(language, "pages").templates.title}</h1>
            <p>{t(language, "pages").templates.subtitle}</p>
          </div>
          <button className="primary-button ghost">+ {t(language, "myTemplates")}</button>
        </div>
        <div className="template-board large">
          {templates.map((template) => (
            <div key={template.id} className="page-card">
              <div className="template-board-title">
                <span style={{ color: template.accent }}>{template.icon}</span>
                <strong>{localize(language, template.name)}</strong>
              </div>
              <p>{localize(language, template.description)}</p>
              <span className="template-meta">{template.count} blocks</span>
            </div>
          ))}
        </div>
      </section>
      <section className="page-panel">
        <div className="page-card">
          <h2>{t(language, "quickSections").guide}</h2>
          <p>{t(language, "pageCards").templatesOverview}</p>
        </div>
        <div className="page-card">
          <h2>{t(language, "quickLabels").openToday}</h2>
          <p>{t(language, "quickLabels").splitPages}</p>
        </div>
      </section>
      <aside className="detail-panel">
        <div className="detail-header">
          <div>
            <h2>{t(language, "detailTitle")}</h2>
            <p>{t(language, "pages").templates.subtitle}</p>
          </div>
        </div>
        <div className="page-card">
          <p>{t(language, "pageCards").templatesOverview}</p>
        </div>
      </aside>
    </>
  );
}
