import { categoryLabel, localize, t } from "../i18n";
import type { Language, TimeBlock } from "../types";
import { formatDisplayDate } from "../utils";

type DetailPanelProps = {
  block: TimeBlock | null;
  language: Language;
};

export function DetailPanel({ block, language }: DetailPanelProps) {
  return (
    <aside className="detail-panel">
      <div className="detail-header">
        <div>
          <h2>{t(language, "detailTitle")}</h2>
          <p>{block ? t(language, "detailHint") : t(language, "detailEmptyHint")}</p>
        </div>
        <button className="icon-button">×</button>
      </div>

      {block ? (
        <>
          <div className="detail-card focus-card">
            <div className="detail-task">
              <span className="task-icon large" style={{ background: `${block.color}20`, color: block.color }}>
                {block.icon}
              </span>
              <div>
                <strong>{localize(language, block.title)}</strong>
                <p>
                  {block.start} - {block.end} ({block.duration} {t(language, "minutes")})
                </p>
                <span className={`status-badge ${block.status}`}>
                  {block.status === "completed" ? t(language, "statusCompleted") : t(language, "statusPlanned")}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-card">
            <DetailRow label={t(language, "detailDate")} value={formatDisplayDate(language, block.date)} />
            <DetailRow label={t(language, "detailTime")} value={`${block.start} - ${block.end}`} />
            <DetailRow label={t(language, "detailDuration")} value={`${block.duration} ${t(language, "minutes")}`} />
            <DetailRow
              label={t(language, "detailCategory")}
              value={categoryLabel(language, block.category)}
              withDot
              color={block.color}
            />
            <DetailRow label={t(language, "detailNote")} value={localize(language, block.note)} />
            <DetailRow label={t(language, "detailCompletion")} value={block.completedAt ?? t(language, "notDone")} />
          </div>

          <div className="completion-card">
            <div className="completion-ring">✓</div>
            <div>
              <strong>
                {block.status === "completed"
                  ? `${t(language, "doneAt")} ${block.completedAt ?? "--"}`
                  : t(language, "notDone")}
              </strong>
              <p>{t(language, "workInProgress")}</p>
            </div>
          </div>

          <div className="detail-actions">
            <button className="secondary-button">{t(language, "edit")}</button>
            <button className="secondary-button danger">{t(language, "delete")}</button>
          </div>

          <button className="primary-button full-width">{t(language, "copyToDate")}</button>
        </>
      ) : (
        <div className="empty-state">{t(language, "emptyDay")}</div>
      )}
    </aside>
  );
}

function DetailRow({
  label,
  value,
  withDot = false,
  color
}: {
  label: string;
  value: string;
  withDot?: boolean;
  color?: string;
}) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <div className="detail-value">
        {withDot && color ? <span className="detail-dot" style={{ background: color }} /> : null}
        <strong>{value}</strong>
      </div>
    </div>
  );
}
