import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'save-seed-plugin',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/save' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
              try {
                const data = JSON.parse(body);
                const seedPath = path.resolve(process.cwd(), 'src/data/seed.ts');
                const content = `// src/data/seed.ts
import type { Skill, Experience, Project, Certification, Testimonial } from '../types';

export const defaultSkills: Skill[] = ${JSON.stringify(data.skills, null, 2)};

export const defaultExperience: Experience[] = ${JSON.stringify(data.experiences, null, 2)};

export const defaultProjects: Project[] = ${JSON.stringify(data.projects, null, 2)};

export const defaultCertifications: Certification[] = ${JSON.stringify(data.certs, null, 2)};

export const defaultTestimonials: Testimonial[] = ${JSON.stringify(data.testimonials, null, 2)};`;
                
                fs.writeFileSync(seedPath, content);
                // Commit and push changes to GitHub
                try {
                  execSync('git add src/data/seed.ts');
                  execSync('git commit -m "Update seed data via UI"');
                  execSync('git push');
                } catch (gitErr) {
                  console.error('❌ Git push error:', gitErr);
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
                console.log('✅ seed.ts updated and pushed to GitHub');
              } catch (err) {
                console.error('❌ Save error:', err);
                res.statusCode = 500;
                res.end('Error');
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
  base: "/portfolio/",
})