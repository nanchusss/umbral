import { FiCheckCircle, FiWind, FiMapPin, FiAward } from 'react-icons/fi';
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
    title: 'Amplia gama de soluciones',
    text: 'Con un alto grado de personalizacion con el que ofrecer una solucion integral para la totalidad del proyecto solo con productos propios.',
    icon: <FiCheckCircle size={32} />,
  },
  {
    title: 'Sostenibilidad y eficiencia energetica',
    text: 'Incorporamos la sostenibilidad como compromiso transversal en producto, fabricacion y filosofia de empresa.',
    icon: <FiWind size={32} />,
  },
  {
    title: 'Hecho en Espana',
    text: 'Todos nuestros productos se proyectan y fabrican en Espana. Confianza y trazabilidad para entregas fiables y soporte cercano.',
    icon: <FiMapPin size={32} />,
  },
  {
    title: '+65 anos de historia industrial',
    text: 'Desde 1959 aportando soluciones que transforman espacios con evolucion constante y compromiso con nuestros clientes.',
    icon: <FiAward size={32} />,
  },
];

function CompanyPage() {
  return (
    <div className="app-shell page-shell">
      <SiteHeader links={[{ label: 'Proyectos', href: '/proyectos' }, { label: 'Contacto', href: '/contacto' }]}>
        <div className="page-intro">
          <p className="eyebrow">Empresa</p>
          <h1>Innovacion y capacidad productiva para cada espacio.</h1>
          <p className="hero-text">
            Fabricamos soluciones de exterior premium con una estructura tecnica que combina diseno, confort y eficiencia en cada proyecto.
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

        <section className="company-universe" aria-label="Nuestro universo">
          <div className="company-universe-copy">
            <h2>Nuestro universo</h2>
            <p>
              Cada persona y cada proyecto tienen su propio mundo y nosotros orbitamos a su alrededor, adaptandonos a cada necesidad con soluciones que protegen, transforman y embellecen.
            </p>
            <a href="/productos" className="text-link">Ver todos los productos</a>
          </div>
          <div className="company-universe-tabs" role="list" aria-label="Categorias">
            <span role="listitem">Productos</span>
            <span role="listitem">Proteccion solar</span>
            <span role="listitem">Cerramientos</span>
            <span role="listitem">Decoracion</span>
          </div>
        </section>
      </main>

      <FloatingWhatsAppButton />

      <SiteFooter label="Umbral · Empresa" />
    </div>
  );
}

export default CompanyPage;