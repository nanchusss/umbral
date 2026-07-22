import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FiSun, FiShield, FiLayers, FiArrowRight } from 'react-icons/fi';
import './App.css';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_TO_EMAIL } from './emailjsConfig';
import { getLeadAttribution, trackEvent } from './automation';

function App() {
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '' });
  const [submitState, setSubmitState] = useState('idle');
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  const heroSlides = [
    {
      type: 'video',
      src: '/images/toldo1.mp4',
      label: 'Video de pergola bioclimatica Umbral',
    },
    {
      type: 'image',
      src: '/images/pergola_bioclimatica_p_190_principal.jpg',
      label: 'Pergola bioclimatica principal Umbral',
    },
    {
      type: 'image',
      src: '/images/proyecto_pergola_bioclimatica_p_190_atico_campello_r_t7a9519.jpg',
      label: 'Proyecto pergola en atico Campello',
    },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitState('sending');
    const attribution = getLeadAttribution();

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.nombre,
          reply_to: formData.email,
          recipient_email: EMAILJS_TO_EMAIL,
          phone: formData.telefono,
          product_interest: 'Home',
          message: 'Solicitud enviada desde el formulario del Home.',
          website: 'Umbral',
          subject: 'Solicitud de presupuesto Umbral',
          lead_source: attribution.utm_source || 'direct',
          lead_medium: attribution.utm_medium || 'none',
          lead_campaign: attribution.utm_campaign || 'none',
          landing_path: attribution.first_landing_path || '',
          page_path: attribution.current_path || window.location.pathname,
          referrer: attribution.first_referrer || attribution.current_referrer || '',
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setFormData({ nombre: '', email: '', telefono: '' });
      setSubmitState('success');
      trackEvent('lead_form_submit', {
        form_name: 'home_contact',
        status: 'success',
        product_interest: 'Home',
        lead_source: attribution.utm_source || 'direct',
      });
    } catch (error) {
      setSubmitState('error');
      trackEvent('lead_form_submit', {
        form_name: 'home_contact',
        status: 'error',
        product_interest: 'Home',
        lead_source: attribution.utm_source || 'direct',
      });
    }
  };

  return (
    <div className="app-shell">
      <SiteHeader heroClassName="hero editorial-hero">
        <div className="hero-image-panel">
          <div className="hero-media-carousel" aria-label="Carrusel principal Umbral">
            {heroSlides.map((slide, index) => (
              <div key={slide.src} className={`hero-media-slide ${activeHeroSlide === index ? 'is-active' : ''}`}>
                {slide.type === 'video' ? (
                  <video src={slide.src} autoPlay muted loop playsInline preload="metadata" poster="/images/pergola_bioclimatica_p_190_principal.jpg" aria-label={slide.label} />
                ) : (
                  <img src={slide.src} alt={slide.label} loading="eager" />
                )}
              </div>
            ))}

            <div className="hero-media-overlay" />

            <div className="hero-media-dots" aria-label="Estado del carrusel">
              {heroSlides.map((slide, index) => (
                <span key={`${slide.src}-dot`} className={`hero-media-dot ${activeHeroSlide === index ? 'is-active' : ''}`} />
              ))}
            </div>
          </div>

          <div className="hero-image-copy">
            <p className="eyebrow">Pérgolas bioclimáticas · Toldos · Cortinas de cristal</p>
            <h1>Arquitectura de exterior, hecha para habitar con calma.</h1>
            <p className="hero-text">
              Diseño mediterráneo, precisión artesanal y soluciones premium para terrazas, porches y espacios singulares.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="/productos">Explorar productos</a>
              <a className="secondary-btn" href="/contacto">Solicitar presupuesto</a>
            </div>
          </div>
        </div>
      </SiteHeader>

      <main className="editorial-main">
        <section className="editorial-section intro-block">
          <p className="eyebrow">Umbral</p>
          <h2>Una presencia sobria, una experiencia extraordinaria.</h2>
          <p>
            Creamos pérgolas bioclimáticas, toldos y cortinas de cristal que unen materiales nobles, un lenguaje arquitectónico claro y una sensación de bienestar en cada exterior.
          </p>
        </section>

        <section className="editorial-section showcase-icons" aria-label="Valores de Umbral">
          <div className="showcase-header">
            <p className="eyebrow">Por qué elegir Umbral</p>
            <h3>Diseño preciso, confort duradero.</h3>
          </div>

          <div className="icon-grid">
            <article className="icon-card">
              <div className="icon-wrap">
                <FiSun size={34} />
              </div>
              <h3>Diseño solar</h3>
              <p>Soluciones que gestionan la luz con una sensibilidad arquitectónica muy marcada.</p>
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

        <section className="editorial-section image-showcase-section" aria-label="Proyectos destacados">
          <div className="showcase-header">
            <p className="eyebrow">Proyectos destacados</p>
            <h3>Espacios que unen arquitectura, luz y serenidad.</h3>
          </div>

          <div className="image-showcase-grid">
            <a className="image-card image-card-large image-card-link" href="/productos/pérgolas-bioclimáticas">
              <img src="/images/pergolas.jpg" alt="Pérgolas bioclimáticas Umbral" />
              <div className="image-card-copy">
                <h4>Pérgolas bioclimáticas</h4>
                <p>Diseño mediterráneo, confort invisible y una presencia sobria.</p>
              </div>
            </a>

            <div className="image-stack">
              <a className="image-card image-card-link" href="/productos/cortinas-de-cristal">
                <img src="/images/cortinacristal_saxun_paisaje.png" alt="Cortinas de cristal Umbral" />
                <div className="image-card-copy">
                  <h4>Cortinas de cristal</h4>
                  <p>Transparencia, protección y continuidad visual para ampliar el exterior.</p>
                </div>
              </a>

              <a className="image-card image-card-link" href="/productos/toldos">
                <img src="/images/toldos.jpg" alt="Toldos Umbral" />
                <div className="image-card-copy">
                  <h4>Toldos</h4>
                  <p>Arquitectura y funcionalidad en equilibrio perfecto.</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="editorial-section feature-row">
          <article className="feature-card">
            <p className="eyebrow">Diseño</p>
            <h3>Elegancia discreta</h3>
            <p>Formas limpias y una estética que dialoga con la arquitectura.</p>
          </article>
          <article className="feature-card">
            <p className="eyebrow">Materiales</p>
            <h3>Calidad duradera</h3>
            <p>Acero, aluminio y acabados pensados para perdurar con serenidad.</p>
          </article>
          <article className="feature-card">
            <p className="eyebrow">Proyecto</p>
            <h3>Solución a medida</h3>
            <p>Adaptamos cada propuesta al carácter del espacio y a las necesidades del cliente.</p>
          </article>
        </section>

        <section id="contacto" className="section contact-section">
          <div className="contact-card">
            <div className="contact-copy">
              <p className="eyebrow">Solicita tu presupuesto</p>
              <h3>Hablemos de tu proyecto y diseñemos una solución a medida en Cataluña.</h3>
              <p>Rellena el formulario y nos pondremos en contacto contigo para preparar una propuesta personalizada.</p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="nombre">Nombre</label>
              <input id="nombre" name="nombre" type="text" required value={formData.nombre} onChange={handleChange} />

              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} />

              <label htmlFor="telefono">Teléfono</label>
              <input id="telefono" name="telefono" type="tel" required value={formData.telefono} onChange={handleChange} />

              <button type="submit" className="primary-btn" disabled={submitState === 'sending'}>
                {submitState === 'sending' ? 'Enviando...' : 'Enviar solicitud'}
              </button>
              {submitState === 'success' && <p className="form-success">Gracias. Tu solicitud fue enviada correctamente.</p>}
              {submitState === 'error' && <p className="form-success form-error">No se pudo enviar. Inténtalo de nuevo en unos segundos.</p>}
            </form>
          </div>
        </section>
      </main>

      <FloatingWhatsAppButton />

      <SiteFooter label="UMBRAL" showSocial />
    </div>
  );
}

export default App;
