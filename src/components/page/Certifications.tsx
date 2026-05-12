// src/components/Certifications.tsx
import { useState } from 'react';
import { Plus, Trash2, Edit3, Check, X } from 'lucide-react';
import type { Certification } from '../../types';

interface Props {
  certs: Certification[];
  onAdd: (c: Certification) => void;
  onEdit: (c: Certification) => void;
  onDelete: (id: string) => void;
  editMode: boolean;
}

function CertCard({ cert, editMode, onEdit, onDelete }: { cert: Certification; editMode: boolean; onEdit: (c: Certification) => void; onDelete: (id: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(cert);

  const save = () => { onEdit(form); setEditing(false); };

  if (editing) {
    return (
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <input className="form-input" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="Emoji icon" style={{ width: 80 }} />
          <input className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Certificate title" />
          <input className="form-input" value={form.issuer} onChange={e => setForm(f => ({ ...f, issuer: e.target.value }))} placeholder="Issuing organization" />
          <input className="form-input" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} placeholder="Year" />
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button className="btn btn-edit" onClick={save}><Check size={13} /></button>
            <button className="btn btn-ghost" onClick={() => setEditing(false)}><X size={13} /></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
      <div style={{ fontSize: '2rem' }}>{cert.icon}</div>
      <div>
        <h4 style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: '0.25rem', lineHeight: 1.35 }}>{cert.title}</h4>
        <p style={{ color: 'var(--accent-cyan)', fontSize: '0.82rem', fontWeight: 500 }}>{cert.issuer}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{cert.year}</span>
        {editMode && (
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button className="btn btn-edit" onClick={() => setEditing(true)}><Edit3 size={11} /></button>
            <button className="btn btn-danger" onClick={() => onDelete(cert.id)}><Trash2 size={11} /></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Certifications({ certs, onAdd, onEdit, onDelete, editMode }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', issuer: '', year: new Date().getFullYear().toString(), icon: '📜' });

  const handleAdd = () => {
    if (!form.title.trim()) return;
    onAdd({ ...form, id: 'cert-' + Date.now() });
    setForm({ title: '', issuer: '', year: new Date().getFullYear().toString(), icon: '📜' });
    setShowForm(false);
  };

  return (
    <section id="certifications" className="section">
      <div className="container">
        <div className="certs-header">
          <div className="certs-heading">
            <div className="divider" />
            <h2 className="section-title">Certifications</h2>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>Education &amp; professional credentials</p>
          </div>
          {editMode && !showForm && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              <Plus size={16} /> Add Certification
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {certs.map(c => (
            <CertCard key={c.id} cert={c} editMode={editMode} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>

        {editMode && showForm && (
          <div className="card" style={{ padding: '1.5rem', marginTop: '1.5rem', maxWidth: 480 }}>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>Add Certification</h4>
            <div className="form-group"><label className="form-label">Icon (Emoji)</label><input className="form-input" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} style={{ maxWidth: 80 }} /></div>
            <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Issuer</label><input className="form-input" value={form.issuer} onChange={e => setForm(f => ({ ...f, issuer: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Year</label><input className="form-input" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} /></div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-primary" onClick={handleAdd}><Check size={14} /> Add</button>
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}><X size={14} /> Cancel</button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .certs-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .certs-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .certs-heading {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .certs-heading .divider {
            margin-left: auto;
            margin-right: auto;
          }
          .certs-heading .section-subtitle {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
