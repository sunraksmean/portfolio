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
            <div style={{ marginBottom: '1.25rem' }}>
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
            <h1 style={{
              fontSize: 'clamp(2.2rem, 7vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '0.5rem',
              color: 'var(--text-primary)',
            }}>
              Sun Raksmean
            </h1>

            {/* Title gradient */}
            <h2 style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              fontWeight: 600,
              background: 'var(--accent-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem',
              letterSpacing: '0.01em',
            }}>
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
              <a href={`${import.meta.env.BASE_URL}/SunRaksmean_Resume.pdf`} className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '0.7rem 1rem', border: '1px solid var(--border)' }}>
                <Download size={15} />
                Download Resume
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
              {/* Photo frame */}
              <div style={{
                width: 240, height: 240,
                borderRadius: '2rem',
                background: 'var(--accent-gradient)',
                padding: 3,
                overflow: 'hidden',
                boxShadow: '0 20px 60px var(--accent-glow)',
              }}>
                <div style={{
                  width: '100%', height: '100%',
                  borderRadius: 'calc(2rem - 3px)',
                  background: 'var(--bg-card)',
                  overflow: 'hidden',
                }}>
                  <img
                    src={`${import.meta.env.BASE_URL}/photo.png`}
                    alt="Photo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Stat card — top right */}
              <div style={{
                position: 'absolute', top: -16, right: -16,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: '0.75rem', padding: '0.6rem 1rem',
                boxShadow: 'var(--shadow-card)', textAlign: 'center', zIndex: 2,
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-blue)' }}>7+</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Years Exp.</div>
              </div>

              {/* Stat card — bottom left */}
              <div style={{
                position: 'absolute', bottom: -16, left: -16,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: '0.75rem', padding: '0.6rem 1rem',
                boxShadow: 'var(--shadow-card)', textAlign: 'center', zIndex: 2,
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>5+</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
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

        /* ── Desktop layout ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 3rem;
          align-items: center;
        }
        .hero-text  { min-width: 0; }
        .hero-pills { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
        .hero-ctas  { display: flex; gap: 0.75rem; flex-wrap: wrap; }

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

        /* ── Mobile layout ── */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;   /* single column */
            gap: 0;
            text-align: center;
          }

          /* Text stays on top, avatar below */
          .hero-text          { order: 1; width: 100%; }
          .hero-avatar-wrap   { order: 2; width: 100%; margin-top: 2rem; margin-bottom: 1rem; }

          /* Center inline elements */
          .hero-pills { justify-content: center; }
          .hero-ctas  { justify-content: center; }

          /* Scale avatar down slightly so stat cards don't clip viewport edges */
          .hero-avatar-wrap { transform: scale(0.88); transform-origin: top center; }
        }
      `}</style>
    </section>
  );
}
