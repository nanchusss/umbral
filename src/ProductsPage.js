import { FiArrowRight } from 'react-icons/fi';
import './App.css';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

const featuredProducts = [
  {
    title: 'Pergolas bioclimaticas',
    slug: '/productos/pergolas-bioclimaticas',
    image: '/images/pergola_bioclimatica_p_190_principal.jpg',
    description: 'Confort exterior de alta gama con control solar elegante para todo el ano.',
  },
  {
    title: 'Cortinas de cristal',
    slug: '/productos/cortinas-de-cristal',
    image: '/images/cortinas_cristal_2.jpg',
    description: 'Vistas abiertas, proteccion climatica y una presencia arquitectonica limpia.',
  },
  {
    title: 'Toldos',
    slug: '/productos/toldos',
    image: '/images/toldos.jpg',
    description: 'Sombra premium con estilo contemporaneo para terrazas y porches con caracter.',
  },
];

function ProductsPage() {
  return (
    <div className="app-shell page-shell">
      <SiteHeader>
        <div className="page-intro">
          <p className="eyebrow">Productos</p>
          <h1>Soluciones premium para transformar cada exterior.</h1>
          <p className="hero-text">
            Diseñamos pérgolas bioclimáticas, toldos y cortinas de cristal para crear ambientes únicos, con un lenguaje contemporáneo y un acabado de lujo.
          </p>
        </div>
      </SiteHeader>

      <main className="section">
        <section className="products-star-intro" aria-label="Productos estrella Umbral">
          <p className="eyebrow">Seleccion destacada</p>
          <h2>Tres productos estrella para transformar tu exterior.</h2>
          <p>
            Descubre nuestras soluciones mas deseadas: pergolas bioclimaticas, cortinas de cristal y toldos.
            Diseno premium, confort real y una estetica que eleva cualquier proyecto.
          </p>
        </section>

        <section className="product-grid" aria-label="Tres productos destacados">
          {featuredProducts.map((item) => (
            <a
              href={item.slug}
              className="product-card product-star-card"
              key={item.title}
              style={{ backgroundImage: `linear-gradient(180deg, rgba(16, 19, 23, 0.14), rgba(16, 19, 23, 0.72)), url(${item.image})` }}
            >
              <div className="product-card-inner">
                <p className="product-star-tag">Producto estrella</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="product-explore-link">
                  <span className="explore-word">Explorar</span> <FiArrowRight />
                </span>
              </div>
            </a>
          ))}
        </section>

        <section className="products-bottom-cta" aria-label="Asesoria personalizada">
          <h3>Quieres ayuda para elegir el sistema ideal para tu proyecto?</h3>
          <a className="text-link" href="/contacto">
            Hablar con un asesor <FiArrowRight />
          </a>
        </section>
      </main>

      <FloatingWhatsAppButton />

      <SiteFooter label="Umbral · Productos premium" />
    </div>
  );
}

export default ProductsPage;
