import { FiMail, FiPhone } from 'react-icons/fi';

function SiteFooter({
  label = 'Umbral',
  showEmailText = true,
  showSocial = false,
}) {
  return (
    <footer className="footer">
      <p>{label}</p>

      <div className="footer-links-group">
        <a className="footer-mail-icon" href="/contacto" aria-label="Ir a la pagina de contacto">
          <FiMail size={18} />
        </a>

        <a className="footer-contact-link" href="/contacto">Contacto</a>

        <a className="footer-phone-link" href="tel:+34691292245" aria-label="Llamar al 69129 22 45">
          <FiPhone size={16} />
          <span>69129 22 45</span>
        </a>

        {showSocial && (
          <a href="https://www.instagram.com/umbral_premium" target="_blank" rel="noreferrer">Instagram</a>
        )}
      </div>
    </footer>
  );
}

export default SiteFooter;
