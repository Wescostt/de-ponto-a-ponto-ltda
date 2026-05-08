// ─────────────────────────────────────────────────────────────────────────────
// TrainingCard.tsx — Card de treinamento na listagem
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import {
  BookOpen, Clock, Users, ChevronRight, Layers
} from "lucide-react";
import { Training } from "./trainingsData";
import {
  TrainingStatusBadge,
  TrainingLevelBadge,
  TrainingCategoryBadge,
  TrainingAudienceBadge,
} from "./TrainingBadges";

interface TrainingCardProps {
  training: Training;
  index: number;
  onView: (training: Training) => void;
}

export const TrainingCard = ({ training, index, onView }: TrainingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      style={{
        background: "linear-gradient(145deg, rgba(11,16,32,0.95) 0%, rgba(6,13,31,0.98) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        padding: "24px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.border = "1px solid rgba(59,130,246,0.25)";
        el.style.boxShadow = "0 0 30px rgba(59,130,246,0.06), 0 8px 32px rgba(0,0,0,0.3)";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.border = "1px solid rgba(255,255,255,0.07)";
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Accent line top */}
      <div style={{
        position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)",
      }} />

      {/* Header */}
      <div style={{ marginBottom: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
          <h3 style={{
            color: "#f1f5f9", fontSize: "15px", fontWeight: 600,
            lineHeight: 1.3, flex: 1, margin: 0,
          }}>
            {training.title}
          </h3>
          <TrainingStatusBadge status={training.status} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
          <TrainingCategoryBadge category={training.category} />
          <TrainingLevelBadge level={training.level} />
        </div>
      </div>

      {/* Description */}
      <p style={{
        color: "#64748b", fontSize: "13px", lineHeight: 1.65,
        marginBottom: "18px",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        {training.description}
      </p>

      {/* Meta */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: "14px",
        marginBottom: "16px",
        paddingTop: "14px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#64748b", fontSize: "12px" }}>
          <Layers size={13} color="#3b82f6" />
          <span>{training.modules.length} módulo{training.modules.length !== 1 ? "s" : ""}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#64748b", fontSize: "12px" }}>
          <Clock size={13} color="#3b82f6" />
          <span>{training.estimatedTime}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#64748b", fontSize: "12px" }}>
          <Users size={13} color="#3b82f6" />
          <span>{training.audience.length} público{training.audience.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* Audience chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "18px" }}>
        {training.audience.map((a) => (
          <TrainingAudienceBadge key={a} audience={a} />
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => onView(training)}
        style={{
          width: "100%", padding: "10px 16px",
          background: "rgba(59,130,246,0.08)",
          border: "1px solid rgba(59,130,246,0.18)",
          borderRadius: "10px", cursor: "pointer",
          color: "#60a5fa", fontSize: "13px", fontWeight: 500,
          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(59,130,246,0.15)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(59,130,246,0.3)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(59,130,246,0.08)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(59,130,246,0.18)";
        }}
      >
        <BookOpen size={14} />
        Ver treinamento
        <ChevronRight size={14} />
      </button>
    </motion.div>
  );
};