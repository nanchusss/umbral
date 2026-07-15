import { useState } from 'react';
import { FiUsers, FiShield, FiMessageSquare, FiHome, FiMenu, FiX } from 'react-icons/fi';

const productHighlights = [
  { title: 'Pergolas bioclimaticas', slug: '/productos/pergolas-bioclimaticas', image: '/images/pergolas.jpg', description: 'Sombra elegante y confort para exteriores.' },
  { title: 'Toldos', slug: '/productos/toldos', image: '/images/toldos.jpg', description: 'Soluciones sobrias para terrazas y porches.' },
  { title: 'Cortinas de cristal', slug: '/productos/cortinas-de-cristal', image: '/images/pergola_bioclimatica_p_190_principal.jpg', description: 'Transparencia, proteccion y acabado premium.' },
];

const companyHighlights = [
  { title: 'Sobre nosotros', slug: '/empresa', description: 'Conoce la vision y cultura de Umbral.', icon: <FiHome size={26} /> },
  { title: 'Canal etico', slug: 'mailto:nanchusss@icloud.com?subject=Canal%20Etico%20Umbral', description: 'Comunicacion segura y responsable.', icon: <FiShield size={26} /> },
  { title: 'Comunicacion', slug: '/contacto', description: 'Prensa y canales de contacto.', icon: <FiMessageSquare size={26} /> },
  { title: 'Portal del empleado/a', slug: 'mailto:nanchusss@icloud.com?subject=Portal%20Empleado%20Umbral', description: 'Acceso al entorno interno.', icon: <FiUsers size={26} /> },
];

function SiteHeader({ links = [], heroClassName = 'hero page-hero', children }) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyCloseTimeout, setCompanyCloseTimeout] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openProductsMenu = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }
    setProductsOpen(true);
  };

  const closeProductsMenu = () => {
    const timeoutId = window.setTimeout(() => setProductsOpen(false), 220);
    setCloseTimeout(timeoutId);
  };

  const openCompanyMenu = () => {
    if (companyCloseTimeout) {
      clearTimeout(companyCloseTimeout);
    }
    setCompanyOpen(true);
  };

  const closeCompanyMenu = () => {
    const timeoutId = window.setTimeout(() => setCompanyOpen(false), 220);
    setCompanyCloseTimeout(timeoutId);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => {
      const next = !prev;
      if (next) {
        setProductsOpen(false);
        setCompanyOpen(false);
      }
      return next;
    });
  };

  return (
    <header className={heroClassName}>
      <nav className="topbar">
        <a className="brand" href="/" onClick={closeMobileMenu}>
          <img src="/images/logo.png" alt="Umbral logo" className="brand-logo" />
        </a>

        <button
          type="button"
          className="mobile-nav-toggle"
          aria-label={mobileMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={mobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        <div className={`nav-links ${mobileMenuOpen ? 'is-open' : ''}`}>
          <div className="desktop-nav-items">
            <div
              className="nav-item"
              onMouseEnter={openProductsMenu}
              onMouseLeave={closeProductsMenu}
              onFocus={openProductsMenu}
              onBlur={closeProductsMenu}
            >
              <button type="button" className="nav-link-button" aria-expanded={productsOpen} onClick={() => setProductsOpen((prev) => !prev)}>
                Productos
              </button>
              {productsOpen && (
                <div className="products-menu" role="menu">
                  {productHighlights.map((item) => (
                    <a className="product-preview" key={item.title} href={item.slug}>
                      <img src={item.image} alt={item.title} />
                      <div className="product-preview-copy">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div
              className="nav-item"
              onMouseEnter={openCompanyMenu}
              onMouseLeave={closeCompanyMenu}
              onFocus={openCompanyMenu}
              onBlur={closeCompanyMenu}
            >
              <button type="button" className="nav-link-button" aria-expanded={companyOpen} onClick={() => setCompanyOpen((prev) => !prev)}>
                Empresa
              </button>
            </div>
          </div>

          <a className="mobile-only-nav-link" href="/productos" onClick={closeMobileMenu}>Productos</a>
          <a className="mobile-only-nav-link" href="/empresa" onClick={closeMobileMenu}>Empresa</a>

          {links.map((item) => (
            <a key={`${item.href}-${item.label}`} href={item.href} onClick={closeMobileMenu}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {companyOpen && (
        <section className="company-mega-menu" onMouseEnter={openCompanyMenu} onMouseLeave={closeCompanyMenu}>
          <div className="company-mega-grid">
            {companyHighlights.map((item) => (
              <a key={item.title} className="company-mega-item" href={item.slug}>
                <span className="company-mega-icon">{item.icon}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {children}
    </header>
  );
}

export default SiteHeader;
