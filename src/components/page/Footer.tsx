// src/components/Footer.tsx
import { Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '2.5rem 0',
      background: 'var(--bg-secondary)',
    }}>
      <div className="container">
        <div className="footer-inner">
          <div>
            <a 
              href="#hero" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', textDecoration: 'none' }}
            >
              <img
                src={`${import.meta.env.BASE_URL}/logo.png`}
                alt="SRS"
                style={{ width: 42, height: 42, borderRadius: 8 }}
              />
              <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Sun Raksmean</span>
            </a>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>IT Support · System Administrator · Phnom Penh, Cambodia</p>
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            {['#about', '#skills', '#experience', '#projects', '#contact'].map((href, i) => (
              <a key={i} href={href} style={{
                color: 'var(--text-muted)', fontSize: '0.82rem', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--text-primary)'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--text-muted)'}
              >
                {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
              </a>
            ))}
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            © {year} Built with <Heart size={12} color="var(--accent-blue)" fill="var(--accent-blue)" /> in Phnom Penh
          </p>
        </div>
      </div>

      <style>{`
        .footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.5rem;
          }
          .footer-inner > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .footer-inner > div:nth-child(2) {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }
        }
      `}</style>
    </footer>
  );
}
