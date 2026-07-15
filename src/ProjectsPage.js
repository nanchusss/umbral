import './App.css';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

const projects = [
  { title: 'Terrazas premium', text: 'Proyectos residenciales con confort, sombra y una estética mediterránea refinada.' },
  { title: 'Espacios comerciales', text: 'Soluciones de diseño para hoteles, restaurantes y lugares de alto standing.' },
  { title: 'Exteriores singulares', text: 'Intervenciones que combinan arquitectura, materiales nobles y detalle impecable.' },
];

function ProjectsPage() {
  return (
    <div className="app-shell page-shell">
      <SiteHeader links={[{ label: 'Proyectos', href: '/proyectos' }, { label: 'Contacto', href: '/contacto' }]}>
        <div className="page-intro">
          <p className="eyebrow">Proyectos</p>
          <h1>Intervenciones que elevan cada exterior.</h1>
          <p className="hero-text">
            Trabajamos con una mirada arquitectónica y una exigencia de calidad para crear espacios memorables.
          </p>
        </div>
      </SiteHeader>

      <main className="section">
        <div className="project-list">
          {projects.map((project) => (
            <article className="panel" key={project.title}>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
            </article>
          ))}
        </div>
      </main>

      <FloatingWhatsAppButton />

      <SiteFooter label="Umbral · Proyectos premium" />
    </div>
  );
}

export default ProjectsPage;
