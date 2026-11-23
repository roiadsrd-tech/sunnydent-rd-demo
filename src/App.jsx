import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowUpRight,
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import {
  EditorialSurface,
  RevealText,
  ClipRevealImage,
  MagneticButton,
  ScrollProgressBar
} from './craft';

const WHATSAPP_URL = "https://wa.me/18099016135?text=Hola%2C%20vi%20la%20web%20de%20SunnyDent%20y%20me%20gustar%C3%ADa%20agendar%20una%20evaluaci%C3%B3n%20de%20consulta.";
const INSTAGRAM_URL = "https://www.instagram.com/sunnydent.rd/";
const MAPS_URL = "https://maps.google.com/?q=Calle+Leonor+Feltz+21+Mirador+Sur+Santo+Domingo";

/* ==========================================================================
   DATOS VERIFICADOS 100% LITERALES DEL BRIEF (CERO INVENCIONES)
   ========================================================================== */

const SERVICES_DATA = [
  {
    number: "01",
    title: "Diseño de Sonrisa & Estética Dental",
    slug: "diseno-de-sonrisa-y-estetica-dental",
    kicker: "ESTÉTICA RESTAURADORA & CARILLAS",
    description: "Perfeccionamiento anatómico y armónico mediante carillas de resina compuesta o cerámica, respetando la estructura biológica original.",
    features: [
      {
        title: "Estratificación biomimética",
        desc: "Capas progresivas de resina que reproducen la translucidez, textura y opalescencia natural del esmalte."
      },
      {
        title: "Blanqueamiento clínico guiado",
        desc: "Protocolos de aclaramiento profesional que acondicionan el tono previo a cualquier restauración."
      },
      {
        title: "Mantenimiento preventivo",
        desc: "Pulido y control oclusal continuo para asegurar la durabilidad y brillo a largo plazo."
      }
    ],
    photos: ["./media/ai_service_1.webp"]
  },
  {
    number: "02",
    title: "Medicina Estética & Armonización Facial",
    slug: "medicina-estetica-y-armonizacion-facial",
    kicker: "DERMATOLOGÍA Y REJUVENECIMIENTO",
    description: "Procedimientos médico-estéticos mínimamente invasivos orientados a la bioestimulación, textura dérmica y descanso de arrugas dinámicas.",
    features: [
      {
        title: "Toxina Botulínica HUTOX",
        desc: "Relajación muscular selectiva para atenuar arrugas de expresión conservando la naturalidad gestual."
      },
      {
        title: "Exosomas & PDNR con Dermapen",
        desc: "Terapia celular regenerativa que estimula colágeno, repara la matriz dérmica y aporta luminosidad profunda."
      },
      {
        title: "Enzimas Recombinantes",
        desc: "Tratamiento dirigido para la reducción progresiva de adiposidad localizada facial y corporal."
      }
    ],
    photos: ["./media/ai_service_2.webp", "./media/post_28.jpg"]
  },
  {
    number: "03",
    title: "Rehabilitación Oral & Implantes Dentales",
    slug: "rehabilitacion-oral-e-implantes",
    kicker: "FUNCIÓN, PRÓTESIS Y ESTRUCTURA",
    description: "Restitución de dientes ausentes, soporte oclusal y reemplazo protésico definitivo mediante implantes y coronas de alta resistencia.",
    features: [
      {
        title: "Escaneo Intraoral 3D",
        desc: "Planificación digital exacta sin moldes incómodos, optimizando la precisión de ajuste de coronas e implantes."
      },
      {
        title: "Disilicato de Litio & Coronas",
        desc: "Estructuras libres de metal con máxima resistencia a la carga masticatoria e integración óptica."
      },
      {
        title: "Puentes Conservadores (Maryland)",
        desc: "Reposición fija de piezas ausentes anclada sin necesidad de tallar agresivamente las piezas vecinas."
      }
    ],
    photos: ["./media/ai_service_3.webp"]
  },
  {
    number: "04",
    title: "Odontopediatría & Odontología Preventiva",
    slug: "odontopediatria-y-cuidado-preventivo",
    kicker: "SALUD BUCAL FAMILIAR",
    description: "Atención especializada para niños y controles preventivos familiares para la detección oportuna de caries, maloclusiones y profilaxis.",
    features: [
      {
        title: "Evaluación del desarrollo oclusal",
        desc: "Diagnóstico temprano de patrones de mordida y hábitos perjudiciales para intervenir a tiempo."
      },
      {
        title: "Profilaxis y aplicación tópica",
        desc: "Limpieza profunda profiláctica y fortalecimiento del esmalte infantil ante la formación de caries."
      },
      {
        title: "Cobertura con seguros médicos",
        desc: "Facilidad de uso de planes complementarios y básicos en las consultas preventivas de los más pequeños."
      }
    ],
    photos: ["./media/ai_service_4.webp"]
  }
];

