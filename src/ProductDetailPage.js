import { FiSun, FiShield, FiLayers, FiArrowRight } from 'react-icons/fi';
import './App.css';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

function ProductDetailPage({ product }) {
  return (
    <div className="app-shell page-shell">
      <SiteHeader links={[{ label: 'Proyectos', href: '/proyectos' }, { label: 'Contacto', href: '/contacto' }]}>
        <div className="page-intro">
          <p className="eyebrow">Producto</p>
          <h1>{product.title}</h1>
          <p className="hero-text">{product.intro}</p>
        </div>
      </SiteHeader>

      <main className="section">
        <div className="product-detail-card">
          <div className="product-detail-media">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-detail-copy">
            <p className="eyebrow">Diseño premium</p>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <ul>
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {product.heroVideo && (
          <section className="product-video-section" aria-label={`Video de ${product.title}`}>
            <video
              className="product-detail-video"
              src={product.heroVideo}
              autoPlay
              muted
              loop
              playsInline
              controls
              poster={product.image}
            />
            <div className="product-video-badge">
              <p>Servicio de instalacion profesional disponible</p>
            </div>
          </section>
        )}

        <section className="editorial-section collection-section" aria-label="Colecciones Umbral">
          <div className="showcase-header">
            <p className="eyebrow">Colección</p>
            <h3>Costa Brava</h3>
          </div>

          <div className="collection-list">
            <a className="collection-card" href="/modelo/cadaques-p-190">
              <div>
                <p className="eyebrow">Modelo</p>
                <h4>Cadaqués P-190</h4>
              </div>
              <span>Ver modelo</span>
            </a>
            <a className="collection-card" href="/modelo/tossa-p-150">
              <div>
                <p className="eyebrow">Modelo</p>
                <h4>Tossa P-150</h4>
              </div>
              <span>Ver modelo</span>
            </a>
          </div>
        </section>

        <section className="editorial-section spotlight-section" aria-label="Propuesta Umbral">
          <div className="spotlight-media">
            <img src="/images/pergola_bioclimatica_p_190_principal.jpg" alt="Pérgola bioclimática Umbral" />
          </div>
          <div className="spotlight-copy">
            <p className="eyebrow">Propuesta Umbral</p>
            <h3>Una solución hecha para habitar el exterior con comodidad.</h3>
            <p>Integramos estructura, sombra y confort en una propuesta sobria, funcional y diseñada para el día a día.</p>
          </div>
        </section>

        <section className="editorial-section showcase-icons" aria-label="Ventajas de las pérgolas bioclimáticas">
          <div className="showcase-header">
            <p className="eyebrow">Por qué elegir Umbral</p>
            <h3>Diseño preciso, confort duradero.</h3>
          </div>

          <div className="icon-grid">
            <article className="icon-card">
              <div className="icon-wrap">
                <FiSun size={34} />
              </div>
              <h3>Control solar</h3>
              <p>Gestión de luz y sombra con una sensibilidad arquitectónica muy marcada.</p>
            </article>
            <article className="icon-card">
              <div className="icon-wrap">
                <FiShield size={34} />
              </div>
              <h3>Protección</h3>
              <p>Materiales y estructuras pensadas para ofrecer confort y resistencia a lo largo del tiempo.</p>
            </article>
            <article className="icon-card">
              <div className="icon-wrap">
                <FiLayers size={34} />
              </div>
              <h3>Personalización</h3>
              <p>Propuestas a medida para terrazas, jardines, hoteles y residencias de alto nivel.</p>
            </article>
          </div>

          <a className="text-link" href="/contacto">
            Descubrir más <FiArrowRight />
          </a>
        </section>

        <section className="editorial-section image-showcase-section" aria-label="Proyectos destacados">
          <div className="showcase-header">
            <p className="eyebrow">Proyectos destacados</p>
            <h3>Espacios que unen arquitectura, luz y serenidad.</h3>
          </div>

          <div className="image-showcase-grid">
            <article className="image-card image-card-large">
              <img src="/images/pergola_bioclimatica_p_190_principal.jpg" alt="Pérgola bioclimática Umbral" />
              <div className="image-card-copy">
                <h4>Pérgolas bioclimáticas</h4>
                <p>Diseño mediterráneo, confort invisible y una presencia sobria.</p>
              </div>
            </article>

            <div className="image-stack">
              <article className="image-card">
                <img src="/images/proyecto_pergola_bioclimatica_p_190_atico_campello_r_t7a9519.jpg" alt="Proyecto Umbral en Atico Campello" />
                <div className="image-card-copy">
                  <h4>Exteriores singulares</h4>
                  <p>Soluciones a medida para proyectos de alto nivel.</p>
                </div>
              </article>

              <article className="image-card">
                <img src="/images/proyecto_pergola_bioclimatica_p_190_atico_campello_r_t7a9467_1.jpg" alt="Detalle de proyecto Umbral" />
                <div className="image-card-copy">
                  <h4>Detalle de ejecución</h4>
                  <p>Arquitectura y funcionalidad en equilibrio perfecto.</p>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <FloatingWhatsAppButton />

      <SiteFooter label={`Umbral · ${product.title}`} />
    </div>
  );
}

export default ProductDetailPage;
