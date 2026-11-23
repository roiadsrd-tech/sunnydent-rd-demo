import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowUpRight,
  MapPin,
  Phone,
  ShieldCheck,
  Sliders
} from 'lucide-react';
import {
  EditorialSurface,
  RevealText,
  ClipRevealImage,
  MagneticButton,
  ScrollProgressBar
} from './craft';

const WHATSAPP_URL = "https://wa.me/8099016135?text=Hola%2C%20vi%20el%20portafolio%20web%20de%20SunnyDent%20y%20me%20gustar%C3%ADa%20conversar%20sobre%20un%20proyecto.";
const INSTAGRAM_URL = "https://www.instagram.com/sunnydent.rd/";

/* ==========================================================================
   MOMENTO FIRMA (THE MOMENT): CURSOR DE BARRIDO SUAVE BEFORE / AFTER
   Transición interactiva verificada: post_21.jpg (Antes) vs post_22.jpg (Después)
   ========================================================================== */
function SmileCompareSlider() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(0, Math.min(rect.width, x));
    const percentage = (clamped / rect.width) * 100;
    setPosition(percentage);
  }, []);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    updatePosition(e.clientX);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [updatePosition]);

  return (
    <div className="moment-wrapper">
      <div
        ref={containerRef}
        className="compare-container"
        onPointerDown={handlePointerDown}
      >
        {/* Capa Resultado (Después: post_22.jpg) */}
        <div className="compare-layer-after">
          <img
            src="./media/post_22.jpg"
            alt="Resultado final de diseño y rehabilitación dental — SunnyDent"
            loading="lazy"
          />
          <span className="compare-tag compare-tag--after">Después</span>
        </div>

        {/* Capa Inicial (Antes: post_21.jpg con clip) */}
        <div
          className="compare-layer-before"
          style={{ width: `${position}%` }}
        >
          <img
            src="./media/post_21.jpg"
            alt="Fase inicial previa de rehabilitación dental — SunnyDent"
            loading="lazy"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%', maxWidth: 'none' }}
          />
          <span className="compare-tag compare-tag--before">Antes</span>
        </div>

        {/* Línea divisoria y tirador suave */}
        <div
          className="compare-divider-line"
          style={{ left: `${position}%` }}
        >
          <div className="compare-handle-knob" aria-hidden="true">
            <Sliders size={18} strokeWidth={1.8} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cerrar menú móvil al cambiar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app-root">
      {/* Barra de progreso de lectura ultra-fina de 2px */}
      <ScrollProgressBar color="var(--accent)" />

      {/* ====================================================================
          HEADER: NAVBAR FLOTANTE CON GLASSMORPHISM Y LOGO OFICIAL INTACTO
          ==================================================================== */}
      <header className="site-header">
        <nav className="navbar-pill">
          {/* Logo oficial intacto con su fondo original #A97D58 */}
          <a href="#hero" className="navbar-brand">
            <div className="brand-emblem">
              <img
                src="./media/logo_real.jpg"
                alt="Logo oficial SunnyDent"
              />
            </div>
            <div className="brand-text">
              <span className="brand-title">SunnyDent</span>
              <span className="brand-subtitle">Clínica & Estética</span>
            </div>
          </a>

          {/* Enlaces Desktop */}
          <div className="navbar-links">
            <a href="#especialidades" className="navbar-link">Especialidades</a>
            <a href="#casos-reales" className="navbar-link">Casos Reales</a>
            <a href="#equipo" className="navbar-link">Especialistas</a>
            <a href="#seguros" className="navbar-link">Seguros ARS</a>
            <a href="#ubicacion" className="navbar-link">Visítanos</a>
          </div>

          {/* Acciones */}
          <div className="navbar-actions">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-cta desktop-only"
            >
              <span>Agendar cita</span>
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>

            <button
              type="button"
              className="nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Menú móvil limpio */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-nav-panel"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ul className="mobile-nav-list">
                <li>
                  <a
                    href="#especialidades"
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Especialidades</span>
                    <ArrowUpRight size={18} />
                  </a>
                </li>
                <li>
                  <a
                    href="#casos-reales"
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Casos Reales</span>
                    <ArrowUpRight size={18} />
                  </a>
                </li>
                <li>
                  <a
                    href="#equipo"
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Especialistas</span>
                    <ArrowUpRight size={18} />
                  </a>
                </li>
                <li>
                  <a
                    href="#seguros"
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Seguros ARS</span>
                    <ArrowUpRight size={18} />
                  </a>
                </li>
                <li>
                  <a
                    href="#ubicacion"
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Visítanos</span>
                    <ArrowUpRight size={18} />
                  </a>
                </li>
              </ul>
              <div style={{ marginTop: 20 }}>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Agendar cita
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ==================================================================
            1. HERO: PORTADA SPLIT IMMERSIVE FRAME (55/45)
            Superficie: EditorialSurface variant="ambient" tone="primary"
            ================================================================== */}
        <EditorialSurface variant="ambient" tone="primary" id="hero" className="hero-section">
          <div className="editorial-container">
            <div className="hero-split-grid">
              {/* Columna Izquierda: Tipografía Serif Monumental */}
              <div className="hero-content">

                <RevealText as="h1" immediate className="h1-monumental">
                  Resultados sutiles y elegantes
                </RevealText>

                <p className="sub-lead">
                  Clínica dental boutique y medicina estética en Mirador Sur, Santo Domingo.
                </p>

                <div className="hero-actions">
                  <MagneticButton
                    variant="primary"
                    href={WHATSAPP_URL}
                    target="_blank"
                    className="btn-editorial-primary"
                  >
                    <span>Agendar cita</span>
                    <ArrowUpRight size={18} />
                  </MagneticButton>

                  <a href="#especialidades" className="btn-editorial-ghost">
                    Ver especialidades
                  </a>
                </div>
              </div>

              {/* Columna Derecha: Fotografía Protagonista ai_hero.webp */}
              <div className="hero-visual-frame">
                <ClipRevealImage
                  src="./media/ai_hero.webp"
                  alt="Espacio sereno y cálido de SunnyDent en Mirador Sur"
                  aspectRatio="4 / 3.4"
                  parallax
                  priority
                />
              </div>
            </div>
          </div>
        </EditorialSurface>

        {/* ==================================================================
            2. NUESTRAS ESPECIALIDADES
            Superficie: EditorialSurface variant="grain" tone="secondary"
            Geometría: Grid de 3 columnas asimétricas con tarjetas ultra-redondeadas
            ================================================================== */}
        <EditorialSurface variant="grain" tone="secondary" id="especialidades" className="section-spacing">
          <div className="editorial-container">
            <div className="section-head-editorial">
              <RevealText as="h2" className="h2-monumental">
                Especialidades
              </RevealText>
            </div>

            <div className="specialties-grid">
              {/* Estética Dental (ai_service_1.webp) */}
              <article className="specialty-card specialty-card--lead">
                <div className="specialty-card__media">
                  <img src="./media/ai_service_1.webp" alt="Diseño de sonrisa en resina estética" loading="lazy" />
                </div>
                <div className="specialty-card__body">
                  <h3 className="specialty-card__title">Estética dental</h3>
                  <p className="specialty-card__desc">Carillas de resina y blanqueamiento.</p>
                </div>
              </article>

              {/* Medicina Estética (post_28.jpg) */}
              <article className="specialty-card specialty-card--offset">
                <div className="specialty-card__media">
                  <img src="./media/post_28.jpg" alt="Toxina botulínica HUTOX y materiales de medicina estética" loading="lazy" />
                </div>
                <div className="specialty-card__body">
                  <h3 className="specialty-card__title">Medicina estética</h3>
                  <p className="specialty-card__desc">Toxina HUTOX, exosomas y enzimas.</p>
                </div>
              </article>

              {/* Odontopediatría (solo tipografía: sin foto verificada Nivel A/B) */}
              <article className="specialty-card specialty-card--type">
                <h3 className="specialty-card__title">Odontopediatría</h3>
                <p className="specialty-card__desc">Cuidado dental cálido para los más pequeños.</p>
              </article>
            </div>
          </div>
        </EditorialSurface>

        {/* ==================================================================
            3. TRANSFORMACIONES REALES: THE MOMENT (BEFORE / AFTER INTERACTIVO)
            Superficie: EditorialSurface variant="mesh" tone="primary"
            Geometría: Contenedor ancho completo con slider de comparación central
            ================================================================== */}
        <EditorialSurface variant="mesh" tone="primary" id="casos-reales" className="section-spacing">
          <div className="editorial-container">
            <div className="section-head-editorial" style={{ textAlign: 'center', alignItems: 'center' }}>
              <RevealText as="h2" className="h2-monumental">
                Casos reales
              </RevealText>
            </div>

            {/* Slider firma Before/After */}
            <SmileCompareSlider />
          </div>
        </EditorialSurface>

        {/* ==================================================================
            4. EXCELENCIA PROFESIONAL: MOSAICO EDITORIAL DE DOCTORES
            Superficie: EditorialSurface variant="architectural" tone="secondary"
            Contenido verificado: Dra. Yomari Landrón, Dr. Roberto Reinoso, Dra. Liliana Rubiera
            ================================================================== */}
        <EditorialSurface variant="architectural" tone="secondary" id="equipo" className="section-spacing">
          <div className="editorial-container">
            <div className="section-head-editorial">
              <RevealText as="h2" className="h2-monumental">
                Excelencia clínica
              </RevealText>
            </div>

            <div className="team-editorial-mosaic">
              {/* Perfil 1: Dra. Yomari Landrón (post_30.jpg) */}
              <article className="doctor-profile-card">
                <div className="doctor-profile-frame">
                  <img
                    src="./media/post_30.jpg"
                    alt="Dra. Yomari Landrón — Odontóloga en SunnyDent"
                    loading="lazy"
                  />
                </div>
                <div className="doctor-profile-body">
                  <span className="doctor-specialty">Odontóloga</span>
                  <h3 className="doctor-name">Dra. Yomari Landrón</h3>
                  <p className="doctor-bio-brief">
                    Diseño de sonrisa y atención personalizada.
                  </p>
                </div>
              </article>

              {/* Perfil 2: Dr. Roberto Reinoso (post_31.jpg) */}
              <article className="doctor-profile-card">
                <div className="doctor-profile-frame">
                  <img
                    src="./media/post_31.jpg"
                    alt="Dr. Roberto Reinoso — Rehabilitación y estética dental"
                    loading="lazy"
                  />
                </div>
                <div className="doctor-profile-body">
                  <span className="doctor-specialty">Rehabilitación y estética</span>
                  <h3 className="doctor-name">Dr. Roberto Reinoso</h3>
                  <p className="doctor-bio-brief">
                    Rehabilitación oral y estética dental.
                  </p>
                </div>
              </article>

              {/* Franja complementaria de equipo (Dra. Liliana Rubiera) */}
              <div className="team-complement-bar">
                <div>
                  <h4 className="team-complement-title">Dra. Liliana Rubiera</h4>
                  <p className="team-complement-desc">
                    Odontopediatría
                  </p>
                </div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-ghost"
                  style={{ padding: '10px 20px', fontSize: '0.86rem' }}
                >
                  Consultar cita
                </a>
              </div>
            </div>
          </div>
        </EditorialSurface>

        {/* ==================================================================
            5. SEGUROS MÉDICOS (ARS VERIFICADAS)
            Superficie: EditorialSurface variant="ambient" tone="primary"
            Aseguradoras verificadas: SENASA, ARS Primera de Humano, Metasalud,
            ARS Renacer, Monumental, ARS Reservas
            ================================================================== */}
        <EditorialSurface variant="ambient" tone="primary" id="seguros" className="ars-section-strip">
          <div className="editorial-container">
            <div className="ars-strip-header">
              <RevealText as="h2" className="h2-monumental" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', marginTop: 8 }}>
                Seguros médicos
              </RevealText>
            </div>

            <div className="ars-showcase-row">
              {/* ARS Primera de Humano (Logo autorizado) */}
              <div className="ars-logo-item" title="ARS Primera de Humano">
                <img
                  src="./logos-seguros/Logohumano2016.webp"
                  alt="ARS Primera de Humano"
                  loading="lazy"
                />
              </div>

              {/* SENASA (Logo autorizado) */}
              <div className="ars-logo-item" title="SENASA">
                <img
                  src="./logos-seguros/logo2022.webp"
                  alt="SENASA"
                  loading="lazy"
                />
              </div>

              {/* ARS Reservas (Logo autorizado) */}
              <div className="ars-logo-item" title="ARS Reservas">
                <img
                  src="./logos-seguros/ars_seguros_banreservas.d729df7.png"
                  alt="ARS Reservas"
                  loading="lazy"
                />
              </div>

              {/* Aseguradoras Verificadas Adicionales con Tipografía Editorial Limpia */}
              <div className="ars-type-item">
                Metasalud
              </div>

              <div className="ars-type-item">
                ARS Renacer
              </div>

              <div className="ars-type-item">
                Monumental
              </div>
            </div>
          </div>
        </EditorialSurface>

        {/* ==================================================================
            6. VISÍTANOS: SPLIT 60/40 EN SUPERFICIE CONTRAST TIERRA OSCURO
            Superficie: EditorialSurface variant="contrast" tone="contrast"
            Ubicación y contacto verificado: Mirador Sur, Santo Domingo
            ================================================================== */}
        <EditorialSurface variant="contrast" tone="contrast" id="ubicacion" className="section-spacing">
          <div className="editorial-container">
            <div className="location-split-grid">
              {/* Información y vías de contacto */}
              <div className="location-info-block">
                <div>
                  <RevealText as="h2" className="h2-monumental h2-monumental--contrast" style={{ marginTop: 8 }}>
                    Visítanos
                  </RevealText>
                </div>

                <div className="location-detail-list">
                  <div className="location-item">
                    <div className="location-item-icon">
                      <MapPin size={18} />
                    </div>
                    <div className="location-item-text">
                      <strong>Dirección</strong>
                      <span>Calle Leonor Feltz #21, Mirador Sur, Santo Domingo</span>
                    </div>
                  </div>

                  <div className="location-item">
                    <div className="location-item-icon">
                      <Phone size={18} />
                    </div>
                    <div className="location-item-text">
                      <strong>Citas & WhatsApp</strong>
                      <span>809-901-6135</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 8 }}>
                  <MagneticButton
                    variant="primary"
                    href={WHATSAPP_URL}
                    target="_blank"
                    className="btn-editorial-primary"
                    style={{ backgroundColor: 'var(--gold-accent)', color: '#1a1614' }}
                  >
                    <span>Agendar cita</span>
                    <ArrowUpRight size={18} />
                  </MagneticButton>
                </div>
              </div>

              {/* Tarjeta visual estilizada de la sede */}
              <div className="location-map-visual">
                <div className="map-ambient-art" aria-hidden="true" />
                
                <div className="map-pin-card">
                  <h3 className="map-pin-title">SunnyDent</h3>
                  <p className="map-pin-sub">Calle Leonor Feltz #21 · Mirador Sur</p>
                </div>

                <div className="map-actions">
                  <a
                    href="https://maps.google.com/?q=Calle+Leonor+Feltz+21+Mirador+Sur+Santo+Domingo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-editorial-primary"
                    style={{ fontSize: '0.86rem', padding: '12px 22px' }}
                  >
                    <span>Ver en Google Maps</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </EditorialSurface>
      </main>

      {/* ====================================================================
          CIERRE & FOOTER A LA MEDIDA: FONDO MARRÓN TIERRA Y MONOGRAMA INTACTO
          ==================================================================== */}
      <footer className="site-footer">
        <div className="editorial-container">
          <div className="footer-inner">
            {/* Monograma oficial centrado intacto con fondo #A97D58 */}
            <div className="footer-emblem-large">
              <img
                src="./media/logo_real.jpg"
                alt="Emblema SunnyDent"
              />
            </div>

            <div className="footer-brand-title">SunnyDent</div>

            {/* Cita textual verificada del brief */}
            <blockquote className="footer-quote">
              "A veces no se trata de transformar, sino de resaltar lo bonito que ya existe."
            </blockquote>

            <nav className="footer-nav-links" aria-label="Navegación del pie de página">
              <a href="#hero" className="footer-link">Inicio</a>
              <a href="#especialidades" className="footer-link">Especialidades</a>
              <a href="#casos-reales" className="footer-link">Casos Reales</a>
              <a href="#equipo" className="footer-link">Especialistas</a>
              <a href="#seguros" className="footer-link">Seguros ARS</a>
              <a href="#ubicacion" className="footer-link">Ubicación</a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
            </nav>

            <div className="footer-bottom-bar">
              <div>
                © {new Date().getFullYear()} SunnyDent. Todos los derechos reservados.
              </div>
              <div>
                Mirador Sur, Santo Domingo, República Dominicana.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
