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
          <p className="eyebrow">Empresa · Area privada</p>
          <h1>Area privada para administradores Umbral.</h1>
          <p className="hero-text">
            Desde esta pagina privada puedes iniciar sesion y generar fichas de cliente en PDF con la identidad visual de Umbral.
          </p>
        </div>
      </SiteHeader>

      <main className="section company-section admin-page-main">
        <AdminQuotePortal />
      </main>

      <FloatingWhatsAppButton />

      <SiteFooter label="Umbral · Area privada" />
    </div>
  );
}

export default AdminPage;
