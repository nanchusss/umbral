import { FiArrowRight } from 'react-icons/fi';
import './App.css';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

function ToldoModelPage({ model }) {
  const isWindScreenModel = model.collection.includes('Wind Screen');
  const subgroupLabel = isWindScreenModel ? 'Wind Screen' : 'Brazos extensibles';
  const subgroupHref = isWindScreenModel ? '/productos/toldos/girona' : '/productos/toldos/maresme';

  const breadcrumbTrail = [
    { label: 'Productos', href: '/productos' },
    { label: 'Toldos', href: '/productos/toldos' },
    { label: subgroupLabel, href: subgroupHref },
    { label: model.title },
  ];

  const galleryImages = (model.gallery || []).filter((image) => image !== model.image);

  const isVideoFile = (mediaPath) => /\.(mp4|webm|mov)$/i.test(mediaPath);

  return (
    <div className="app-shell page-shell">
      <SiteHeader links={[{ label: 'Toldos', href: '/productos/toldos' }, { label: 'Contacto', href: '/contacto' }]}>
        <div className="page-intro">
          <nav className="page-breadcrumbs" aria-label="Ruta de navegacion">
            {breadcrumbTrail.map((item, index) => (
              <span key={`${item.label}-${index}`} className="page-breadcrumb-item">
                {item.href ? <a href={item.href}>{item.label}</a> : <span className="page-breadcrumb-current">{item.label}</span>}
                {index < breadcrumbTrail.length - 1 && <span className="page-breadcrumb-sep">|</span>}
              </span>
            ))}
          </nav>
          <p className="eyebrow">{model.collection}</p>
          <h1>{model.title}</h1>
          <p className="hero-text">{model.intro}</p>
        </div>
      </SiteHeader>

      <main className="section toldo-model-page">
        <section className="toldo-model-main" aria-label={`Detalle de ${model.title}`}>
          <div className="toldo-model-media">
            <img src={model.image} alt={model.title} />
          </div>
          <div className="toldo-model-copy">
            <p className="eyebrow">Modelo</p>
            <h2>{model.title}</h2>
            <p>{model.description}</p>
            <ul>
              {model.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            {!isWindScreenModel && (
              <a className="text-link" href="https://www.instagram.com/umbral_premium/" target="_blank" rel="noreferrer">
                Video Instagram <FiArrowRight />
              </a>
            )}
          </div>
        </section>

        <section className="toldo-model-gallery" aria-label={`Fotos de ${model.title}`}>
          {galleryImages.map((image, index) => (
            <article className="toldo-model-gallery-card" key={`${model.title}-${image}`}>
              {isVideoFile(image) ? (
                <video src={image} playsInline preload="metadata" controls aria-label={`${model.title} video ${index + 1}`} />
              ) : (
                <img src={image} alt={`${model.title} foto ${index + 1}`} />
              )}
            </article>
          ))}
        </section>

        <section className="products-bottom-cta" aria-label="Asesoria sobre el modelo">
          <h3>Quieres este modelo para tu proyecto?</h3>
          <a className="text-link" href="/contacto">
            Hablar con un asesor <FiArrowRight />
          </a>
        </section>
      </main>

      <FloatingWhatsAppButton />

      <SiteFooter label={`Umbral · ${model.title}`} />
    </div>
  );
}

export default ToldoModelPage;
