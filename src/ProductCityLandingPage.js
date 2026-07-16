import './App.css';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

function ProductCityLandingPage({ page }) {
  return (
    <div className="app-shell page-shell">
      <SiteHeader links={[{ label: 'Proyectos', href: '/proyectos' }, { label: 'Contacto', href: '/contacto' }]}>
        <div className="page-intro">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.h1}</h1>
          <p className="hero-text">{page.intro}</p>
        </div>
      </SiteHeader>

      <main className="section">
        <section className="editorial-section" aria-label={`Servicio ${page.serviceName} en ${page.cityName}`}>
          <div className="section-heading">
            <p className="eyebrow">Servicio local</p>
            <h3>{page.serviceName} para residencial y contract en {page.cityName}.</h3>
            <p>
              Trabajamos con metodologia consultiva: visita tecnica, propuesta personalizada e instalacion profesional.
            </p>
          </div>

          <div className="card-grid">
            {page.highlights.map((item) => (
              <article className="panel" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="editorial-section" aria-label={`Cobertura ${page.cityName}`}>
          <div className="section-heading">
            <p className="eyebrow">Cobertura</p>
            <h3>Instalamos en {page.cityName} y municipios cercanos.</h3>
          </div>

          <ul className="company-presence-list" aria-label={`Zonas de servicio en ${page.cityName}`}>
            {page.areas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </section>

        <section className="products-bottom-cta" aria-label={`Contacto para ${page.serviceName} en ${page.cityName}`}>
          <h3>Solicita presupuesto de {page.serviceName.toLowerCase()} en {page.cityName}.</h3>
          <a className="text-link" href="/contacto">Solicitar presupuesto</a>
          <p>
            <a className="text-link" href={page.cityPath}>Ver pagina local de {page.cityName}</a> · {' '}
            <a className="text-link" href={page.productPath}>Ver pagina de {page.serviceName}</a>
          </p>
        </section>
      </main>

      <FloatingWhatsAppButton />

      <SiteFooter />
    </div>
  );
}

export default ProductCityLandingPage;
