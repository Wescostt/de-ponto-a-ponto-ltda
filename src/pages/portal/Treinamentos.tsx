// ─────────────────────────────────────────────────────────────────────────────
// Treinamentos.tsx — Página principal da central de treinamentos
// De Ponto a Ponto — Portal Admin
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Plus, Search, Filter,
  BookMarked, Users, Wrench, GraduationCap, BarChart3,
} from "lucide-react";
import {
  MOCK_TRAININGS,
  Training,
  TrainingStatus,
  TrainingLevel,
  TrainingAudience,
  TrainingCategory,
  CATEGORY_LABELS,
  AUDIENCE_LABELS,
  STATUS_LABELS,
  LEVEL_LABELS,
  getTrainingStats,
} from "../../components/treinamentos/trainingsData";
import { TrainingCard } from "../../components/treinamentos/TrainingCard";
import { TrainingDetail } from "../../components/treinamentos/TrainingDetail";

// ── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({
  icon, label, value, color,
}: {
  icon: React.ReactNode; label: string; value: number | string; color: string;
}) => (
  <div style={{
    background: "linear-gradient(145deg, rgba(11,16,32,0.95), rgba(6,13,31,0.98))",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px", padding: "20px 22px",
    display: "flex", alignItems: "center", gap: "14px",
  }}>
    <div style={{
      width: "42px", height: "42px", borderRadius: "11px", flexShrink: 0,
      background: `${color}18`, border: `1px solid ${color}30`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {icon}
    </div>
    <div>
      <p style={{ color: "#f8fafc", fontSize: "22px", fontWeight: 700, margin: "0 0 2px", lineHeight: 1 }}>
        {value}
      </p>
      <p style={{ color: "#64748b", fontSize: "12px", margin: 0 }}>{label}</p>
    </div>
  </div>
);

// ── Filter Select ────────────────────────────────────────────────────────────
const FilterSelect = ({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      background: "rgba(11,16,32,0.9)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "9px", padding: "9px 14px",
      color: value ? "#e2e8f0" : "#64748b", fontSize: "13px",
      cursor: "pointer", outline: "none", appearance: "none",
      paddingRight: "32px",
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
      minWidth: "160px",
    }}
  >
    <option value="">{label}</option>
    {options.map((o) => (
      <option key={o.value} value={o.value}>{o.label}</option>
    ))}
  </select>
);

// ── Main Page ────────────────────────────────────────────────────────────────
const Treinamentos = () => {
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<TrainingCategory | "">("");
  const [filterStatus, setFilterStatus] = useState<TrainingStatus | "">("");
  const [filterLevel, setFilterLevel] = useState<TrainingLevel | "">("");
  const [filterAudience, setFilterAudience] = useState<TrainingAudience | "">("");

  const stats = getTrainingStats(MOCK_TRAININGS);

  const filtered = useMemo(() => {
    return MOCK_TRAININGS.filter((t) => {
      const matchSearch =
        !search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = !filterCategory || t.category === filterCategory;
      const matchStatus = !filterStatus || t.status === filterStatus;
      const matchLevel = !filterLevel || t.level === filterLevel;
      const matchAud = !filterAudience || t.audience.includes(filterAudience as TrainingAudience);
      return matchSearch && matchCat && matchStatus && matchLevel && matchAud;
    });
  }, [search, filterCategory, filterStatus, filterLevel, filterAudience]);

  const hasFilters = search || filterCategory || filterStatus || filterLevel || filterAudience;

  // ── Detail View ────────────────────────────────────────────────────────────
  if (selectedTraining) {
    return (
      <div style={{ padding: "32px", maxWidth: "1200px" }}>
        <AnimatePresence mode="wait">
          <TrainingDetail
            key={selectedTraining.id}
            training={selectedTraining}
            onBack={() => setSelectedTraining(null)}
          />
        </AnimatePresence>
      </div>
    );
  }

  // ── List View ──────────────────────────────────────────────────────────────
  return (
    <div style={{ padding: "32px", maxWidth: "1400px" }}>

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: "flex", alignItems: "flex-start",
          justifyContent: "space-between", flexWrap: "wrap",
          gap: "16px", marginBottom: "32px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "10px",
              background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <GraduationCap size={20} color="#60a5fa" />
            </div>
            <h1 style={{ color: "#f8fafc", fontSize: "24px", fontWeight: 700, margin: 0 }}>
              Treinamentos
            </h1>
          </div>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0, maxWidth: "560px", lineHeight: 1.6 }}>
            Central de treinamentos, manuais e procedimentos da De Ponto a Ponto.
            Organize módulos, guias e materiais para clientes, equipe interna e suporte técnico.
          </p>
        </div>

        <button
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "12px 20px", borderRadius: "11px", cursor: "pointer",
            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff", fontSize: "14px", fontWeight: 600,
            boxShadow: "0 0 20px rgba(59,130,246,0.25)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(59,130,246,0.4)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(59,130,246,0.25)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
          onClick={() => alert("Funcionalidade de criação será implementada na próxima versão.")}
        >
          <Plus size={16} />
          Novo Treinamento
        </button>
      </motion.div>

      {/* ── Stats Cards ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px", marginBottom: "28px",
        }}
      >
        <StatCard icon={<BookOpen size={20} color="#60a5fa" />} label="Total de treinamentos" value={stats.total} color="#3b82f6" />
        <StatCard icon={<BarChart3 size={20} color="#4ade80" />} label="Publicados" value={stats.published} color="#22c55e" />
        <StatCard icon={<BookMarked size={20} color="#a78bfa" />} label="Total de módulos" value={stats.totalModules} color="#8b5cf6" />
        <StatCard icon={<Users size={20} color="#fb923c" />} label="Onboarding" value={stats.onboarding} color="#f97316" />
        <StatCard icon={<Wrench size={20} color="#38bdf8" />} label="Técnicos" value={stats.technical} color="#0ea5e9" />
      </motion.div>

      {/* ── Search & Filters ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        style={{
          background: "linear-gradient(145deg, rgba(11,16,32,0.95), rgba(6,13,31,0.98))",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "14px", padding: "18px 20px",
          marginBottom: "24px",
          display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flex: "1 1 220px" }}>
          <Search size={15} color="#64748b" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          <input
            type="text" placeholder="Buscar treinamento..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "9px 14px 9px 36px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "9px", color: "#e2e8f0", fontSize: "13px",
              outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b" }}>
          <Filter size={14} />
        </div>

        <FilterSelect
          label="Categoria"
          value={filterCategory}
          onChange={(v) => setFilterCategory(v as TrainingCategory | "")}
          options={Object.entries(CATEGORY_LABELS).map(([k, v]) => ({ value: k, label: v }))}
        />
        <FilterSelect
          label="Status"
          value={filterStatus}
          onChange={(v) => setFilterStatus(v as TrainingStatus | "")}
          options={Object.entries(STATUS_LABELS).map(([k, v]) => ({ value: k, label: v }))}
        />
        <FilterSelect
          label="Nível"
          value={filterLevel}
          onChange={(v) => setFilterLevel(v as TrainingLevel | "")}
          options={Object.entries(LEVEL_LABELS).map(([k, v]) => ({ value: k, label: v }))}
        />
        <FilterSelect
          label="Público"
          value={filterAudience}
          onChange={(v) => setFilterAudience(v as TrainingAudience | "")}
          options={Object.entries(AUDIENCE_LABELS).map(([k, v]) => ({ value: k, label: v }))}
        />

        {hasFilters && (
          <button
            onClick={() => { setSearch(""); setFilterCategory(""); setFilterStatus(""); setFilterLevel(""); setFilterAudience(""); }}
            style={{
              padding: "8px 14px", borderRadius: "8px", cursor: "pointer",
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
              color: "#fca5a5", fontSize: "12px", fontWeight: 500,
            }}
          >
            Limpar filtros
          </button>
        )}
      </motion.div>

      {/* ── Results count ────────────────────────────────────────────────── */}
      <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: "#64748b", fontSize: "13px" }}>
          {filtered.length} treinamento{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </span>
        {hasFilters && (
          <span style={{ color: "#475569", fontSize: "12px" }}>
            (de {MOCK_TRAININGS.length} no total)
          </span>
        )}
      </div>

      {/* ── Training Grid ─────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              background: "rgba(11,16,32,0.6)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px", padding: "60px 32px", textAlign: "center",
            }}
          >
            <BookOpen size={40} color="#334155" style={{ margin: "0 auto 16px" }} />
            <p style={{ color: "#64748b", fontSize: "15px", fontWeight: 500, margin: "0 0 6px" }}>
              Nenhum treinamento encontrado
            </p>
            <p style={{ color: "#475569", fontSize: "13px", margin: 0 }}>
              Tente ajustar os filtros ou o termo de busca.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "16px",
            }}
          >
            {filtered.map((training, i) => (
              <TrainingCard
                key={training.id}
                training={training}
                index={i}
                onView={setSelectedTraining}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Treinamentos;