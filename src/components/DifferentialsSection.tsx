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
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#020817]"
    >
      {/* ── z-0: subtle grid texture ────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── z-1: BACKGROUND IMAGE — fills entire section ───────────────────── */}
      {/*
        Pure CSS approach: absolute inset-0, width/height 100%, object-cover.
        object-position keeps the tablet centred-left so it stays visible
        while the right edge fades behind the card.
      */}
      <img
        src="/tab3-deponto.png"
        alt="Secullum Ponto Virtual"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "30% center",
          zIndex: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* ── z-2: integration overlays — light, image stays strong ───────────── */}
      {/* Right-side gradient: creates reading legibility behind the card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(to right, rgba(2,8,23,0.0) 0%, rgba(2,8,23,0.05) 38%, rgba(2,8,23,0.48) 66%, rgba(2,8,23,0.82) 82%, #020817 97%)",
        }}
      />
      {/* Top + bottom edge fades */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(to bottom, rgba(2,8,23,0.38) 0%, transparent 10%, transparent 88%, rgba(2,8,23,0.55) 100%)",
        }}
      />

      {/* ── z-2: subtle right corner glow ───────────────────────────────────── */}
      <div
        className="absolute bottom-0 right-0 w-[45%] h-[55%] pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "radial-gradient(ellipse 65% 65% at 100% 100%, rgba(37,99,235,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── z-3: FLOATING CARD — right side ─────────────────────────────────── */}
      <div
        className="relative min-h-screen flex items-center justify-end px-4 sm:px-8 lg:px-14 xl:px-20 py-20"
        style={{ zIndex: 3 }}
      >
        <div
          className={`
            w-full max-w-[480px] xl:max-w-[520px]
            p-7 sm:p-9
            transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
          style={{
            background: "rgba(10, 14, 26, 0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.10)",
            borderRadius: "24px",
            boxShadow:
              "0 32px 80px rgba(0, 0, 0, 0.6), " +
              "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Label */}
          <div className="flex items-center gap-2 mb-5">
            <span className="block w-6 h-[2px] bg-blue-500 rounded-full" />
            <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-blue-400">
              Diferenciais
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-[1.8rem] sm:text-[2rem] font-extrabold leading-[1.15] text-white mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Tecnologia que aproxima sua empresa da{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#93c5fd,#3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              gestão real.
            </span>
          </h2>

          {/* Supporting text */}
          <p className="text-sm leading-relaxed text-white/50 mb-7">
            Com o Ponto Virtual, sua empresa acompanha registros, presença e
            operações de forma prática, moderna e segura — com suporte próximo,
            implantação orientada e acompanhamento feito por quem entende do
            dia a dia do RH.
          </p>

          {/* Divider */}
          <div className="h-px w-full bg-white/[0.07] mb-5" />

          {/* Mini-cards */}
          <div className="flex flex-col gap-2.5">
            {diferenciais.map((item, i) => (
              <div
                key={i}
                className={`
                  flex items-start gap-4 p-3.5
                  transition-all duration-500 ease-out
                  hover:bg-white/[0.04]
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  transitionDelay: `${200 + i * 80}ms`,
                }}
              >
                {/* Icon circle */}
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(59,130,246,0.09)",
                    border: "1px solid rgba(59,130,246,0.16)",
                  }}
                >
                  {item.icon}
                </div>

                {/* Text */}
                <div>
                  <p className="text-[0.8rem] font-semibold text-white/90 leading-snug mb-0.5">
                    {item.title}
                  </p>
                  <p className="text-[0.73rem] text-white/40 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom accent bar */}
          <div className="mt-6">
            <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-blue-600/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}