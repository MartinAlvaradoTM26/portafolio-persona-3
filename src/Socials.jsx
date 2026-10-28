import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/videofondo.mp4";
import newsign from "./assets/newsign.png";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";
import portadaTadc from "./assets/digital/portada tadc - copia.jpg";
import expansionDominio from "./assets/digital/Expansion de dominio.png";
import trompadazMortalDays from "./assets/digital/trompadaz MORTAL DAYS.png";
import logoCanal from "./assets/digital/logo canal.png";
import cassandraCain from "./assets/traditional/Cassandra Cain.jpeg";
import vDmc from "./assets/traditional/V Devil May Cry 5.jpeg";
import heatherMason from "./assets/traditional/Heather mason silent hill 3.jpeg";
import spiderMan from "./assets/traditional/Spiderman.jpeg";
import linkMinishCap from "./assets/traditional/Link.jpeg";
import cloverUndertaleYellow from "./assets/traditional/clover undertale yellow .jpeg";
import quirrelHollowKnight from "./assets/traditional/quirrel hollow knight .jpeg";
import eyelessJack from "./assets/traditional/Eyeless Jack.jpeg";
import youngNeil from "./assets/traditional/Young neil Scott pilgrim.jpeg";
import lapisLazuli from "./assets/traditional/Lapis lazuli steven universe.jpeg";
import roaringKnight from "./assets/traditional/Roaring knight deltarune .jpeg";

const ROLES = [
  { text: "DIGITAL", color: "#00dff7", bg: "rgba(0,223,247,0.12)", border: "rgba(0,223,247,0.5)" },
  { text: "TRADICIONAL", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "FOTOS", color: "#ff0050", bg: "rgba(255,0,80,0.12)", border: "rgba(255,0,80,0.5)" }
];

const ITEMS = [
  {
    id: "digital", label: "DIBUJOS DIGITALES", icon: "✦", barIcon: icon1,
    artworks: [
      {
        id: "portada-tadc", title: "PORTADA TADC", image: portadaTadc,
        description: "Diseño de portada inspirado en The Amazing Digital Circus, pensado para funcionar como una pieza visual llamativa para contenido audiovisual."
      },
      {
        id: "expansion-dominio", title: "EXPANSIÓN DE DOMINIO", image: expansionDominio,
        description: "Ilustración digital inspirada en la idea de una expansión de dominio, con una composición basada en la estética del anime y los efectos visuales."
      },
      {
        id: "trompadaz-mortal-days", title: "TROMPADAZ MORTAL DAYS", image: trompadazMortalDays,
        description: "Pieza digital creada para un concepto titulado Mortal Days, con un enfoque gráfico y una presentación de estilo propio."
      },
      {
        id: "logo-canal", title: "LOGO DEL CANAL", image: logoCanal,
        description: "Diseño de identidad visual para mi canal, creado para representar el contenido y darle una imagen reconocible."
      }
    ],
    stats: [
      { tag: "ART", value: "004", color: "#00dff7" },
      { tag: "TIPO", value: "DIG", color: "#bf94ff" }
    ]
  },
  {
    id: "traditional", label: "DIBUJOS TRADICIONALES", icon: "✎", barIcon: icon2,
    artworks: [
      {
        id: "v-dmc5", title: "V — DEVIL MAY CRY 5", image: vDmc,
        description: "Dibujo tradicional de V, de Devil May Cry 5, explorando la silueta y los detalles característicos del personaje."
      },
      {
        id: "roaring-knight", title: "THE ROARING KNIGHT", image: roaringKnight,
        description: "Ilustración tradicional de The Roaring Knight, personaje misterioso del universo de Deltarune."
      },
      {
        id: "young-neil", title: "YOUNG NEIL — SCOTT PILGRIM", image: youngNeil,
        description: "Dibujo de Young Neil, de Scott Pilgrim, con una aproximación al estilo visual de la serie."
      },
      {
        id: "lapis-lazuli", title: "LAPIS LAZULI", image: lapisLazuli,
        description: "Dibujo tradicional de Lapis Lazuli, personaje de Steven Universe, destacando su apariencia y rasgos distintivos."
      },
      {
        id: "cassandra-cain", title: "CASSANDRA CAIN", image: cassandraCain,
        description: "Dibujo tradicional de Cassandra Cain, personaje de DC Comics. Una práctica de dibujo centrada en su diseño y expresión."
      },
      {
        id: "heather-mason", title: "HEATHER MASON", image: heatherMason,
        description: "Retrato de Heather Mason, protagonista de Silent Hill 3, con un estilo de dibujo inspirado en el trazo de Bryan Lee O’Malley."
      },
      {
        id: "spider-man", title: "SPIDER-MAN", image: spiderMan,
        description: "Dibujo tradicional de Spider-Man, trabajando la pose y la presencia dinámica del personaje."
      },
      {
        id: "link-minish-cap", title: "LINK — THE MINISH CAP", image: linkMinishCap,
        description: "Ilustración tradicional de Link basada en su apariencia de The Legend of Zelda: The Minish Cap."
      },
      {
        id: "clover-yellow", title: "CLOVER — UNDERTALE YELLOW", image: cloverUndertaleYellow,
        description: "Dibujo de Clover, protagonista de Undertale Yellow, un fangame inspirado en el universo de Undertale."
      },
      {
        id: "eyeless-jack", title: "EYELESS JACK", image: eyelessJack,
        description: "Interpretación dibujada a mano de Eyeless Jack, personaje de las historias de terror de internet."
      },
      {
        id: "quirrel", title: "QUIRREL — HOLLOW KNIGHT", image: quirrelHollowKnight,
        description: "Dibujo tradicional de Quirrel, el viajero que aparece en Hollow Knight, centrado en su diseño sencillo y reconocible."
      }
    ],
    stats: [
      { tag: "ART", value: "011", color: "#e8c100" },
      { tag: "TIPO", value: "TRAD", color: "#e8c100" }
    ]
  },
  {
    id: "photography", label: "FOTOGRAFÍA", icon: "◉", barIcon: icon3,
    artworks: [],
    stats: [
      { tag: "TIPO", value: "FOTO", color: "#ff0050" },
      { tag: "ESTADO", value: "PRONTO", color: "#ff0050" }
    ]
  }
];

