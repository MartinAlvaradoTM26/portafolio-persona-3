import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PROJECTS = [
  {
    rank: '6', number: '01', title: 'CONNEXION STUDIO EVENTOS', subtitle: 'PLAN DE MARKETING DIGITAL', category: 'PROYECTO UNIVERSITARIO',
    overview: 'Desarrollo de un plan de marketing digital para una productora de eventos, con foco en clientes corporativos y sociales.',
    work: [
      'Análisis del entorno, la competencia y el público objetivo mediante herramientas como PESTEL, FODA y buyer personas.',
      'Definición de objetivos SMART y estrategias de SEO, SEM y redes sociales.',
      'Propuesta de contenidos, calendario de publicaciones y respuestas para posibles crisis de reputación digital.'
    ],
    future: 'Este trabajo me permite demostrar que puedo investigar una marca, organizar una estrategia y conectar objetivos de negocio con acciones digitales concretas.'
  },
  {
    rank: '5', number: '02', title: 'LAZALDA', subtitle: 'IDENTIDAD Y ESTRATEGIA DE MARCA', category: 'PROYECTO UNIVERSITARIO',
    overview: 'Creación conceptual de una agencia de marketing digital orientada a marcas de moda, belleza y accesorios.',
    work: [
      'Desarrollo del nombre, identidad, misión, visión y propuesta de valor.',
      'Análisis del mercado, competidores, fortalezas, debilidades y oportunidades.',
      'Definición de públicos, buyer personas, customer journey y objetivos SMART.'
    ],
    future: 'Aporta experiencia en construcción de marca y planificación estratégica, desde la investigación inicial hasta la definición de una propuesta diferenciada.'
  },
  {
    rank: '5', number: '03', title: 'FORD', subtitle: 'ANÁLISIS DE MARKETING', category: 'TRABAJO UNIVERSITARIO · CASO ACADÉMICO',
    overview: 'Caso académico desarrollado en el marco de la carrera de Marketing Digital. No fue un trabajo contratado ni una colaboración laboral con Ford.',
    work: [
      'Análisis de competidores como Toyota y Chevrolet.',
      'Desarrollo de perfiles de público, análisis FODA, objetivos SMART y pilares de contenido.',
      'Propuesta de contenidos audiovisuales y de un podcast relacionado con modelos de la marca, como Everest y F-150.'
    ],
    future: 'Este proyecto me ayudó a practicar cómo analizar una marca real desde una perspectiva académica, fundamentar decisiones de comunicación y convertir una estrategia en ideas de contenido.'
  },
  {
    rank: '4', number: '04', title: 'PRIME KEYS', subtitle: 'E-COMMERCE Y CONTENIDOS', category: 'PROYECTO UNIVERSITARIO',
    overview: 'Desarrollo de una propuesta para una tienda online ficticia de teclados para oficina y gaming.',
    work: [
      'Organización de la oferta según necesidades de uso y públicos diferentes.',
      'Definición de perfiles de influencers para comunicar los productos: Reite Grone para gaming y Lean Riccio para oficina.',
      'Vinculación entre el producto, el público objetivo y el enfoque de comunicación.'
    ],
    future: 'Sirve como práctica de marketing para comercio electrónico, segmentación y selección de creadores según la audiencia y el posicionamiento del producto.'
  },
  {
    rank: '6', number: '05', title: 'YOUTUBE', subtitle: 'CREACIÓN AUDIOVISUAL', category: 'PROYECTO PERSONAL',
    overview: 'Desarrollo de contenido para mi canal, combinando investigación de temas, planificación, guion y producción audiovisual.',
    work: [
      'Desarrollo de ideas y enfoques para videos sobre cultura de internet, creepypastas y análisis de contenidos.',
      'Trabajo con guiones, narración, edición de video y preparación de miniaturas.',
      'Organización del contenido para que el tema, el título y la presentación visual mantengan una misma dirección.'
    ],
    future: 'Me permite seguir construyendo habilidades de storytelling, edición, comunicación digital y producción de piezas audiovisuales para proyectos propios o de marcas.'
  },
  {
    rank: '5', number: '06', title: 'PYTHON', subtitle: 'PRÁCTICAS DE PROGRAMACIÓN', category: 'FORMACIÓN Y EJERCICIOS',
    overview: 'Prácticas realizadas durante mi aprendizaje de Python, incluyendo ejercicios de lógica y manejo básico de datos.',
    work: [
      'Creación de un programa de cálculo para compras de supermercado.',
      'Lectura y representación de datos de temperatura a partir de archivos CSV y Excel con pandas y Matplotlib.',
      'Ejercicios de dibujo y secuencias mediante la biblioteca turtle.'
    ],
    future: 'Estos ejercicios fortalecen mis bases de programación, pensamiento lógico y resolución de problemas. También representan un primer paso hacia mi interés por el desarrollo de software.'
  }
]

