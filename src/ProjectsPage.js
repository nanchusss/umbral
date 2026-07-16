import './App.css';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

const projects = [
  {
    title: 'Terrazas premium',
    location: 'Costa Brava',
    text: 'Proyectos residenciales donde la sombra y la arquitectura conviven con una estetica limpia y relajada.',
    cover: '/images/cortinacristal_horeca_azur_st_post_1.jpg',
    gallery: [
      '/images/cortinacristal1.png',
      '/images/cortinacristal2.jpg',
      '/images/cortina_cristal_iras_r_t7a9754.jpg',
    ],
  },
  {
    title: 'Espacios comerciales',
    location: 'Barcelona',
    text: 'Soluciones para hoteles, restaurantes y espacios contract que requieren imagen, confort y resistencia diaria.',
    cover: '/images/pergola_bioclimatica_p_190_principal.jpg',
    gallery: [
      '/images/proyecto_pergola_bioclimatica_p_190_atico_campello_r_t7a9419.jpg',
      '/images/proyecto_pergola_bioclimatica_p_190_atico_campello_r_t7a9467_1.jpg',
      '/images/proyecto_pergola_bioclimatica_p_190_atico_campello_r_t7a9519.jpg',
    ],
  },
  {
    title: 'Exteriores singulares',
    location: 'Maresme',
    text: 'Intervenciones a medida con materiales nobles, detalles tecnicos y un lenguaje visual contemporaneo.',
    cover: '/images/aura_abierto_saxun_seda.png',
    gallery: [
      '/images/aura.jpg',
      '/images/herta.jpg',
      '/images/ws_neo_web_1.png',
    ],
  },
];

const editorialSeries = [
  {
    eyebrow: 'Residencial premium',
    title: 'Terrazas abiertas al paisaje con control solar preciso.',
    text: 'Combinamos pergolas bioclimaticas y cierres ligeros para ampliar la vida exterior durante todo el ano sin romper la calma visual de la arquitectura.',
    media: '/images/cortinacristal_horeca_azur_st_post_1.jpg',
    supportMedia: '/images/toldo2.mp4',
  },
  {
    eyebrow: 'Contract & horeca',
    title: 'Espacios comerciales que ganan versatilidad y presencia.',
    text: 'Instalaciones para restauracion y hoteleria donde la luz, la transparencia y la proteccion trabajan juntas para mejorar experiencia y operativa diaria.',
    media: '/images/videoinstalacion.mp4',
    supportMedia: '/images/saxun_pergola_bioclimatica_sprinter_31_1.jpg',
  },
  {
    eyebrow: 'Exteriores singulares',
    title: 'Piezas tecnicas con una estetica editorial y contemporanea.',
    text: 'Cada proyecto se resuelve con una narrativa de materiales y detalle, integrando sombra, ventilacion y privacidad sin sobrecargar el conjunto.',
    media: '/images/toldo1.mp4',
    supportMedia: '/images/pergola_bioclimatica_p_190_principal.jpg',
  },
];

const isVideoFile = (path) => /\.(mp4|webm|mov)$/i.test(path);

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
        <section className="projects-showcase-intro" aria-label="Destacados de proyectos">
          <p className="eyebrow">Seleccion Umbral</p>
          <h2>Proyectos reales con impacto visual y detalle premium.</h2>
          <p>
            Una vista rapida de instalaciones que transforman terrazas, fachadas y zonas de uso profesional.
          </p>
        </section>

        <div className="project-wow-grid">
          {projects.map((project) => (
            <article className="project-wow-card" key={project.title}>
              <div className="project-wow-cover">
                <img src={project.cover} alt={`Proyecto ${project.title}`} loading="lazy" />
                <div className="project-wow-overlay">
                  <p className="eyebrow">{project.location}</p>
                  <h3>{project.title}</h3>
                </div>
              </div>

              <p className="project-wow-text">{project.text}</p>

              <div className="project-wow-mini-grid" aria-label={`Galeria de ${project.title}`}>
                {project.gallery.map((image, index) => (
                  <figure className="project-wow-mini" key={`${project.title}-${image}`}>
                    <img src={image} alt={`${project.title} detalle ${index + 1}`} loading="lazy" />
                  </figure>
                ))}
              </div>

              <a className="text-link" href="/contacto">Quiero un proyecto asi</a>
            </article>
          ))}
        </div>

        <section className="projects-bottom-note" aria-label="Cierre de proyectos">
          <p>
            Cada propuesta se adapta a la arquitectura del espacio, al estilo de vida del cliente y al nivel de exigencia del proyecto.
          </p>
        </section>

        <section className="projects-editorial-series" aria-label="Serie editorial de proyectos">
          {editorialSeries.map((item, index) => (
            <article className={`projects-editorial-row ${index % 2 === 1 ? 'reverse' : ''}`} key={item.title}>
              <div className="projects-editorial-main-media">
                {isVideoFile(item.media) ? (
                  <video src={item.media} autoPlay muted loop playsInline preload="metadata" />
                ) : (
                  <img src={item.media} alt={item.title} loading="lazy" />
                )}
              </div>

              <div className="projects-editorial-copy">
                <p className="eyebrow">{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>

                <div className="projects-editorial-support-media">
                  {isVideoFile(item.supportMedia) ? (
                    <video src={item.supportMedia} autoPlay muted loop playsInline preload="metadata" />
                  ) : (
                    <img src={item.supportMedia} alt={`${item.title} detalle`} loading="lazy" />
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <FloatingWhatsAppButton />

      <SiteFooter label="Umbral · Proyectos premium" />
    </div>
  );
}

export default ProjectsPage;
