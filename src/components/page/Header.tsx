// src/components/Header.tsx
import { useState, useEffect, useRef } from 'react';
import { Edit3, X, Menu } from 'lucide-react';

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
  const headerRef = useRef<HTMLElement>(null);

  // ── Password modal state ──
  const [showPwModal, setShowPwModal] = useState(false);
  const [pwInput, setPwInput]         = useState('');
  const [pwError, setPwError]         = useState(false);
  const [pwShake, setPwShake]         = useState(false);

  // Default password stored in localStorage so owner can change it
  const getPassword = () => localStorage.getItem('portfolio-owner-pw') || '1234';

  const handleEditClick = () => {
    if (editMode) {
      // Already owner — just exit edit mode
      toggleEdit();
    } else {
      // Require password to enter edit mode
      setPwInput('');
      setPwError(false);
      setShowPwModal(true);
    }
  };

  const handlePwSubmit = () => {
    if (pwInput === getPassword()) {
      setShowPwModal(false);
      setPwInput('');
      setPwError(false);
      toggleEdit();
    } else {
      setPwError(true);
      setPwShake(true);
      setTimeout(() => setPwShake(false), 500);
    }
  };

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLogoSave = () => {
    onLogoChange(logoInput);
    setEditingLogo(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header ref={headerRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 800,
        background: scrolled || menuOpen ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid var(--border-subtle)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        {/* ── Top bar ── */}
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {editingLogo ? (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  className="form-input"
                  value={logoInput}
                  onChange={e => setLogoInput(e.target.value)}
                  style={{ width: 140, padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
                  autoFocus
                />
                <button className="btn btn-primary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }} onClick={handleLogoSave}>Save</button>
                <button className="btn btn-ghost" onClick={() => setEditingLogo(false)}>
                  <X size={14} />
                </button>
              </div>
            ) : (
              <a href="#about" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                <img src={`${import.meta.env.BASE_URL}/logo.png`} alt="SRS" style={{ width: 50, height: 50, borderRadius: 14 }} />
                {editMode && <Edit3 size={12} color="var(--accent-cyan)" style={{ marginLeft: 2 }} />}
              </a>
            )}
          </div>

          {/* Desktop nav */}
          <nav className="nav-desktop" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
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

          {/* Right: Edit mode (desktop) + Hamburger (mobile) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Edit mode button — desktop only */}
            <button
              className="btn nav-edit-btn"
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

            {/* Hamburger button — mobile only */}
            <button
              className="btn btn-ghost hamburger-btn"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              style={{ padding: '0.5rem' }}
            >
              {menuOpen
                ? <X size={22} style={{ transition: 'all 0.2s' }} />
                : <Menu size={22} style={{ transition: 'all 0.2s' }} />
              }
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown menu ── */}
        <nav
          className={`mobile-nav${menuOpen ? ' mobile-nav--open' : ''}`}
          aria-label="Mobile navigation"
        >
          <div className="mobile-nav-inner">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className="mobile-nav-link"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <style>{`
        /* ── Desktop: hide hamburger ── */
        .hamburger-btn { display: none !important; }

        /* ── Mobile nav: hidden by default ── */
        .mobile-nav {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          background: var(--nav-bg);
          backdrop-filter: blur(16px);
          border-top: 1px solid transparent;
        }
        .mobile-nav--open {
          max-height: 400px;
          border-top-color: var(--border-subtle);
        }
        .mobile-nav-inner {
          display: flex;
          flex-direction: column;
          padding: 0.75rem 0 1rem;
        }
        .mobile-nav-link {
          display: block;
          padding: 0.75rem 1.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-family: 'Kantumruy Pro', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          border-radius: 0.4rem;
          margin: 0 0.75rem;
          transition: background 0.15s, color 0.15s;
          opacity: 0;
          animation: none;
        }
        .mobile-nav--open .mobile-nav-link {
          animation: fadeSlideIn 0.25s ease forwards;
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .mobile-nav-link:hover {
          background: var(--bg-card);
          color: var(--text-primary);
        }

        /* ── Responsive breakpoint ── */
        @media (max-width: 768px) {
          .nav-desktop    { display: none !important; }
          .nav-edit-btn   { display: none !important; }
          .hamburger-btn  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
