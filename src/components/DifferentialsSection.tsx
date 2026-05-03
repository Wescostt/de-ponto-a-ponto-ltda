"use client";

import { useEffect, useRef, useState } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconFace = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 9.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm6 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z" fill="currentColor" strokeWidth={0} />
    <path d="M9 15s1 1.5 3 1.5 3-1.5 3-1.5" strokeLinecap="round" />
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconHeadset = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
    <path d="M3 11V12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5a9 9 0 0 1 18 0h-1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-blue-400" stroke="currentColor" strokeWidth={1.5}>
    <path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11 4.5-.85 8-5.75 8-11V7l-8-4z" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const diferenciais = [
  {
    icon: <IconFace />,
    title: "Registro moderno e acessível",
    desc: "Sistema com reconhecimento facial, teclado e recursos digitais para facilitar o registro de ponto com praticidade e segurança.",
  },
  {
    icon: <IconEye />,
    title: "Presença com mais controle",
    desc: "Visualização clara da operação, com informações úteis para acompanhar equipes, horários e ocorrências em tempo real.",
  },
  {
    icon: <IconHeadset />,
    title: "Tecnologia com suporte humano",
    desc: "A De Ponto a Ponto combina solução moderna com atendimento próximo, implantação orientada e acompanhamento consultivo.",
  },
  {
    icon: <IconShield />,
    title: "Mais confiança para o RH",
    desc: "Uma estrutura visual e operacional pensada para reduzir dúvidas, organizar processos e dar mais segurança à gestão de ponto.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function DiferenciaisSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#03060f]"
    >
      {/* ── Background subtle grid ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Deep radial glow behind image ──────────────────────────────────── */}

      {/* ── PRODUCT IMAGE — dominant, left/center ──────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-start pointer-events-none">
        {/* Image container: takes ~65% width, full height */}
        <div className="relative w-[65%] h-full flex items-center justify-center">
          {/* Soft right-edge fade so image blends into card */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, transparent 40%, rgba(3,6,15,0.55) 70%, rgba(3,6,15,0.92) 90%, #03060f 100%)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(3,6,15,0.7) 0%, transparent 30%)",
            }}
          />
          {/* Top fade */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(3,6,15,0.4) 0%, transparent 20%)",
            }}
          />

          {/*
            IMPORTANT: Replace the src below with your actual product image path.
            e.g. src="/images/secullum-ponto-virtual.png"
            The image renders at natural size, object-contain keeps it undistorted.
          */}
          <img
            src="/tab3-deponto.png"
            alt="Secullum Ponto Virtual"
            className="relative z-0 w-full h-full object-contain object-center"
            style={{
              maxHeight: "92vh",
              filter: "drop-shadow(0 0 60px rgba(37,99,235,0.18))",
            }}
            // Fallback placeholder colour while image loads
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "0.15";
            }}
          />
        </div>
      </div>

      {/* ── FLOATING CARD — right side ─────────────────────────────────────── */}
      <div className="relative z-20 min-h-screen flex items-center justify-end px-4 sm:px-8 lg:px-16 py-20">
        <div
          className={`
            w-full max-w-[520px] xl:max-w-[560px]
            rounded-2xl border border-white/[0.08]
            p-7 sm:p-9
            transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
          style={{
            background: "rgba(8, 10, 16, 0.62)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.07), 0 24px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Label */}
          <div className="flex items-center gap-2 mb-5">
            <span className="block w-6 h-[2px] bg-blue-500 rounded-full" />
            <span
              className="text-[10px] font-semibold tracking-[0.22em] uppercase"
              style={{ color: "#3b82f6" }}
            >
              Diferenciais
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-[1.85rem] sm:text-[2.1rem] font-extrabold leading-[1.15] text-white mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Tecnologia que aproxima sua empresa da{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#60a5fa,#3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              gestão real.
            </span>
          </h2>

          {/* Supporting text */}
          <p className="text-sm leading-relaxed text-white/55 mb-7">
            Com o Ponto Virtual, sua empresa acompanha registros, presença e
            operações de forma prática, moderna e segura — com suporte próximo,
            implantação orientada e acompanhamento feito por quem entende do
            dia a dia do RH.
          </p>

          {/* Divider */}
          <div className="h-px w-full bg-white/[0.06] mb-6" />

          {/* Mini-cards grid */}
          <div className="flex flex-col gap-3">
            {diferenciais.map((item, i) => (
              <div
                key={i}
                className={`
                  flex items-start gap-4 rounded-xl p-4
                  border border-white/[0.06]
                  transition-all duration-500 ease-out
                  hover:border-blue-500/20 hover:bg-blue-950/20
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  transitionDelay: `${200 + i * 80}ms`,
                }}
              >
                {/* Icon circle */}
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(59,130,246,0.1)",
                    border: "1px solid rgba(59,130,246,0.18)",
                  }}
                >
                  {item.icon}
                </div>

                {/* Text */}
                <div>
                  <p className="text-[0.82rem] font-semibold text-white/90 leading-snug mb-0.5">
                    {item.title}
                  </p>
                  <p className="text-[0.75rem] text-white/42 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom accent bar */}
          <div className="mt-6 flex gap-2">
            <div className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-blue-600/60 to-transparent" />
          </div>
        </div>
      </div>

      {/* ── Corner glow on card side ───────────────────────────────────────── */}
      <div
        className="absolute bottom-0 right-0 w-[40%] h-[40%] pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 100% 100%, rgba(37,99,235,0.07) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}