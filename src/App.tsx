// src/App.tsx
import { useDarkMode, useLocalStorage } from './hooks/useLocalStorage';
import {
  defaultSkills, defaultExperience, defaultProjects,
  defaultCertifications, defaultTestimonials,
} from './data/seed';
import type { Skill, Experience, Project, Certification } from './types';

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

export default function App() {
  const [dark, setDark] = useDarkMode();
  const [editMode, setEditMode] = useLocalStorage('portfolio-edit-mode', false);
  const [logo, setLogo] = useLocalStorage('portfolio-logo', 'Sun Raksmean');

  // Persistent data
  const [skills, setSkills] = useLocalStorage<Skill[]>('portfolio-skills', defaultSkills);
  const [experiences, setExperiences] = useLocalStorage<Experience[]>('portfolio-experiences', defaultExperience);
  const [projects, setProjects] = useLocalStorage<Project[]>('portfolio-projects', defaultProjects);
  const [certs, setCerts] = useLocalStorage<Certification[]>('portfolio-certs', defaultCertifications);

  // Skill ops
  const addSkill = (s: Skill) => setSkills(prev => [...prev, s]);
  const editSkill = (s: Skill) => setSkills(prev => prev.map(x => x.id === s.id ? s : x));
  const deleteSkill = (id: string) => setSkills(prev => prev.filter(x => x.id !== id));

  // Experience ops
  const addExp = (e: Experience) => setExperiences(prev => [e, ...prev]);
  const editExp = (e: Experience) => setExperiences(prev => prev.map(x => x.id === e.id ? e : x));
  const deleteExp = (id: string) => setExperiences(prev => prev.filter(x => x.id !== id));

  // Project ops
  const addProject = (p: Project) => setProjects(prev => [...prev, p]);
  const editProject = (p: Project) => setProjects(prev => prev.map(x => x.id === p.id ? p : x));
  const deleteProject = (id: string) => setProjects(prev => prev.filter(x => x.id !== id));

  // Cert ops
  const addCert = (c: Certification) => setCerts(prev => [...prev, c]);
  const editCert = (c: Certification) => setCerts(prev => prev.map(x => x.id === c.id ? c : x));
  const deleteCert = (id: string) => setCerts(prev => prev.filter(x => x.id !== id));

  return (
    <>
      <Header
        dark={dark}
        toggleDark={() => setDark(d => !d)}
        editMode={editMode}
        toggleEdit={() => setEditMode(e => !e)}
        logo={logo}
        onLogoChange={setLogo}
      />

      <main>
        <Hero editMode={editMode} />
        <About />
        <Skills
          skills={skills}
          onAdd={addSkill}
          onEdit={editSkill}
          onDelete={deleteSkill}
          editMode={editMode}
        />
        <ExperienceSection
          experiences={experiences}
          onAdd={addExp}
          onEdit={editExp}
          onDelete={deleteExp}
          editMode={editMode}
        />
        <Projects
          projects={projects}
          onAdd={addProject}
          onEdit={editProject}
          onDelete={deleteProject}
          editMode={editMode}
        />
        <Certifications
          certs={certs}
          onAdd={addCert}
          onEdit={editCert}
          onDelete={deleteCert}
          editMode={editMode}
        />
        <Testimonials testimonials={defaultTestimonials} />
        <Contact />
      </main>

      <Footer />

      {editMode && (
        <div className="edit-banner">✏️ Edit Mode Active</div>
      )}
    </>
  );
}
