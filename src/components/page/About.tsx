import { useState, useEffect } from 'react';
import { BookOpen, Globe, Heart, Zap } from 'lucide-react';

export default function About() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle mobile detection properly with useEffect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const facts = [
    { icon: <BookOpen size={18} />, label: 'Education', value: 'Bachelor of Information Technology — RUPP (2018)' },
    { icon: <Globe size={18} />, label: 'Languages', value: 'Khmer (Native), English (Good)' },
    { icon: <Heart size={18} />, label: 'Hobbies', value: 'Tech tutorials, Reading, Sports' },
  ];

  const highlights = [
    { num: '7+', label: 'Years in IT' },
    { num: '3', label: 'Roles Held' },
    { num: '10+', label: 'Branch Deployments' },
    { num: '100+', label: 'Users Supported' },
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        {/* Mobile toggle button */}
        {isMobile && (
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <button 
              className="mobile-toggle" 
              onClick={() => setOpen(!open)} 
              style={{ 
                padding: '0.75rem 1.5rem', 
                background: 'var(--accent-gradient, linear-gradient(135deg, #667eea 0%, #764ba2 100%))', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '0.5rem', 
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              {open ? '− Hide About' : '+ Show About'}
            </button>
          </div>
        )}
        
        {/* Content - show on desktop always, on mobile only when open */}
        {(!isMobile || open) && (
          <div className="about-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '4rem', 
            alignItems: 'start' 
          }}>
            {/* Left Column */}
            <div>
              <div className="divider" />
              <h2 className="section-title">About Me</h2>
              <p className="section-subtitle">IT professional with a passion for systems & people</p>
              
              <p style={{ color: 'var(--text-secondary, #666)', lineHeight: 1.85, marginBottom: '1rem', fontWeight: 300 }}>
                I'm <strong style={{ color: 'var(--text-primary, #333)', fontWeight: 600 }}>Sun Raksmean</strong>, an IT professional based in Phnom Penh, Cambodia with over 7 years of hands-on experience in IT support, system administration, and network management.
              </p>
              <p style={{ color: 'var(--text-secondary, #666)', lineHeight: 1.85, marginBottom: '1rem', fontWeight: 300 }}>
                Currently serving as Acting Deputy IT Manager at Prasithpheap Credit PLC, I oversee IT operations across multiple branches — from system deployments to SQL-driven management reports for C-suite executives.
              </p>
              <p style={{ color: 'var(--text-secondary, #666)', lineHeight: 1.85, marginBottom: '2rem', fontWeight: 300 }}>
                I believe great IT support is about more than fixing problems — it's about empowering people to work smarter, safer, and more confidently with technology.
              </p>
              
              {/* Facts */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {facts.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--accent-cyan, #06b6d4)', flexShrink: 0 }}>{f.icon}</span>
                    <span style={{ color: 'var(--text-muted, #888)', fontSize: '0.85rem', minWidth: 90 }}>{f.label}:</span>
                    <span style={{ color: 'var(--text-primary, #333)', fontSize: '0.9rem', fontWeight: 500 }}>{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                {highlights.map((h, i) => (
                  <div key={i} className="card" style={{ 
                    padding: '1.5rem', 
                    textAlign: 'center',
                    background: 'var(--card-bg, #fff)',
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{
                      fontSize: '2.2rem', 
                      fontWeight: 800,
                      background: 'var(--accent-gradient, linear-gradient(135deg, #667eea 0%, #764ba2 100%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      marginBottom: '0.25rem',
                    }}>{h.num}</div>
                    <div style={{ color: 'var(--text-muted, #888)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h.label}</div>
                  </div>
                ))}
              </div>
              
              {/* Soft skills */}
              <div className="card" style={{ 
                padding: '1.5rem',
                background: 'var(--card-bg, #fff)',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary, #333)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Soft Skills</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['Team Collaboration', 'Communication', 'Problem Solving', 'Hard Working', 'Self-Confidence', 'Integrity', 'Adaptability', 'User Training'].map(s => (
                    <span key={s} className="tag" style={{
                      padding: '0.25rem 0.75rem',
                      background: 'var(--tag-bg, #f0f0f0)',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary, #666)'
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
}