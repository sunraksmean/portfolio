// src/components/Hero.tsx
import { useState } from 'react';
import { ArrowDown, Download, Mail, MapPin, Phone, SendHorizontal } from 'lucide-react';

interface HeroProps {
  editMode: boolean;
}

export default function Hero({ editMode }: HeroProps) {
  // Persist availability status in localStorage
  const [available, setAvailable] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('portfolio-available');
      return saved !== null ? JSON.parse(saved) : true;
    } catch { return true; }
  });
  const [badgeHovered, setBadgeHovered] = useState(false);

  const toggleAvailable = () => {
    const next = !available;
    setAvailable(next);
    localStorage.setItem('portfolio-available', JSON.stringify(next));
  };

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '4rem',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(var(--border-subtle) 1px, transparent 1px),
          linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: 0.4,
      }} />

      {/* Gradient orbs */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '10%',
        width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%', right: '5%',
        width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-grid">

          {/* ── Text column ── */}
          <div className="hero-text">
            {/* Availability Badge — owner-only toggle */}
            <div className="availability-badge" style={{ marginBottom: '1.25rem' }}>
              {editMode ? (
                /* ── Owner: clickable toggle ── */
                <button
                  onClick={toggleAvailable}
                  onMouseEnter={() => setBadgeHovered(true)}
                  onMouseLeave={() => setBadgeHovered(false)}
                  title="Click to toggle availability"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.25rem 0.75rem',
                    background: available ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                    border: available ? '1px solid rgba(16,185,129,0.35)' : '1px solid rgba(239,68,68,0.35)',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: available ? '#10b981' : '#ef4444',
                    letterSpacing: '0.02em',
                    cursor: 'pointer',
                    fontFamily: "'Kantumruy Pro', sans-serif",
                    transition: 'all 0.25s ease',
                    transform: badgeHovered ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: badgeHovered
                      ? available ? '0 0 12px rgba(16,185,129,0.3)' : '0 0 12px rgba(239,68,68,0.3)'
                      : 'none',
                  }}
                >
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: available ? '#10b981' : '#ef4444',
                    display: 'inline-block',
                    animation: available ? 'pulse-dot 2s infinite' : 'none',
                    flexShrink: 0,
                  }} />
                  {badgeHovered
                    ? (available ? 'Click → Set Unavailable' : 'Click → Set Available')
                    : (available ? 'Available for opportunities' : 'Not Available')}
                </button>
              ) : (
                /* ── Visitor: read-only display ── */
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.25rem 0.75rem',
                  background: available ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                  border: available ? '1px solid rgba(16,185,129,0.35)' : '1px solid rgba(239,68,68,0.35)',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: available ? '#10b981' : '#ef4444',
                  letterSpacing: '0.02em',
                  cursor: 'default',
                  fontFamily: "'Kantumruy Pro', sans-serif",
                }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: available ? '#10b981' : '#ef4444',
                    display: 'inline-block',
                    animation: available ? 'pulse-dot 2s infinite' : 'none',
                    flexShrink: 0,
                  }} />
                  {available ? 'Available for opportunities' : 'Not Available'}
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="hero-name">
              <span className="name-accent">Sun Raksmean</span>
            </h1>

            {/* Title */}
            <h2 className="hero-title">
              Acting Deputy IT Manager · IT Support Specialist
            </h2>

            {/* Bio */}
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              maxWidth: 560,
              lineHeight: 1.75,
              marginBottom: '1.5rem',
              fontWeight: 300,
            }}>
              7+ years of experience in IT support, system administration, and network management at Prasithpheap Credit PLC.
              Passionate about building reliable IT infrastructure, empowering users, and leveraging data for smart decisions.
            </p>

            {/* Contact pills */}
            <div className="hero-pills">
              {[
                { icon: <Mail size={13} />, text: 'sunraksmean@gmail.com' },
                { icon: <SendHorizontal size={13} />, text: '016 632 503' },
                { icon: <Phone size={13} />, text: '+855 16 632-503' },
                { icon: <MapPin size={13} />, text: 'Phnom Penh, Cambodia' }
              ].map((item, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  color: 'var(--text-secondary)', fontSize: '0.82rem',
                }}>
                  <span style={{ color: 'var(--accent-cyan)' }}>{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-ctas">
              <a href="#contact" className="btn btn-primary">
                <Mail size={16} />
                Get in Touch
              </a>
              <a href="#projects" className="btn btn-outline">
                View Projects
              </a>
              <a href={`${import.meta.env.BASE_URL}/SunRaksmean_Resume.pdf`} className="btn btn-resume">
                <Download size={16} className="resume-icon" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          {/* ── Avatar column ── */}
          {/*
            The stat cards use position:absolute with -16px offsets.
            We wrap everything in hero-avatar-wrap which has padding:24px
            so the overflow is never clipped.
          */}
          <div className="hero-avatar-wrap">
            <div className="hero-avatar">

              {/* ── Decorative floating rings ── */}
              <div className="avatar-ring avatar-ring--1" />
              <div className="avatar-ring avatar-ring--2" />

              {/* ── Photo frame ── */}
              <div className="avatar-frame">
                {/* shimmer sweep on hover */}
                <div className="avatar-shimmer" />
                <img
                  src={`${import.meta.env.BASE_URL}/photo.png`}
                  alt="Sun Raksmean"
                  className="avatar-photo"
                />
              </div>



            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint">
          <a href="#about" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
            color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.75rem',
            animation: 'bounce 2s infinite',
          }}>
            <span>Scroll down</span>
            <ArrowDown size={16} />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }

        /* ── Hero Text Styling ── */
        .hero-name {
          font-size: clamp(2.4rem, 8vw, 4.8rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .name-accent {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          filter: drop-shadow(0 0 20px var(--accent-glow));
          transition: filter 0.3s ease, transform 0.3s ease;
        }

        .hero-name:hover .name-accent {
          filter: drop-shadow(0 0 35px var(--accent-glow));
          transform: translateY(-2px);
        }

        .hero-title {
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          font-weight: 600;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
          letter-spacing: 0.01em;
        }

        /* ── Desktop layout ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 3rem;
          align-items: center;
        }
        .hero-text  { min-width: 0; }
        .hero-pills { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
        .hero-ctas  { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; }

        /* ── Premium Resume Button ── */
        .btn-resume {
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-primary) !important;
          padding: 0.7rem 1.4rem;
          font-size: 0.88rem;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-card);
          z-index: 1;
        }

        .btn-resume::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.05), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
          z-index: -1;
        }

        .btn-resume:hover::after {
          transform: translateX(100%);
        }

        .btn-resume:hover {
          border-color: var(--accent-blue);
          box-shadow: 0 8px 25px var(--accent-glow);
          transform: translateY(-3px);
          background: var(--bg-card-hover);
        }

        .resume-icon {
          color: var(--accent-cyan);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .btn-resume:hover .resume-icon {
          transform: translateY(2px) scale(1.1);
        }

        /* Avatar wrapper — padding absorbs the -16px overflowing stat cards */
        .hero-avatar-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;          /* room for stat cards that overflow by 16px */
          flex-shrink: 0;
        }
        .hero-avatar {
          position: relative;    /* stat cards anchor to this */
          display: inline-block;
        }

        /* ── Premium photo frame ── */
        .avatar-frame {
          position: relative;
          width: 260px;
          height: 310px;
          border-radius: 2rem;
          /* gradient border via padding + background */
          background: var(--accent-gradient);
          padding: 3px;
          box-shadow:
            0 0 0 1px rgba(59,130,246,0.15),
            0 24px 60px var(--accent-glow),
            0 8px 24px rgba(0,0,0,0.15);
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.4s ease;
          overflow: hidden;
          cursor: default;
        }
        .hero-avatar:hover .avatar-frame {
          transform: translateY(-8px) rotate(1deg);
          box-shadow:
            0 0 0 1px rgba(59,130,246,0.3),
            0 40px 80px var(--accent-glow),
            0 16px 40px rgba(0,0,0,0.2);
        }

        /* The actual photo */
        .avatar-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;   /* keeps face in frame */
          border-radius: calc(2rem - 3px);
          display: block;
          transition: transform 0.5s ease, filter 0.4s ease;
          filter: contrast(1.03) brightness(1.02);
        }
        .hero-avatar:hover .avatar-photo {
          transform: scale(1.04);
          filter: contrast(1.06) brightness(1.04);
        }

        /* Shimmer sweep on hover */
        .avatar-shimmer {
          position: absolute;
          inset: 0;
          z-index: 2;
          border-radius: calc(2rem - 3px);
          background: linear-gradient(
            120deg,
            transparent 30%,
            rgba(255,255,255,0.18) 50%,
            transparent 70%
          );
          background-size: 200% 100%;
          background-position: 200% 0;
          transition: background-position 0s;
          pointer-events: none;
        }
        .hero-avatar:hover .avatar-shimmer {
          animation: shimmerSweep 0.65s ease forwards;
        }
        @keyframes shimmerSweep {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }

        /* ── Decorative rings ── */
        .avatar-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid;
          pointer-events: none;
          opacity: 0.18;
          animation: spinRing 12s linear infinite;
        }
        .avatar-ring--1 {
          width: 320px; height: 320px;
          top: 50%; left: 50%;
          translate: -50% -50%;
          border-color: var(--accent-blue);
          border-style: dashed;
          animation-direction: normal;
        }
        .avatar-ring--2 {
          width: 380px; height: 380px;
          top: 50%; left: 50%;
          translate: -50% -50%;
          border-color: var(--accent-cyan);
          border-style: dotted;
          animation-direction: reverse;
          animation-duration: 18s;
          opacity: 0.10;
        }
        @keyframes spinRing {
          to { transform: rotate(360deg); }
        }

        /* ── Mobile layout ── */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 0;
            text-align: center;
          }

          /* Text on top, avatar below */
          .hero-text        { order: 1; width: 100%; }
          .hero-avatar-wrap { order: 2; width: 100%; margin-top: 2rem; margin-bottom: -3.5rem; }

          /* Center inline elements */
          .hero-pills { justify-content: center; }
          .hero-ctas  { justify-content: center; }

          /* Scale the whole avatar block so rings + stat badges stay on screen */
          .hero-avatar-wrap { transform: scale(0.72); transform-origin: top center; }
          .availability-badge { display: none; }

          /* Disable hover tilt on touch — feels glitchy */
          .hero-avatar:hover .avatar-frame { transform: none; }
          .hero-avatar:hover .avatar-photo { transform: none; }

          /* Scroll hint — pull up closer to avatar */
          .hero-scroll-hint { margin-top: 1rem; display: flex; justify-content: center; }
        }

        /* On very small phones, hide the decorative rings to avoid overflow */
        @media (max-width: 480px) {
          .avatar-ring { display: none; }
          .hero-avatar-wrap { transform: scale(0.66); margin-bottom: -4.5rem; }
          .hero-scroll-hint { margin-top: 0.5rem; }
        }

        /* Desktop scroll hint */
        .hero-scroll-hint { margin-top: 4rem; display: flex; justify-content: center; }
      `}</style>
    </section>
  );
}
