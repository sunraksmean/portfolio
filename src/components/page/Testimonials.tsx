import { useState } from 'react';
import { Quote, ChevronUp, ChevronDown, Plus, Trash2, Edit3, Check, X } from 'lucide-react';
import type { Testimonial } from '../../types';

interface Props { 
  testimonials: Testimonial[];
  onAdd: (t: Testimonial) => void;
  onEdit: (t: Testimonial) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, dir: 'up' | 'down') => void;
  editMode?: boolean;
  onMoveSection?: (dir: 'up' | 'down') => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function Testimonials({ 
  testimonials, onAdd, onEdit, onDelete, onMove,
  editMode, onMoveSection, isFirst, isLast 
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Partial<Testimonial>>({});

  const openAdd = () => {
    setEditing(null);
    setForm({ id: crypto.randomUUID(), name: '', role: '', company: '', message: '', initials: '' });
    setShowModal(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm(t);
    setShowModal(true);
  };

  const save = () => {
    if (!form.name || !form.message) return;
    if (editing) onEdit(form as Testimonial);
    else onAdd(form as Testimonial);
    setShowModal(false);
  };

  return (
    <section id="testimonials" className="section" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      {editMode && onMoveSection && (
        <div style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
          <button className="btn btn-edit" disabled={isFirst} onClick={() => onMoveSection('up')} title="Move Section Up"><ChevronUp size={14} /></button>
          <button className="btn btn-edit" disabled={isLast} onClick={() => onMoveSection('down')} title="Move Section Down"><ChevronDown size={14} /></button>
        </div>
      )}
      
      <div className="container">
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div className="divider" style={{ margin: '0 auto 0.75rem' }} />
          <h2 className="section-title">Testimonials</h2>
          <p className="section-subtitle">What colleagues and managers say</p>
          {editMode && (
            <button className="btn btn-primary" onClick={openAdd} style={{ marginTop: '0.5rem' }}>
              <Plus size={18} /> Add Testimonial
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map((t, idx) => (
            <div key={t.id} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
              {editMode && (
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', display: 'flex', gap: '0.4rem' }}>
                  <button className="btn btn-edit" onClick={() => onMove(t.id, 'up')} disabled={idx === 0} title="Move Up"><ChevronUp size={12} /></button>
                  <button className="btn btn-edit" onClick={() => onMove(t.id, 'down')} disabled={idx === testimonials.length - 1} title="Move Down"><ChevronDown size={12} /></button>
                  <button className="btn btn-edit" onClick={() => openEdit(t)} title="Edit"><Edit3 size={12} /></button>
                  <button className="btn btn-danger" onClick={() => onDelete(t.id)} title="Delete"><Trash2 size={12} /></button>
                </div>
              )}

              <Quote size={28} style={{ color: 'var(--accent-blue)', opacity: 0.4 }} />
              
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '0.95rem', 
                lineHeight: 1.8, 
                fontWeight: 300, 
                fontStyle: 'italic', 
                flex: 1 
              }}>
                "{t.message}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--accent-gradient)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: '1rem', flexShrink: 0,
                  boxShadow: '0 4px 12px var(--accent-glow)'
                }}>
                  {t.initials || t.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{t.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. John Smith" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Role</label>
                <input className="form-input" value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="e.g. CEO" />
              </div>
              <div className="form-group">
                <label className="form-label">Company</label>
                <input className="form-input" value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="e.g. Acme Inc." />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Initials</label>
                <input className="form-input" value={form.initials} onChange={e => setForm({...form, initials: e.target.value})} placeholder="e.g. JS" maxLength={3} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea 
                className="form-textarea" 
                value={form.message} 
                onChange={e => setForm({...form, message: e.target.value})} 
                placeholder="What they said about you..."
                style={{ minHeight: 120 }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={save}>
                <Check size={18} /> Save Testimonial
              </button>
              <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
