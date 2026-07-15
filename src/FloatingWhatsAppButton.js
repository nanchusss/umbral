import { FaWhatsapp } from 'react-icons/fa';

const whatsappNumber = '34683704011';
const defaultMessage = encodeURIComponent('Hola, me gustaria recibir informacion sobre las soluciones de Umbral.');

function FloatingWhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      title="WhatsApp"
    >
      <FaWhatsapp size={34} />
    </a>
  );
}

export default FloatingWhatsAppButton;
