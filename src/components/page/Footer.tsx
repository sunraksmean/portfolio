import { Heart, Mail, Phone, Linkedin, Github, Facebook, ArrowUp } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
  ];

  const socialLinks = [
    { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/sun-raksmean-9a4517117/', label: 'LinkedIn' },
    { icon: <Github size={18} />, href: 'https://github.com/sunraksmean', label: 'GitHub' },
    { icon: <Facebook size={18} />, href: 'https://www.facebook.com/sun.raksmean.7', label: 'Facebook' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          
          {/* ── Branding Section ── */}
          <div className="footer-brand">
            <a href="#hero" onClick={scrollToTop} className="footer-logo">
              <img src={`${import.meta.env.BASE_URL}/logo.png`} alt="SRS" />
              <span>Sun Raksmean</span>
            </a>
            <p className="footer-tagline">
              Dedicated IT professional with 7+ years of experience in Support, System Administration, and Network Management.
            </p>
            <div className="footer-socials">
              {socialLinks.map((link, i) => (
                <a key={i} href={link.href} target="_blank" rel="noreferrer" className="social-icon-link" title={link.label}>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="footer-nav">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              {navLinks.map((link, i) => (
                <li key={i}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* ── Contact Info ── */}
          <div className="footer-contact">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-links">
              <li>
                <a href="mailto:sunraksmean@gmail.com" className="contact-link">
                  <Mail size={14} /> sunraksmean@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+85516632503" className="contact-link">
                  <Phone size={14} /> +855 16 632 503
                </a>
              </li>
              <li className="location-text">Phnom Penh, Cambodia</li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {year} <strong>Sun Raksmean</strong>. Built with <Heart size={12} className="heart-icon" /> in Cambodia.
          </p>
          <button onClick={scrollToTop} className="back-to-top" title="Back to Top">
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          padding: 5rem 0 2rem;
          margin-top: 2rem;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          margin-bottom: 1.5rem;
        }
        .footer-logo img {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .footer-logo span {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .footer-tagline {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          max-width: 320px;
          margin-bottom: 1.5rem;
          font-weight: 300;
        }

        .footer-socials {
          display: flex;
          gap: 0.75rem;
        }
        .social-icon-link {
          width: 38px;
          height: 38px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all 0.2s;
        }
        .social-icon-link:hover {
          color: var(--accent-blue);
          border-color: var(--accent-blue);
          transform: translateY(-3px);
          box-shadow: var(--shadow-glow);
        }

        .footer-title {
          color: var(--text-primary);
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-align: center;
        }

        .footer-nav, .footer-contact {
          text-align: center;
        }
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .footer-links li {
          margin-bottom: 0.75rem;
        }
        .footer-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
          font-weight: 300;
        }
        .footer-links a:hover {
          color: var(--accent-blue);
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: center;
        }
        .footer-contact {
          text-align: center;
        }
        .location-text {
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 300;
          text-align: center;
        }

        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .heart-icon {
          color: var(--accent-blue);
          fill: var(--accent-blue);
          vertical-align: middle;
        }
        .copyright strong { color: var(--text-secondary); font-weight: 600; }

        .back-to-top {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.2s;
        }
        .back-to-top:hover { color: var(--accent-blue); }

        @media (max-width: 992px) {
          .footer-top { grid-template-columns: 1fr 1fr; gap: 3rem; }
          .footer-brand { grid-column: span 2; }
        }

        @media (max-width: 600px) {
          .footer { padding-top: 3rem; }
          .footer-top { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
          .footer-brand { grid-column: span 1; align-items: center; display: flex; flex-direction: column; }
          .footer-logo { margin-bottom: 1rem; }
          .footer-tagline { margin-left: auto; margin-right: auto; }
          .footer-socials { justify-content: center; }
          .footer-bottom { flex-direction: column; gap: 1.5rem; text-align: center; }
        }
      `}</style>
    </footer>
  );
}
