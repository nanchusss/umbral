import { FiMail } from 'react-icons/fi';

function SiteFooter({
  label = 'Umbral',
  showEmailText = true,
  showSocial = false,
}) {
  return (
    <footer className="footer">
      <p>{label}</p>

      {showSocial ? (
        <div className="social-links">
          <a href="https://www.instagram.com/umbral_premium" target="_blank" rel="noreferrer">Instagram</a>
          <a href="mailto:nanchusss@icloud.com">Contacto</a>
        </div>
      ) : showEmailText ? (
        <a href="mailto:nanchusss@icloud.com">nanchusss@icloud.com</a>
      ) : (
        <a className="footer-mail-icon" href="mailto:nanchusss@icloud.com" aria-label="Enviar correo a Umbral">
          <FiMail size={18} />
        </a>
      )}
    </footer>
  );
}

export default SiteFooter;
