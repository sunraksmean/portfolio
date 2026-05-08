// src/components/Testimonials.tsx
import { Quote } from 'lucide-react';
import type { Testimonial } from '../../types';
interface Props { testimonials: Testimonial[]; }

export default function Testimonials({ testimonials }: Props) {
  return (
    <section id="testimonials" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="divider" />
        <h2 className="section-title">Testimonials</h2>
        <p className="section-subtitle">What colleagues and managers say</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {testimonials.map((t) => (
            <div key={t.id} className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Quote size={24} style={{ color: 'var(--accent-blue)', opacity: 0.5 }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.75, fontWeight: 300, fontStyle: 'italic', flex: 1 }}>
                "{t.message}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'var(--accent-gradient)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{t.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
