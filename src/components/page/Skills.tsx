// src/components/Skills.tsx
import { useState } from 'react';
import { Plus, Trash2, Edit3, Check, X } from 'lucide-react';
import type { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
  onAdd: (s: Skill) => void;
  onEdit: (s: Skill) => void;
  onDelete: (id: string) => void;
  editMode: boolean;
}

const CATEGORIES = ['Systems & Support', 'Networking', 'Database & Reporting', 'Tools & Security'];

function SkillBar({ skill, editMode, onEdit, onDelete }: { skill: Skill; editMode: boolean; onEdit: (s: Skill) => void; onDelete: (id: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(skill);

  const save = () => { onEdit(form); setEditing(false); };

  if (editing) {
    return (
      <div style={{ background: 'var(--bg-input)', border: '1px solid var(--accent-blue)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '0.5rem' }}>
        <input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={{ marginBottom: '0.5rem' }} />
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input type="range" min={0} max={100} value={form.level} onChange={e => setForm(f => ({ ...f, level: +e.target.value }))} style={{ flex: 1 }} />
          <span style={{ width: 40, color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.85rem' }}>{form.level}%</span>
          <button className="btn btn-edit" onClick={save}><Check size={13} /></button>
          <button className="btn btn-ghost" onClick={() => setEditing(false)}><X size={13} /></button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '0.9rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-primary)' }}>{skill.name}</span>
        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>{skill.level}%</span>
          {editMode && (
            <>
              <button className="btn btn-edit" onClick={() => setEditing(true)}><Edit3 size={11} /></button>
              <button className="btn btn-danger" onClick={() => onDelete(skill.id)}><Trash2 size={11} /></button>
            </>
          )}
        </div>
      </div>
      <div style={{ height: 6, background: 'var(--progress-bg)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${skill.level}%`,
          background: 'var(--accent-gradient)',
          borderRadius: 3,
          transition: 'width 0.8s cubic-bezier(0.34,1.56,0.64,1)',
        }} />
      </div>
    </div>
  );
}

export default function Skills({ skills, onAdd, onEdit, onDelete, editMode }: SkillsProps) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Skill, 'id'>>({ name: '', level: 80, category: CATEGORIES[0] });
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);

  const filtered = skills.filter(s => s.category === activeTab);

  const handleAdd = () => {
    if (!form.name.trim()) return;
    onAdd({ ...form, id: 'sk-' + Date.now() });
    setForm({ name: '', level: 80, category: activeTab });
    setShowForm(false);
  };

  return (
    <section id="skills" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="divider" />
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">Core competencies across IT domains</p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveTab(cat)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '999px',
                border: activeTab === cat ? 'none' : '1px solid var(--border)',
                background: activeTab === cat ? 'var(--accent-gradient)' : 'transparent',
                color: activeTab === cat ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontFamily: "'Kantumruy Pro', sans-serif",
                fontSize: '0.82rem',
                fontWeight: activeTab === cat ? 600 : 400,
                transition: 'all 0.2s',
              }}>
              {cat}
            </button>
          ))}
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          {filtered.length === 0 && (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No skills in this category yet.</p>
          )}
          {filtered.map(s => (
            <SkillBar key={s.id} skill={s} editMode={editMode} onEdit={onEdit} onDelete={onDelete} />
          ))}

          {editMode && !showForm && (
            <button className="btn btn-outline" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }} onClick={() => setShowForm(true)}>
              <Plus size={16} /> Add Skill
            </button>
          )}

          {editMode && showForm && (
            <div style={{ marginTop: '1rem', background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '1.25rem' }}>
              <h4 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '0.9rem' }}>Add Skill</h4>
              <div className="form-group">
                <label className="form-label">Skill Name</label>
                <input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Docker" />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Proficiency: {form.level}%</label>
                <input type="range" min={0} max={100} value={form.level} onChange={e => setForm(f => ({ ...f, level: +e.target.value }))} style={{ width: '100%' }} />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-primary" onClick={handleAdd}><Check size={14} /> Add</button>
                <button className="btn btn-ghost" onClick={() => setShowForm(false)}><X size={14} /> Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
