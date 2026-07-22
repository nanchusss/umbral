import { FiArrowRight } from 'react-icons/fi';
import './App.css';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

const toldosCollections = [
  {
    title: 'Coleccion Maresme',
    subtitle: 'Brazos extensibles',
    description: 'Modelos de sombra flexible para terrazas y jardines con apertura y recogida segun uso.',
    image: '/images/aura_abierto_saxun_seda.png',
    href: '/productos/toldos/maresme',
    models: [
      { title: 'Terminal Cofre', href: '/productos/toldos/modelos/terminal-cofre' },
      { title: 'Aura', href: '/productos/toldos/modelos/aura' },
      { title: 'Herta', href: '/productos/toldos/modelos/herta' },
      { title: 'Orus I', href: '/productos/toldos/modelos/orus-i' },
      { title: 'Orus II', href: '/productos/toldos/modelos/orus-ii' },
    ],
  },
  {
    title: 'Coleccion Girona',
    subtitle: 'Wind Screen',
    description: 'Sistemas de proteccion lateral para mejorar confort y privacidad en exterior.',
    image: '/images/ws_compact_principal.png',
    href: '/productos/toldos/girona',
    models: [
      { title: 'Wind Screen', href: '/productos/toldos/modelos/wind-screen' },
      { title: 'Wind Screen Compact', href: '/productos/toldos/modelos/wind-screen-compact' },
      { title: 'Wind Screen Neo', href: '/productos/toldos/modelos/wind-screen-neo' },
    ],
  },
];

function ToldosPage() {
  return (
    <div className="app-shell page-shell">
      <SiteHeader>
        <div className="page-intro">
          <p className="eyebrow">Toldos</p>
          <h1>Soluciones de toldos por colecciones.</h1>
          <p className="hero-text">
            Descubre nuestras colecciones de toldos para exterior: Maresme para brazos extensibles y Girona para sistemas Wind Screen,
            cada una con sus modelos y aplicaciones especificas.
          </p>
        </div>
      </SiteHeader>

      <main className="section">
        <section className="toldos-hub-grid" aria-label="Colecciones de toldos">
          {toldosCollections.map((collection) => (
            <a className="toldos-hub-card" key={collection.title} href={collection.href}>
              <img src={collection.image} alt={collection.title} className="toldos-hub-image" />
              <div className="toldos-hub-copy">
                <p className="eyebrow">{collection.subtitle}</p>
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
                <ul className="toldos-hub-models" aria-label={`Modelos de ${collection.title}`}>
                  {collection.models.map((model) => (
                    <li key={model.title}>{model.title}</li>
                  ))}
                </ul>
                <span className="text-link toldos-hub-cta">
                  <span className="underline-word">Ver coleccion</span> <FiArrowRight />
                </span>
              </div>
            </a>
          ))}
        </section>
      </main>

      <FloatingWhatsAppButton />

      <SiteFooter label="Umbral · Toldos" />
    </div>
  );
}

export default ToldosPage;
