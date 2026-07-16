import { FiMail, FiPhone } from 'react-icons/fi';

function SiteFooter({
  showEmailText = true,
  showSocial = false,
}) {
  return (
    <footer className="footer footer-extended">
      <div className="footer-grid">
        <div className="footer-brand-block">
          <a className="footer-brand" href="/" aria-label="Ir al inicio de Umbral">
            <img src="/images/logo.png" alt="Umbral logo" className="footer-brand-logo" />
          </a>
          <a className="footer-mail-icon" href="/contacto" aria-label="Ir a la pagina de contacto">
            <FiMail size={18} />
            {showEmailText && <span>Escribenos</span>}
          </a>
        </div>

        <div className="footer-column">
          <h4>Contacto</h4>
          <a className="footer-contact-link" href="/contacto">Formulario de contacto</a>
          <a className="footer-phone-link" href="tel:+34691292245" aria-label="Llamar al 691292245">
            <FiPhone size={16} />
            <span>691292245</span>
          </a>
          <a href="https://wa.me/34691292245?text=Hola%2C%20os%20escribo%20desde%20la%20pagina%20web%20de%20Umbral.%20Me%20gustaria%20recibir%20informacion%20sobre%20vuestras%20soluciones." target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>

        <div className="footer-column">
          <h4>Productos</h4>
          <a href="/productos/pergolas-bioclimaticas">Pergolas bioclimaticas</a>
          <a href="/productos/toldos">Toldos</a>
          <a href="/productos/cortinas-de-cristal">Cortinas de cristal</a>
        </div>

        <div className="footer-column">
          <h4>Empresa</h4>
          <a href="/empresa">Sobre nosotros</a>
          <a href="/empresa#canal-etico">Canal etico</a>
          <a href="/proyectos">Proyectos</a>
          {showSocial && (
            <a href="https://www.instagram.com/umbral_premium" target="_blank" rel="noreferrer">Instagram</a>
          )}
        </div>
      </div>

      <div className="footer-bottom-row">
        <p>Copyright {new Date().getFullYear()} Umbral. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default SiteFooter;
