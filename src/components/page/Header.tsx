// src/components/Header.tsx
import { useState, useEffect } from 'react';
import { Sun, Moon, Edit3, X } from 'lucide-react';

interface HeaderProps {
  dark: boolean;
  toggleDark: () => void;
  editMode: boolean;
  toggleEdit: () => void;
  logo: string;
  onLogoChange: (v: string) => void;
}

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

export default function Header({ dark, toggleDark, editMode, toggleEdit, logo, onLogoChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editingLogo, setEditingLogo] = useState(false);
  const [logoInput, setLogoInput] = useState(logo);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogoSave = () => {
    onLogoChange(logoInput);
    setEditingLogo(false);
  };

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 800,
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem'}}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {editingLogo ? (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  className="form-input"
                  value={logoInput}
                  onChange={e => setLogoInput(e.target.value)}
                  style={{ width: 160, padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                  autoFocus
                />
                <button className="btn btn-primary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }} onClick={handleLogoSave}>Save</button>
                <button className="btn-ghost btn" onClick={() => setEditingLogo(false)}>
                  <X size={14} />
                </button>
              </div>
            ) : (
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem',textDecoration: 'none' }}>
                <img src={`${import.meta.env.BASE_URL}/logo.png`} alt="SRS" style={{ width: 70, height: 70, borderRadius: 20 }} />
                <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{""}</span>
                {editMode && <Edit3 size={12} color="var(--accent-cyan)" style={{ marginLeft: 2 }} />}
              </a>
            )}
          </div>

          {/* Nav desktop */}
          <nav style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="nav-desktop">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} style={{
                padding: '0.4rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                borderRadius: '0.4rem',
                transition: 'all 0.2s',
                fontFamily: "'Kantumruy Pro', sans-serif",
              }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--text-primary)'; (e.target as HTMLElement).style.background = 'var(--bg-card)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--text-secondary)'; (e.target as HTMLElement).style.background = 'transparent'; }}
              >{l.label}</a>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button className="btn btn-ghost" onClick={toggleDark} title="Toggle dark mode">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="btn"
              onClick={toggleEdit}
              style={{
                padding: '0.4rem 1rem',
                fontSize: '0.82rem',
                background: editMode ? 'rgba(239,68,68,0.12)' : 'var(--tag-bg)',
                color: editMode ? '#ef4444' : 'var(--accent-blue)',
                border: `1px solid ${editMode ? 'rgba(239,68,68,0.3)' : 'var(--tag-border)'}`,
              }}
            >
              <Edit3 size={14} />
              {editMode ? 'Exit Edit' : 'Edit Mode'}
            </button>
            {/* Hamburger */}
            <button className="btn btn-ghost hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 18 }}>
                <span style={{ height: 2, background: 'var(--text-primary)', borderRadius: 1, display: 'block', transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
                <span style={{ height: 2, background: 'var(--text-primary)', borderRadius: 1, display: 'block', opacity: menuOpen ? 0 : 1 }} />
                <span style={{ height: 2, background: 'var(--text-primary)', borderRadius: 1, display: 'block', transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '0.8rem 1.5rem',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  fontFamily: "'Kantumruy Pro', sans-serif",
                  fontSize: '0.95rem',
                }}>
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <style>{`
        .hamburger { display: none; }
        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: var(--nav-bg);
          backdrop-filter: blur(16px);
          border-top: 1px solid var(--border-subtle);
          padding: 1rem 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          animation: slideDown 0.3s ease-out forwards;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>
    </>
  );
}
