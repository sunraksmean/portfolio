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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'var(--accent-gradient)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '0.72rem',
              }}>SR</div>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Sun Raksmean</span>
            </div>
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
    </footer>
  );
}