export default function Socials() {
  const [active, setActive]               = useState(0);
  const [mounted, setMounted]             = useState(false);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [focus, setFocus]                 = useState("left"); // "left" | "right"
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (selectedArtwork) {
        if (e.key === "Escape" || e.key === "Backspace" || e.key === "ArrowLeft") {
          e.preventDefault();
          setSelectedArtwork(null);
        }
        return;
      }
      const artworkCount = ITEMS[active].artworks.length;
      if (focus === "left") {
        if (e.key === "ArrowUp") setActive(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
        if (e.key === "ArrowRight") { setFocus("right"); setActiveInfoBar(0); }
        if (e.key === "Enter" && artworkCount > 0) setSelectedArtwork(ITEMS[active].artworks[0]);
      } else {
        if (e.key === "ArrowUp") setActiveInfoBar(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActiveInfoBar(i => Math.min(Math.max(artworkCount - 1, 0), i + 1));
        if (e.key === "ArrowLeft") setFocus("left");
        if (e.key === "Enter" && artworkCount > 0 && ITEMS[active].artworks[activeInfoBar]) {
          setSelectedArtwork(ITEMS[active].artworks[activeInfoBar]);
        }
      }
      if ((e.key === "ArrowLeft" && focus === "left") || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, focus, activeInfoBar, selectedArtwork]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&display=swap');

        /* Fondo azul de Persona 3, coherente con el resto del portfolio */
        #menu-screen {
          background: #102b78;
          isolation: isolate;
        }
        #menu-screen video {
          filter: brightness(0.32) saturate(0.9) sepia(0.2) hue-rotate(185deg);
        }
        #menu-screen::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(15, 43, 120, 0.78), rgba(5, 16, 59, 0.86));
        }

        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
          padding-left: 0;
        }

        /* ── Each bar ── */
        .sc-bar {
          position: relative;
          width: 45vw;
          height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 1;
        }

        /* wrapper holds both the red underlay and the bar */
        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer.active .sc-bar     { height: 90px; }
        .sc-bar-outer.active .sc-bar-red { height: 90px; }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }

        /* red underlay — peeks out below the bar when active */
        .sc-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 45vw;
          height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
          pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; }

        /* white fill — skewed parallelogram on the right 25% */
        .sc-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        /* shade on the left edge of the white fill */
        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        /* bottom shadow line under each bar */
        .sc-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }

        /* content layout inside each bar */
        .sc-bar-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 0 20px;
        }

        /* left: role label */
        /* Se oculta el rótulo diagonal grande: se superponía con los títulos
           de las categorías y con las barras vecinas. */
        .sc-role {
          display: none;
        }

        /* Evita que los nombres de las categorías se desborden en pantallas
           más estrechas, conservando la estética original. */
        .sc-main {
          min-width: 0;
          padding: 0 8px;
        }
        .sc-main-top {
          min-width: 0;
          max-width: 100%;
        }
        .sc-label {
          font-size: clamp(18px, 1.45vw, 28px);
          letter-spacing: clamp(1px, 0.2vw, 4px);
          white-space: nowrap;
        }

        /* left: icon + name centered in remaining space */
        .sc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
        }
        .sc-main-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sc-icon {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          width: 32px;
          text-align: center;
          flex-shrink: 0;
          color: rgba(255,255,255,0.15);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-icon { color: rgba(255,255,255,0.25); }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 4px;
          line-height: 1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-label { color: #111111; }

        /* lb/rb nav row */
        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(-5px); opacity: 0.4; }
        }
        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(5px); opacity: 0.4; }
        }
        .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          color: #111;
          border: 1px solid rgba(0,0,0,0.35);
          padding: 1px 7px;
          line-height: 1.5;
          user-select: none;
        }
        .sc-nav-arrow {
          font-size: 12px;
          color: #c4001a;
          display: inline-block;
        }
        .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        /* right: stats group */
        .sc-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-right: 24px;
          flex-shrink: 0;
        }

        .sc-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sc-stat-top {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .sc-stat-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 9px;
          letter-spacing: 1.5px;
          padding: 1px 4px;
          border-width: 1px;
          border-style: solid;
          line-height: 1.4;
          user-select: none;
        }

        .sc-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          font-style: italic;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 1px;
          user-select: none;
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-stat-num { color: #111111; }

        .sc-stat-bars {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin-top: 2px;
        }
        .sc-stat-bar-color {
          height: 3px;
          width: 100%;
        }
        .sc-stat-bar-black {
          height: 2px;
          width: 100%;
          background: #000;
        }

        /* character portrait */
        .sc-char {
          position: absolute;
          top: 0;
          left: 110px;
          height: 100%;
          width: auto;
          max-width: 160px;
          object-fit: cover;
          object-position: top;
          pointer-events: none;
          z-index: 3;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        /* right-side nav bar */
        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: fixed;
          top: 40px;
          right: 40px;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
          z-index: 50;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 100px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #fff;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
          background: none;
          border: none;
          padding: 0 6px;
        }
        .sc-right-nav .sc-nav-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #111;
          padding: 0 8px;
        }
        .sc-right-nav .sc-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #c4001a;
          display: inline-block;
          user-select: none;
        }
        .sc-right-nav .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-right-nav .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        /* info bar under nav */
        @keyframes sc-infobar-in {
          0%   { opacity: 0; transform: translateX(40px); }
          60%  { opacity: 1; transform: translateX(-4px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        /* La lista de obras tiene su propio scroll: no mueve el resto de la página. */
        .sc-art-list {
          position: fixed;
          top: 155px;
          bottom: 76px;
          left: 65%;
          right: 0;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0 0 8px;
          z-index: 50;
          pointer-events: all;
          scrollbar-width: thin;
          scrollbar-color: #c4001a rgba(255,255,255,0.08);
        }
        .sc-art-list::-webkit-scrollbar { width: 8px; }
        .sc-art-list::-webkit-scrollbar-track { background: rgba(255,255,255,0.08); }
        .sc-art-list::-webkit-scrollbar-thumb { background: #c4001a; border-radius: 8px; }
        .sc-info-bar-wrap {
          position: relative;
          width: 100%;
          height: 46px;
          box-sizing: border-box;
          margin-bottom: 12px;
          flex-shrink: 0;
          background: transparent;
          pointer-events: all;
          cursor: pointer;
          padding: 0;
          animation: sc-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-info-bar-wrap.selected {
          background: #111;
          padding: 1.5px;
          border-radius: 8px;
        }
        .sc-info-bar {
          position: relative;
          width: 100%;
          height: 100%;
          background: transparent;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .sc-info-bar-wrap.selected .sc-info-bar {
          background: #fff;
          border-radius: 7px;
        }
        .sc-info-bar-new {
          position: absolute;
          left: -40px;
          bottom: 0;
          height: 65%;
          width: auto;
          pointer-events: none;
          z-index: 3;
        }
        .sc-info-bar-wrap.selected .sc-info-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: #c4001a;
          z-index: 1;
        }
        .sc-info-bar-text {
          flex: 1;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          color: #111;
          padding: 0 14px;
          user-select: none;
        }
        .sc-info-bar-box {
          height: 70%;
          background: #000;
          display: flex;
          align-items: center;
          padding: 0 12px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 1px;
          color: #fff;
          flex-shrink: 0;
          border-radius: 6px;
          margin-right: 4px;
          user-select: none;
        }

        .sc-info-bar-icon {
          height: 55%;
          width: auto;
          flex-shrink: 0;
          margin-left: 14px;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
        }

        .sc-info-bar-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 1px;
          color: #111;
          margin-right: 80px;
          flex-shrink: 0;
          user-select: none;
        }

        .sc-art-thumb {
          width: 52px;
          height: 34px;
          margin-left: 10px;
          object-fit: cover;
          flex-shrink: 0;
          border-left: 3px solid #c4001a;
        }
        .sc-info-bar-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .sc-info-bar-count { margin-right: 18px; }
        .sc-empty-state {
          position: fixed; top: 170px; left: 65%; right: 28px;
          display: flex; flex-direction: column; gap: 10px;
          padding: 22px 26px; border-top: 4px solid #c4001a;
          background: rgba(17,17,17,0.94); color: #fff;
          font-family: 'Bebas Neue', sans-serif; z-index: 50;
          animation: sc-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-empty-kicker { color: #c4001a; letter-spacing: 3px; font-size: 13px; }
        .sc-empty-title { font-size: 28px; letter-spacing: 3px; }
        .sc-empty-copy { color: #aaa; font-family: 'Barlow Condensed', sans-serif; font-size: 17px; }
        .sc-art-detail {
          position: fixed; inset: 0; z-index: 100;
          display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr);
          align-items: stretch; gap: 0; padding: 8vh 7vw;
          background: rgba(0,0,0,0.96); color: #fff;
          font-family: 'Barlow Condensed', sans-serif;
          border-top: 5px solid #c4001a;
          animation: sc-infobar-in 0.28s ease both;
        }
        .sc-art-detail-image-wrap { min-height: 0; display: flex; align-items: center; justify-content: center; padding: 20px; background: #090909; }
        .sc-art-detail-image { max-width: 100%; max-height: 76vh; object-fit: contain; box-shadow: 0 12px 45px rgba(0,0,0,0.65); }
        .sc-art-detail-info { display: flex; flex-direction: column; justify-content: center; padding: 38px; border-left: 1px solid #292929; }
        .sc-art-detail-kicker { color: #c4001a; font-family: 'Bebas Neue', sans-serif; letter-spacing: 3px; font-size: 15px; }
        .sc-art-detail-info h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(32px, 4vw, 58px); line-height: 0.98; margin: 18px 0; letter-spacing: 2px; }
        .sc-art-detail-info p { color: #d0d0d0; font-size: 20px; line-height: 1.45; max-width: 460px; }
        .sc-art-detail-footer { margin-top: 35px; padding-top: 12px; border-top: 2px solid #c4001a; color: #777; font-family: 'Bebas Neue', sans-serif; letter-spacing: 2px; }
        .sc-art-close { position: absolute; top: 22px; right: 28px; border: 1px solid #444; background: #111; color: white; padding: 10px 16px; font-family: 'Bebas Neue', sans-serif; letter-spacing: 2px; cursor: pointer; }
        .sc-art-close:hover { background: #c4001a; border-color: #c4001a; }
        @media (max-width: 760px) {
          .sc-art-list { left: 52%; bottom: 70px; }
          .sc-info-bar-text { font-size: 15px; letter-spacing: 1px; }
          .sc-art-detail { grid-template-columns: 1fr; grid-template-rows: minmax(0, 1fr) auto; padding: 65px 18px 20px; overflow-y: auto; }
          .sc-art-detail-image-wrap { min-height: 38vh; padding: 10px; }
          .sc-art-detail-image { max-height: 42vh; }
          .sc-art-detail-info { padding: 20px 8px; border-left: 0; }
          .sc-art-detail-info p { font-size: 17px; }
          .sc-empty-state { left: 52%; }
        }

        /* footer hints */
        .sc-footer {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 50;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .sc-footer.mounted { opacity: 1; }
        .sc-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .sc-footer-key {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }
      `}</style>

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              if (active === i) {
                if (item.artworks.length > 0) setSelectedArtwork(item.artworks[0]);
              } else { setActive(i); setActiveInfoBar(0); }
            }}
            onMouseEnter={() => setActive(i)}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-icon">{item.icon}</div>
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
                <div className="sc-stats">
                  {item.stats.map(s => (
                    <div className="sc-stat" key={s.tag}>
                      <div className="sc-stat-top">
                        <span className="sc-stat-tag" style={{ color: s.color, borderColor: s.color }}>{s.tag}</span>
                        <span className="sc-stat-num">{s.value}</span>
                      </div>
                      <div className="sc-stat-bars">
                        <div className="sc-stat-bar-color" style={{ background: s.color }} />
                        <div className="sc-stat-bar-black" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted && (
        <div className="sc-right-nav" key={active}>
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">LB</span>
          <span className="sc-nav-label">{ITEMS[active].label}</span>
          <span className="sc-nav-btn">RB</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}

      {mounted && ITEMS[active].artworks.length > 0 && (
        <div className="sc-art-list" key={`art-list-${active}`}>
          {ITEMS[active].artworks.map((artwork, i) => (
            <div
              className={`sc-info-bar-wrap${activeInfoBar === i ? " selected" : ""}`}
              key={`${ITEMS[active].id}-${artwork.id}`}
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={() => {
                if (activeInfoBar === i) setSelectedArtwork(artwork);
                else setActiveInfoBar(i);
              }}
              onMouseEnter={() => setActiveInfoBar(i)}
            >
              {["v-dmc5", "cassandra-cain", "link-minish-cap", "clover-yellow"].includes(artwork.id) && <img className="sc-info-bar-new" src={newsign} alt="NEW" />}
              <div className="sc-info-bar">
                <img className="sc-art-thumb" src={artwork.image} alt="" />
                <span className="sc-info-bar-text">{artwork.title}</span>
                <span className="sc-info-bar-box">{activeInfoBar === i ? "OPEN" : "ART"}</span>
                <span className="sc-info-bar-count">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {mounted && ITEMS[active].artworks.length === 0 && (
        <div className="sc-empty-state">
          <span className="sc-empty-kicker">ARCHIVE // 0{active + 1}</span>
          <span className="sc-empty-title">GALERÍA EN PREPARACIÓN</span>
          <span className="sc-empty-copy">Este apartado se completará próximamente.</span>
        </div>
      )}

      {selectedArtwork && (
        <div className="sc-art-detail" role="dialog" aria-modal="true" aria-label={selectedArtwork.title}>
          <button className="sc-art-close" onClick={() => setSelectedArtwork(null)}>ESC / VOLVER</button>
          <div className="sc-art-detail-image-wrap">
            <img className="sc-art-detail-image" src={selectedArtwork.image} alt={selectedArtwork.title} />
          </div>
          <div className="sc-art-detail-info">
            <span className="sc-art-detail-kicker">DIGITAL ART // PORTFOLIO</span>
            <h2>{selectedArtwork.title}</h2>
            <p>{selectedArtwork.description}</p>
            <span className="sc-art-detail-footer">SELECTED FILE // {String(ITEMS[active].artworks.findIndex(a => a.id === selectedArtwork.id) + 1).padStart(2, "0")}</span>
          </div>
        </div>
      )}

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>OPEN / VER OBRA</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
