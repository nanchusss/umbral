import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FiClock, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import './App.css';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_TO_EMAIL } from './emailjsConfig';
import { getLeadAttribution, trackEvent } from './automation';

function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    producto: 'Pergolas bioclimaticas',
    mensaje: '',
  });
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle');

  const validators = {
    nombre: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return 'El nombre es obligatorio.';
      if (trimmed.length < 2) return 'Escribe al menos 2 caracteres.';
      return '';
    },
    email: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return 'El email es obligatorio.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return 'Introduce un email valido.';
      return '';
    },
    telefono: (value) => {
      const digits = value.replace(/\D/g, '');
      if (!digits) return 'El telefono es obligatorio.';
      if (digits.length < 9 || digits.length > 15) return 'Introduce un telefono valido (9-15 digitos).';
      return '';
    },
    producto: (value) => {
      if (!value) return 'Selecciona una opcion.';
      return '';
    },
    mensaje: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return 'El mensaje es obligatorio.';
      if (trimmed.length < 12) return 'Describe un poco mas tu proyecto (minimo 12 caracteres).';
      return '';
    },
  };

  const validateField = (name, value) => validators[name]?.(value) || '';

  const validateForm = () => {
    const nextErrors = {
      nombre: validateField('nombre', formData.nombre),
      email: validateField('email', formData.email),
      telefono: validateField('telefono', formData.telefono),
      producto: validateField('producto', formData.producto),
      mensaje: validateField('mensaje', formData.mensaje),
    };

    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === 'telefono' ? value.replace(/[^\d+\s()-]/g, '') : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const message = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const attribution = getLeadAttribution();

    if (!validateForm()) {
      setSubmitState('invalid');
      trackEvent('lead_form_submit', {
        form_name: 'contact_page',
        status: 'invalid',
        product_interest: formData.producto,
        lead_source: attribution.utm_source || 'direct',
      });
      return;
    }

    setSubmitState('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.nombre,
          reply_to: formData.email,
          recipient_email: EMAILJS_TO_EMAIL,
          phone: formData.telefono,
          product_interest: formData.producto,
          message: formData.mensaje,
          website: 'Umbral',
          lead_source: attribution.utm_source || 'direct',
          lead_medium: attribution.utm_medium || 'none',
          lead_campaign: attribution.utm_campaign || 'none',
          landing_path: attribution.first_landing_path || '',
          page_path: attribution.current_path || window.location.pathname,
          referrer: attribution.first_referrer || attribution.current_referrer || '',
        },
        EMAILJS_PUBLIC_KEY
      );

      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        producto: 'Pergolas bioclimaticas',
        mensaje: '',
      });
      setSubmitState('success');
      trackEvent('lead_form_submit', {
        form_name: 'contact_page',
        status: 'success',
        product_interest: formData.producto,
        lead_source: attribution.utm_source || 'direct',
      });
    } catch (error) {
      setSubmitState('error');
      trackEvent('lead_form_submit', {
        form_name: 'contact_page',
        status: 'error',
        product_interest: formData.producto,
        lead_source: attribution.utm_source || 'direct',
      });
    }
  };

  return (
    <div className="app-shell page-shell">
      <SiteHeader />

      <main className="section contact-showcase">
        <h1>Haz de tu exterior el espacio que todos quieren disfrutar.</h1>

        <div className="contact-showcase-grid">
          <div className="contact-showcase-copy">
            <p>
              Te asesoramos en pergolas bioclimaticas, toldos y cortinas de cristal con una propuesta a medida para tu espacio.
              Cuentanos que necesitas y te ayudamos a elegir la mejor solucion.
            </p>

            <div className="contact-proof-list" aria-label="Beneficios de contacto">
              <article>
                <FiClock size={18} />
                <p>Respuesta en menos de 24 horas laborables.</p>
              </article>
              <article>
                <FiMapPin size={18} />
                <p>Instalacion profesional en toda Cataluna.</p>
              </article>
              <article>
                <FiCheckCircle size={18} />
                <p>Asesoria tecnica y estetica personalizada.</p>
              </article>
            </div>

            <a
              className="text-link"
              href="https://wa.me/34691292245?text=Hola%2C%20os%20escribo%20desde%20la%20pagina%20web%20de%20Umbral.%20Me%20gustaria%20recibir%20informacion%20sobre%20vuestras%20soluciones."
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent('whatsapp_click', {
                  placement: 'contact_page',
                })
              }
            >
              Hablar por WhatsApp
            </a>
          </div>

          <div className="contact-showcase-right">
            <div className="contact-showcase-media">
              <img src="/images/atencioncliente.png" alt="Atencion al cliente Umbral" />
            </div>

            <form className="contact-lead-form" onSubmit={handleSubmit} aria-label="Formulario de contacto Umbral">
              <div className="field-group half">
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.nombre)}
                />
                {errors.nombre && <p className="field-error">{errors.nombre}</p>}
              </div>

              <div className="field-group half">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <p className="field-error">{errors.email}</p>}
              </div>

              <div className="field-group half">
                <label htmlFor="telefono">Telefono</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.telefono)}
                />
                {errors.telefono && <p className="field-error">{errors.telefono}</p>}
              </div>

              <div className="field-group half">
                <label htmlFor="producto">Que te interesa</label>
                <select
                  id="producto"
                  name="producto"
                  value={formData.producto}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.producto)}
                >
                  <option value="Pergolas bioclimaticas">Pergolas bioclimaticas</option>
                  <option value="Cortinas de cristal">Cortinas de cristal</option>
                  <option value="Toldos">Toldos</option>
                </select>
                {errors.producto && <p className="field-error">{errors.producto}</p>}
              </div>

              <div className="field-group full">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="4"
                  placeholder="Cuentanos brevemente tu proyecto"
                  value={formData.mensaje}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.mensaje)}
                />
                {errors.mensaje && <p className="field-error">{errors.mensaje}</p>}
              </div>

              <button type="submit" className="primary-btn full" disabled={submitState === 'sending'}>
                {submitState === 'sending' ? 'Enviando...' : 'Enviar consulta'}
              </button>

              {submitState === 'success' && <p className="form-success">Mensaje enviado. Te contactaremos muy pronto.</p>}
              {submitState === 'error' && <p className="form-success form-error">No se pudo enviar. Intentalo de nuevo.</p>}
              {submitState === 'invalid' && <p className="form-success form-error">Revisa los campos marcados antes de enviar.</p>}
            </form>
          </div>
        </div>
      </main>

      <FloatingWhatsAppButton />

      <SiteFooter label="Umbral · Contacto" showEmailText={false} />
    </div>
  );
}

export default ContactPage;
