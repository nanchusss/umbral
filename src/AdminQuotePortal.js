import { useMemo, useState } from 'react';
import { jsPDF } from 'jspdf';
import { FiDownload, FiLock, FiLogIn, FiLogOut } from 'react-icons/fi';

const SESSION_KEY = 'umbral_admin_session_v1';

const productOptions = [
  'Pergolas bioclimaticas',
  'Toldos',
  'Cortinas de cristal',
  'Proyecto mixto',
];

const addField = (doc, label, value, yPosition) => {
  const normalizedValue = value && String(value).trim().length > 0 ? value : 'No especificado';
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(28, 38, 34);
  doc.text(label, 42, yPosition);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(63, 74, 72);
  const wrapped = doc.splitTextToSize(normalizedValue, 500);
  doc.text(wrapped, 170, yPosition);
  return yPosition + Math.max(24, wrapped.length * 14 + 8);
};

const imageUrlToDataUrl = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('No se pudo cargar el logo para el PDF.');
  }

  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('No se pudo convertir el logo para el PDF.'));
    reader.readAsDataURL(blob);
  });
};

const getCurrentDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
};

const getFileSafeName = (value) => {
  if (!value) {
    return 'cliente';
  }

  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'cliente';
};

function AdminQuotePortal() {
  const allowedEmails = useMemo(
    () => (process.env.REACT_APP_ADMIN_EMAILS || '')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
    []
  );

  const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || '';
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [sessionEmail, setSessionEmail] = useState(() => {
    const existing = sessionStorage.getItem(SESSION_KEY);
    return existing ? existing : '';
  });
  const [authError, setAuthError] = useState('');
  const [formError, setFormError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [quoteData, setQuoteData] = useState({
    clientName: '',
    companyName: '',
    clientEmail: '',
    clientPhone: '',
    city: '',
    productType: productOptions[0],
    projectType: '',
    estimatedBudget: '',
    targetDate: '',
    advisorName: '',
    notes: '',
  });

  const isConfigured = allowedEmails.length > 0 && adminPassword.length > 0;
  const isAuthenticated = Boolean(sessionEmail);

  const handleLogin = (event) => {
    event.preventDefault();
    setAuthError('');

    if (!isConfigured) {
      setAuthError('Acceso no disponible temporalmente.');
      return;
    }

    const normalizedEmail = loginForm.email.trim().toLowerCase();
    if (!allowedEmails.includes(normalizedEmail) || loginForm.password !== adminPassword) {
      setAuthError('Acceso denegado. Verifica correo autorizado y contraseña.');
      return;
    }

    sessionStorage.setItem(SESSION_KEY, normalizedEmail);
    setSessionEmail(normalizedEmail);
    setLoginForm({ email: '', password: '' });
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSessionEmail('');
    setStatusMessage('Sesion cerrada.');
  };

  const handleGeneratePdf = async (event) => {
    event.preventDefault();
    setFormError('');
    setStatusMessage('');

    if (!quoteData.clientName.trim()) {
      setFormError('El nombre del cliente es obligatorio.');
      return;
    }

    setIsGenerating(true);

    try {
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const logoUrl = `${window.location.origin}/images/umbral-logo-og-1200x630.png`;
      const logoDataUrl = await imageUrlToDataUrl(logoUrl);

      doc.setFillColor(24, 47, 36);
      doc.rect(0, 0, 595, 110, 'F');
      doc.addImage(logoDataUrl, 'PNG', 38, 20, 140, 70);

      doc.setTextColor(236, 228, 214);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.text('Documento comercial interno', 372, 45, { align: 'right' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.text(`Fecha: ${getCurrentDate()}`, 372, 66, { align: 'right' });
      doc.text(`Asesor: ${quoteData.advisorName || sessionEmail}`, 372, 84, { align: 'right' });

      doc.setTextColor(30, 45, 38);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text('Ficha de cliente y propuesta', 42, 154);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(85, 98, 95);
      doc.setFontSize(11);
      doc.text('Uso interno de Umbral. Documento generado desde el area privada de Empresa.', 42, 176);

      let y = 214;
      y = addField(doc, 'Cliente', quoteData.clientName, y);
      y = addField(doc, 'Empresa', quoteData.companyName, y);
      y = addField(doc, 'Email', quoteData.clientEmail, y);
      y = addField(doc, 'Telefono', quoteData.clientPhone, y);
      y = addField(doc, 'Ciudad', quoteData.city, y);
      y = addField(doc, 'Producto', quoteData.productType, y);
      y = addField(doc, 'Tipo de proyecto', quoteData.projectType, y);
      y = addField(doc, 'Presupuesto estimado', quoteData.estimatedBudget, y);
      y = addField(doc, 'Fecha objetivo', quoteData.targetDate, y);

      if (y > 650) {
        doc.addPage();
        y = 64;
      }

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(28, 38, 34);
      doc.text('Notas del proyecto', 42, y + 8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(63, 74, 72);
      const notes = doc.splitTextToSize(quoteData.notes || 'No especificado', 510);
      doc.text(notes, 42, y + 30);

      doc.setDrawColor(190, 175, 146);
      doc.line(42, 760, 553, 760);
      doc.setFontSize(10);
      doc.setTextColor(93, 100, 103);
      doc.text('Umbral · Arquitectura de exterior premium · umbral-premium.com', 42, 780);

      const filename = `umbral-propuesta-${getFileSafeName(quoteData.clientName)}.pdf`;
      doc.save(filename);
      setStatusMessage('PDF generado y descargado correctamente.');
    } catch (error) {
      setFormError(error.message || 'No se pudo generar el PDF.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="admin-portal" aria-label="Acceso privado para administradores">
      <div className="admin-portal-heading">
        <p className="eyebrow">Area privada</p>
        <h3>Sign in de administradores</h3>
        <p>
          Acceso restringido para generar documentos internos de clientes con la identidad visual de Umbral.
        </p>
      </div>

      {!isAuthenticated ? (
        <form className="admin-login-card" onSubmit={handleLogin}>
          <label htmlFor="admin-email">Correo autorizado</label>
          <input
            id="admin-email"
            type="email"
            value={loginForm.email}
            onChange={(event) => setLoginForm((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="tu-correo@umbral.com"
            autoComplete="username"
            required
          />

          <label htmlFor="admin-password">Contrasena</label>
          <input
            id="admin-password"
            type="password"
            value={loginForm.password}
            onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
            autoComplete="current-password"
            required
          />

          {authError && <p className="form-error">{authError}</p>}

          <button type="submit" className="primary-btn admin-login-btn">
            <FiLogIn />
            Entrar
          </button>
        </form>
      ) : (
        <div className="admin-workspace">
          <div className="admin-session-bar" role="status" aria-live="polite">
            <p>
              <FiLock />
              Sesion activa: {sessionEmail}
            </p>
            <button type="button" className="text-link" onClick={handleLogout}>
              <FiLogOut />
              Cerrar sesion
            </button>
          </div>

          <form className="admin-quote-form" onSubmit={handleGeneratePdf}>
            <div className="field-group half">
              <label htmlFor="client-name">Nombre del cliente</label>
              <input
                id="client-name"
                value={quoteData.clientName}
                onChange={(event) => setQuoteData((prev) => ({ ...prev, clientName: event.target.value }))}
                required
              />
            </div>

            <div className="field-group half">
              <label htmlFor="company-name">Empresa</label>
              <input
                id="company-name"
                value={quoteData.companyName}
                onChange={(event) => setQuoteData((prev) => ({ ...prev, companyName: event.target.value }))}
              />
            </div>

            <div className="field-group half">
              <label htmlFor="client-email">Email del cliente</label>
              <input
                id="client-email"
                type="email"
                value={quoteData.clientEmail}
                onChange={(event) => setQuoteData((prev) => ({ ...prev, clientEmail: event.target.value }))}
              />
            </div>

            <div className="field-group half">
              <label htmlFor="client-phone">Telefono</label>
              <input
                id="client-phone"
                value={quoteData.clientPhone}
                onChange={(event) => setQuoteData((prev) => ({ ...prev, clientPhone: event.target.value }))}
              />
            </div>

            <div className="field-group half">
              <label htmlFor="client-city">Ciudad o zona</label>
              <input
                id="client-city"
                value={quoteData.city}
                onChange={(event) => setQuoteData((prev) => ({ ...prev, city: event.target.value }))}
              />
            </div>

            <div className="field-group half">
              <label htmlFor="product-type">Tipo de producto</label>
              <select
                id="product-type"
                value={quoteData.productType}
                onChange={(event) => setQuoteData((prev) => ({ ...prev, productType: event.target.value }))}
              >
                {productOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="field-group half">
              <label htmlFor="project-type">Tipo de proyecto</label>
              <input
                id="project-type"
                placeholder="Residencial, horeca, oficina..."
                value={quoteData.projectType}
                onChange={(event) => setQuoteData((prev) => ({ ...prev, projectType: event.target.value }))}
              />
            </div>

            <div className="field-group half">
              <label htmlFor="budget">Presupuesto estimado</label>
              <input
                id="budget"
                placeholder="Ej. 18.000 - 24.000 EUR"
                value={quoteData.estimatedBudget}
                onChange={(event) => setQuoteData((prev) => ({ ...prev, estimatedBudget: event.target.value }))}
              />
            </div>

            <div className="field-group half">
              <label htmlFor="target-date">Fecha objetivo</label>
              <input
                id="target-date"
                type="date"
                value={quoteData.targetDate}
                onChange={(event) => setQuoteData((prev) => ({ ...prev, targetDate: event.target.value }))}
              />
            </div>

            <div className="field-group half">
              <label htmlFor="advisor">Asesor responsable</label>
              <input
                id="advisor"
                value={quoteData.advisorName}
                onChange={(event) => setQuoteData((prev) => ({ ...prev, advisorName: event.target.value }))}
              />
            </div>

            <div className="field-group full">
              <label htmlFor="notes">Notas y requerimientos</label>
              <textarea
                id="notes"
                rows="5"
                value={quoteData.notes}
                onChange={(event) => setQuoteData((prev) => ({ ...prev, notes: event.target.value }))}
              />
            </div>

            {formError && <p className="form-error">{formError}</p>}
            {statusMessage && <p className="form-success">{statusMessage}</p>}

            <button type="submit" className="primary-btn admin-download-btn" disabled={isGenerating}>
              <FiDownload />
              {isGenerating ? 'Generando PDF...' : 'Generar PDF y descargar'}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default AdminQuotePortal;