const CASOS_DATA = [
  {
    code: "CASO 01",
    title: "Diseño de Sonrisa en Resina Compuesta",
    category: "Diseño de Sonrisa & Estética Dental",
    location: "Mirador Sur, Santo Domingo",
    challenge: "La paciente presentaba una base dental armónica, requiriendo corregir pequeñas asimetrías de forma y perfeccionar bordes incisales sin alterar su fisonomía natural.",
    solution: "Estratificación directa en resina compuesta, respetando la anatomía existente y logrando integración óptica y equilibrio.",
    photos: ["./media/post_20.jpg", "./media/post_27.jpg"]
  },
  {
    code: "CASO 02",
    title: "Implante Dental con Corona Cementada",
    category: "Rehabilitación Oral & Implantes",
    location: "Santo Domingo, República Dominicana",
    challenge: "Espacio edéntulo que afectaba la capacidad masticatoria y la confianza del paciente al sonreír.",
    solution: "Colocación de implante osteointegrado y rehabilitación mediante corona protésica cementada de alta precisión.",
    photos: ["./media/post_4.jpg", "./media/post_26.jpg"]
  },
  {
    code: "CASO 03",
    title: "Reposición de Pieza #32 con Puente Tipo Maryland",
    category: "Rehabilitación Oral & Implantes",
    location: "Santo Domingo, República Dominicana",
    challenge: "Pérdida de incisivo inferior en sector anterior con requerimiento de rehabilitación fija sin desgaste invasivo de dientes adyacentes.",
    solution: "Diseño y fijación de puente adhesivo tipo Maryland fabricado en disilicato de litio, restaurando anatomía y función de forma conservadora.",
    photos: ["./media/post_24.jpg", "./media/post_23.jpg"]
  },
  {
    code: "CASO 04",
    title: "Alargamiento Coronario y Corona Definitiva",
    category: "Rehabilitación Oral & Implantes",
    location: "Mirador Sur, Santo Domingo",
    challenge: "Diente con remanente estructural comprometido y fractura que impedía la retención protésica convencional.",
    solution: "Evaluación radiográfica, cirugía de alargamiento de corona clínica para exponer tejido sano y posterior rehabilitación con corona fija definitiva.",
    photos: ["./media/post_21.jpg", "./media/post_22.jpg"]
  },
  {
    code: "CASO 05",
    title: "Armonización y Glow Labial (HydraLips)",
    category: "Medicina Estética & Armonización Facial",
    location: "Santo Domingo, República Dominicana",
    challenge: "Tejido labial deshidratado, pérdida de definición del bermellón y aspereza en la textura superficial.",
    solution: "Protocolo de hidratación profunda y aporte de luminosidad para devolver tersura, volumen natural y aspecto jugoso sin rigidez.",
    photos: ["./media/post_15.jpg", "./media/post_16.jpg"]
  },
  {
    code: "CASO 06",
    title: "Resinas Estéticas para Paciente Internacional",
    category: "Diseño de Sonrisa & Estética Dental",
    location: "Santo Domingo, República Dominicana",
    challenge: "Paciente residente en Estados Unidos que requería corrección integral de forma, proporción y luminosidad dental durante su estancia en el país.",
    solution: "Tratamiento coordinado de resinas estéticas de alta definición, armonizando el frente estético con sus proporciones faciales.",
    photos: ["./media/post_36.jpg", "./media/post_35.jpg"]
  }
];

