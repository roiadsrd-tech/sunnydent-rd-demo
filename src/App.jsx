import React, { useState, useRef, useCallback } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  MapPin,
  Instagram,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  EditorialSurface,
  RevealText,
  ClipRevealImage,
  MagneticButton,
  HoverPreviewList,
  StickyEditorialSplit,
  HorizontalShowcase,
  EditorialMarquee,
  ScrollProgressBar,
  CounterMetric
} from './craft';

// Verified Services & Disciplines
const DISCIPLINAS = [
  {
    number: '01',
    title: 'Diseño de Sonrisa & Carillas',
    meta: 'Resina compuesta & disilicato',
    description: 'Perfeccionamiento armónico conservando la esencia natural de tus dientes.',
    photo: './media/post_20.jpg',
    href: 'https://wa.me/18099016135?text=Hola%20SunnyDent,%20deseo%20informaci%C3%B3n%20sobre%20Dise%C3%B1o%20de%20Sonrisa'
  },
  {
    number: '02',
    title: 'Medicina Estética & Armonización',
    meta: 'Toxina HUTOX & revitalización',
    description: 'Protocolos médicos personalizados para suavizar líneas y perfilar con naturalidad.',
    photo: './media/post_28.jpg',
    href: 'https://wa.me/18099016135?text=Hola%20SunnyDent,%20deseo%20informaci%C3%B3n%20sobre%20Medicina%20Est%C3%A9tica'
  },
  {
    number: '03',
    title: 'Rehabilitación Protésica',
    meta: 'Maryland, coronas & implantes',
    description: 'Reposición precisa con escaneo intraoral y cerámicas de alta durabilidad.',
    photo: './media/post_24.jpg',
    href: 'https://wa.me/18099016135?text=Hola%20SunnyDent,%20deseo%20informaci%C3%B3n%20sobre%20Rehabilitaci%C3%B3n%20Prot%C3%A9sica'
  },
  {
    number: '04',
    title: 'HydraLips & Terapias Celulares',
    meta: 'Exosomas, PDRN & hidratación',
    description: 'Hidratación profunda de labios y bioestimulación con exosomas y Dermapen.',
    photo: './media/post_15.jpg',
    href: 'https://wa.me/18099016135?text=Hola%20SunnyDent,%20deseo%20informaci%C3%B3n%20sobre%20HydraLips'
  }
];

// Verified Case Gallery Items
const CASOS_GALERIA = [
  {
    id: 'caso-1',
    title: 'Carillas en resina estética',
    meta: 'Armonía y balance dental',
    photo: './media/post_20.jpg'
  },
  {
    id: 'caso-2',
    title: 'Transformación de sonrisa',
    meta: 'Caso clínico integral',
    photo: './media/post_35.jpg'
  },
  {
    id: 'caso-3',
    title: 'HydraLips e hidratación',
    meta: 'Perfilado y brillo natural',
    photo: './media/post_1.jpg'
  },
  {
    id: 'caso-4',
    title: 'Sonrisa en disilicato',
    meta: 'Resultado final de alta gama',
    photo: './media/post_27.jpg'
  },
  {
    id: 'caso-5',
    title: 'Armonización labial sutil',
    meta: 'Micro-perfilado estético',
    photo: './media/post_16.jpg'
  },
  {
    id: 'caso-6',
    title: 'Planificación digital',
    meta: 'Escaneo y precisión clínica',
    photo: './media/post_23.jpg'
  }
];

// Verified Insurance Logos
const SEGUROS_ARS = [
  { name: 'ARS Banreservas', src: './logos-seguros/ars_seguros_banreservas.d729df7.png' },
  { name: 'ARS Primera Humano', src: './logos-seguros/Logohumano2016.webp' },
  { name: 'Mapfre Salud', src: './logos-seguros/Mapfre_Logo_2026-s1280.png' },
  { name: 'Seguros Universal', src: './logos-seguros/logo-seguros-universal.svg' },
  { name: 'Worldwide Medical', src: './logos-seguros/Worldwide Medical.png' },
  { name: 'BMI Seguros', src: './logos-seguros/logos-bmi-ecuador-02.png' }
];

