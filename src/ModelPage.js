import './App.css';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

const galleryImages = [
  '/images/proyecto_pergola_bioclimatica_p_190_atico_campello_r_t7a9419.jpg',
  '/images/proyecto_pergola_bioclimatica_p_190_atico_campello_r_t7a9467_1.jpg',
  '/images/proyecto_pergola_bioclimatica_p_190_atico_campello_r_t7a9519.jpg',
];

function ModelPage() {
  return (
    <div className="app-shell model-page">
      <SiteHeader heroClassName="hero model-hero" links={[{ label: 'Detalles', href: '#detalles' }, { label: 'Contacto', href: '#contacto' }]}>
        <div className="hero-grid model-grid">
          <div className="hero-copy">
            <p className="eyebrow">Modelo flagship · Cadaqués P-190</p>
            <h1>Una pérgola bioclimática hecha para el lujo mediterráneo.</h1>
            <p className="hero-text">
              El Cadaqués P-190 une arquitectura de referencia, movimiento preciso y una geometría elegante para crear un espacio exterior soberbio, pensado para residencias, hoteles y proyectos de alto nivel.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#contacto">Solicitar información</a>
              <a className="secondary-btn" href="https://www.instagram.com/umbral.premium" target="_blank" rel="noreferrer">Ver inspiración</a>
            </div>
          </div>

          <div className="model-visual-card">
            <img src="/images/pergola_bioclimatica_p_190_principal.jpg" alt="Pérgola bioclimática modelo Cadaqués P-190" />
          </div>
        </div>
      </SiteHeader>

      <main>
        <section id="detalles" className="section">
          <div className="section-heading">
            <p className="eyebrow">Detalles de diseño</p>
            <h3>Arquitectura abierta, confort refinado y una presencia discreta pero contundente.</h3>
          </div>

          <div className="card-grid model-specs">
            <article className="panel">
              <h4>Diseño</h4>
              <p>Formas limpias, proporciones cálidas y una estética que dialoga con el entorno mediterráneo.</p>
            </article>
            <article className="panel">
              <h4>Funcionalidad</h4>
              <p>Control solar adaptable, ventilación natural y confort durante todo el año.</p>
            </article>
            <article className="panel">
              <h4>Acabados</h4>
              <p>Materiales nobles y una ejecución de alta gama pensada para proyectos premium.</p>
            </article>
          </div>
        </section>

        <section className="section gallery-section">
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div key={image} className={`gallery-item gallery-${index + 1}`}>
                <img src={image} alt={`Detalle del modelo Cadaqués P-190 ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>

        <section className="section info-section">
          <div className="section-heading">
            <p className="eyebrow">Información del modelo</p>
            <h3>Una propuesta técnica y estética pensada para exteriores de alto nivel.</h3>
          </div>

          <div className="info-grid">
            <article className="info-card">
              <h4>Arquitectura</h4>
              <p>Geometría limpia, proporciones equilibradas y una presencia discreta que dialoga con el entorno.</p>
            </article>
            <article className="info-card">
              <h4>Confort</h4>
              <p>Control solar adaptable y ventilación natural para disfrutar del exterior durante todo el año.</p>
            </article>
            <article className="info-card">
              <h4>Materiales</h4>
              <p>Acabados nobles y una ejecución cuidada, pensada para residencias, hoteles y proyectos premium.</p>
            </article>
          </div>
        </section>

        <section id="contacto" className="section contact-section">
          <div className="contact-card">
            <div className="contact-copy">
              <p className="eyebrow">Consulta el modelo</p>
              <h3>Quiero este nivel de diseño para mi proyecto.</h3>
              <p>Escríbenos y prepararemos una propuesta personalizada para el modelo Cadaqués P-190 y otros proyectos premium en Cataluña.</p>
            </div>
            <div className="hero-actions">
              <a className="primary-btn" href="mailto:nanchusss@icloud.com">Solicitar información</a>
            </div>
          </div>
        </section>
      </main>

      <FloatingWhatsAppButton />

      <SiteFooter label="Umbral · Cadaqués P-190" />
    </div>
  );
}

export default ModelPage;
