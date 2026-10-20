import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SOCIAL_ITEMS = [
  {
    id: 'youtube',
    badge: 'I',
    title: 'YOUTUBE',
    subtitle: 'Videos destacados',
  },
  {
    id: 'instagram',
    badge: 'II',
    title: 'INSTAGRAM',
    subtitle: 'Dibujos y arte',
  },
  {
    id: 'contacto',
    badge: 'III',
    title: 'CONTACTO',
    subtitle: 'Correo electrónico',
  },
]

const VIDEOS = [
  {
    id: 'nT6_tm8krrc',
    number: '01',
    title: 'VIDEO DESTACADO 01',
  },
  {
    id: 'D8TMDd-mg-s',
    number: '02',
    title: 'VIDEO DESTACADO 02',
  },
  {
    id: 'GwgFDWa96nw',
    number: '03',
    title: 'VIDEO DESTACADO 03',
  },
]

const YOUTUBE_CHANNEL = 'https://www.youtube.com/@trompadamortal'
const INSTAGRAM = 'https://www.instagram.com/elmortalicoxd/'
const EMAIL = 'mailto:martinchoac26@gmail.com'

export default function VideoPage({ src }) {
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') {
        navigate(-1)
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        navigate(-1)
      } else if (e.key === 'ArrowUp') {
        setActive((i) => Math.max(0, i - 1))
      } else if (e.key === 'ArrowDown') {
        setActive((i) => Math.min(SOCIAL_ITEMS.length - 1, i + 1))
      } else if (e.key === 'Enter') {
        if (active === 0) {
          window.open(
            `https://www.youtube.com/watch?v=${VIDEOS[selectedVideo].id}`,
            '_blank',
            'noopener,noreferrer'
          )
        } else if (active === 1) {
          window.open(INSTAGRAM, '_blank', 'noopener,noreferrer')
        } else if (active === 2) {
          window.location.href = EMAIL
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, selectedVideo, navigate])

  const openVideo = (video) => {
    window.open(
      `https://www.youtube.com/watch?v=${video.id}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <div id="menu-screen" className="social-page">
      <video src={src} autoPlay loop muted playsInline />

      <div className="social-entry-mask" aria-hidden="true">
        <video src={src} autoPlay loop muted playsInline />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .social-page {
          background: #0047FF;
          color: #f2fcff;
          font-family: 'Anton', sans-serif;
        }

        .social-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: social-entry-reveal 1.2s cubic-bezier(.16,1,.3,1) forwards;
          pointer-events: none;
        }

        .social-entry-mask video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes social-entry-reveal {
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .social-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
        }

        .social-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(43vw, 660px);
          display: flex;
          flex-direction: column;
          gap: 12px;
          transform: scale(.9);
          transform-origin: top left;
        }

        .social-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 76px;
          line-height: .9;
          color: #f6fbff;
          margin: 0 0 8px 12px;
          opacity: 0;
          transform: translateX(-24px);
          transition: .35s ease;
        }

        .social-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .social-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity .4s ease, transform .4s ease;
          cursor: pointer;
        }

        .social-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .social-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0,97% 0,100% 100%,3% 100%);
          box-shadow: 0 8px 0 rgba(5,13,59,.85);
          transition: .22s ease;
        }

        .social-card-wrap.active .social-card {
          background: #fff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .social-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .social-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0,100% 0,84% 100%,0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
        }

        .social-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 34px;
          color: #d2fdff;
          transform: rotate(8deg);
        }

        .social-card-wrap.active .social-badge {
          background: #000;
          border-color: #000;
        }

        .social-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(30px, 3.4vw, 54px);
          line-height: .95;
          color: #a5f6ff;
          transition: color .22s ease;
        }

        .social-card-wrap.active .social-title {
          color: #000;
        }

        .social-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0,100% 0,calc(100% - 10px) 100%,0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background .22s ease;
        }

        .social-card-wrap.active .social-subtitle-bar {
          background: #000;
        }

        .social-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 25px;
          line-height: 1;
          color: #041238;
        }

        .social-card-wrap.active .social-subtitle {
          color: #fff;
        }

        .social-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(43vw, 660px);
          min-height: 74vh;
          max-height: 84vh;
          overflow-y: auto;
          padding: 22px 24px 24px;
          background: linear-gradient(180deg,rgba(15,28,105,.97),rgba(8,16,68,.98));
          clip-path: polygon(0 0,100% 0,calc(100% - 18px) 100%,0 100%);
          box-shadow: inset 0 0 0 1px rgba(133,244,255,.16),
            16px 16px 0 rgba(0,6,30,.55);
        }

        .social-detail-top {
          display: grid;
          grid-template-columns: 54px 1fr auto;
          align-items: center;
          gap: 12px;
          min-height: 82px;
          padding: 0 16px;
          background: linear-gradient(90deg,#8ef5ff,#d3fdff);
          clip-path: polygon(0 0,100% 0,calc(100% - 16px) 100%,0 100%);
          color: #08153f;
        }

        .social-detail-index {
          font-size: 38px;
          line-height: 1;
        }

        .social-detail-heading {
          font-size: clamp(22px,2.5vw,36px);
          line-height: .98;
        }

        .social-detail-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
        }

        .social-video-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }

        .social-video-row {
          display: grid;
          grid-template-columns: 42px 1fr auto;
          align-items: center;
          gap: 12px;
          min-height: 62px;
          padding: 8px 14px;
          background: rgba(8,18,72,.96);
          clip-path: polygon(0 0,100% 0,calc(100% - 14px) 100%,0 100%);
          cursor: pointer;
          transition: transform .16s ease, background .16s ease;
        }

        .social-video-row:hover {
          transform: translateX(4px);
          background: #173079;
        }

        .social-video-row.selected {
          box-shadow: inset 4px 0 #8df6ff;
          background: #17265b;
        }

        .social-video-number {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          color: #94f4ff;
        }

        .social-video-title {
          font-size: clamp(17px,1.65vw,24px);
          line-height: 1.05;
          color: #f2fcff;
        }

        .social-video-open {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          color: #06133b;
          background: #8df6ff;
          padding: 7px 10px;
          white-space: nowrap;
        }

        .social-bottom {
          margin-top: 20px;
          padding: 18px;
          background: rgba(5,13,57,.97);
          box-shadow: inset 0 0 0 1px rgba(145,239,255,.12);
        }

        .social-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 27px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 12px;
        }

        .social-link-button {
          display: inline-block;
          margin-top: 4px;
          padding: 10px 16px;
          background: #8df6ff;
          color: #06133b;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          text-decoration: none;
          clip-path: polygon(0 0,100% 0,calc(100% - 10px) 100%,0 100%);
          transition: transform .16s ease, background .16s ease;
        }

        .social-link-button:hover {
          transform: translateX(4px);
          background: #fff;
        }

        .social-description {
          font-size: clamp(18px,1.8vw,24px);
          line-height: 1.3;
          margin-bottom: 14px;
          overflow-wrap: anywhere;
        }

        .social-player {
          width: 100%;
          aspect-ratio: 16 / 9;
          margin-top: 16px;
          background: #030a2d;
          border: 2px solid rgba(141,246,255,.55);
        }

        .social-player iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }

        .social-hint {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 17px;
          color: #91f5ff;
          margin-top: 10px;
        }

        @media (max-width: 900px) {
          .social-stack {
            top: 5vh;
            left: 3vw;
            width: 43vw;
            transform: scale(.82);
          }

          .social-detail-panel {
            top: 5vh;
            right: 2vw;
            width: 49vw;
            max-height: 88vh;
            padding: 14px;
          }

          .social-detail-top {
            grid-template-columns: 38px 1fr;
          }

          .social-detail-count {
            display: none;
          }

          .social-card {
            height: 96px;
          }

          .social-card-inner {
            padding-left: 48px;
          }

          .social-subtitle-bar {
            left: 50px;
          }

          .social-video-row {
            grid-template-columns: 32px 1fr;
          }

          .social-video-open {
            grid-column: 2;
            justify-self: start;
          }
        }

        @media (max-width: 600px) {
          .social-stack {
            top: 3vh;
            left: 5vw;
            width: 90vw;
            transform: scale(.82);
          }

          .social-detail-panel {
            top: 36vh;
            left: 5vw;
            right: auto;
            width: 90vw;
            max-height: 59vh;
          }

          .social-list-tag {
            font-size: 48px;
            margin-bottom: 2px;
          }

          .social-card {
            height: 78px;
          }

          .social-card-inner {
            padding-top: 8px;
            padding-bottom: 8px;
          }

          .social-badge {
            height: 55px;
            width: 44px;
          }

          .social-title {
            font-size: 29px;
          }

          .social-subtitle-bar {
            height: 25px;
            bottom: 7px;
          }

          .social-subtitle {
            font-size: 19px;
          }

          .social-detail-top {
            min-height: 60px;
          }

          .social-detail-index {
            font-size: 28px;
          }

          .social-detail-heading {
            font-size: 22px;
          }
        }
      `}</style>

      <div className="social-overlay">
        <div className="social-stack">
          <div className={`social-list-tag${mounted ? ' mounted' : ''}`}>
            LIST
          </div>

          {SOCIAL_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`social-card-wrap${active === index ? ' active' : ''}${mounted ? ' mounted' : ''}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <div className="social-card">
                <div className="social-badge">
                  <div className="social-badge-text">{item.badge}</div>
                </div>

                <div className="social-card-inner">
                  <div className="social-title">{item.title}</div>
                </div>

                <div className="social-subtitle-bar">
                  <div className="social-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="social-detail-panel">
          {active === 0 && (
            <>
              <div className="social-detail-top">
                <div className="social-detail-index">01</div>
                <div className="social-detail-heading">YOUTUBE</div>
                <div className="social-detail-count">03 VIDEOS</div>
              </div>

              <div className="social-player">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${VIDEOS[selectedVideo].id}`}
                  title={VIDEOS[selectedVideo].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              <div className="social-video-list">
                {VIDEOS.map((video, index) => (
                  <div
                    key={video.id}
                    className={`social-video-row${selectedVideo === index ? ' selected' : ''}`}
                    onClick={() => setSelectedVideo(index)}
                  >
                    <div className="social-video-number">{video.number}</div>
                    <div className="social-video-title">{video.title}</div>
                    <div
                      className="social-video-open"
                      onClick={(event) => {
                        event.stopPropagation()
                        openVideo(video)
                      }}
                    >
                      OPEN ↗
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-bottom">
                <div className="social-bottom-title">MI CANAL</div>
                <div className="social-description">
                  Más videos en mi canal de YouTube.
                </div>
                <a
                  className="social-link-button"
                  href={YOUTUBE_CHANNEL}
                  target="_blank"
                  rel="noreferrer"
                >
                  VISITAR CANAL ↗
                </a>
              </div>
            </>
          )}

          {active === 1 && (
            <>
              <div className="social-detail-top">
                <div className="social-detail-index">02</div>
                <div className="social-detail-heading">CUENTA DE ARTE</div>
                <div className="social-detail-count">INSTAGRAM</div>
              </div>

              <div className="social-bottom">
                <div className="social-bottom-title">DIBUJOS Y ARTE</div>
                <div className="social-description">
                  En mi Instagram comparto mis dibujos y trabajos artísticos.
                  Podés visitar mi perfil para ver más.
                </div>
                <a
                  className="social-link-button"
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                >
                  VISITAR INSTAGRAM ↗
                </a>
              </div>
            </>
          )}

          {active === 2 && (
            <>
              <div className="social-detail-top">
                <div className="social-detail-index">03</div>
                <div className="social-detail-heading">CONTACTO</div>
                <div className="social-detail-count">GMAIL</div>
              </div>

              <div className="social-bottom">
                <div className="social-bottom-title">PONGAMONOS EN CONTACTO</div>
                <div className="social-description">
                  ¿Querés ponerte en contacto conmigo? Podés escribirme
                  directamente a mi correo electrónico.
                </div>
                <div className="social-description">
                  martinchoac26@gmail.com
                </div>
                <a
                  className="social-link-button"
                  href={EMAIL}
                >
                  ENVIA UN MAIL ↗
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
