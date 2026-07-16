import { FaWhatsapp } from 'react-icons/fa';
import { trackEvent } from './automation';

const whatsappNumber = '34691292245';
const defaultMessage = encodeURIComponent('Hola, os escribo desde la pagina web de Umbral. Me gustaria recibir informacion sobre vuestras soluciones.');

function FloatingWhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      title="WhatsApp"
      onClick={() =>
        trackEvent('whatsapp_click', {
          placement: 'floating_button',
        })
      }
    >
      <FaWhatsapp size={34} />
    </a>
  );
}

export default FloatingWhatsAppButton;
