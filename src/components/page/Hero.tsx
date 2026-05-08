// src/components/Hero.tsx
import { ArrowDown, Download, Mail, MapPin, Phone, SendHorizontal } from 'lucide-react';

export default function Hero() {
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center' }} className="hero-grid">
          <div>
            {/* Badge */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="badge">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse-dot 2s infinite' }} />
                Available for opportunities
              </span>
            </div>

            {/* Name */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
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
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
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
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {[
                { icon: <Mail size={13} />, text: 'sunraksmean@gmail.com' },
                { icon: <SendHorizontal size={13} />, text: '016 632 503'},
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
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
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

          {/* Avatar card */}
          <div className="hero-avatar" style={{
            position: 'relative',
            flexShrink: 0,
          }}>
            <div style={{
              width: 240, height: 240,
              borderRadius: '2rem',
              background: 'var(--accent-gradient)',
              padding: 3,
              overflow: 'hidden',
              boxShadow: '0 20px 60px var(--accent-glow)',
            }}>
              <div className="photos" style={{
                width: '100%', height: '100%',
                borderRadius: 'calc(2rem - 3px)',
                background: 'var(--bg-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '5rem',
                fontWeight: 800,
                color: 'var(--accent-blue)',
                letterSpacing: '-0.04em'
              }}>
                <img src={`${import.meta.env.BASE_URL}/photo.png`} alt="Photo" style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: 'red' }} />
              </div>
            </div>

            {/* Stats cards */}
            <div style={{
              position: 'absolute', top: -16, right: -16,
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: '0.75rem', padding: '0.6rem 1rem',
              boxShadow: 'var(--shadow-card)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-blue)' }}>7+</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Years Exp.</div>
            </div>
            <div style={{
              position: 'absolute', bottom: -16, left: -16,
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: '0.75rem', padding: '0.6rem 1rem',
              boxShadow: 'var(--shadow-card)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>5+</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Projects</div>
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
        @keyframes pulse-dot { 0%,100%{opacity:1}50%{opacity:0.4} }
        @keyframes bounce {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(6px)}
        }
        .hero-grid { grid-template-columns: 1fr auto; }
        @media(max-width:768px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-avatar { display: block; margin-top: 2rem; }
        }
      `}</style>
    </section>
  );
}
