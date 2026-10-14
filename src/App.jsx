import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import menuVideo from "./assets/main1.mp4";
import main1 from "./assets/mainm.jpeg";
import main2 from "./assets/mainm2.jpeg";
import main3 from "./assets/mainf.jpeg";
import P3Menu from './P3Menu'
import VideoPage from './VideoPage'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import './App.css'

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Pantalla de Inicio / Menú Principal */}
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        
        {/* Sección Sobre Mí */}
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        
        {/* Sección Galería de Arte (usa la estructura visual de Socials) */}
        <Route path="/gallery" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
        
        {/* Sección Canal de YouTube (usa la pantalla de video secundario) */}
        <Route path="/youtube" element={
          <PageTransition><VideoPage src={main3} /></PageTransition>
        } />
        
        {/* Sección Educación (usa la estructura visual de estadísticas de Resume) */}
        <Route path="/education" element={
          <PageTransition><ResumePage src={main2} /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return <AnimatedRoutes />
}
