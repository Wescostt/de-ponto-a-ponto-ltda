// ─────────────────────────────────────────────────────────────────────────────
// TrainingDetail.tsx — Visualização detalhada de um treinamento
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import {
  ArrowLeft, Clock, Target, BookOpen, CheckSquare,
  AlertTriangle, Link as LinkIcon, Layers, ChevronDown, ChevronUp
} from "lucide-react";
import { useState } from "react";
import { Training, TrainingModule } from "./trainingsData";
import {
  TrainingStatusBadge,
  TrainingLevelBadge,
  TrainingCategoryBadge,
  TrainingAudienceBadge,
} from "./TrainingBadges";

// ── Module Accordion ─────────────────────────────────────────────────────────
const ModuleAccordion = ({ module, index }: { module: TrainingModule; index: number }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "14px", overflow: "hidden",
    }}>
      {/* Module Header */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "18px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "none", border: "none", cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
            background: "rgba(59,130,246,0.12)",
            border: "1px solid rgba(59,130,246,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#60a5fa", fontSize: "13px", fontWeight: 700,
          }}>
            {index + 1}
          </div>
          <div>
            <p style={{ color: "#f1f5f9", fontSize: "14px", fontWeight: 600, margin: 0 }}>
              {module.title}
            </p>
            <p style={{ color: "#64748b", fontSize: "12px", margin: "2px 0 0" }}>
              {module.steps.length} etapa{module.steps.length !== 1 ? "s" : ""}
              {module.checklist ? ` · ${module.checklist.length} itens no checklist` : ""}
            </p>
          </div>
        </div>
        <div style={{ color: "#64748b", flexShrink: 0 }}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Module Content */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          style={{ padding: "0 20px 20px" }}
        >
          <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.65, marginBottom: "20px" }}>
            {module.description}
          </p>

          {/* Steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            {module.steps.map((step, si) => (
              <div
                key={step.id}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "10px", padding: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <div style={{
                    width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                    background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#60a5fa", fontSize: "11px", fontWeight: 700, marginTop: "1px",
                  }}>
                    {si + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                      {step.title}
                    </p>
                    <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.65, margin: 0 }}>
                      {step.description}
                    </p>
                    {step.importantNote && (
                      <div style={{
                        marginTop: "10px", padding: "10px 12px",
                        background: "rgba(251,146,60,0.08)",
                        border: "1px solid rgba(251,146,60,0.2)",
                        borderRadius: "8px",
                        display: "flex", alignItems: "flex-start", gap: "8px",
                      }}>
                        <AlertTriangle size={14} color="#fb923c" style={{ flexShrink: 0, marginTop: "1px" }} />
                        <p style={{ color: "#fdba74", fontSize: "12px", lineHeight: 1.55, margin: 0 }}>
                          {step.importantNote}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checklist */}
          {module.checklist && module.checklist.length > 0 && (
            <div style={{
              background: "rgba(34,197,94,0.05)",
              border: "1px solid rgba(34,197,94,0.15)",
              borderRadius: "10px", padding: "16px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <CheckSquare size={15} color="#4ade80" />
                <span style={{ color: "#86efac", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Checklist do Módulo
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {module.checklist.map((item, ci) => (
                  <div key={ci} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <div style={{
                      width: "16px", height: "16px", borderRadius: "4px", flexShrink: 0,
                      border: "1px solid rgba(34,197,94,0.35)",
                      background: "rgba(34,197,94,0.08)",
                      marginTop: "2px",
                    }} />
                    <span style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

// ── Main Detail Component ─────────────────────────────────────────────────────
interface TrainingDetailProps {
  training: Training;
  onBack: () => void;
}

export const TrainingDetail = ({ training, onBack }: TrainingDetailProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          background: "none", border: "none", cursor: "pointer",
          color: "#64748b", fontSize: "13px", fontWeight: 500,
          padding: "0 0 24px",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#60a5fa")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
      >
        <ArrowLeft size={16} />
        Voltar para treinamentos
      </button>

      {/* Header Card */}
      <div style={{
        background: "linear-gradient(145deg, rgba(11,16,32,0.98) 0%, rgba(6,13,31,1) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px", padding: "32px",
        marginBottom: "24px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)",
        }} />
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "200px", height: "200px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
          <TrainingCategoryBadge category={training.category} />
          <TrainingStatusBadge status={training.status} />
          <TrainingLevelBadge level={training.level} />
        </div>

        <h1 style={{
          color: "#f8fafc", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700,
          lineHeight: 1.25, marginBottom: "12px",
        }}>
          {training.title}
        </h1>
        <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.7, marginBottom: "24px", maxWidth: "680px" }}>
          {training.description}
        </p>

        {/* Meta row */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "20px",
          paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "13px" }}>
            <Layers size={15} color="#3b82f6" />
            <span><strong style={{ color: "#94a3b8" }}>{training.modules.length}</strong> módulos</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "13px" }}>
            <Clock size={15} color="#3b82f6" />
            <span>{training.estimatedTime}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "13px" }}>
            <Target size={15} color="#3b82f6" />
            <span>{training.objective.substring(0, 60)}...</span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px", alignItems: "start" }}>

        {/* Modules */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <BookOpen size={16} color="#3b82f6" />
            <h2 style={{ color: "#f1f5f9", fontSize: "16px", fontWeight: 600, margin: 0 }}>
              Módulos do Treinamento
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {training.modules.map((module, i) => (
              <ModuleAccordion key={module.id} module={module} index={i} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Objective */}
          <div style={{
            background: "rgba(11,16,32,0.9)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "14px", padding: "20px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Target size={15} color="#3b82f6" />
              <span style={{ color: "#94a3b8", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Objetivo
              </span>
            </div>
            <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.65, margin: 0 }}>
              {training.objective}
            </p>
          </div>

          {/* Audience */}
          <div style={{
            background: "rgba(11,16,32,0.9)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "14px", padding: "20px",
          }}>
            <span style={{ color: "#94a3b8", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "12px" }}>
              Público-alvo
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {training.audience.map((a) => (
                <TrainingAudienceBadge key={a} audience={a} />
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          {training.prerequisites && training.prerequisites.length > 0 && (
            <div style={{
              background: "rgba(11,16,32,0.9)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "14px", padding: "20px",
            }}>
              <span style={{ color: "#94a3b8", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "12px" }}>
                Pré-requisitos
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {training.prerequisites.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#3b82f6", flexShrink: 0, marginTop: "6px" }} />
                    <span style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.5 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {training.resources && training.resources.length > 0 && (
            <div style={{
              background: "rgba(11,16,32,0.9)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "14px", padding: "20px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <LinkIcon size={14} color="#3b82f6" />
                <span style={{ color: "#94a3b8", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Links Úteis
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {training.resources.map((r, i) => (
                  <a
                    key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "block", padding: "10px 12px",
                      background: "rgba(59,130,246,0.06)",
                      border: "1px solid rgba(59,130,246,0.15)",
                      borderRadius: "8px", textDecoration: "none",
                    }}
                  >
                    <p style={{ color: "#60a5fa", fontSize: "12px", fontWeight: 500, margin: "0 0 2px" }}>{r.title}</p>
                    {r.description && (
                      <p style={{ color: "#475569", fontSize: "11px", margin: 0 }}>{r.description}</p>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Dates */}
          {(training.createdAt || training.updatedAt) && (
            <div style={{
              background: "rgba(11,16,32,0.9)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "14px", padding: "20px",
            }}>
              {training.createdAt && (
                <p style={{ color: "#475569", fontSize: "11px", margin: "0 0 4px" }}>
                  Criado em: <span style={{ color: "#64748b" }}>{training.createdAt}</span>
                </p>
              )}
              {training.updatedAt && (
                <p style={{ color: "#475569", fontSize: "11px", margin: 0 }}>
                  Atualizado em: <span style={{ color: "#64748b" }}>{training.updatedAt}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};