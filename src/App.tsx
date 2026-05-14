// src/App.tsx
import { useDarkMode, useLocalStorage } from './hooks/useLocalStorage';
import {
  defaultSkills, defaultExperience, defaultProjects,
  defaultCertifications, defaultTestimonials,
} from './data/seed';
import type { Skill, Experience, Project, Certification, Testimonial } from './types';

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

      <main>
        <Hero editMode={editMode} />
        {sectionOrder.map(renderSection)}
      </main>

      <Footer />

      {editMode && (
        <div className="edit-banner">✏️ Admin Edit Mode</div>
      )}
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