const DOCTORS_DATA = [
  {
    name: "Dr. Roberto Reynoso",
    role: "Rehabilitación y estética dental / Prótesis",
    bio: "Especialista en rehabilitación oral integral, oclusión, prótesis sobre implantes y odontología adhesiva biomimética.",
    photo: "./media/post_31.jpg"
  },
  {
    name: "Dra. Yomari Landrón",
    role: "Odontóloga & Estética Dental",
    bio: "Enfocada en diseño de sonrisa personalizado, estratificación directa en resina y tratamientos armónicos orientados al detalle.",
    photo: "./media/post_30.jpg"
  },
  {
    name: "Dra. Liliana Rubiera",
    role: "Odontopediatría",
    bio: "Atención especializada para niños y adolescentes con enfoque preventivo, control del desarrollo y adaptación positiva.",
    photo: "./media/logo_real.jpg",
    isBrand: true
  }
];

const SEGUROS_VERIFICADOS = [
  { name: "SENASA", note: "Básico y complementarios", logo: "./logos-seguros/logo2022.webp" },
  { name: "ARS Primera de Humano", note: "Cobertura confirmada", logo: "./logos-seguros/Logohumano2016.webp" },
  { name: "ARS Reservas", note: "Básico y complementarios", logo: "./logos-seguros/ars_seguros_banreservas.d729df7.png" },
  { name: "Metasalud", note: "Cobertura confirmada", logo: null },
  { name: "ARS Renacer", note: "Cobertura confirmada", logo: null },
  { name: "Monumental", note: "Cobertura confirmada", logo: null }
];

/* ==========================================================================
   THE MOMENT: BEFORE & AFTER SLIDER INTERACTIVO
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

        {/* Capa Inicial (Antes: post_21.jpg) */}
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

        {/* Tirador deslizante de alta precisión */}
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

/* ==========================================================================
   APLICACIÓN PRINCIPAL: ROUTER MULTI-PÁGINA BASADO EN HASH
   Rutas: #/, #/servicios, #/servicios/:slug, #/casos, #/nosotros, #/contacto
   ========================================================================== */
