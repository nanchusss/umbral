import { FiSun, FiShield, FiLayers, FiArrowRight } from 'react-icons/fi';
import './App.css';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

function ProductDetailPage({ product }) {
  const currentPath = window.location.pathname;
  const normalizedPath = currentPath.endsWith('/') && currentPath !== '/' ? currentPath.slice(0, -1) : currentPath;
  const isMaresmeCollectionPage = normalizedPath === '/productos/toldos/maresme';
  const isCristalCollectionPage = normalizedPath === '/productos/cortinas-de-cristal';
  const breadcrumbTrail =
    currentPath === '/productos/toldos/maresme' || currentPath === '/productos/toldos/girona' || currentPath === '/productos/cortinas-de-cristal'
      ? [
          { label: 'Productos', href: '/productos' },
          { label: isCristalCollectionPage ? 'Cortinas de cristal' : 'Toldos', href: isCristalCollectionPage ? '/productos/cortinas-de-cristal' : '/productos/toldos' },
          { label: product.collectionName || product.title },
        ]
      : [
          { label: 'Productos', href: '/productos' },
          { label: product.title },
        ];

  const collectionName = product.collectionName || 'Costa Brava';
  const collectionItems = product.collectionItems || [
    { eyebrow: 'Modelo', title: 'Cadaqués P-190', href: '/modelo/cadaques-p-190', cta: 'Ver modelo' },
    { eyebrow: 'Modelo', title: 'Tossa P-150', href: '/modelo/tossa-p-150', cta: 'Ver modelo' },
  ];
  const collectionGroups = product.collectionGroups || [
    {
      title: collectionName,
      subgroups: [
        {
          title: 'Modelos',
          items: collectionItems,
        },
      ],
    },
  ];
  const spotlightImage = product.spotlightImage || '/images/pergola_bioclimatica_p_190_principal.jpg';
  const spotlightAlt = product.spotlightAlt || 'Solución Umbral';
  const spotlightEyebrow = product.spotlightEyebrow || 'Propuesta Umbral';
  const spotlightTitle = product.spotlightTitle || 'Una solución hecha para habitar el exterior con comodidad.';
  const spotlightText = product.spotlightText || 'Integramos estructura, sombra y confort en una propuesta sobria, funcional y diseñada para el día a día.';
  const benefitsTitle = product.benefitsTitle || 'Por qué elegir Umbral';
  const benefitsSubtitle = product.benefitsSubtitle || 'Diseño preciso, confort duradero.';
  const showcaseCards = product.showcaseCards || [
    {
      image: '/images/pergola_bioclimatica_p_190_principal.jpg',
      alt: 'Pérgola bioclimática Umbral',
      title: 'Pérgolas bioclimáticas',
      text: 'Diseño mediterráneo, confort invisible y una presencia sobria.',
    },
    {
      image: '/images/proyecto_pergola_bioclimatica_p_190_atico_campello_r_t7a9519.jpg',
      alt: 'Proyecto Umbral en Atico Campello',
      title: 'Exteriores singulares',
      text: 'Soluciones a medida para proyectos de alto nivel.',
    },
    {
      image: '/images/proyecto_pergola_bioclimatica_p_190_atico_campello_r_t7a9467_1.jpg',
      alt: 'Detalle de proyecto Umbral',
      title: 'Detalle de ejecución',
      text: 'Arquitectura y funcionalidad en equilibrio perfecto.',
    },
  ];

  return (
    <div className="app-shell page-shell">
      <SiteHeader>
        <div className="page-intro">
          <nav className="page-breadcrumbs" aria-label="Ruta de navegacion">
            {breadcrumbTrail.map((item, index) => (
              <span key={`${item.label}-${index}`} className="page-breadcrumb-item">
                {item.href ? <a href={item.href}>{item.label}</a> : <span className="page-breadcrumb-current">{item.label}</span>}
                {index < breadcrumbTrail.length - 1 && <span className="page-breadcrumb-sep">|</span>}
              </span>
            ))}
          </nav>
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
              muted
              playsInline
              preload="metadata"
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
            <h3>{collectionName}</h3>
          </div>

          <div className="collection-groups">
            {collectionGroups.map((group) => (
              <div className="collection-group" key={group.title}>
                <h4 className="collection-group-title">{group.title}</h4>

                {(group.subgroups || []).map((subgroup) => (
                  <div className="collection-subgroup" key={`${group.title}-${subgroup.title}`}>
                    <h5 className="collection-subgroup-title">{subgroup.title}</h5>
                    <div className="collection-list">
                      {(subgroup.items || []).map((item) => (
                        <a className="collection-card" href={item.href} key={`${group.title}-${subgroup.title}-${item.title}`}>
                          <div>
                            <p className="eyebrow">{item.eyebrow}</p>
                            <h4>{item.title}</h4>
                          </div>
                          <span>{item.cta}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {isMaresmeCollectionPage && product.scrollVideo && (
          <section className="product-video-section" aria-label="Video de la coleccion Maresme">
            <video className="product-detail-video" src={product.scrollVideo} muted playsInline preload="metadata" controls poster={product.image} />
            <div className="product-video-badge">
              <p>Video de la coleccion Maresme</p>
            </div>
          </section>
        )}

        <section className="editorial-section spotlight-section" aria-label="Propuesta Umbral">
          <div className="spotlight-media">
            <img src={spotlightImage} alt={spotlightAlt} />
          </div>
          <div className="spotlight-copy">
            <p className="eyebrow">{spotlightEyebrow}</p>
            <h3>{spotlightTitle}</h3>
            <p>{spotlightText}</p>
          </div>
        </section>

        <section className="editorial-section showcase-icons" aria-label={`Ventajas de ${product.title}`}>
          <div className="showcase-header">
            <p className="eyebrow">{benefitsTitle}</p>
            <h3>{benefitsSubtitle}</h3>
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

        <section className="editorial-section image-showcase-section" aria-label={`Modelos y proyectos de ${product.title}`}>
          <div className="showcase-header">
            <p className="eyebrow">Proyectos destacados</p>
            <h3>Espacios que unen arquitectura, luz y serenidad.</h3>
          </div>

          <div className="image-showcase-grid">
            <article className="image-card image-card-large">
              <img src={showcaseCards[0].image} alt={showcaseCards[0].alt} />
              <div className="image-card-copy">
                <h4>{showcaseCards[0].title}</h4>
                <p>{showcaseCards[0].text}</p>
              </div>
            </article>

            <div className="image-stack">
              <article className="image-card">
                <img src={showcaseCards[1].image} alt={showcaseCards[1].alt} />
                <div className="image-card-copy">
                  <h4>{showcaseCards[1].title}</h4>
                  <p>{showcaseCards[1].text}</p>
                </div>
              </article>

              <article className="image-card">
                <img src={showcaseCards[2].image} alt={showcaseCards[2].alt} />
                <div className="image-card-copy">
                  <h4>{showcaseCards[2].title}</h4>
                  <p>{showcaseCards[2].text}</p>
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
