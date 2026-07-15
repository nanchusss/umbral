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
    title: 'Expertos en primera calidad',
    text: 'Asesoramos y vendemos soluciones premium con criterio tecnico y comercial, seleccionando siempre opciones de maxima calidad para cada proyecto.',
    icon: <FiCheckCircle size={32} />,
  },
  {
    title: 'Proveedores top de Europa',
    text: 'Trabajamos con proveedores europeos de referencia para garantizar acabados superiores, fiabilidad y rendimiento a largo plazo.',
    icon: <FiWind size={32} />,
  },
  {
    title: 'Empresa seria y profesional',
    text: 'Cumplimos plazos, cuidamos cada detalle de instalacion y mantenemos un seguimiento cercano antes, durante y despues de cada proyecto.',
    icon: <FiMapPin size={32} />,
  },
  {
    title: '30 anos de experiencia en Umbral',
    text: 'Tres decadas dedicadas al exterior premium nos avalan como un equipo solido, experto y enfocado en resultados duraderos.',
    icon: <FiAward size={32} />,
  },
];

function CompanyPage() {
  return (
    <div className="app-shell page-shell">
      <SiteHeader links={[{ label: 'Proyectos', href: '/proyectos' }, { label: 'Contacto', href: '/contacto' }]}>
        <div className="page-intro">
          <p className="eyebrow">Empresa</p>
          <h1>Sobre nosotros: experiencia, seriedad y primera calidad.</h1>
          <p className="hero-text">
            En Umbral llevamos 30 anos creando espacios exteriores premium. Somos especialistas en venta de primera calidad y trabajamos con los mejores proveedores de Europa para ofrecer soluciones fiables, elegantes y duraderas.
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
            <h2>Sobre nosotros</h2>
            <p>
              Somos una empresa seria, con estructura tecnica y comercial consolidada, orientada a clientes que buscan excelencia real. Nuestra prioridad es ofrecer confianza, transparencia y resultados impecables en cada instalacion.
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