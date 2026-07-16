import './App.css';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

function CityLandingPage({ city }) {
  return (
    <div className="app-shell page-shell">
      <SiteHeader links={[{ label: 'Proyectos', href: '/proyectos' }, { label: 'Contacto', href: '/contacto' }]}>
        <div className="page-intro">
          <p className="eyebrow">{city.eyebrow}</p>
          <h1>{city.h1}</h1>
          <p className="hero-text">{city.intro}</p>
        </div>
      </SiteHeader>

      <main className="section">
        <section className="editorial-section" aria-label={`Servicios Umbral en ${city.name}`}>
          <div className="section-heading">
            <p className="eyebrow">Servicios en {city.name}</p>
            <h3>Pergolas bioclimaticas, toldos y cortinas de cristal para proyectos residenciales y profesionales.</h3>
            <p>
              Disenamos e instalamos soluciones exteriores de alto nivel para terrazas, porches, jardines, restauracion,
              hoteles y viviendas premium en {city.name} y alrededores.
            </p>
          </div>

          <div className="card-grid">
            {city.serviceHighlights.map((item) => (
              <article className="panel" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="editorial-section" aria-label={`Zonas de cobertura en ${city.name}`}>
          <div className="section-heading">
            <p className="eyebrow">Cobertura local</p>
            <h3>Trabajamos en {city.name} y su entorno cercano.</h3>
            <p>
              Atendemos proyectos a medida con visita tecnica, propuesta personalizada e instalacion profesional.
            </p>
          </div>

          <ul className="company-presence-list" aria-label={`Zonas de servicio en ${city.name}`}>
            {city.areas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </section>

        <section className="products-bottom-cta" aria-label={`Solicitud de presupuesto en ${city.name}`}>
          <h3>Solicita presupuesto en {city.name} y recibe una propuesta adaptada a tu espacio.</h3>
          <a className="text-link" href="/contacto">Hablar con Umbral</a>
        </section>
      </main>

      <FloatingWhatsAppButton />

      <SiteFooter />
    </div>
  );
}

export default CityLandingPage;
