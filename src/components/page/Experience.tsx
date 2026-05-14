// src/components/Experience.tsx
import { useState } from 'react';
import { Plus, Trash2, Edit3, Check, X, Briefcase, ChevronUp, ChevronDown } from 'lucide-react';
import type { Experience } from '../../types';

interface Props {
  experiences: Experience[];
  onAdd: (e: Experience) => void;
  onEdit: (e: Experience) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, dir: 'up' | 'down') => void;
  editMode: boolean;
  onMoveSection: (dir: 'up' | 'down') => void;
  isFirst: boolean;
  isLast: boolean;
}

function ExpCard({ exp, editMode, onEdit, onDelete, onMove, isFirst, isLast }: { 
  exp: Experience; editMode: boolean; onEdit: (e: Experience) => void; onDelete: (id: string) => void;
  onMove: (id: string, dir: 'up' | 'down') => void; isFirst: boolean; isLast: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...exp, descText: exp.description.join('\n') });

  const save = () => {
    onEdit({ ...form, description: form.descText.split('\n').filter(Boolean) });
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input className="form-input" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Company" />
          <input className="form-input" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Role" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <input className="form-input" value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))} placeholder="Period" />
            <input className="form-input" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="Duration" />
          </div>
          <textarea className="form-textarea" value={form.descText} onChange={e => setForm(f => ({ ...f, descText: e.target.value }))} placeholder="One bullet per line" style={{ minHeight: 120 }} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-primary" onClick={save}><Check size={14} /> Save</button>
            <button className="btn btn-ghost" onClick={() => setEditing(false)}><X size={14} /> Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {exp.current && (
        <div className="active-status-badge-small">
          <span className="pulse-dot-green-small" />
          Current
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '0.6rem', flexShrink: 0,
          background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Briefcase size={18} color="#fff" />
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontWeight: 700, 
            fontSize: '1.15rem', 
            color: 'var(--text-primary)', 
            marginBottom: '0.4rem',
            paddingRight: exp.current ? '5rem' : '0',
            lineHeight: 1.3
          }}>
            {exp.role}
          </h3>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9rem' }}>{exp.company}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>·</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{exp.period}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>·</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{exp.duration}</span>
          </div>
          <ul style={{ paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {exp.description.map((d, i) => (
              <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, fontWeight: 300 }}>{d}</li>
            ))}
          </ul>

          {editMode && (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.25rem', marginRight: '0.5rem' }}>
                <button className="btn btn-edit" disabled={isFirst} onClick={() => onMove(exp.id, 'up')} title="Move Up"><ChevronUp size={12} /></button>
                <button className="btn btn-edit" disabled={isLast} onClick={() => onMove(exp.id, 'down')} title="Move Down"><ChevronDown size={12} /></button>
              </div>
              <button className="btn btn-edit" onClick={() => setEditing(true)}><Edit3 size={12} /> Edit</button>
              <button className="btn btn-danger" onClick={() => onDelete(exp.id)}><Trash2 size={12} /> Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection({ experiences, onAdd, onEdit, onDelete, onMove, editMode, onMoveSection, isFirst, isLast }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ company: '', role: '', period: '', duration: '', descText: '', current: false });

  const handleAdd = () => {
    if (!form.company.trim() || !form.role.trim()) return;
    onAdd({
      id: 'exp-' + Date.now(),
      company: form.company,
      role: form.role,
      period: form.period,
      duration: form.duration,
      description: form.descText.split('\n').filter(Boolean),
      current: form.current,
    });
    setForm({ company: '', role: '', period: '', duration: '', descText: '', current: false });
    setShowForm(false);
  };

  return (
    <section id="experience" className="section" style={{ position: 'relative' }}>
      {editMode && (
        <div style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
          <button className="btn btn-edit" disabled={isFirst} onClick={() => onMoveSection('up')} title="Move Section Up"><ChevronUp size={14} /></button>
          <button className="btn btn-edit" disabled={isLast} onClick={() => onMoveSection('down')} title="Move Section Down"><ChevronDown size={14} /></button>
        </div>
      )}
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="divider" style={{ margin: '0 auto 0.75rem' }} />
        <h2 className="section-title">Work Experience</h2>
        <p className="section-subtitle">Building expertise across IT roles in Cambodia</p>

        <div className="exp-list" style={{ textAlign: 'left' }}>
          {experiences.map((e, idx) => (
            <ExpCard 
              key={e.id} 
              exp={e} 
              editMode={editMode} 
              onEdit={onEdit} 
              onDelete={onDelete} 
              onMove={onMove}
              isFirst={idx === 0}
              isLast={idx === experiences.length - 1}
            />
          ))}

          {editMode && !showForm && (
            <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setShowForm(true)}>
              <Plus size={16} /> Add Experience
            </button>
          )}

          {editMode && showForm && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>Add Experience</h4>
              <div className="form-group">
                <label className="form-label">Company</label>
                <input className="form-input" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <input className="form-input" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Period</label>
                  <input className="form-input" value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))} placeholder="Jan 2020 – Dec 2022" />
                </div>
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input className="form-input" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="2 years" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description (one per line)</label>
                <textarea className="form-textarea" value={form.descText} onChange={e => setForm(f => ({ ...f, descText: e.target.value }))} />
              </div>
              <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" id="current" checked={form.current} onChange={e => setForm(f => ({ ...f, current: e.target.checked }))} />
                <label htmlFor="current" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', cursor: 'pointer' }}>Current Position</label>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn btn-primary" 
                  onClick={handleAdd} 
                  disabled={!form.company.trim() || !form.role.trim()}
                  style={{ opacity: (!form.company.trim() || !form.role.trim()) ? 0.5 : 1 }}
                >
                  <Check size={14} /> Add
                </button>
                <button className="btn btn-ghost" onClick={() => setShowForm(false)}><X size={14} /> Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.7); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        .active-status-badge-small {
          position: absolute;
          top: 1rem;
          right: 1rem;
          margin-top: 5px;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.5rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 999px;
          color: #10b981;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .pulse-dot-green-small {
          width: 5px;
          height: 5px;
          background: #10b981;
          border-radius: 50%;
          position: relative;
        }
        .pulse-dot-green-small::after {
          content: '';
          position: absolute;
          inset: -2.5px;
          border: 1px solid #10b981;
          border-radius: 50%;
          animation: pulse-ring 1.5s infinite;
        }

        .exp-list { width: 100%; }
      `}</style>
    </section>
  );
}
