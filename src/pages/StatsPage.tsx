import { t } from "../i18n";
import type { Language } from "../types";

type StatsPageProps = {
  language: Language;
};

export function StatsPage({ language }: StatsPageProps) {
  return (
    <>
      <section className="task-panel solo-panel">
        <div className="panel-heading">
          <div>
            <h1>{t(language, "pages").stats.title}</h1>
            <p>{t(language, "pages").stats.subtitle}</p>
          </div>
        </div>
        <div className="stats-grid">
          <div className="page-card metric-card">
            <span>{t(language, "streakDays")}</span>
            <strong>12</strong>
          </div>
          <div className="page-card metric-card">
            <span>{t(language, "weeklyRate")}</span>
            <strong>82%</strong>
          </div>
          <div className="page-card metric-card">
            <span>Focus Blocks</span>
            <strong>28</strong>
          </div>
        </div>
      </section>
      <section className="page-panel">
        <div className="page-card">
          <h2>{t(language, "quickSections").metrics}</h2>
          <p>{t(language, "pageCards").statsOverview}</p>
        </div>
        <div className="page-card">
          <h2>{t(language, "quickSections").guide}</h2>
          <ul className="info-list">
            <li>{t(language, "quickLabels").localeReady}</li>
            <li>{t(language, "quickLabels").storageReady}</li>
          </ul>
        </div>
      </section>
      <aside className="detail-panel">
        <div className="detail-header">
          <div>
            <h2>{t(language, "quickSections").metrics}</h2>
            <p>{t(language, "pages").stats.subtitle}</p>
          </div>
        </div>
        <div className="page-card">
          <p>{t(language, "pageCards").statsOverview}</p>
        </div>
      </aside>
    </>
  );
}
