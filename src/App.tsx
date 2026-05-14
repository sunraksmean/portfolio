// src/App.tsx
import { useState, useEffect, useRef } from 'react';
import { useDarkMode, useLocalStorage } from './hooks/useLocalStorage';
import {
  defaultSkills, defaultExperience, defaultProjects,
  defaultCertifications, defaultTestimonials,
} from './data/seed';
import type { Skill, Experience, Project, Certification, Testimonial } from './types';

import { Save, LogOut, X } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';

import Header from './components/page/Header';
import Hero from './components/page/Hero';
import About from './components/page/About';
import Skills from './components/page/Skills';
import ExperienceSection from './components/page/Experience';
import Projects from './components/page/Projects';
import Certifications from './components/page/Certifications';
import Testimonials from './components/page/Testimonials';
import Contact from './components/page/Contact';
import Footer from './components/page/Footer';

function AppInner() {
  const { isAdmin, logout } = useAuth();
  const [dark, setDark] = useDarkMode();
  const [logo, setLogo] = useLocalStorage('portfolio-logo', 'Sun Raksmean');
  const [showExport, setShowExport] = useState(false);

  // isAdmin IS editMode — no separate editMode state needed
  const editMode = isAdmin;

  // Persistent data
  const [skills, setSkills] = useLocalStorage<Skill[]>('portfolio-skills', defaultSkills);
  const [experiences, setExperiences] = useLocalStorage<Experience[]>('portfolio-experiences', defaultExperience);
  const [projects, setProjects] = useLocalStorage<Project[]>('portfolio-projects', defaultProjects);
  const [certs, setCerts] = useLocalStorage<Certification[]>('portfolio-certs', defaultCertifications);
  const [testimonials, setTestimonials] = useLocalStorage<Testimonial[]>('portfolio-testimonials', defaultTestimonials);

  // Section Order
  const defaultOrder = ['about', 'skills', 'experience', 'projects', 'certifications', 'testimonials', 'contact'];
  const [sectionOrder, setSectionOrder] = useLocalStorage<string[]>('portfolio-section-order', defaultOrder);

  // Reorder utility
  const moveItem = (list: any[], index: number, direction: 'up' | 'down') => {
    const newList = [...list];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newList.length) return list;
    [newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]];
    return newList;
  };

  // Skill ops
  const addSkill    = (s: Skill)  => setSkills(prev => [...prev, s]);
  const editSkill   = (s: Skill)  => setSkills(prev => prev.map(x => x.id === s.id ? s : x));
  const deleteSkill = (id: string) => setSkills(prev => prev.filter(x => x.id !== id));
  const moveSkill   = (id: string, dir: 'up' | 'down') => {
    const idx = skills.findIndex(s => s.id === id);
    if (idx === -1) return;
    const skill = skills[idx];
    
    let swapIdx = -1;
    if (dir === 'up') {
      for (let i = idx - 1; i >= 0; i--) {
        if (skills[i].category === skill.category) { { swapIdx = i; break; } }
      }
    } else {
      for (let i = idx + 1; i < skills.length; i++) {
        if (skills[i].category === skill.category) { { swapIdx = i; break; } }
      }
    }
    
    if (swapIdx !== -1) {
      const newList = [...skills];
      [newList[idx], newList[swapIdx]] = [newList[swapIdx], newList[idx]];
      setSkills(newList);
    }
  };

  // Experience ops
  const addExp    = (e: Experience)  => setExperiences(prev => [e, ...prev]);
  const editExp   = (e: Experience)  => setExperiences(prev => prev.map(x => x.id === e.id ? e : x));
  const deleteExp = (id: string)     => setExperiences(prev => prev.filter(x => x.id !== id));
  const moveExp   = (id: string, dir: 'up' | 'down') => {
    const idx = experiences.findIndex(e => e.id === id);
    setExperiences(moveItem(experiences, idx, dir));
  };

  // Project ops
  const addProject    = (p: Project)  => setProjects(prev => [...prev, p]);
  const editProject   = (p: Project)  => setProjects(prev => prev.map(x => x.id === p.id ? p : x));
  const deleteProject = (id: string)  => setProjects(prev => prev.filter(x => x.id !== id));
  const moveProject   = (id: string, dir: 'up' | 'down') => {
    const idx = projects.findIndex(p => p.id === id);
    setProjects(moveItem(projects, idx, dir));
  };

  // Cert ops
  const addCert    = (c: Certification) => setCerts(prev => [...prev, c]);
  const editCert   = (c: Certification) => setCerts(prev => prev.map(x => x.id === c.id ? c : x));
  const deleteCert = (id: string)       => setCerts(prev => prev.filter(x => x.id !== id));
  const moveCert   = (id: string, dir: 'up' | 'down') => {
    const idx = certs.findIndex(c => c.id === id);
    setCerts(moveItem(certs, idx, dir));
  };

  // Testimonial ops
  const addTestimonial    = (t: Testimonial) => setTestimonials(prev => [t, ...prev]);
  const editTestimonial   = (t: Testimonial) => setTestimonials(prev => prev.map(x => x.id === t.id ? t : x));
  const deleteTestimonial = (id: string)      => setTestimonials(prev => prev.filter(x => x.id !== id));
  const moveTestimonial   = (id: string, dir: 'up' | 'down') => {
    const idx = testimonials.findIndex(t => t.id === id);
    setTestimonials(moveItem(testimonials, idx, dir));
  };

  // Push updated seed.ts to GitHub using the REST API
  const pushToGitHub = async (content: string) => {
    try {
      const token = import.meta.env.VITE_GITHUB_TOKEN;
      if (!token) {
        console.warn('⚠️ GitHub token not set; skipping remote push.');
        return;
      }
      const repoOwner = 'sunraksmean'; // adjust if different
      const repoName = 'portfolio';
      const filePath = 'src/data/seed.ts';

      // Get the current file SHA
      const getRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        headers: { Authorization: `token ${token}` },
      });
      const getData: any = await getRes.json();
      const sha = getData.sha;

      // Prepare the commit payload
      const payload = {
        message: 'Update seed data via UI',
        content: btoa(unescape(encodeURIComponent(content))), // base64 encode
        sha,
        branch: 'main',
      };

      const putRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!putRes.ok) {
        const err = await putRes.text();
        console.error('❌ GitHub push failed:', err);
      } else {
        console.log('✅ Seed data pushed to GitHub');
      }
    } catch (e) {
      console.error('❌ Unexpected error during GitHub push:', e);
    }
  };

  const handleSaveToProject = async () => {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills, experiences, projects, certs, testimonials })
      });
      if (response.ok) {
        const content = `// src/data/seed.ts
import type { Skill, Experience, Project, Certification, Testimonial } from '../types';
\nexport const defaultSkills: Skill[] = ${JSON.stringify(skills, null, 2)};
\nexport const defaultExperience: Experience[] = ${JSON.stringify(experiences, null, 2)};
\nexport const defaultProjects: Project[] = ${JSON.stringify(projects, null, 2)};
\nexport const defaultCertifications: Certification[] = ${JSON.stringify(certs, null, 2)};
\nexport const defaultTestimonials: Testimonial[] = ${JSON.stringify(testimonials, null, 2)};`;
        // Push to GitHub (optional)
        await pushToGitHub(content);
        alert('✅ Changes saved! seed.ts updated and pushed to GitHub.');
        logout(); // exit edit mode after saving
      } else {
        alert('❌ Failed to save to project files.');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Error: Make sure the development server is running.');
    }
  };

  // Section reordering logic
  const moveSection = (section: string, dir: 'up' | 'down') => {
    const idx = sectionOrder.indexOf(section);
    setSectionOrder(moveItem(sectionOrder, idx, dir));
  };

  const renderSection = (id: string) => {
    const sectionProps = {
      editMode,
      onMoveSection: (dir: 'up' | 'down') => moveSection(id, dir),
      isFirst: sectionOrder.indexOf(id) === 0,
      isLast: sectionOrder.indexOf(id) === sectionOrder.length - 1,
    };

    switch (id) {
      case 'about':
        return <About key="about" {...sectionProps} />;
      case 'skills':
        return (
          <Skills
            key="skills"
            skills={skills}
            onAdd={addSkill}
            onEdit={editSkill}
            onDelete={deleteSkill}
            onMove={moveSkill}
            {...sectionProps}
          />
        );
      case 'experience':
        return (
          <ExperienceSection
            key="experience"
            experiences={experiences}
            onAdd={addExp}
            onEdit={editExp}
            onDelete={deleteExp}
            onMove={moveExp}
            {...sectionProps}
          />
        );
      case 'projects':
        return (
          <Projects
            key="projects"
            projects={projects}
            onAdd={addProject}
            onEdit={editProject}
            onDelete={deleteProject}
            onMove={moveProject}
            {...sectionProps}
          />
        );
      case 'certifications':
        return (
          <Certifications
            key="certifications"
            certs={certs}
            onAdd={addCert}
            onEdit={editCert}
            onDelete={deleteCert}
            onMove={moveCert}
            {...sectionProps}
          />
        );
      case 'testimonials':
        return (
          <Testimonials 
            key="testimonials" 
            testimonials={testimonials} 
            onAdd={addTestimonial}
            onEdit={editTestimonial}
            onDelete={deleteTestimonial}
            onMove={moveTestimonial}
            {...sectionProps} 
          />
        );
      case 'contact':
        return <Contact key="contact" {...sectionProps} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header
        dark={dark}
        toggleDark={() => setDark(d => !d)}
        editMode={editMode}
        toggleEdit={logout}          // "Exit Edit" = logout
        logo={logo}
        onLogoChange={setLogo}
      />
      {editMode && (
        <button className="btn btn-primary" onClick={handleSaveToProject} style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1100 }}>
          <Save size={14} /> Save
        </button>
      )}

      <main>
        <Hero editMode={editMode} />
        {sectionOrder.map(renderSection)}
      </main>

      <Footer />

      {editMode && (
        <>
          <div className="admin-toolbar">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="pulse-dot-green" />
                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#fff' }}>Admin Mode</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn btn-primary" onClick={handleSaveToProject} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                  <Save size={14} /> Save
                </button>
                <button className="btn btn-outline" onClick={() => setShowExport(true)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                  View Code
                </button>
                <button className="btn btn-ghost" onClick={logout} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#fff' }}>
                  <LogOut size={14} /> Exit
                </button>
              </div>
            </div>
          </div>

          {showExport && (
            <div className="modal-overlay" onClick={() => setShowExport(false)}>
              <div className="modal" style={{ maxWidth: '800px', width: '90%' }} onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Export Portfolio Data</h3>
                  <button className="btn btn-ghost" onClick={() => setShowExport(false)}><X size={20} /></button>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Copy the code below and paste it into your <code>src/data/seed.ts</code> file to make your changes permanent in the codebase.
                </p>
                <div style={{ position: 'relative' }}>
                  <pre style={{ 
                    background: '#1e1e1e', 
                    color: '#d4d4d4', 
                    padding: '1.5rem', 
                    borderRadius: '0.75rem', 
                    fontSize: '0.8rem', 
                    maxHeight: '400px', 
                    overflow: 'auto',
                    border: '1px solid #333'
                  }}>
                    {`export const defaultSkills = ${JSON.stringify(skills, null, 2)};\n\nexport const defaultExperience = ${JSON.stringify(experiences, null, 2)};\n\nexport const defaultProjects = ${JSON.stringify(projects, null, 2)};\n\nexport const defaultCertifications = ${JSON.stringify(certs, null, 2)};\n\nexport const defaultTestimonials = ${JSON.stringify(testimonials, null, 2)};`}
                  </pre>
                  <button 
                    className="btn btn-primary" 
                    style={{ position: 'absolute', top: '1rem', right: '1rem' }}
                    onClick={() => {
                      const code = `export const defaultSkills = ${JSON.stringify(skills, null, 2)};\n\nexport const defaultExperience = ${JSON.stringify(experiences, null, 2)};\n\nexport const defaultProjects = ${JSON.stringify(projects, null, 2)};\n\nexport const defaultCertifications = ${JSON.stringify(certs, null, 2)};\n\nexport const defaultTestimonials = ${JSON.stringify(testimonials, null, 2)};`;
                      navigator.clipboard.writeText(code);
                      alert('Code copied to clipboard!');
                    }}
                  >
                    Copy Code
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <style>{`
        .admin-toolbar {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 2rem);
          max-width: 600px;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 0.75rem 1rem;
          z-index: 1000;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideUp {
          from { transform: translate(-50%, 100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }

        .pulse-dot-green {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          position: relative;
        }
        .pulse-dot-green::after {
          content: '';
          position: absolute;
          inset: -4px;
          border: 2px solid #10b981;
          border-radius: 50%;
          animation: pulse-ring 1.5s infinite;
        }

        @media (max-width: 600px) {
          .admin-toolbar {
            bottom: 1rem;
            border-radius: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
