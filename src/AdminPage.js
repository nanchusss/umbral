import './App.css';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import AdminQuotePortal from './AdminQuotePortal';

function AdminPage() {
  return (
    <div className="app-shell page-shell admin-page-shell">
      <SiteHeader links={[{ label: 'Contacto', href: '/contacto' }]}> 
        <div className="page-intro admin-page-intro">
          <p className="eyebrow">Empresa · Área privada</p>
          <h1>Área privada para administradores Umbral.</h1>
          <p className="hero-text">
            Desde esta página privada puedes iniciar sesión y generar fichas de cliente en PDF con la identidad visual de Umbral.
          </p>
        </div>
      </SiteHeader>

      <main className="section company-section admin-page-main">
        <AdminQuotePortal />
      </main>

      <FloatingWhatsAppButton />

      <SiteFooter label="Umbral · Área privada" />
    </div>
  );
}

export default AdminPage;
