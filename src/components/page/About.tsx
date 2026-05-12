import { useEffect } from 'react';
import { BookOpen, Globe, Heart, Award, Briefcase, GitBranch, Users } from 'lucide-react';

export default function About() {
  // Ensure unused isMobile state is removed; layout handled purely via CSS
  useEffect(() => {}, []);

  const facts = [
    { icon: <BookOpen size={16} />, label: 'Education', value: 'Bachelor of IT — RUPP (2018)' },
    { icon: <Globe size={16} />, label: 'Languages', value: 'Khmer (Native), English (Good)' },
    { icon: <Heart size={16} />, label: 'Hobbies', value: 'Tech tutorials, Reading, Sports' },
  ];

  const highlights = [
    { icon: <Award size={22} />, num: '7+', label: 'Years in IT' },
    { icon: <Briefcase size={22} />, num: '3', label: 'Roles Held' },
    { icon: <GitBranch size={22} />, num: '10+', label: 'Branch Deployments' },
    { icon: <Users size={22} />, num: '100+', label: 'Users Supported' },
  ];

  const softSkills = [
    'Team Collaboration', 'Communication', 'Problem Solving',
    'Hard Working', 'Self-Confidence', 'Integrity',
    'Adaptability', 'User Training',
  ];

  return (
    <>
      <style>{`
        /* ── About Section ─────────────────────────── */
        .about-section {
          padding: 5rem 0;
        }

        .about-container {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Two-column grid on desktop */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        /* ── Left column ───────────────────────────── */
        .about-left {}

        .about-bio p {
          color: var(--text-secondary);
          line-height: 1.9;
          font-weight: 300;
          margin-bottom: 1rem;
        }
        .about-bio strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .about-facts {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-top: 1.8rem;
        }

        .about-fact-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.6rem 0.9rem;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 0.6rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .about-fact-item:hover {
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px var(--accent-glow);
        }
        .about-fact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 0.4rem;
          background: var(--tag-bg);
          color: var(--accent-cyan);
          flex-shrink: 0;
        }
        .about-fact-label {
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          min-width: 72px;
          flex-shrink: 0;
        }
        .about-fact-value {
          color: var(--text-primary);
          font-size: 0.88rem;
          font-weight: 400;
        }

        /* ── Right column ──────────────────────────── */
        .about-right {}

        /* Stats */
        .about-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .about-stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 1rem;
          padding: 1.4rem 1rem;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-card);
          cursor: default;
        }
        .about-stat-card:hover {
          border-color: var(--accent-blue);
          box-shadow: var(--shadow-glow);
          transform: translateY(-3px);
        }
        .about-stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.5rem;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--tag-bg);
          color: var(--accent-cyan);
        }
        .about-stat-num {
          font-size: 2rem;
          font-weight: 800;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
          margin-bottom: 0.25rem;
        }
        .about-stat-label {
          color: var(--text-muted);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 500;
        }

        /* Skills card */
        .about-skills-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: var(--shadow-card);
        }
        .about-skills-title {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .about-skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .about-skill-tag {
          display: inline-flex;
          align-items: center;
          padding: 0.3rem 0.8rem;
          background: var(--tag-bg);
          border: 1px solid var(--tag-border);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--accent-cyan);
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .about-skill-tag:hover {
          background: var(--accent-glow);
          transform: scale(1.04);
        }

        /* ── Responsive ────────────────────────────── */
        @media (max-width: 768px) {
          .about-section {
            padding: 3.5rem 0;
          }
          .about-container {
            padding: 0 1.25rem;
          }
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .about-stats {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 480px) {
          .about-container {
            padding: 0 1rem;
          }
          .about-section {
            padding: 2.5rem 0;
          }
          .about-stats {
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }
          .about-stat-card {
            padding: 1rem 0.75rem;
          }
          .about-stat-num {
            font-size: 1.6rem;
          }
        }
      `}</style>

      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-grid">

            {/* ── Left Column ──────────────────────── */}
            <div className="about-left">
              <div className="divider" />
              <h2 className="section-title">About Me</h2>
              <p className="section-subtitle">IT professional with a passion for systems &amp; people</p>

              <div className="about-bio">
                <p>
                  I'm <strong>Sun Raksmean</strong>, an IT professional based in Phnom Penh, Cambodia
                  with over 7 years of hands-on experience in IT support, system administration,
                  and network management.
                </p>
                <p>
                  Currently serving as Acting Deputy IT Manager at Prasithpheap Credit PLC, I oversee
                  IT operations across multiple branches — from system deployments to SQL-driven
                  management reports for C-suite executives.
                </p>
                <p>
                  I believe great IT support is about more than fixing problems — it's about
                  empowering people to work smarter, safer, and more confidently with technology.
                </p>
              </div>

              {/* Facts */}
              <div className="about-facts">
                {facts.map((f, i) => (
                  <div key={i} className="about-fact-item">
                    <span className="about-fact-icon">{f.icon}</span>
                    <span className="about-fact-label">{f.label}</span>
                    <span className="about-fact-value">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right Column ─────────────────────── */}
            <div className="about-right">
              {/* Stats */}
              <div className="about-stats">
                {highlights.map((h, i) => (
                  <div key={i} className="about-stat-card">
                    <div className="about-stat-icon">{h.icon}</div>
                    <div className="about-stat-num">{h.num}</div>
                    <div className="about-stat-label">{h.label}</div>
                  </div>
                ))}
              </div>

              {/* Soft Skills */}
              <div className="about-skills-card">
                <div className="about-skills-title">Soft Skills</div>
                <div className="about-skills-list">
                  {softSkills.map(s => (
                    <span key={s} className="about-skill-tag">{s}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}