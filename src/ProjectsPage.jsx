import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  { id: "connexion", badge: "I", title: "CONNEXION", subtitle: "Plan de marketing digital", rank: 5 },
  { id: "lazalda", badge: "II", title: "LAZALDA", subtitle: "Agencia de marketing digital", rank: 4 },
  { id: "ford", badge: "III", title: "FORD", subtitle: "Estrategia de marca", rank: 4 },
  { id: "primekeys", badge: "IV", title: "PRIME KEYS", subtitle: "Tienda online ficticia", rank: 3 },
  { id: "youtube", badge: "V", title: "YOUTUBE", subtitle: "Producción audiovisual", rank: 5 },
  { id: "python", badge: "VI", title: "PYTHON", subtitle: "Ejercicios de programación", rank: 3 },
];

const PROJECT_ROWS = [
  { index: "01", title: "Análisis del entorno y competencia", status: "Estrategia" },
  { index: "02", title: "Público objetivo y buyer personas", status: "Audiencia" },
  { index: "03", title: "SEO, SEM y redes sociales", status: "Digital" },
  { index: "04", title: "Plan de reputación y crisis", status: "Gestión" },
];

export default function ProjectsPage({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <video src={src} autoPlay loop muted playsInline />
      <div className="projects-entry-mask" aria-hidden="true">
        <video className="projects-entry-video" src={src} autoPlay loop muted playsInline />
      </div>
      <style>{`
        .projects-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: projects-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .projects-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes projects-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .projects-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .projects-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .projects-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .projects-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .projects-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .projects-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .projects-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .projects-card-wrap.active .projects-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .projects-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .projects-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .projects-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .projects-card-wrap.active .projects-badge {
          background: #000;
          border-color: #000;
        }
        .projects-card-wrap.active .projects-badge-text {
          color: #fff;
        }

        .projects-title {
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .projects-card-wrap.active .projects-title {
          color: #000;
        }

        .projects-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .projects-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .projects-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.82;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .projects-card-wrap.active .projects-rank-label,
        .projects-card-wrap.active .projects-rank-number {
          color: #000;
        }

        .projects-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .projects-card-wrap.active .projects-subtitle-bar {
          background: #000;
        }

        .projects-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .projects-card-wrap.active .projects-subtitle {
          color: #fff;
        }

        .projects-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(39vw, 620px);
          height: 80vh;
          max-height: 80vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow-y: auto;
          overflow-x: hidden;
          pointer-events: auto;
          overscroll-behavior-y: contain;
          scrollbar-width: thin;
          scrollbar-color: #8df6ff #101b5c;
        }
        .projects-detail-panel::-webkit-scrollbar {
          width: 8px;
        }
        .projects-detail-panel::-webkit-scrollbar-track {
          background: #101b5c;
        }
        .projects-detail-panel::-webkit-scrollbar-thumb {
          background: #8df6ff;
          border-radius: 4px;
        }
        .projects-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .projects-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px minmax(0, 1fr);
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .projects-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          line-height: 1;
        }
        .projects-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .projects-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .projects-detail-row {
          display: grid;
          grid-template-columns: 50px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 56px;
          padding: 0 14px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .projects-detail-row:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
        }
        .projects-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .projects-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 28px;
          line-height: 1;
          color: #f2fcff;
        }
        .projects-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #06133b;
          background: #8df6ff;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .projects-detail-bottom {
          position: relative;
          margin-top: 22px;
          padding: 18px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .projects-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 14px;
        }
        .projects-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .projects-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 21px;
          line-height: 1.15;
          color: #edfaff;
        }

        .projects-detail-panel { max-height: 80vh; overflow-y: auto; pointer-events: auto; }
        .projects-overlay, .projects-stack { pointer-events: auto; }
        .projects-detail-panel, .projects-detail-panel * { box-sizing: border-box; }
        @media (max-width: 900px) {
          .projects-stack { top: 3vh; left: 2vw; width: 44vw; transform: scale(.78); }
          .projects-detail-panel { top: 4vh; right: 2vw; width: 51vw; max-height: 90vh; padding: 14px; }
          .projects-list-tag { font-size: clamp(36px, 6vw, 64px); }
          .projects-card { height: 96px; }
          .projects-title { font-size: clamp(24px, 3vw, 38px); }
          .projects-rank-number { font-size: 48px; }
        }
      `}</style>

      <div className="projects-overlay">
        <div className="projects-stack">
          <div className={`projects-list-tag${mounted ? " mounted" : ""}`}>PROJECTS</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`projects-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => {
                setActive(index);
              }}
              onClick={() => {
                setActive(index);
              }}
            >
              <div className="projects-card">
                <div className="projects-badge">
                  <div className="projects-badge-text">{item.badge}</div>
                </div>
                <div className="projects-card-inner">
                  <div className="projects-title">{item.title}</div>
                  <div className="projects-rank">
                    <div className="projects-rank-label">RANK</div>
                    <div className="projects-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="projects-subtitle-bar">
                  <div className="projects-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {active === 0 && (
          <div className="projects-detail-panel">
            <div className="projects-detail-top"><div className="projects-detail-top-index">01</div><div className="projects-detail-top-title">CONNEXION STUDIO EVENTOS</div></div>
            <div className="projects-detail-list">{[["01","Análisis del entorno y competencia","Estrategia"],["02","Buyer personas y públicos","Audiencia"],["03","SEO, SEM y redes sociales","Digital"],["04","Plan de gestión de crisis","Reputación"]].map(([index,title,status]) => <div className="projects-detail-row" key={index}><div className="projects-detail-row-index">{index}</div><div className="projects-detail-row-title">{title}</div><div className="projects-detail-status">{status}</div></div>)}</div>
            <div className="projects-detail-bottom"><div className="projects-detail-bottom-title">APORTE Y APRENDIZAJE</div><div className="projects-detail-bullets"><div className="projects-detail-bullet">- Plan de marketing integral para una productora de eventos, con segmentos corporativo y social.</div><div className="projects-detail-bullet">- Desarrollo de objetivos digitales, estrategias de posicionamiento y propuestas para responder a crisis.</div><div className="projects-detail-bullet">- Experiencia aplicable a planificación estratégica, comunicación de marca y gestión de clientes.</div></div></div>
          </div>
        )}
        {active === 1 && (
          <div className="projects-detail-panel">
            <div className="projects-detail-top"><div className="projects-detail-top-index">02</div><div className="projects-detail-top-title">LAZALDA</div></div>
            <div className="projects-detail-list">{[["01","Identidad y propuesta de valor","Marca"],["02","Análisis FODA y PESTEL","Diagnóstico"],["03","Buyer persona y customer journey","Cliente"],["04","Objetivos SMART y servicios","Planificación"]].map(([index,title,status]) => <div className="projects-detail-row" key={index}><div className="projects-detail-row-index">{index}</div><div className="projects-detail-row-title">{title}</div><div className="projects-detail-status">{status}</div></div>)}</div>
            <div className="projects-detail-bottom"><div className="projects-detail-bottom-title">APORTE Y APRENDIZAJE</div><div className="projects-detail-bullets"><div className="projects-detail-bullet">- Concepto de agencia digital enfocada en marcas de moda, accesorios y belleza.</div><div className="projects-detail-bullet">- Definición de misión, visión, servicios, diferenciación y herramientas de análisis estratégico.</div><div className="projects-detail-bullet">- Experiencia en branding, investigación de mercado y armado de propuestas para clientes.</div></div></div>
          </div>
        )}
        {active === 2 && (
          <div className="projects-detail-panel">
            <div className="projects-detail-top"><div className="projects-detail-top-index">03</div><div className="projects-detail-top-title">FORD</div></div>
            <div className="projects-detail-list">{[["01","Análisis de Toyota y Chevrolet","Competencia"],["02","Buyer persona y FODA","Estrategia"],["03","Pilares de contenido y arquetipos","Marca"],["04","Podcast e influencer","Contenido"]].map(([index,title,status]) => <div className="projects-detail-row" key={index}><div className="projects-detail-row-index">{index}</div><div className="projects-detail-row-title">{title}</div><div className="projects-detail-status">{status}</div></div>)}</div>
            <div className="projects-detail-bottom"><div className="projects-detail-bottom-title">APORTE Y APRENDIZAJE</div><div className="projects-detail-bullets"><div className="projects-detail-bullet">- Análisis del posicionamiento de Ford frente a sus competidores y de la comunicación de sus productos.</div><div className="projects-detail-bullet">- Propuesta de contenidos y podcast sobre modelos como Everest y F-150.</div><div className="projects-detail-bullet">- Práctica en análisis competitivo, estrategia de contenidos y comunicación de producto.</div></div></div>
          </div>
        )}
        {active === 3 && (
          <div className="projects-detail-panel">
            <div className="projects-detail-top"><div className="projects-detail-top-index">04</div><div className="projects-detail-top-title">PRIME KEYS</div></div>
            <div className="projects-detail-list">{[["01","Tienda ficticia en Tienda Nube","E-commerce"],["02","Teclados de oficina y gamer","Productos"],["03","Segmentación de públicos","Audiencia"],["04","Selección de influencers","Promoción"]].map(([index,title,status]) => <div className="projects-detail-row" key={index}><div className="projects-detail-row-index">{index}</div><div className="projects-detail-row-title">{title}</div><div className="projects-detail-status">{status}</div></div>)}</div>
            <div className="projects-detail-bottom"><div className="projects-detail-bottom-title">APORTE Y APRENDIZAJE</div><div className="projects-detail-bullets"><div className="projects-detail-bullet">- Propuesta para una tienda online con productos para uso laboral y gaming.</div><div className="projects-detail-bullet">- Selección de perfiles de influencers para conectar con distintos públicos.</div><div className="projects-detail-bullet">- Experiencia en marketing de e-commerce, segmentación y promoción digital.</div></div></div>
          </div>
        )}
        {active === 4 && (
          <div className="projects-detail-panel">
            <div className="projects-detail-top"><div className="projects-detail-top-index">05</div><div className="projects-detail-top-title">YOUTUBE Y PRODUCCIÓN AUDIOVISUAL</div></div>
            <div className="projects-detail-list">{[["01","Ideas y enfoque de videos","Concepto"],["02","Guion y narrativa","Escritura"],["03","Edición de video e imagen","Edición"],["04","Miniaturas e identidad visual","Diseño"]].map(([index,title,status]) => <div className="projects-detail-row" key={index}><div className="projects-detail-row-index">{index}</div><div className="projects-detail-row-title">{title}</div><div className="projects-detail-status">{status}</div></div>)}</div>
            <div className="projects-detail-bottom"><div className="projects-detail-bottom-title">APORTE Y APRENDIZAJE</div><div className="projects-detail-bullets"><div className="projects-detail-bullet">- Creación de contenido para YouTube sobre análisis, historias y cultura de internet.</div><div className="projects-detail-bullet">- Combinación de planificación, guion, edición y presentación visual.</div><div className="projects-detail-bullet">- Experiencia útil en comunicación audiovisual, creación de contenido y marketing digital.</div></div></div>
          </div>
        )}
        {active === 5 && (
          <div className="projects-detail-panel">
            <div className="projects-detail-top"><div className="projects-detail-top-index">06</div><div className="projects-detail-top-title">PYTHON</div></div>
            <div className="projects-detail-list">{[["01","Calculadora de supermercado","Lógica"],["02","Lectura de CSV y Excel","Datos"],["03","Gráfico de temperaturas","Matplotlib"],["04","Dibujo con Turtle","Práctica"]].map(([index,title,status]) => <div className="projects-detail-row" key={index}><div className="projects-detail-row-index">{index}</div><div className="projects-detail-row-title">{title}</div><div className="projects-detail-status">{status}</div></div>)}</div>
            <div className="projects-detail-bottom"><div className="projects-detail-bottom-title">APORTE Y APRENDIZAJE</div><div className="projects-detail-bullets"><div className="projects-detail-bullet">- Práctica inicial de lógica, cálculos y manejo básico de datos con Python.</div><div className="projects-detail-bullet">- Uso de pandas y Matplotlib para trabajar con archivos y representar datos en gráficos.</div><div className="projects-detail-bullet">- Base para continuar aprendiendo desarrollo de software y automatización.</div></div></div>
          </div>
        )}
      </div>
    </div>
  );
}
