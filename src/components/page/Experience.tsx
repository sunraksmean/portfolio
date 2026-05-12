// src/components/Experience.tsx
import { useState } from 'react';
import { Plus, Trash2, Edit3, Check, X, Briefcase } from 'lucide-react';
import type { Experience } from '../../types';

interface Props {
  experiences: Experience[];
  onAdd: (e: Experience) => void;
  onEdit: (e: Experience) => void;
  onDelete: (id: string) => void;
  editMode: boolean;
}

function ExpCard({ exp, editMode, onEdit, onDelete }: { exp: Experience; editMode: boolean; onEdit: (e: Experience) => void; onDelete: (id: string) => void }) {
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
    <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem', position: 'relative' }}>
      {exp.current && (
        <div style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem',
        }}>
          <span className="badge">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            Current
          </span>
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
          <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.15rem' }}>{exp.role}</h3>
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
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button className="btn btn-edit" onClick={() => setEditing(true)}><Edit3 size={12} /> Edit</button>
              <button className="btn btn-danger" onClick={() => onDelete(exp.id)}><Trash2 size={12} /> Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection({ experiences, onAdd, onEdit, onDelete, editMode }: Props) {
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
    <section id="experience" className="section">
      <div className="container">
        <div className="divider" />
        <h2 className="section-title">Work Experience</h2>
        <p className="section-subtitle">Building expertise across IT roles in Cambodia</p>

        <div className="exp-list">
          {experiences.map(e => (
            <ExpCard key={e.id} exp={e} editMode={editMode} onEdit={onEdit} onDelete={onDelete} />
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
                <button className="btn btn-primary" onClick={handleAdd}><Check size={14} /> Add</button>
                <button className="btn btn-ghost" onClick={() => setShowForm(false)}><X size={14} /> Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .exp-list {
          width: 100%;
        }
        @media (max-width: 768px) {
          .exp-list .exp-form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
