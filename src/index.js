import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ModelPage from './ModelPage';
import ProductsPage from './ProductsPage';
import ProjectsPage from './ProjectsPage';
import ContactPage from './ContactPage';
import CompanyPage from './CompanyPage';
import ProductDetailPage from './ProductDetailPage';
import reportWebVitals from './reportWebVitals';

const path = window.location.pathname;
const isModelPage = path.includes('/modelo') || path.includes('/cadaques-p-190');
const isProductsPage = path.includes('/productos');
const isProjectsPage = path.includes('/proyectos');
const isContactPage = path.includes('/contacto');
const isCompanyPage = path.includes('/empresa');

const productPages = {
  '/productos/pergolas-bioclimaticas': {
    title: 'Pérgolas bioclimáticas',
    intro: 'Sistemas premium para disfrutar del exterior con confort, sombra y diseño elegante.',
    image: '/images/pergolas.jpg',
    heroVideo: '/images/videoinstalacion.mp4',
    description: 'Nuestras pérgolas bioclimáticas combinan un diseño sobrio y sofisticado con la máxima funcionalidad para crear exteriores confortables y duraderos.',
    features: ['Control solar adaptable', 'Arquitectura mediterránea', 'Materiales de alta gama'],
  },
  '/productos/toldos': {
    title: 'Toldos',
    intro: 'Soluciones sobrias y funcionales para terrazas, patios y espacios de alto standing.',
    image: '/images/toldos.jpg',
    description: 'Los toldos de Umbral ofrecen sombra práctica, una estética refinada y una adaptación perfecta a terrazas y porches contemporáneos.',
    features: ['Sombra precisa', 'Diseño limpio', 'Excelente durabilidad'],
  },
  '/productos/cortinas-de-cristal': {
    title: 'Cortinas de cristal',
    intro: 'Transparencia, protección y un acabado refinado para espacios contemporáneos.',
    image: '/images/pergola_bioclimatica_p_190_principal.jpg',
    description: 'Las cortinas de cristal de Umbral abren la arquitectura al exterior sin renunciar al confort, el control y la elegancia.',
    features: ['Transparencia total', 'Protección climática', 'Acabados premium'],
  },
};

const product = productPages[path];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {isModelPage ? <ModelPage /> : isCompanyPage ? <CompanyPage /> : isProjectsPage ? <ProjectsPage /> : isContactPage ? <ContactPage /> : product ? <ProductDetailPage product={product} /> : isProductsPage ? <ProductsPage /> : <App />}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