export default function ProjectsPage({ src }) {
  const [active, setActive] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActive((current) => Math.max(0, current - 1))
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActive((current) => Math.min(PROJECTS.length - 1, current + 1))
      }
      if (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'ArrowLeft') {
        navigate('/')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const project = PROJECTS[active]

  return (
    <div id="menu-screen" className="projects-page">
      {src && <video className="projects-background-video" src={src} autoPlay loop muted playsInline />}
      <div className="projects-shade" />
      <main className="projects-layout">
        <section className="projects-left">
          <header className="projects-heading">
            <div className="projects-kicker">PORTFOLIO / 05</div>
            <h1>PROJECTS</h1>
            <p>TRABAJOS Y EXPERIENCIAS</p>
          </header>
          <div className="projects-selector" aria-label="Seleccionar proyecto">
            {PROJECTS.map((item, index) => (
              <button
                type="button"
                key={item.number}
                className={`projects-card ${active === index ? 'active' : ''}`}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
              >
                <span className="projects-card-number">{item.number}</span>
                <span className="projects-card-main">
                  <span className="projects-card-title">{item.title}</span>
                  <span className="projects-card-subtitle">{item.subtitle}</span>
                </span>
                <span className="projects-rank"><small>RANK</small>{item.rank}</span>
              </button>
            ))}
          </div>
          <button className="projects-back" type="button" onClick={() => navigate('/')}>← VOLVER AL MENÚ</button>
        </section>

        <section className="projects-detail" aria-live="polite" key={project.number}>
          <div className="projects-detail-header">
            <span className="projects-detail-index">{project.number}</span>
            <div>
              <div className="projects-detail-label">{project.category}</div>
              <h2>{project.title}</h2>
              <p className="projects-detail-subtitle">{project.subtitle}</p>
            </div>
          </div>
          <div className="projects-detail-content">
            <h3>RESUMEN</h3>
            <p>{project.overview}</p>
            <h3>QUÉ DESARROLLÉ</h3>
            <ul>
              {project.work.map((line) => <li key={line}>{line}</li>)}
            </ul>
            <h3>APORTE A MI DESARROLLO</h3>
            <p>{project.future}</p>
          </div>
          <div className="projects-detail-footer">MARTIN ALVARADO <span>·</span> SELECCIONÁ OTRO PROYECTO PARA EXPLORARLO</div>
        </section>
      </main>

      <style>{`
        .projects-page { position: relative; width: 100%; height: 100vh; min-height: 560px; overflow: hidden; color: #f3fbff; background: #06133f; }
        .projects-background-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .projects-shade { position: absolute; inset: 0; z-index: 1; background: linear-gradient(105deg, rgba(2, 8, 35, .80), rgba(4, 15, 65, .74)); }
        .projects-layout { position: relative; z-index: 2; display: grid; grid-template-columns: minmax(320px, 42%) minmax(0, 58%); gap: 2.2vw; width: 100%; height: 100%; padding: 4vh 4vw 3vh; box-sizing: border-box; }
        .projects-left { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
        .projects-heading { flex: 0 0 auto; margin-bottom: 2vh; }
        .projects-kicker { color: #8df6ff; font-size: 12px; letter-spacing: .22em; font-weight: 800; }
        .projects-heading h1 { margin: 3px 0 0; font-size: clamp(2.6rem, 5vw, 5.8rem); line-height: .95; letter-spacing: -.04em; font-weight: 900; }
        .projects-heading p { margin: 10px 0 0; color: #8df6ff; font-size: clamp(.75rem, 1.2vw, 1rem); font-weight: 800; letter-spacing: .16em; }
        .projects-selector { flex: 1 1 auto; min-height: 0; overflow-y: auto; overflow-x: hidden; display: flex; flex-direction: column; gap: 10px; padding: 4px 10px 12px 2px; scrollbar-width: thin; scrollbar-color: #8df6ff rgba(13, 28, 83, .7); overscroll-behavior: contain; }
        .projects-selector::-webkit-scrollbar, .projects-detail-content::-webkit-scrollbar { width: 8px; }
        .projects-selector::-webkit-scrollbar-track, .projects-detail-content::-webkit-scrollbar-track { background: rgba(13, 28, 83, .7); }
        .projects-selector::-webkit-scrollbar-thumb, .projects-detail-content::-webkit-scrollbar-thumb { background: #8df6ff; border-radius: 4px; }
        .projects-card { flex: 0 0 auto; display: grid; grid-template-columns: 42px minmax(0, 1fr) auto; align-items: center; gap: 12px; width: 100%; min-height: 78px; padding: 12px 14px; text-align: left; border: 1px solid rgba(141, 246, 255, .52); border-left: 5px solid #8df6ff; background: rgba(8, 23, 83, .86); color: #f3fbff; cursor: pointer; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%); transition: background .18s ease, color .18s ease, transform .18s ease; }
        .projects-card:hover { background: rgba(28, 55, 125, .96); transform: translateX(3px); }
        .projects-card.active { background: #8df6ff; color: #07143d; border-color: #8df6ff; }
        .projects-card-number { align-self: start; font-size: 13px; font-weight: 900; letter-spacing: .1em; }
        .projects-card-main { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
        .projects-card-title { font-size: clamp(.9rem, 1.25vw, 1.15rem); font-weight: 900; line-height: 1.1; overflow-wrap: anywhere; }
        .projects-card-subtitle { font-size: 10px; font-weight: 800; letter-spacing: .09em; opacity: .8; }
        .projects-rank { display: flex; flex-direction: column; align-items: center; gap: 0; font-size: 30px; font-weight: 900; line-height: .95; }
        .projects-rank small { font-size: 9px; letter-spacing: .12em; }
        .projects-back { flex: 0 0 auto; align-self: flex-start; margin-top: 12px; padding: 10px 14px; border: 1px solid #8df6ff; color: #8df6ff; background: rgba(3, 14, 53, .7); font-weight: 800; letter-spacing: .08em; cursor: pointer; }
        .projects-back:hover { background: #8df6ff; color: #07143d; }
        .projects-detail { display: flex; flex-direction: column; min-width: 0; min-height: 0; align-self: stretch; margin: 3vh 0 1vh; padding: 24px 26px 18px; background: linear-gradient(180deg, rgba(13, 29, 105, .97), rgba(5, 15, 62, .97)); border: 1px solid rgba(141, 246, 255, .48); box-shadow: 12px 12px 0 rgba(0, 0, 20, .35); clip-path: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%); }
        .projects-detail-header { flex: 0 0 auto; display: grid; grid-template-columns: 62px minmax(0, 1fr); gap: 16px; align-items: start; padding-bottom: 18px; border-bottom: 1px solid rgba(141, 246, 255, .35); }
        .projects-detail-index { color: #8df6ff; font-size: clamp(2.6rem, 4vw, 4.6rem); font-weight: 900; line-height: .95; }
        .projects-detail-label { color: #8df6ff; font-size: 10px; font-weight: 900; letter-spacing: .14em; }
        .projects-detail-header h2 { margin: 7px 0 0; font-size: clamp(1.6rem, 3vw, 3rem); line-height: 1; overflow-wrap: anywhere; }
        .projects-detail-subtitle { margin: 8px 0 0; color: #8df6ff; font-size: 12px; font-weight: 800; letter-spacing: .12em; }
        .projects-detail-content { flex: 1 1 auto; min-height: 0; overflow-y: auto; overflow-x: hidden; padding: 18px 12px 16px 0; scrollbar-width: thin; scrollbar-color: #8df6ff rgba(13, 28, 83, .7); overscroll-behavior: contain; }
        .projects-detail-content h3 { margin: 14px 0 8px; color: #8df6ff; font-size: 12px; letter-spacing: .14em; }
        .projects-detail-content h3:first-child { margin-top: 0; }
        .projects-detail-content p, .projects-detail-content li { font-size: clamp(.88rem, 1.15vw, 1.03rem); line-height: 1.65; }
        .projects-detail-content p { margin: 0; }
        .projects-detail-content ul { margin: 0; padding-left: 22px; }
        .projects-detail-content li { padding: 3px 0 5px 3px; }
        .projects-detail-content li::marker { color: #8df6ff; }
        .projects-detail-footer { flex: 0 0 auto; padding-top: 12px; border-top: 1px solid rgba(141, 246, 255, .25); color: rgba(243, 251, 255, .7); font-size: 9px; font-weight: 800; letter-spacing: .12em; }
        .projects-detail-footer span { color: #8df6ff; padding: 0 5px; }
        @media (max-width: 800px) { .projects-page { height: 100vh; min-height: 0; overflow: auto; } .projects-layout { height: auto; min-height: 100vh; grid-template-columns: 1fr; gap: 16px; padding: 24px 18px; } .projects-left { min-height: 65vh; } .projects-heading h1 { font-size: 3rem; } .projects-selector { max-height: 48vh; } .projects-detail { min-height: 55vh; margin: 0 0 10px; padding: 18px; } .projects-detail-content { max-height: none; } }
      `}</style>
    </div>
  )
}