// Interactive Before & After Slider (The Moment)
function InteractiveBeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="ba-container"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ cursor: isDragging ? 'ew-resize' : 'default' }}
      aria-label="Comparativa interactiva de caso clínico de implante y corona estética"
      role="region"
    >
      <div className="ba-viewport">
        {/* After Image (Full background) */}
        <img
          src="./media/post_22.jpg"
          alt="Después: Corona definitiva instalada por el Dr. Yomari Landrón"
          className="ba-image ba-image--after"
        />

        {/* Before Image (Clipped overlay) */}
        <div
          className="ba-image ba-image--before"
          style={{
            clipPath: `inset(0 ${100 - sliderPos}% 0 0)`
          }}
        >
          <img
            src="./media/post_21.jpg"
            alt="Antes: Pilar de implante intraoral preparado"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Tactile Divider Bar */}
        <div
          className="ba-divider"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="ba-handle" aria-hidden="true">
            <ChevronLeft size={14} strokeWidth={2.5} style={{ marginRight: -2 }} />
            <ChevronRight size={14} strokeWidth={2.5} style={{ marginLeft: -2 }} />
          </div>
        </div>

        {/* Minimal Tags */}
        <span className="ba-tag ba-tag--left">Antes · Implante</span>
        <span className="ba-tag ba-tag--right">Después · Corona Final</span>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* 2px Hairline Scroll Indicator */}
      <ScrollProgressBar color="var(--accent)" />

      {/* Sticky Editorial Navbar */}
      <header className="site-header">
        <div className="site-container site-header__inner">
          <a href="#inicio" className="site-brand" onClick={closeMobileMenu}>
            <img
              src="./media/logo_clean.png"
              alt="SunnyDent Logo"
              className="site-brand__logo"
            />
            <div className="site-brand__text">
              <span className="site-brand__name">SunnyDent</span>
              <span className="site-brand__sub">Mirador Sur · SD</span>
            </div>
          </a>

          {/* Clean Desktop Navigation Links */}
          <nav className="site-nav" aria-label="Navegación principal">
            <a href="#especialidades" className="site-nav__link craft-link-underline">
              Especialidades
            </a>
            <a href="#comparativa" className="site-nav__link craft-link-underline">
              Comparativa
            </a>
            <a href="#casos" className="site-nav__link craft-link-underline">
              Casos Reales
            </a>
            <a href="#clinica" className="site-nav__link craft-link-underline">
              La Clínica
            </a>
            <a href="#contacto" className="site-nav__link craft-link-underline">
              Contacto
            </a>
          </nav>

          <div className="site-header__actions">
            <MagneticButton
              variant="primary"
              href="https://wa.me/18099016135?text=Hola%20SunnyDent,%20deseo%20agendar%20una%20evaluaci%C3%B3n"
              target="_blank"
              style={{ fontSize: '0.88rem', padding: '12px 24px' }}
            >
              Agendar cita
            </MagneticButton>

            {/* Accessible Hamburger Menu Button */}
            <button
              type="button"
              className="site-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="mobile-nav-panel">
            <a href="#especialidades" onClick={closeMobileMenu}>
              Especialidades
            </a>
            <a href="#comparativa" onClick={closeMobileMenu}>
              Comparativa
            </a>
            <a href="#casos" onClick={closeMobileMenu}>
              Casos Reales
            </a>
            <a href="#clinica" onClick={closeMobileMenu}>
              La Clínica
            </a>
            <a href="#contacto" onClick={closeMobileMenu}>
              Contacto
            </a>
            <div style={{ marginTop: '0.75rem' }}>
              <MagneticButton
                variant="primary"
                href="https://wa.me/18099016135?text=Hola%20SunnyDent,%20deseo%20agendar%20una%20evaluaci%C3%B3n"
                target="_blank"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={closeMobileMenu}
              >
                Agendar por WhatsApp
              </MagneticButton>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* =================================================================
            1. HERO: Center-Stage Minimal Archetype
            ================================================================= */}
        <EditorialSurface
          as="section"
          id="inicio"
          variant="ambient"
          tone="primary"
          className="section-padding--tight"
        >
          <div className="site-container" style={{ textAlign: 'center' }}>
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
              {/* Monumental Hero Headline (6 words max, sentence case, display weight 400) */}
              <RevealText
                as="h1"
                immediate
                className="display-title"
                style={{ margin: '0 auto' }}
              >
                Diseño de sonrisa sutil y elegante
              </RevealText>

              {/* Subtitle: 1 short sentence (<= 12 words) */}
              <p
                className="section-subtitle hero-subtitle"
                style={{ margin: '1.25rem auto 2.5rem', textAlign: 'center' }}
              >
                Clínica dental de alta gama en Mirador Sur, Santo Domingo.
              </p>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                <MagneticButton
                  variant="primary"
                  href="https://wa.me/18099016135?text=Hola%20SunnyDent,%20deseo%20agendar%20una%20evaluaci%C3%B3n"
                  target="_blank"
                >
                  Agendar cita
                </MagneticButton>
                <MagneticButton variant="secondary" href="#casos">
                  Ver casos
                </MagneticButton>
              </div>
            </div>

            {/* Framed Panoramic Hero Image */}
            <div
              style={{
                marginTop: 'clamp(2.5rem, 5vw, 4.5rem)',
                maxWidth: '1120px',
                marginInline: 'auto'
              }}
            >
              <ClipRevealImage
                src="./media/ai_hero.webp"
                alt="Instalaciones clínicas SunnyDent Mirador Sur"
                aspectRatio="16 / 9"
                parallax
                priority
                radius="var(--radius-media)"
              />
            </div>
          </div>
        </EditorialSurface>

        {/* =================================================================
            2. ESPECIALIDADES: Anti-Card Editorial List
            ================================================================= */}
        <EditorialSurface
          as="section"
          id="especialidades"
          variant="grain"
          tone="secondary"
          className="section-padding"
        >
          <div className="site-container">
            <div className="section-header section-header--split">
              <div>
                <RevealText as="h2" className="section-title">
                  Especialidades clínicas
                </RevealText>
                <p className="section-subtitle">
                  Odontología de alta precisión y protocolos estéticos avanzados.
                </p>
              </div>
              <MagneticButton
                variant="secondary"
                href="https://wa.me/18099016135?text=Hola%20SunnyDent,%20quisiera%20consultar%20sobre%20sus%20tratamientos"
                target="_blank"
              >
                Consultar protocolo
              </MagneticButton>
            </div>

            {/* HoverPreviewList replaces generic card grids */}
            <HoverPreviewList items={DISCIPLINAS} aspectRatio="4 / 5" />
          </div>
        </EditorialSurface>

        {/* =================================================================
            3. THE MOMENT: Comparativa Táctil de Casos Reales
            ================================================================= */}
        <EditorialSurface
          as="section"
          id="comparativa"
          variant="contrast"
          tone="contrast"
          className="section-padding"
        >
          <div className="site-container">
            <div className="section-header" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
              <RevealText as="h2" className="section-title">
                Precisión clínica documentada
              </RevealText>
              <p
                className="section-subtitle"
                style={{ color: 'var(--accent-soft)', margin: '0.85rem auto 0' }}
              >
                Casos reales y rehabilitación estética por el Dr. Yomari Landrón.
              </p>
            </div>

            {/* Interactive Tactile Before/After Slider */}
            <InteractiveBeforeAfter />

            {/* Case Annotation */}
            <div
              style={{
                marginTop: '1.75rem',
                textAlign: 'center',
                fontSize: '0.86rem',
                color: 'var(--accent-soft)',
                opacity: 0.8
              }}
            >
              Rehabilitación protésica: Colocación de implante vs. Corona definitiva instalada
            </div>
          </div>
        </EditorialSurface>

        {/* =================================================================
            4. GALERÍA HORIZONTAL DE CASOS REALES
            ================================================================= */}
        <EditorialSurface
          as="section"
          id="casos"
          variant="ambient"
          tone="primary"
          className="section-padding"
        >
          <div className="site-container">
            <HorizontalShowcase
              header={
                <div>
                  <RevealText as="h2" className="section-title">
                    Casos clínicos seleccionados
                  </RevealText>
                  <p className="section-subtitle">
                    Resultados auténticos documentados en consulta en Santo Domingo.
                  </p>
                </div>
              }
              items={CASOS_GALERIA}
              renderItem={(caso) => (
                <div
                  className="case-card"
                  style={{
                    width: '320px',
                    borderRadius: 'var(--radius-media)',
                    overflow: 'hidden'
                  }}
                >
                  <ClipRevealImage
                    src={caso.photo}
                    alt={caso.title}
                    aspectRatio="4 / 5"
                    radius="var(--radius-media)"
                  />
                  <div style={{ marginTop: '0.85rem' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 500,
                        lineHeight: 1.2
                      }}
                    >
                      {caso.title}
                    </div>
                    <div
                      style={{
                        fontSize: '0.84rem',
                        color: 'var(--text-muted)',
                        marginTop: '0.25rem'
                      }}
                    >
                      {caso.meta}
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </EditorialSurface>

        {/* =================================================================
            5. DIRECCIÓN MÉDICA, SEDE & SEGUROS ARS
            ================================================================= */}
        <EditorialSurface
          as="section"
          id="clinica"
          variant="grain"
          tone="secondary"
          className="section-padding"
        >
          <div className="site-container">
            <StickyEditorialSplit
              ratio="55/45"
              pinned={
                <ClipRevealImage
                  src="./media/post_4.jpg"
                  alt="Instalación y precisión de prótesis en SunnyDent"
                  aspectRatio="4 / 5"
                  parallax
                  radius="var(--radius-media)"
                />
              }
            >
              <div style={{ paddingLeft: 'clamp(0rem, 2vw, 2.5rem)' }}>
                <RevealText as="h2" className="section-title">
                  Dirección y filosofía
                </RevealText>

                <blockquote
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                    lineHeight: 1.2,
                    fontWeight: 400,
                    margin: '1.5rem 0',
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)'
                  }}
                >
                  "Resultados sutiles y elegantes para transformar vidas devolviendo seguridad y bienestar."
                </blockquote>

                <div style={{ fontSize: '0.94rem', color: 'var(--accent)', fontWeight: 500 }}>
                  Dr. Yomari Landrón · Dirección Médica SunnyDent
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    marginTop: '0.5rem'
                  }}
                >
                  <MapPin size={16} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                  <span>Calle Leonor Feltz #21, Mirador Sur, Santo Domingo</span>
                </div>

                {/* Counter Metrics */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1.5rem',
                    marginTop: '2.5rem'
                  }}
                >
                  <CounterMetric value="3,920+" label="Seguidores en Instagram" />
                  <CounterMetric value="148" label="Publicaciones y casos" />
                </div>

                {/* ARS Insurers Strip */}
                <div
                  style={{
                    marginTop: '3rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid var(--border-hairline)'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      marginBottom: '1rem'
                    }}
                  >
                    Planes médicos y ARS aceptados
                  </div>

                  <div className="ars-grid">
                    {SEGUROS_ARS.map((ars, idx) => (
                      <div key={idx} className="ars-card" title={ars.name}>
                        <img src={ars.src} alt={ars.name} loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </StickyEditorialSplit>
          </div>
        </EditorialSurface>

        {/* =================================================================
            6. CIERRE, CONSULTA & FAQS HONESTOS
            ================================================================= */}
        <EditorialSurface
          as="section"
          id="contacto"
          variant="mesh"
          tone="primary"
          className="section-padding"
        >
          {/* Subtle Kinetic Marquee */}
          <div style={{ marginBottom: '4rem' }}>
            <EditorialMarquee
              items={[
                'Diseño de Sonrisa',
                'Medicina Estética',
                'Mirador Sur',
                'Santo Domingo',
                'Resina Compuesta',
                'Disilicato de Litio',
                'Dr. Yomari Landrón',
                'Toxina HUTOX',
                'Exosomas & PDRN'
              ]}
              durationSeconds={40}
            />
          </div>

          <div className="site-container" style={{ textAlign: 'center' }}>
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              <RevealText as="h2" className="section-title">
                Comienza tu transformación
              </RevealText>
              <p
                className="section-subtitle"
                style={{ margin: '0.85rem auto 2.5rem', textAlign: 'center' }}
              >
                Agenda tu valoración privada y personalizada en Mirador Sur.
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                <MagneticButton
                  variant="primary"
                  href="https://wa.me/18099016135?text=Hola%20SunnyDent,%20deseo%20agendar%20una%20evaluaci%C3%B3n"
                  target="_blank"
                >
                  Agendar por WhatsApp
                </MagneticButton>
                <MagneticButton
                  variant="secondary"
                  href="https://www.instagram.com/sunnydent.rd/"
                  target="_blank"
                >
                  Instagram oficial
                </MagneticButton>
              </div>
            </div>
          </div>
        </EditorialSurface>
      </main>

      {/* =================================================================
          FOOTER: Minimalist Studio Luxury
          ================================================================= */}
      <footer className="site-footer">
        <div className="site-container">
          <div className="site-footer__grid">
            <div>
              <div className="site-footer__brand-title">SunnyDent</div>
              <p className="site-footer__address">
                Odontología Especializada & Medicina Estética.
                <br />
                Calle Leonor Feltz #21, Mirador Sur, Santo Domingo, R.D.
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  marginTop: '1.25rem',
                  fontSize: '0.92rem'
                }}
              >
                <a
                  href="https://wa.me/18099016135"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="craft-link-underline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Phone size={15} /> 809-901-6135
                </a>
                <a
                  href="https://www.instagram.com/sunnydent.rd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="craft-link-underline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Instagram size={15} /> @sunnydent.rd
                </a>
              </div>
            </div>

            <div>
              <div className="site-footer__heading">Navegación</div>
              <ul className="site-footer__links">
                <li>
                  <a href="#inicio" className="craft-link-underline">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#especialidades" className="craft-link-underline">
                    Especialidades
                  </a>
                </li>
                <li>
                  <a href="#comparativa" className="craft-link-underline">
                    Comparativa
                  </a>
                </li>
                <li>
                  <a href="#casos" className="craft-link-underline">
                    Casos Reales
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="site-footer__heading">Clínica</div>
              <ul className="site-footer__links">
                <li>
                  <a href="#clinica" className="craft-link-underline">
                    Dr. Yomari Landrón
                  </a>
                </li>
                <li>
                  <a href="#clinica" className="craft-link-underline">
                    Seguros ARS
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/18099016135?text=Hola%20SunnyDent,%20deseo%20agendar%20una%20evaluaci%C3%B3n"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="craft-link-underline"
                  >
                    Agendar cita
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="site-footer__bottom">
            <div>© {new Date().getFullYear()} SunnyDent. Todos los derechos reservados.</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
              Santo Domingo · República Dominicana
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
