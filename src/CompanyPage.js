import { FiCheckCircle, FiWind, FiMapPin, FiAward, FiClock, FiUsers, FiTool, FiTrendingUp } from 'react-icons/fi';
import './App.css';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

const companyAreas = [
  { title: 'Hoteles, restaurantes y cafeterias', image: '/images/pergolas.jpg' },
  { title: 'Oficinas', image: '/images/proyecto_pergola_bioclimatica_p_190_atico_campello_r_t7a9519.jpg' },
  { title: 'Viviendas', image: '/images/pergola_bioclimatica_p_190_principal.jpg' },
];

const companyStats = [
  {
    title: 'Seleccion premium real',
    text: 'No trabajamos por catalogo masivo. Curamos soluciones de alta gama para cada necesidad de proyecto, uso y presupuesto.',
    icon: <FiCheckCircle size={32} />,
  },
  {
    title: 'Proveedores lideres en Europa',
    text: 'Colaboramos con marcas de referencia como Saxun para asegurar tecnologia contrastada, durabilidad y acabados impecables.',
    icon: <FiWind size={32} />,
  },
  {
    title: 'Ejecucion seria y previsible',
    text: 'Plazos definidos, comunicacion directa y seguimiento de obra para que el cliente tenga control total del proceso.',
    icon: <FiMapPin size={32} />,
  },
  {
    title: '30 anos de experiencia',
    text: 'Tres decadas en exterior premium nos permiten anticipar problemas, optimizar decisiones y entregar resultados consistentes.',
    icon: <FiAward size={32} />,
  },
];

const companyProcess = [
  {
    title: 'Diagnostico y propuesta',
    text: 'Analizamos espacio, orientacion solar y objetivos de uso para definir una propuesta comercial y tecnica sin sorpresas.',
    icon: <FiUsers size={30} />,
  },
  {
    title: 'Planificacion de proyecto',
    text: 'Aterrizamos plazos, materiales, acabados y fases de instalacion para garantizar una ejecucion ordenada.',
    icon: <FiClock size={30} />,
  },
  {
    title: 'Instalacion y control de detalle',
    text: 'Nuestro equipo coordina la puesta en obra y verifica terminaciones para que el resultado final este a la altura.',
    icon: <FiTool size={30} />,
  },
  {
    title: 'Seguimiento y evolucion',
    text: 'Acompanamos al cliente tras la entrega para asegurar rendimiento y detectar oportunidades de mejora futura.',
    icon: <FiTrendingUp size={30} />,
  },
];

const ethicalValues = [
  {
    title: 'Eficiencia energetica responsable',
    text: 'Priorizamos soluciones que mejoran el control solar, reducen consumos y elevan el confort termico de forma sostenible.',
    icon: <FiWind size={30} />,
  },
  {
    title: 'Compromiso con la ecologia',
    text: 'Seleccionamos proveedores y sistemas con enfoque de durabilidad, menor impacto y una vision de largo plazo.',
    icon: <FiCheckCircle size={30} />,
  },
  {
    title: 'Cultura del trabajo y esfuerzo',
    text: 'Defendemos una forma de trabajar basada en la constancia, el detalle y el respeto por la palabra dada al cliente.',
    icon: <FiAward size={30} />,
  },
];

const cataloniaPresence = [
  { label: 'Barcelona y area metropolitana', href: '/barcelona' },
  { label: 'Girona y Costa Brava', href: '/girona' },
  { label: 'Tarragona y Costa Daurada', href: '/tarragona' },
  { label: 'Lleida y entorno interior', href: '/lleida' },
];

