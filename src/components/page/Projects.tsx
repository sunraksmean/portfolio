// src/components/Projects.tsx
import { useState } from 'react';
import { Plus, Trash2, Edit3, X, Check, ExternalLink, ChevronRight } from 'lucide-react';
import type { Project } from '../../types';

interface Props {
  projects: Project[];
  onAdd: (p: Project) => void;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
  editMode: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  live: '#10b981',
  development: '#f59e0b',
  concept: '#8b5cf6',
};

function ProjectCard({ project, editMode, onEdit, onDelete, onClick }: {
  project: Project; editMode: boolean;
  onEdit: (p: Project) => void; onDelete: (id: string) => void;
  onClick: () => void;
}) {
  return (
    <div className="card" style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1rem' }} onClick={onClick}>
      {/* Color accent bar */}
      <div style={{ height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>{project.title}</h3>
        <span style={{
          padding: '0.18rem 0.6rem', borderRadius: '999px',
          background: `${STATUS_COLORS[project.status]}20`,
          color: STATUS_COLORS[project.status],
          fontSize: '0.7rem', fontWeight: 600, textTransform: 'capitalize', flexShrink: 0, marginLeft: '0.5rem',
          border: `1px solid ${STATUS_COLORS[project.status]}40`,
        }}>
          {project.status}
        </span>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.65, fontWeight: 300, flex: 1 }}>{project.description}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        {project.tech.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
        {project.tech.length > 4 && <span className="tag">+{project.tech.length - 4}</span>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
        <span style={{ color: 'var(--accent-blue)', fontSize: '0.82rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          View Details <ChevronRight size={14} />
        </span>
        {editMode && (
          <div style={{ display: 'flex', gap: '0.35rem' }} onClick={e => e.stopPropagation()}>
            <button className="btn btn-edit" onClick={() => onEdit(project)}><Edit3 size={11} /></button>
            <button className="btn btn-danger" onClick={() => onDelete(project.id)}><Trash2 size={11} /></button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ height: 3, width: 40, borderRadius: 2, background: `linear-gradient(90deg, ${project.color}, transparent)`, marginBottom: '0.5rem' }} />
            <h2 style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--text-primary)' }}>{project.title}</h2>
          </div>
          <button className="btn btn-ghost" onClick={onClose}><X size={20} /></button>
        </div>

        <span style={{
          padding: '0.25rem 0.8rem', borderRadius: '999px',
          background: `${STATUS_COLORS[project.status]}20`,
          color: STATUS_COLORS[project.status],
          fontSize: '0.78rem', fontWeight: 600, textTransform: 'capitalize',
          border: `1px solid ${STATUS_COLORS[project.status]}40`,
          display: 'inline-block', marginBottom: '1rem',
        }}>
          {project.status === 'live' ? '🟢' : project.status === 'development' ? '🟡' : '🟣'} {project.status}
        </span>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.5rem', fontWeight: 300 }}>{project.description}</p>

        <h4 style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Key Highlights</h4>
        <ul style={{ paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {project.highlights.map((h, i) => (
            <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{h}</li>
          ))}
        </ul>

        <h4 style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Tech Stack</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {project.tech.map(t => <span key={t} className="tag" style={{ fontSize: '0.82rem' }}>{t}</span>)}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
          <button className="btn btn-primary"><ExternalLink size={14} /> View Project</button>
          <button className="btn btn-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function EditProjectModal({ project, onSave, onClose }: { project: Partial<Project>; onSave: (p: Project) => void; onClose: () => void }) {
  const [form, setForm] = useState({
    id: project.id || 'p-' + Date.now(),
    title: project.title || '',
    description: project.description || '',
    tech: (project.tech || []).join(', '),
    highlights: (project.highlights || []).join('\n'),
    status: project.status || 'concept' as const,
    color: project.color || '#3b82f6',
  });

  const save = () => {
    if (!form.title.trim()) return;
    onSave({
      id: form.id,
      title: form.title,
      description: form.description,
      tech: form.tech.split(',').map(t => t.trim()).filter(Boolean),
      highlights: form.highlights.split('\n').filter(Boolean),
      status: form.status,
      color: form.color,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{project.id ? 'Edit Project' : 'Add Project'}</h3>
          <button className="btn btn-ghost" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
        <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
        <div className="form-group"><label className="form-label">Tech Stack (comma separated)</label><input className="form-input" value={form.tech} onChange={e => setForm(f => ({ ...f, tech: e.target.value }))} /></div>
        <div className="form-group"><label className="form-label">Highlights (one per line)</label><textarea className="form-textarea" value={form.highlights} onChange={e => setForm(f => ({ ...f, highlights: e.target.value }))} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Project['status'] }))}>
              <option value="live">Live</option>
              <option value="development">Development</option>
              <option value="concept">Concept</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Accent Color</label>
            <input type="color" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} style={{ width: '100%', height: 40, border: 'none', borderRadius: '0.5rem', cursor: 'pointer', background: 'none' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <button className="btn btn-primary" onClick={save}><Check size={14} /> Save Project</button>
          <button className="btn btn-ghost" onClick={onClose}><X size={14} /> Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects, onAdd, onEdit, onDelete, editMode }: Props) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);

  return (
    <section id="projects" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="projects-header">
          <div className="projects-heading">
            <div className="divider" />
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>Systems and tools built for real IT challenges</p>
          </div>
          {editMode && (
            <button className="btn btn-primary" onClick={() => setEditing({})}>
              <Plus size={16} /> Add Project
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} editMode={editMode}
              onClick={() => setSelected(p)}
              onEdit={p => setEditing(p)}
              onDelete={onDelete}
            />
          ))}
        </div>

        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
        {editing !== null && (
          <EditProjectModal
            project={editing}
            onClose={() => setEditing(null)}
            onSave={p => {
              if (editing.id) onEdit(p); else onAdd(p);
              setEditing(null);
            }}
          />
        )}
      </div>

      <style>{`
        .projects-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .projects-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .projects-heading {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .projects-heading .divider {
            margin-left: auto;
            margin-right: auto;
          }
          .projects-heading .section-subtitle {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
