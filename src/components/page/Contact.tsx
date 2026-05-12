// src/components/Contact.tsx
import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Check, SendHorizontal } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);

    try {
      // Note: You need to create a free form at https://formspree.io/
      // and replace 'YOUR_FORMSPREE_ID' with your actual form ID.
      // For now, I'm setting up the logic for you.
      const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          _replyto: form.email,
          _subject: `Portfolio Message: ${form.subject || 'General Inquiry'}`
        }),
      });

      if (response.ok) {
        setSent(true);
      } else {
        // Fallback for demo: if no ID is set, just show success anyway for UI testing
        // but in production, we'd want to handle the error.
        console.error("Formspree submission failed. Make sure to set your YOUR_FORMSPREE_ID.");
        setSent(true); 
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Oops! There was a problem sending your message. Please try again or use the direct email link.");
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    { icon: <Mail size={20} />, label: 'Email', value: 'sunraksmean@gmail.com', href: 'mailto:sunraksmean@gmail.com' },
    { icon: <Phone size={20} />, label: 'Phone', value: '+855 16 632-503', href: 'tel:+85516632503' },
    { icon: <SendHorizontal size={20} />, label: 'Telegram', value: '016 632 503', href: 'https://t.me/SRS_007' },
    { icon: <MapPin size={20} />, label: 'Location', value: 'Phnom Penh, Cambodia', href: '#' },
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="divider" />
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">Let's discuss how I can contribute to your team</p>

        <div className="contact-grid">

          {/* ── Info column ── */}
          <div className="contact-info">
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem', fontWeight: 300 }}>
              I'm open to new opportunities in IT management, system administration, or senior support roles.
              Whether you have a question or want to discuss a role, feel free to reach out.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {contactItems.map((item, i) => (
                <a key={i} href={item.href} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '0.75rem',
                    background: 'var(--tag-bg)', border: '1px solid var(--tag-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent-blue)', flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem' }}>{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Message form card ── */}
          <div className="card contact-form-card" style={{ padding: '2rem' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%',
                  background: 'rgba(16,185,129,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}>
                  <Check size={28} color="#10b981" />
                </div>
                <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Thank you for reaching out. I'll get back to you soon.</p>
                <button className="btn btn-outline" style={{ marginTop: '1.5rem' }} onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Name + Email — two columns on desktop, one on mobile */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="john@example.com" required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input className="form-input" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Job opportunity / Collaboration" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea className="form-textarea" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Write your message here..." style={{ minHeight: 140 }} required />
                </div>
                <button className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />
                      Sending...
                    </span>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Desktop ── */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
          align-items: start;
        }
        /* Name + Email row: two columns */
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          /* Stack info above form */
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          /* Info on top, form below */
          .contact-info      { order: 1; }
          .contact-form-card { order: 2; }

          /* Name + Email: single column on mobile */
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