function CompanyPage() {
  return (
    <div className="app-shell page-shell">
      <SiteHeader>
        <div className="page-intro">
          <p className="eyebrow">Empresa</p>
          <h1>Sobre nosotros: estrategia, diseno y ejecucion premium para exterior.</h1>
          <p className="hero-text">
            En Umbral ayudamos a transformar terrazas, porches, viviendas y espacios profesionales en entornos de alto valor percibido.
            Combinamos experiencia comercial, criterio tecnico y una seleccion de producto premium para crear proyectos que venden mejor, se disfrutan mas y duran mas tiempo.
          </p>
        </div>
      </SiteHeader>

      <main className="section company-section">
        <section className="company-areas" aria-label="Aplicaciones por sector">
          {companyAreas.map((area) => (
            <article key={area.title} className="company-area-card">
              <img src={area.image} alt={area.title} />
              <h3>{area.title}</h3>
            </article>
          ))}
        </section>

        <section className="company-stats" aria-label="Indicadores de empresa">
          {companyStats.map((item) => (
            <article key={item.title} className="company-stat-card">
              <div className="company-stat-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className="editorial-section" aria-label="Metodo de trabajo Umbral">
          <div className="section-heading">
            <p className="eyebrow">Metodo Umbral</p>
            <h3>Un proceso comercial y tecnico pensado para dar seguridad en cada decision.</h3>
          </div>

          <div className="card-grid">
            {companyProcess.map((step) => (
              <article className="panel" key={step.title}>
                <div className="company-stat-icon">{step.icon}</div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="canal-etico" className="editorial-section company-ethics" aria-label="Canal etico y valores Umbral">
          <div className="section-heading">
            <p className="eyebrow">Canal etico</p>
            <h3>Valores que guian cada decision en Umbral.</h3>
            <p>
              Nuestro canal etico no es un tramite. Es una declaracion de como entendemos el negocio: rendimiento energetico,
              respeto por el entorno y una cultura profesional basada en el trabajo bien hecho.
            </p>
          </div>

          <div className="company-ethics-grid">
            {ethicalValues.map((value) => (
              <article className="company-ethic-card" key={value.title}>
                <div className="company-stat-icon">{value.icon}</div>
                <h4>{value.title}</h4>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="editorial-section company-presence" aria-label="Presencia en Cataluna">
          <div className="section-heading">
            <p className="eyebrow">Presencia</p>
            <h3>Estamos presentes en toda Cataluna.</h3>
            <p>
              Acompanamos proyectos residenciales y profesionales en todo el territorio, con capacidad comercial y tecnica para responder con agilidad.
            </p>
          </div>

          <div className="company-presence-layout">
            <div className="company-catalonia-map" role="img" aria-label="Mapa de Cataluna con presencia Umbral">
              <span className="map-point barcelona">Barcelona</span>
              <span className="map-point girona">Girona</span>
              <span className="map-point lleida">Lleida</span>
              <span className="map-point tarragona">Tarragona</span>
            </div>

            <ul className="company-presence-list" aria-label="Zonas de presencia">
              {cataloniaPresence.map((zone) => (
                <li key={zone.href}>
                  <a href={zone.href}>{zone.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="company-universe" aria-label="Nuestro universo">
          <div className="company-universe-copy">
            <h2>Que obtiene un cliente al trabajar con Umbral</h2>
            <p>
              Obtiene una empresa cercana pero exigente, que acompana todo el recorrido: asesoramiento, seleccion de solucion, instalacion y seguimiento.
              Nuestro objetivo no es cerrar una venta rapida, sino construir una relacion de confianza y resultados medibles.
            </p>
            <a href="/productos" className="text-link">Ver todos los productos</a>
          </div>
          <div className="company-universe-tabs" role="list" aria-label="Categorias">
            <span role="listitem">Ventas consultivas</span>
            <span role="listitem">Proteccion solar</span>
            <span role="listitem">Cerramientos premium</span>
            <span role="listitem">Instalacion profesional</span>
          </div>
        </section>

        <section className="products-bottom-cta" aria-label="Llamada a la accion empresa">
          <h3>Si buscas una empresa seria para elevar el valor de tu espacio, hablemos.</h3>
          <a className="text-link" href="/contacto">Solicitar asesoramiento</a>
        </section>
      </main>

      <FloatingWhatsAppButton />

      <SiteFooter label="Umbral · Empresa" />
    </div>
  );
}

export default CompanyPage;