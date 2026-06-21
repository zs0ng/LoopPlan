import { t } from "../i18n";
import type { Language } from "../types";

type SettingsPageProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
};

export function SettingsPage({ language, onLanguageChange }: SettingsPageProps) {
  return (
    <>
      <section className="task-panel solo-panel">
        <div className="panel-heading">
          <div>
            <h1>{t(language, "pages").settings.title}</h1>
            <p>{t(language, "pages").settings.subtitle}</p>
          </div>
        </div>
        <div className="settings-stack">
          <div className="page-card">
            <h2>{t(language, "language")}</h2>
            <div className="locale-switch">
              <button
                className={`locale-pill ${language === "zh" ? "active" : ""}`}
                onClick={() => onLanguageChange("zh")}
              >
                {t(language, "chinese")}
              </button>
              <button
                className={`locale-pill ${language === "en" ? "active" : ""}`}
                onClick={() => onLanguageChange("en")}
              >
                {t(language, "english")}
              </button>
            </div>
          </div>
          <div className="page-card">
            <h2>{t(language, "quickSections").preferences}</h2>
            <p>{t(language, "pageCards").settingsOverview}</p>
          </div>
        </div>
      </section>
      <section className="page-panel">
        <div className="page-card">
          <h2>{t(language, "quickLabels").localeReady}</h2>
          <p>{t(language, "quickLabels").openToday}</p>
        </div>
      </section>
      <aside className="detail-panel">
        <div className="detail-header">
          <div>
            <h2>{t(language, "quickSections").preferences}</h2>
            <p>{t(language, "pages").settings.subtitle}</p>
          </div>
        </div>
        <div className="page-card">
          <p>{t(language, "pageCards").settingsOverview}</p>
        </div>
      </aside>
    </>
  );
}
