import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  useInView
} from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight, Plus } from 'lucide-react';

export const CRAFT_EASE = [0.22, 1, 0.36, 1];
export const CRAFT_VIEWPORT = { once: true, amount: 'some' };

/**
 * EditorialSurface — Section wrapper with layered tactile atmosphere
 * variant: 'grain' | 'ambient' | 'architectural' | 'contrast' | 'clean'
 * tone: 'primary' | 'secondary' | 'contrast'
 */
export function EditorialSurface({
  as = 'section',
  variant = 'grain',
  tone = 'primary',
  id,
  className = '',
  style = {},
  children,
  ...rest
}) {
  const Tag = as;
  const toneStyles =
    tone === 'contrast'
      ? {
          backgroundColor: 'var(--bg-contrast, #121315)',
          color: 'var(--text-on-contrast, #F6F4EF)'
        }
      : tone === 'secondary'
      ? {
          backgroundColor: 'var(--bg-secondary, #F0EFEA)',
          color: 'var(--text-primary, inherit)'
        }
      : {
          backgroundColor: 'var(--bg-primary, inherit)',
          color: 'var(--text-primary, inherit)'
        };

  const variantClass = variant && variant !== 'clean' ? `craft-surface--${variant}` : '';

  return (
    <Tag
      id={id}
      data-craft="surface"
      className={`craft-surface ${variantClass} ${className}`.trim()}
      style={{ ...toneStyles, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * RevealText — Masked editorial text reveal.
 * Observes the static outer container (never the translated child) so it NEVER stalls invisible,
 * and animates immediately on mount for H1 hero headings.
 */
export function RevealText({
  as = 'div',
  delay = 0,
  duration = 0.62,
  y = '28px',
  immediate,
  className = '',
  style = {},
  children,
  ...rest
}) {
  const reduced = useReducedMotion();
  const outerRef = useRef(null);
  const inView = useInView(outerRef, { once: true, amount: 'some' });
  const shouldPlay = Boolean(immediate ?? as === 'h1') || inView;
  const Tag = as;

  if (reduced) {
    return (
      <Tag className={className} style={style} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={outerRef}
      data-craft="reveal-text"
      className={className}
      style={{ overflow: 'hidden', ...style }}
      {...rest}
    >
      <motion.span
        style={{ display: 'block', willChange: 'transform, opacity' }}
        initial={{ y, opacity: 0 }}
        animate={shouldPlay ? { y: '0px', opacity: 1 } : { y, opacity: 0 }}
        transition={{ duration, delay, ease: CRAFT_EASE }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}

/**
 * ClipRevealImage — Curtain reveal + subtle settle scale + optional scroll parallax + hover zoom
 */
export function ClipRevealImage({
  src,
  alt = '',
  aspectRatio = '4 / 3',
  radius,
  parallax = false,
  priority = false,
  overlay = null,
  className = '',
  style = {},
  imgStyle = {}
}) {
  const reduced = useReducedMotion();
  const frameRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start']
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <motion.div
      ref={frameRef}
      data-craft="clip-image"
      className={`craft-media-frame ${className}`.trim()}
      style={{
        aspectRatio,
        borderRadius: radius || 'var(--radius-media, 12px)',
        ...style
      }}
      initial={
        reduced || priority
          ? false
          : { clipPath: 'inset(7% 0% 0% 0%)', opacity: 0.85 }
      }
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={CRAFT_VIEWPORT}
      transition={{ duration: 0.85, ease: CRAFT_EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        initial={reduced ? false : { scale: 1.07 }}
        whileInView={{ scale: 1 }}
        viewport={CRAFT_VIEWPORT}
        transition={{ duration: 1.05, ease: CRAFT_EASE }}
        style={{
          y: parallax && !reduced ? parallaxY : 0,
          height: parallax && !reduced ? '112%' : '100%',
          marginTop: parallax && !reduced ? '-6%' : 0,
          ...imgStyle
        }}
      />
      {overlay}
    </motion.div>
  );
}

/**
 * MagneticButton — Tactile magnetic pull + rising hover fill sweep, zero glowing shadows
 */
export function MagneticButton({
  href,
  onClick,
  variant = 'primary',
  target,
  rel,
  className = '',
  style = {},
  children,
  type = 'button',
  ...rest
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  const handleMouseMove = (e) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX * 8);
    y.set(relY * 6);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes = `craft-magnetic-btn craft-magnetic-btn--${variant} ${className}`.trim();
  const content = (
    <>
      <span className="craft-magnetic-btn__bg" aria-hidden="true" />
      <span className="craft-magnetic-btn__content">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        data-craft="magnetic-button"
        className={classes}
        style={{ x: springX, y: springY, ...style }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        {...rest}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      data-craft="magnetic-button"
      className={classes}
      style={{ x: springX, y: springY, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {content}
    </motion.button>
  );
}

/**
 * HoverPreviewList — The Anti-Card Editorial Index.
 * Numbered hairline rows paired with a sticky cross-fading photography stage on desktop
 * and clean inline photo reveal on mobile.
 */
export function HoverPreviewList({
  items = [],
  onSelect,
  aspectRatio = '4 / 5',
  className = ''
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const reduced = useReducedMotion();
  const safeItems = Array.isArray(items) ? items : [];
  const activeItem = safeItems[activeIdx] || safeItems[0] || null;

  if (safeItems.length === 0) return null;

  return (
    <div data-craft="hover-preview-list" className={`craft-hover-list ${className}`.trim()}>
      <div className="craft-hover-list__rows">
        {safeItems.map((item, idx) => {
          const isActive = idx === activeIdx;
          const num = item.number || String(idx + 1).padStart(2, '0');
          return (
            <button
              key={item.id || item.slug || idx}
              type="button"
              className={`craft-hover-list__row ${isActive ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveIdx(idx)}
              onFocus={() => setActiveIdx(idx)}
              onClick={() => {
                setActiveIdx(idx);
                if (typeof onSelect === 'function') onSelect(item, idx);
                else if (item.href) window.location.href = item.href;
              }}
            >
              <span className="craft-hover-list__num">{num}</span>
              <span style={{ minWidth: 0 }}>
                <span className="craft-hover-list__title" style={{ display: 'block' }}>
                  {item.title}
                </span>
                {item.meta && (
                  <span
                    style={{
                      display: 'block',
                      marginTop: 4,
                      fontSize: '0.82rem',
                      opacity: 0.56,
                      fontFamily: 'var(--font-mono, monospace)'
                    }}
                  >
                    {item.meta}
                  </span>
                )}
                {item.description && (
                  <span className="craft-hover-list__desc" style={{ display: 'block' }}>
                    {item.description}
                  </span>
                )}
                {isActive && item.photo && (
                  <span className="craft-hover-list__mobile-media">
                    <span
                      className="craft-media-frame"
                      style={{ display: 'block', aspectRatio: '4 / 3' }}
                    >
                      <img src={item.photo} alt={item.title || ''} loading="lazy" />
                    </span>
                  </span>
                )}
              </span>
              <span className="craft-hover-list__arrow" aria-hidden="true">
                <ArrowUpRight size={20} strokeWidth={1.5} />
              </span>
            </button>
          );
        })}
      </div>

      <div className="craft-hover-list__stage">
        <div
          className="craft-media-frame"
          style={{
            aspectRatio,
            borderRadius: 'var(--radius-media, 12px)',
            border: '1px solid var(--craft-hairline)'
          }}
        >
          <AnimatePresence mode="wait">
            {activeItem?.photo && (
              <motion.img
                key={activeItem.photo + activeIdx}
                src={activeItem.photo}
                alt={activeItem.title || ''}
                initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.45, ease: CRAFT_EASE }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}
          </AnimatePresence>
        </div>
        {activeItem?.caption && (
          <p
            style={{
              marginTop: 12,
              fontSize: '0.84rem',
              opacity: 0.62,
              lineHeight: 1.5
            }}
          >
            {activeItem.caption}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * StickyEditorialSplit — Pins a visual/headline column while the opposite column glides past
 */
export function StickyEditorialSplit({
  pinned,
  children,
  ratio = '55/45',
  pinPosition = 'left',
  className = ''
}) {
  const ratioClass =
    ratio === '45/55'
      ? 'craft-sticky-split--45-55'
      : ratio === '60/40'
      ? 'craft-sticky-split--60-40'
      : 'craft-sticky-split--55-45';

  return (
    <div
      data-craft="sticky-split"
      className={`craft-sticky-split ${ratioClass} ${className}`.trim()}
    >
      {pinPosition === 'left' ? (
        <>
          <div className="craft-sticky-split__pin">{pinned}</div>
          <div className="craft-sticky-split__flow">{children}</div>
        </>
      ) : (
        <>
          <div className="craft-sticky-split__flow">{children}</div>
          <div className="craft-sticky-split__pin">{pinned}</div>
        </>
      )}
    </div>
  );
}

/**
 * HorizontalShowcase — Smooth snap-scroll horizontal gallery with clean hairline arrows
 */
export function HorizontalShowcase({
  items = [],
  renderItem,
  header = null,
  className = ''
}) {
  const trackRef = useRef(null);
  const safeItems = Array.isArray(items) ? items : [];

  const scrollBySlide = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.max(300, Math.round(el.clientWidth * 0.68));
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  if (safeItems.length === 0) return null;

  return (
    <div data-craft="horizontal-showcase" className={className}>
      <div className="craft-rail-header">
        <div style={{ minWidth: 0, flex: '1 1 280px' }}>{header}</div>
        <div className="craft-rail-controls">
          <button
            type="button"
            className="craft-rail-btn"
            onClick={() => scrollBySlide(-1)}
            aria-label="Anterior"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="craft-rail-btn"
            onClick={() => scrollBySlide(1)}
            aria-label="Siguiente"
          >
            <ArrowRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div ref={trackRef} className="craft-rail-track">
        {safeItems.map((item, idx) => (
          <div key={item.id || idx} className="craft-rail-slide">
            {renderItem(item, idx)}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * EditorialMarquee — Slow, seamless kinetic ticker strip that pauses on hover
 */
export function EditorialMarquee({
  items = [],
  durationSeconds = 36,
  separator = '—',
  className = ''
}) {
  const cleanItems = (Array.isArray(items) ? items : []).filter(Boolean);
  if (cleanItems.length === 0) return null;

  const renderGroup = (prefix) => (
    <div className="craft-marquee__group" aria-hidden={prefix === 'dup'}>
      {cleanItems.map((text, idx) => (
        <span key={`${prefix}-${idx}`} className="craft-marquee__item">
          <span>{text}</span>
          <span className="craft-marquee__sep" aria-hidden="true">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      data-craft="marquee"
      className={`craft-marquee ${className}`.trim()}
      style={{ '--marquee-duration': `${durationSeconds}s` }}
    >
      <div className="craft-marquee__track">
        {renderGroup('main')}
        {renderGroup('dup')}
      </div>
    </div>
  );
}

/**
 * EditorialAccordion — Animated hairline rows (ideal for FAQs, schedules, specs)
 */
export function EditorialAccordion({ items = [], defaultOpen = 0, className = '' }) {
  const [openIdx, setOpenIdx] = useState(defaultOpen);
  const safeItems = Array.isArray(items) ? items : [];
  if (safeItems.length === 0) return null;

  return (
    <div data-craft="accordion" className={`craft-accordion ${className}`.trim()}>
      {safeItems.map((item, idx) => {
        const isOpen = idx === openIdx;
        return (
          <div
            key={item.id || idx}
            className={`craft-accordion__item ${isOpen ? 'is-open' : ''}`}
          >
            <button
              type="button"
              className="craft-accordion__trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenIdx(isOpen ? -1 : idx)}
            >
              <span style={{ minWidth: 0 }}>
                <span className="craft-accordion__q" style={{ display: 'block' }}>
                  {item.question || item.title}
                </span>
                {item.meta && (
                  <span
                    style={{
                      display: 'block',
                      marginTop: 4,
                      fontSize: '0.82rem',
                      opacity: 0.56,
                      fontFamily: 'var(--font-mono, monospace)'
                    }}
                  >
                    {item.meta}
                  </span>
                )}
              </span>
              <span className="craft-accordion__icon" aria-hidden="true">
                <Plus size={18} strokeWidth={1.5} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.34, ease: CRAFT_EASE }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="craft-accordion__body">{item.answer || item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/**
 * ScrollProgressBar — Ultra-quiet 2px hairline indicator at top of viewport
 */
export function ScrollProgressBar({ color }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      data-craft="scroll-progress"
      className="craft-scroll-progress"
      style={{ scaleX, backgroundColor: color || 'var(--accent, currentColor)' }}
      aria-hidden="true"
    />
  );
}

/**
 * CounterMetric — Clean editorial figure with tabular numerals, zero chunky stat cards
 */
export function CounterMetric({ value, label, note = '', className = '' }) {
  return (
    <motion.div
      data-craft="metric"
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={CRAFT_VIEWPORT}
      transition={{ duration: 0.55, ease: CRAFT_EASE }}
      style={{
        borderTop: '1px solid var(--craft-hairline)',
        paddingTop: 18,
        minWidth: 0
      }}
    >
      <div
        className="craft-tabular"
        style={{
          fontFamily: 'var(--font-display, inherit)',
          fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)',
          fontWeight: 400,
          lineHeight: 1.02,
          letterSpacing: '-0.03em'
        }}
      >
        {value}
      </div>
      <div style={{ marginTop: 8, fontSize: '0.92rem', opacity: 0.78 }}>{label}</div>
      {note && (
        <div style={{ marginTop: 4, fontSize: '0.8rem', opacity: 0.52 }}>{note}</div>
      )}
    </motion.div>
  );
}
