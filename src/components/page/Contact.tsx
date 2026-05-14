// src/components/Contact.tsx
import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Check, SendHorizontal, ChevronUp, ChevronDown, Linkedin, Github, Clock, Calendar, ExternalLink, Facebook } from 'lucide-react';

interface Props {
  editMode?: boolean;
  onMoveSection?: (dir: 'up' | 'down') => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function Contact({ editMode, onMoveSection, isFirst, isLast }: Props) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);

    try {
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
    { icon: <Mail size={18} />, label: 'Email', value: 'sunraksmean@gmail.com', href: 'mailto:sunraksmean@gmail.com' },
    { icon: <Phone size={18} />, label: 'Phone', value: '+855 16 632-503', href: 'tel:+85516632503' },
    { icon: <SendHorizontal size={18} />, label: 'Telegram', value: '+855 16 632 503', href: 'https://t.me/SRS_007' },
  ];

  const socialLinks = [
    { icon: <Linkedin size={18} />, label: 'LinkedIn', value: 'Sun Raksmean', href: 'https://www.linkedin.com/in/sun-raksmean-9a4517117/' },
    { icon: <Github size={18} />, label: 'GitHub', value: 'sunraksmean', href: 'https://github.com/sunraksmean' },
    { icon: <Facebook size={18} />, label: 'Facebook', value: 'Sun Raksmean', href: 'https://www.facebook.com/sun.raksmean.7' },
  ];

  return (
    <section id="contact" className="section" style={{ position: 'relative' }}>
      {editMode && onMoveSection && (
        <div style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
          <button className="btn btn-edit" disabled={isFirst} onClick={() => onMoveSection('up')} title="Move Section Up"><ChevronUp size={14} /></button>
          <button className="btn btn-edit" disabled={isLast} onClick={() => onMoveSection('down')} title="Move Section Down"><ChevronDown size={14} /></button>
        </div>
      )}
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="divider" style={{ margin: '0 auto 0.75rem' }} />
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle" style={{ marginBottom: '1.5rem' }}>Let's discuss how I can contribute to your team</p>
        
        <div className="availability-badge" style={{ marginInline: 'auto', marginBottom: '0.75rem' }}>
          <span className="pulse-dot" />
          Currently available for new opportunities
        </div>

        <div className="contact-grid-enhanced" style={{ textAlign: 'left' }}>
          
          {/* ── Left Column: Bio & Core Info ── */}
          <div className="contact-main-info">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Let's Build Something Great</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem', fontWeight: 300, fontSize: '1.05rem' }}>
              I'm always interested in hearing about new projects, IT management challenges, or technical collaborations. 
              Whether you're looking for a dedicated IT professional or just want to say hi, feel free to reach out through any of these channels.
            </p>

            <div className="contact-card-grid">
              {contactItems.map((item, i) => (
                <a key={i} href={item.href} className="contact-item-card">
                  <div className="item-icon">{item.icon}</div>
                  <div className="item-content">
                    <span className="item-label">{item.label}</span>
                    <span className="item-value">{item.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right Column: Socials & Extra ── */}
          <div className="contact-extra-info">
            <div className="info-box">
              <h4 className="info-box-title"><Clock size={16} /> Response Time</h4>
              <p className="info-box-text">I typically respond within 24 hours on business days.</p>
            </div>

            <div className="info-box">
              <h4 className="info-box-title"><MapPin size={16} /> Location</h4>
              <p className="info-box-text">Phnom Penh, Cambodia (GMT+7)</p>
            </div>

            <div className="social-connect">
              <h4 className="social-title">Connect on Social</h4>
              <div className="social-buttons">
                {socialLinks.map((link, i) => (
                  <a key={i} href={link.href} target="_blank" rel="noreferrer" className="social-btn">
                    {link.icon}
                    <span>{link.label}</span>
                    <ExternalLink size={12} className="ext-icon" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Message form card (DISABLED BY COMMENT) ── */}
          {/* 
          <div className="card contact-form-card" style={{ padding: '2rem', gridColumn: '1 / -1' }}>
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
          */}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-ring {
          0% { transform: scale(0.7); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        .contact-grid-enhanced {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 3rem;
          margin-top: 2rem;
        }

        /* Availability Badge */
        .availability-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 999px;
          color: #10b981;
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }
        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          position: relative;
        }
        .pulse-dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border: 2px solid #10b981;
          border-radius: 50%;
          animation: pulse-ring 1.5s infinite;
        }

        /* Contact Cards */
        .contact-card-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        .contact-item-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 1rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .contact-item-card:hover {
          border-color: var(--accent-blue);
          transform: translateX(5px);
          box-shadow: var(--shadow-glow);
        }
        .item-icon {
          width: 44px;
          height: 44px;
          background: var(--tag-bg);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-blue);
          flex-shrink: 0;
        }
        .item-content { display: flex; flex-direction: column; }
        .item-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.1rem; }
        .item-value { color: var(--text-primary); font-weight: 600; font-size: 0.95rem; }

        /* Extra Info (Right column) */
        .info-box {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .info-box-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .info-box-text { color: var(--text-secondary); font-size: 0.9rem; font-weight: 300; }

        .social-connect { margin-top: 2rem; }
        .social-title { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 1rem; text-transform: uppercase; }
        .social-buttons { display: flex; flex-direction: column; gap: 0.75rem; }
        .social-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.8rem 1.25rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          text-decoration: none;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .social-btn:hover { background: var(--tag-bg); border-color: var(--accent-blue); }
        .ext-icon { margin-left: auto; opacity: 0.5; }

        @media (max-width: 992px) {
          .contact-grid-enhanced { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>
    </section>
  );
}
