// ─────────────────────────────────────────────────────────────────────────────
// TrainingBadges.tsx — Badges de status, nível, categoria e público
// ─────────────────────────────────────────────────────────────────────────────

import {
  TrainingStatus,
  TrainingLevel,
  TrainingCategory,
  TrainingAudience,
  STATUS_LABELS,
  LEVEL_LABELS,
  CATEGORY_LABELS,
  AUDIENCE_LABELS,
} from "./trainingsData";

// ── Status Badge ─────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<TrainingStatus, { bg: string; text: string; dot: string }> = {
  published:   { bg: "rgba(34,197,94,0.12)",  text: "#4ade80", dot: "#22c55e" },
  in_progress: { bg: "rgba(59,130,246,0.12)", text: "#60a5fa", dot: "#3b82f6" },
  draft:       { bg: "rgba(100,116,139,0.15)",text: "#94a3b8", dot: "#64748b" },
  review:      { bg: "rgba(251,146,60,0.12)", text: "#fb923c", dot: "#f97316" },
  archived:    { bg: "rgba(100,116,139,0.10)",text: "#64748b", dot: "#475569" },
};

export const TrainingStatusBadge = ({ status }: { status: TrainingStatus }) => {
  const s = STATUS_STYLES[status];
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: "5px",
        padding: "3px 10px", borderRadius: "999px",
        background: s.bg, color: s.text,
        fontSize: "11px", fontWeight: 500,
        border: `1px solid ${s.dot}30`,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
      {STATUS_LABELS[status]}
    </span>
  );
};

// ── Level Badge ──────────────────────────────────────────────────────────────
const LEVEL_STYLES: Record<TrainingLevel, { bg: string; text: string }> = {
  basic:        { bg: "rgba(34,197,94,0.10)",  text: "#86efac" },
  intermediate: { bg: "rgba(251,146,60,0.10)", text: "#fdba74" },
  advanced:     { bg: "rgba(239,68,68,0.10)",  text: "#fca5a5" },
};

export const TrainingLevelBadge = ({ level }: { level: TrainingLevel }) => {
  const s = LEVEL_STYLES[level];
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center",
        padding: "3px 10px", borderRadius: "999px",
        background: s.bg, color: s.text,
        fontSize: "11px", fontWeight: 500,
      }}
    >
      {LEVEL_LABELS[level]}
    </span>
  );
};

// ── Category Badge ───────────────────────────────────────────────────────────
export const TrainingCategoryBadge = ({ category }: { category: TrainingCategory }) => (
  <span
    style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 10px", borderRadius: "999px",
      background: "rgba(59,130,246,0.10)",
      color: "#93c5fd",
      fontSize: "11px", fontWeight: 500,
      border: "1px solid rgba(59,130,246,0.18)",
    }}
  >
    {CATEGORY_LABELS[category]}
  </span>
);

// ── Audience Badge ───────────────────────────────────────────────────────────
export const TrainingAudienceBadge = ({ audience }: { audience: TrainingAudience }) => (
  <span
    style={{
      display: "inline-flex", alignItems: "center",
      padding: "2px 8px", borderRadius: "999px",
      background: "rgba(255,255,255,0.05)",
      color: "#94a3b8",
      fontSize: "10px", fontWeight: 500,
      border: "1px solid rgba(255,255,255,0.08)",
    }}
  >
    {AUDIENCE_LABELS[audience]}
  </span>
);