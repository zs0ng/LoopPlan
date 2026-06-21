import { navItems, templates } from "../data";
import { localize, navLabel, t } from "../i18n";
import type { Language, NavKey } from "../types";

type SidebarProps = {
  activeNav: NavKey;
  language: Language;
  sidebarCollapsed: boolean;
  onBrandClick: () => void;
  onNavChange: (key: NavKey) => void;
  onToggleSidebar: () => void;
};

export function Sidebar({
  activeNav,
  language,
  sidebarCollapsed,
  onBrandClick,
  onNavChange,
  onToggleSidebar
}: SidebarProps) {
  return (
    <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        <div className="traffic-lights" aria-hidden="true">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <button
          className="icon-button collapse-button"
          onClick={onToggleSidebar}
          aria-label={sidebarCollapsed ? "expand sidebar" : "collapse sidebar"}
        >
          {sidebarCollapsed ? "»" : "«"}
        </button>
      </div>

      <button className="brand brand-button" onClick={onBrandClick}>
        <div className="brand-mark">✦</div>
        {!sidebarCollapsed && (
          <div>
            <div className="brand-name">{t(language, "appName")}</div>
            <div className="brand-subtitle">{t(language, "brandSubtitle")}</div>
          </div>
        )}
      </button>

      <nav className="nav-list">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`nav-item ${activeNav === item.key ? "active" : ""}`}
            onClick={() => onNavChange(item.key)}
            title={sidebarCollapsed ? navLabel(language, item.key) : undefined}
          >
            <span className="nav-icon">{item.icon}</span>
            {!sidebarCollapsed && <span>{navLabel(language, item.key)}</span>}
          </button>
        ))}
      </nav>

      {!sidebarCollapsed && (
        <>
          <div className="sidebar-section">
            <div className="section-header">
              <span>{t(language, "myTemplates")}</span>
              <button className="icon-button small-button">+</button>
            </div>
            <div className="template-list">
              {templates.map((template) => (
                <button key={template.id} className="template-chip">
                  <span className="template-icon" style={{ color: template.accent }}>
                    {template.icon}
                  </span>
                  <span className="template-name">{localize(language, template.name)}</span>
                  <span className="template-count">{template.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-title">{t(language, "streakDays")}</div>
            <div className="stats-number">{language === "zh" ? "12 天" : "12 days"}</div>
            <div className="stats-row">
              <span>{t(language, "weeklyRate")}</span>
              <strong>82%</strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill" />
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