export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Escuchar cambios de hash y scroll to top suave
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentHash(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Cerrar menú móvil al cambiar de tamaño
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigateTo = (hash) => {
    window.location.hash = hash;
    setMobileMenuOpen(false);
  };

  // Resolver subpágina de servicio individual
  const isServiceDetail = currentHash.startsWith('#/servicios/');
  const serviceSlug = isServiceDetail ? currentHash.replace('#/servicios/', '') : null;
  const currentService = serviceSlug ? SERVICES_DATA.find(s => s.slug === serviceSlug) : null;

  return (
    <div className="app-root">
      <ScrollProgressBar color="var(--accent)" />

      {/* ====================================================================
          HEADER: NAVBAR FLOTANTE GLASSMORPHISM
          ==================================================================== */}
      <header className="site-header">
        <nav className="navbar-pill">
          {/* Logo oficial intacto con su fondo original #A97D58 */}
          <a href="#/" className="navbar-brand" onClick={() => navigateTo('#/')}>
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
            <a
              href="#/"
              className={`navbar-link ${currentHash === '#/' ? 'active' : ''}`}
              onClick={() => navigateTo('#/')}
            >
              Inicio
            </a>
            <a
              href="#/servicios"
              className={`navbar-link ${currentHash.startsWith('#/servicios') ? 'active' : ''}`}
              onClick={() => navigateTo('#/servicios')}
            >
              Especialidades
            </a>
            <a
              href="#/casos"
              className={`navbar-link ${currentHash === '#/casos' ? 'active' : ''}`}
              onClick={() => navigateTo('#/casos')}
            >
              Casos Reales
            </a>
            <a
              href="#/nosotros"
              className={`navbar-link ${currentHash === '#/nosotros' ? 'active' : ''}`}
              onClick={() => navigateTo('#/nosotros')}
            >
              Especialistas
            </a>
            <a
              href="#/contacto"
              className={`navbar-link ${currentHash === '#/contacto' ? 'active' : ''}`}
              onClick={() => navigateTo('#/contacto')}
            >
              Visítanos
            </a>
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
                    href="#/"
                    className={`mobile-nav-link ${currentHash === '#/' ? 'active' : ''}`}
                    onClick={() => navigateTo('#/')}
                  >
                    <span>Inicio</span>
                    <ArrowUpRight size={18} />
                  </a>
                </li>
                <li>
                  <a
                    href="#/servicios"
                    className={`mobile-nav-link ${currentHash.startsWith('#/servicios') ? 'active' : ''}`}
                    onClick={() => navigateTo('#/servicios')}
                  >
                    <span>Especialidades</span>
                    <ArrowUpRight size={18} />
                  </a>
                </li>
                <li>
                  <a
                    href="#/casos"
                    className={`mobile-nav-link ${currentHash === '#/casos' ? 'active' : ''}`}
                    onClick={() => navigateTo('#/casos')}
                  >
                    <span>Casos Reales</span>
                    <ArrowUpRight size={18} />
                  </a>
                </li>
                <li>
                  <a
                    href="#/nosotros"
                    className={`mobile-nav-link ${currentHash === '#/nosotros' ? 'active' : ''}`}
                    onClick={() => navigateTo('#/nosotros')}
                  >
                    <span>Especialistas</span>
                    <ArrowUpRight size={18} />
                  </a>
                </li>
                <li>
                  <a
                    href="#/contacto"
                    className={`mobile-nav-link ${currentHash === '#/contacto' ? 'active' : ''}`}
                    onClick={() => navigateTo('#/contacto')}
                  >
                    <span>Visítanos & Seguros ARS</span>
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

      {/* ====================================================================
          VISTAS DINÁMICAS ENVUELTAS EN ANIMATEPRESENCE
          ==================================================================== */}
      <AnimatePresence mode="wait">
        {/* SUBPÁGINA DEDICADA DE SERVICIO: #/servicios/:slug */}
        {isServiceDetail && currentService && (
          <motion.main
            key={`service-${currentService.slug}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
          >
            <EditorialSurface variant="ambient" tone="primary" className="page-header-editorial">
              <div className="editorial-container">
                <button
                  type="button"
                  onClick={() => navigateTo('#/servicios')}
                  className="btn-editorial-ghost"
                  style={{ marginBottom: 32, padding: '10px 22px', fontSize: '0.88rem' }}
                >
                  <ArrowLeft size={16} />
                  <span>Volver a especialidades</span>
                </button>

                <div className="service-detail-hero-grid">
                  <div>
                    <span className="doctor-specialty">{currentService.kicker}</span>
                    <h1 className="h1-monumental" style={{ marginTop: 12, marginBottom: 18 }}>
                      {currentService.title}
                    </h1>
                    <p className="sub-lead">
                      {currentService.description}
                    </p>

                    <div className="service-features-list">
                      {currentService.features.map((feat, idx) => (
                        <div key={idx} className="service-feature-item">
                          <span className="service-feature-num">0{idx + 1}</span>
                          <div>
                            <h3 className="service-feature-title">{feat.title}</h3>
                            <p className="service-feature-desc">{feat.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: 28 }}>
                      <MagneticButton
                        variant="primary"
                        href={`https://wa.me/18099016135?text=Hola%2C%20quisiera%20agendar%20una%20evaluaci%C3%B3n%20para%20${encodeURIComponent(currentService.title)}.`}
                        target="_blank"
                        className="btn-editorial-primary"
                      >
                        <span>Agendar este tratamiento</span>
                        <ArrowUpRight size={18} />
                      </MagneticButton>
                    </div>
                  </div>

                  <div className="service-detail-media">
                    <img
                      src={currentService.photos[0]}
                      alt={currentService.title}
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </EditorialSurface>
          </motion.main>
        )}

        {/* PÁGINA CATÁLOGO DE ESPECIALIDADES: #/servicios */}
        {!isServiceDetail && currentHash === '#/servicios' && (
          <motion.main
            key="page-servicios"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
          >
            <EditorialSurface variant="ambient" tone="primary" className="page-header-editorial">
              <div className="editorial-container">
                <div className="section-head-editorial">
                  <h1 className="h1-monumental">Especialidades clínicas</h1>
                  <p className="sub-lead">
                    Protocolos odontológicos de alta precisión y medicina estética orientados al equilibrio natural.
                  </p>
                </div>

                <div className="services-grid-4">
                  {SERVICES_DATA.map((service) => (
                    <article
                      key={service.slug}
                      className="service-card"
                      onClick={() => navigateTo(`#/servicios/${service.slug}`)}
                    >
                      <div className="service-card__media">
                        <img
                          src={service.photos[0]}
                          alt={service.title}
                          loading="lazy"
                        />
                      </div>
                      <div className="service-card__body">
                        <h2 className="service-card__title">{service.title}</h2>
                        <p className="service-card__desc">{service.description}</p>
                        <div className="service-card__footer">
                          <span>Ver detalles</span>
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </EditorialSurface>
          </motion.main>
        )}

        {/* PÁGINA DEDICADA DE CASOS REALES: #/casos */}
        {!isServiceDetail && currentHash === '#/casos' && (
          <motion.main
            key="page-casos"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
          >
            <EditorialSurface variant="ambient" tone="primary" className="page-header-editorial">
              <div className="editorial-container">
                <div className="section-head-editorial" style={{ textAlign: 'center', alignItems: 'center' }}>
                  <h1 className="h1-monumental">Casos y resultados</h1>
                  <p className="sub-lead">
                    Evidencia fotográfica documentada de restauraciones, armonización y tratamientos clínicos.
                  </p>
                </div>

                {/* The Moment Slider */}
                <div style={{ marginBottom: 64 }}>
                  <SmileCompareSlider />
                </div>

                <div className="cases-grid-editorial">
                  {CASOS_DATA.map((caso) => (
                    <article key={caso.code} className="case-card-bespoke">
                      <div className="case-card-gallery">
                        <img src={caso.photos[0]} alt={`${caso.title} - Registro 1`} loading="lazy" />
                        <img src={caso.photos[1]} alt={`${caso.title} - Registro 2`} loading="lazy" />
                      </div>
                      <div className="case-card-body">
                        <div className="case-card-meta">
                          <span>{caso.code}</span>
                          <span>{caso.category}</span>
                        </div>
                        <h2 className="case-card-title">{caso.title}</h2>
                        <p className="case-card-text">
                          <strong>Objetivo:</strong> {caso.challenge}
                        </p>
                        <p className="case-card-text">
                          <strong>Solución:</strong> {caso.solution}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </EditorialSurface>
          </motion.main>
        )}

        {/* PÁGINA DEDICADA DE ESPECIALISTAS: #/nosotros */}
        {!isServiceDetail && currentHash === '#/nosotros' && (
          <motion.main
            key="page-nosotros"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
          >
            <EditorialSurface variant="ambient" tone="primary" className="page-header-editorial">
              <div className="editorial-container">
                <div className="about-split-lead">
                  <div>
                    <h1 className="h1-monumental">Cuerpo facultativo</h1>
                    <p className="sub-lead" style={{ marginTop: 16 }}>
                      Odontología especializada y medicina estética en Mirador Sur.
                    </p>
                  </div>
                  <div className="hero-visual-frame">
                    <img
                      src="./media/ai_hero.webp"
                      alt="Espacio clínico de SunnyDent"
                      loading="eager"
                    />
                  </div>
                </div>

                <div className="quote-editorial-box">
                  <p className="quote-editorial-text">
                    "A veces no se trata de transformar, sino de resaltar lo bonito que ya existe con resultados sutiles y elegantes."
                  </p>
                </div>

                <div className="section-head-editorial" style={{ marginTop: 64 }}>
                  <h2 className="h2-monumental">Nuestros especialistas</h2>
                </div>

                <div className="team-grid-bespoke">
                  {DOCTORS_DATA.map((doc, idx) => (
                    <article key={idx} className="doctor-profile-card">
                      <div className={`doctor-profile-frame${doc.isBrand ? " doctor-profile-frame--brand" : ""}`}>
                        <img src={doc.photo} alt={doc.name} loading="lazy" />
                      </div>
                      <div className="doctor-profile-body">
                        <span className="doctor-specialty">{doc.role}</span>
                        <h3 className="doctor-name">{doc.name}</h3>
                        <p className="doctor-bio-brief">{doc.bio}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </EditorialSurface>
          </motion.main>
        )}

        {/* PÁGINA DEDICADA DE CONTACTO / VISÍTANOS: #/contacto */}
        {!isServiceDetail && currentHash === '#/contacto' && (
          <motion.main
            key="page-contacto"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
          >
            <EditorialSurface variant="ambient" tone="primary" className="page-header-editorial">
              <div className="editorial-container">
                <div className="contact-page-grid">
                  {/* Información directa */}
                  <div>
                    <h1 className="h1-monumental">Visítanos en Mirador Sur</h1>
                    <p className="sub-lead" style={{ marginTop: 16 }}>
                      Atención por cita previa. Coordina por WhatsApp.
                    </p>

                    <div style={{ marginTop: 32 }}>
                      <div className="location-item-row">
                        <div className="location-icon-wrapper">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <strong>Ubicación física</strong>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                            Calle Leonor Feltz #21, Mirador Sur, Santo Domingo, República Dominicana 10114
                          </p>
                          <p style={{ color: 'var(--accent)', fontSize: '0.85rem', marginTop: 4 }}>
                            Próximo al Colegio Carol Morgan, Juan Valdez y Supermercados Nacional
                          </p>
                        </div>
                      </div>

                      <div className="location-item-row">
                        <div className="location-icon-wrapper">
                          <Phone size={20} />
                        </div>
                        <div>
                          <strong>Teléfono / WhatsApp</strong>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                            (809) 901-6135
                          </p>
                        </div>
                      </div>

                      <div className="location-item-row">
                        <div className="location-icon-wrapper">
                          <ShieldCheck size={20} />
                        </div>
                        <div>
                          <strong>Evaluaciones presenciales</strong>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                            En cumplimiento con la Ley 74-25, todo diagnóstico o plan clínico se realiza de forma presencial.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                      <MagneticButton
                        variant="primary"
                        href={WHATSAPP_URL}
                        target="_blank"
                        className="btn-editorial-primary"
                      >
                        <span>Escribir por WhatsApp</span>
                        <ArrowUpRight size={18} />
                      </MagneticButton>

                      <a
                        href={MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-editorial-ghost"
                      >
                        <span>Cómo llegar en Google Maps</span>
                        <ArrowUpRight size={18} />
                      </a>
                    </div>
                  </div>

                  {/* Directorio de Seguros ARS */}
                  <div className="ars-block-card">
                    <div>
                      <h2 className="h2-monumental" style={{ fontSize: '2rem', marginTop: 8 }}>
                        Aseguradoras ARS
                      </h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 8 }}>
                        Aseguradoras aceptadas.
                      </p>
                    </div>

                    <div className="ars-logos-grid">
                      {SEGUROS_VERIFICADOS.map((ars, idx) => (
                        <div key={idx} className={ars.logo ? "ars-logo-box" : "ars-type-box"}>
                          {ars.logo ? (
                            <img src={ars.logo} alt={ars.name} loading="lazy" />
                          ) : (
                            <span>{ars.name}</span>
                          )}
                        </div>
                      ))}
                    </div>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Valida tu plan por WhatsApp antes de tu cita.
                    </p>
                  </div>
                </div>
              </div>
            </EditorialSurface>
          </motion.main>
        )}

        {/* ==================================================================
            PÁGINA PRINCIPAL COMPLETA (#/ INICIO — 6 SECCIONES RICAS)
            ================================================================== */}
        {!isServiceDetail && currentHash === '#/' && (
          <motion.main
            key="page-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* SECCIÓN 1: HERO PORTADA SPLIT IMMERSIVE FRAME (52/48) */}
            <EditorialSurface variant="ambient" tone="primary" id="hero" className="hero-section">
              <div className="editorial-container">
                <div className="hero-split-grid">
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

                      <button
                        type="button"
                        onClick={() => navigateTo('#/servicios')}
                        className="btn-editorial-ghost"
                      >
                        Ver especialidades
                      </button>
                    </div>
                  </div>

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

            {/* SECCIÓN 2: VITRINA VISUAL DE ESPECIALIDADES (4 COLUMNAS CON FOTOS COHESIVAS) */}
            <EditorialSurface variant="grain" tone="secondary" id="especialidades" className="section-spacing">
              <div className="editorial-container">
                <div className="section-head-split">
                  <div className="section-head-editorial" style={{ marginBottom: 0 }}>
                    <RevealText as="h2" className="h2-monumental">
                      Especialidades
                    </RevealText>
                    <p className="sub-lead">
                      Diseño de sonrisa, armonización facial, prótesis y odontopediatría.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('#/servicios')}
                    className="btn-editorial-ghost"
                    style={{ padding: '10px 22px', fontSize: '0.88rem' }}
                  >
                    <span>Ver catálogo completo</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>

                <div className="services-grid-4" style={{ marginTop: 40 }}>
                  {SERVICES_DATA.map((service) => (
                    <article
                      key={service.slug}
                      className="service-card"
                      onClick={() => navigateTo(`#/servicios/${service.slug}`)}
                    >
                      <div className="service-card__media">
                        <img
                          src={service.photos[0]}
                          alt={service.title}
                          loading="lazy"
                        />
                      </div>
                      <div className="service-card__body">
                        <h3 className="service-card__title">{service.title}</h3>
                        <p className="service-card__desc">{service.description}</p>
                        <div className="service-card__footer">
                          <span>Conocer tratamiento</span>
                          <ArrowUpRight size={15} />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </EditorialSurface>

            {/* SECCIÓN 3: TRANSFORMACIONES REALES & THE MOMENT (BEFORE / AFTER INTERACTIVO) */}
            <EditorialSurface variant="mesh" tone="primary" id="casos-clinicos" className="section-spacing">
              <div className="editorial-container">
                <div className="section-head-split" style={{ marginBottom: 36 }}>
                  <div>
                    <RevealText as="h2" className="h2-monumental">
                      Transformaciones reales
                    </RevealText>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('#/casos')}
                    className="btn-editorial-ghost"
                    style={{ padding: '10px 22px', fontSize: '0.88rem' }}
                  >
                    <span>Ver todos los casos</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>

                <SmileCompareSlider />
              </div>
            </EditorialSurface>

            {/* SECCIÓN 4: NUESTROS ESPECIALISTAS */}
            <EditorialSurface variant="contrast" tone="contrast" id="equipo" className="section-spacing">
              <div className="editorial-container">
                <div className="section-head-split" style={{ marginBottom: 40 }}>
                  <div>
                    <RevealText as="h2" className="h2-monumental h2-monumental--contrast">
                      Nuestros especialistas
                    </RevealText>
                    <p className="sub-lead" style={{ color: "color-mix(in srgb, var(--text-on-contrast) 72%, transparent)" }}>
                      Diagnóstico riguroso, cuidado personalizado.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('#/nosotros')}
                    className="btn-editorial-ghost btn-on-contrast" style={{ padding: '10px 22px', fontSize: '0.88rem' }}
                  >
                    <span>Conocer al equipo</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>

                <div className="team-grid-bespoke">
                  {DOCTORS_DATA.map((doc, idx) => (
                    <article key={idx} className="doctor-profile-card">
                      <div className={`doctor-profile-frame${doc.isBrand ? " doctor-profile-frame--brand" : ""}`}>
                        <img src={doc.photo} alt={doc.name} loading="lazy" />
                      </div>
                      <div className="doctor-profile-body">
                        <span className="doctor-specialty">{doc.role}</span>
                        <h3 className="doctor-name">{doc.name}</h3>
                        <p className="doctor-bio-brief">{doc.bio}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </EditorialSurface>

            {/* SECCIÓN 5: ARS ACEPTADAS & SEDE (LAYOUT SIMÉTRICO DE DOS BLOQUES) */}
            <EditorialSurface variant="ambient" tone="primary" id="seguros-ubicacion" className="section-spacing">
              <div className="editorial-container">
                <div className="seguros-location-split">
                  {/* Bloque Seguros */}
                  <div className="ars-block-card">
                    <div>
                      <h3 className="h2-monumental" style={{ fontSize: '2.1rem', marginTop: 8 }}>
                        Seguros médicos
                      </h3>
                    </div>

                    <div className="ars-logos-grid">
                      {SEGUROS_VERIFICADOS.map((ars, idx) => (
                        <div key={idx} className={ars.logo ? "ars-logo-box" : "ars-type-box"}>
                          {ars.logo ? (
                            <img src={ars.logo} alt={ars.name} loading="lazy" />
                          ) : (
                            <span>{ars.name}</span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<span />                      <button
                        type="button"
                        onClick={() => navigateTo('#/contacto')}
                        className="btn-editorial-ghost"
                        style={{ padding: '10px 20px', fontSize: '0.85rem' }}
                      >
                        Directorio ARS
                      </button>
                    </div>
                  </div>

                  {/* Bloque Sede & Contacto */}
                  <div className="location-block-card">
                    <div>
                      <h3 className="h2-monumental" style={{ fontSize: '2.1rem', marginTop: 8 }}>
                        Visítanos
                      </h3>
                    </div>

                    <div style={{ margin: '24px 0' }}>
                      <div className="location-item-row">
                        <div className="location-icon-wrapper">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <strong>Dirección</strong>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                            Calle Leonor Feltz #21, Mirador Sur, Santo Domingo
                          </p>
                        </div>
                      </div>

                      <div className="location-item-row" style={{ marginBottom: 0 }}>
                        <div className="location-icon-wrapper">
                          <Phone size={20} />
                        </div>
                        <div>
                          <strong>WhatsApp de Citas</strong>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                            (809) 901-6135
                          </p>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <MagneticButton
                        variant="primary"
                        href={WHATSAPP_URL}
                        target="_blank"
                        className="btn-editorial-primary"
                        style={{ flexGrow: 1 }}
                      >
                        <span>Agendar por WhatsApp</span>
                        <ArrowUpRight size={16} />
                      </MagneticButton>

                      <a
                        href={MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-editorial-ghost"
                        style={{ padding: '14px 20px' }}
                      >
                        <span>Google Maps</span>
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </EditorialSurface>
          </motion.main>
        )}
      </AnimatePresence>

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
              "A veces no se trata de transformar, sino de resaltar lo bonito que ya existe con resultados sutiles y elegantes."
            </blockquote>

            <nav className="footer-nav-links" aria-label="Navegación del pie de página">
              <a href="#/" className="footer-link" onClick={() => navigateTo('#/')}>Inicio</a>
              <a href="#/servicios" className="footer-link" onClick={() => navigateTo('#/servicios')}>Especialidades</a>
              <a href="#/casos" className="footer-link" onClick={() => navigateTo('#/casos')}>Casos Reales</a>
              <a href="#/nosotros" className="footer-link" onClick={() => navigateTo('#/nosotros')}>Especialistas</a>
              <a href="#/contacto" className="footer-link" onClick={() => navigateTo('#/contacto')}>Visítanos & Seguros</a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="footer-link">Instagram (@sunnydent.rd)</a>
            </nav>

            <div className="footer-bottom-bar">
              <div>
                © {new Date().getFullYear()} SunnyDent · Clínica Dental & Medicina Estética.
              </div>
              <div>
                Calle Leonor Feltz #21, Mirador Sur, Santo Domingo, República Dominicana.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
