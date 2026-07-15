import { useState } from 'react';
import { FiSun, FiShield, FiLayers, FiArrowRight } from 'react-icons/fi';
import './App.css';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

function App() {
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '' });
  const [submitState, setSubmitState] = useState('idle');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitState('sending');

    try {
      const response = await fetch('https://formsubmit.co/ajax/nanchusss@icloud.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          _subject: 'Solicitud de presupuesto Umbral',
          _template: 'table',
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar la solicitud.');
      }

      setFormData({ nombre: '', email: '', telefono: '' });
      setSubmitState('success');
    } catch (error) {
      setSubmitState('error');
    }
  };

  return (
    <div className="app-shell">
      <SiteHeader heroClassName="hero editorial-hero" links={[{ label: 'Proyectos', href: '/proyectos' }, { label: 'Contacto', href: '/contacto' }]}>
        <div className="hero-image-panel">
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
            <article className="image-card image-card-large">
              <img src="/images/pergolas.jpg" alt="Pérgola bioclimática Umbral" />
              <div className="image-card-copy">
                <h4>Pérgolas bioclimáticas</h4>
                <p>Diseño mediterráneo, confort invisible y una presencia sobria.</p>
              </div>
            </article>

            <div className="image-stack">
              <article className="image-card">
                <img src="/images/proyecto_pergola_bioclimatica_p_190_atico_campello_r_t7a9419.jpg" alt="Proyecto Umbral en Atico Campello" />
                <div className="image-card-copy">
                  <h4>Exteriores singulares</h4>
                  <p>Soluciones a medida para proyectos de alto nivel.</p>
                </div>
              </article>

              <article className="image-card">
                <img src="/images/toldos.jpg" alt="Toldos Umbral" />
                <div className="image-card-copy">
                  <h4>Toldos y cortinas de cristal</h4>
                  <p>Arquitectura y funcionalidad en equilibrio perfecto.</p>
                </div>
              </article>
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
              {submitState === 'error' && <p className="form-success form-error">No se pudo enviar. Intentalo de nuevo en unos segundos.</p>}
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
