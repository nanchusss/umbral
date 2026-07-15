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
import ToldosPage from './ToldosPage';
import ToldoModelPage from './ToldoModelPage';
import reportWebVitals from './reportWebVitals';

const path = window.location.pathname;
const isModelPage = path.startsWith('/modelo/') || path === '/modelo' || path.includes('/cadaques-p-190');
const isProductsPage = path.includes('/productos');
const isProjectsPage = path.includes('/proyectos');
const isContactPage = path.includes('/contacto');
const isCompanyPage = path.includes('/empresa');
const isToldosLanding = path === '/productos/toldos' || path === '/productos/toldos/';

const productPages = {
  '/productos/pergolas-bioclimaticas': {
    title: 'Pérgolas bioclimáticas',
    intro: 'Sistemas premium para disfrutar del exterior con confort, sombra y diseño elegante.',
    image: '/images/pergolas.jpg',
    heroVideo: '/images/videoinstalacion.mp4',
    description: 'Nuestras pérgolas bioclimáticas combinan un diseño sobrio y sofisticado con la máxima funcionalidad para crear exteriores confortables y duraderos.',
    features: ['Control solar adaptable', 'Arquitectura mediterránea', 'Materiales de alta gama'],
    collectionName: 'Costa Brava',
    collectionItems: [
      { eyebrow: 'Modelo', title: 'Cadaqués P-190', href: '/modelo/cadaques-p-190', cta: 'Ver modelo' },
      { eyebrow: 'Modelo', title: 'Tossa P-150', href: '/modelo/tossa-p-150', cta: 'Ver modelo' },
    ],
    spotlightImage: '/images/pergola_bioclimatica_p_190_principal.jpg',
    spotlightAlt: 'Pérgola bioclimática Umbral',
    spotlightEyebrow: 'Propuesta Umbral',
    spotlightTitle: 'Una solución hecha para habitar el exterior con comodidad.',
    spotlightText: 'Integramos estructura, sombra y confort en una propuesta sobria, funcional y diseñada para el día a día.',
    benefitsTitle: 'Por qué elegir Umbral',
    benefitsSubtitle: 'Diseño preciso, confort duradero.',
  },
  '/productos/toldos/maresme': {
    title: 'Coleccion Maresme · Toldos de brazos extensibles',
    intro: 'Sombra flexible para terrazas y jardines con extension y recogida precisa, sin estructuras fijas.',
    image: '/images/aura.jpg',
    description: 'Los toldos de brazos extensibles ofrecen una solucion versatil para crear sombra en exterior sin estructuras fijas, con extension y recogida segun las necesidades del momento.',
    features: [
      'Extension y recogida segun uso',
      'Confort y libertad de uso diaria',
      'Integracion estetica en terrazas y jardines',
      'Durabilidad y proteccion solar total',
    ],
    collectionName: 'Maresme',
    collectionGroups: [
      {
        title: 'Coleccion Maresme',
        subgroups: [
          {
            title: 'Brazos extensibles',
            items: [
              { eyebrow: 'Modelo Maresme', title: 'Terminal Cofre', href: '/productos/toldos/modelos/terminal-cofre', cta: 'Ver modelo' },
              { eyebrow: 'Modelo Maresme', title: 'Aura', href: '/productos/toldos/modelos/aura', cta: 'Ver modelo' },
              { eyebrow: 'Modelo Maresme', title: 'Herta', href: '/productos/toldos/modelos/herta', cta: 'Ver modelo' },
              { eyebrow: 'Modelo Maresme', title: 'Orus I', href: '/productos/toldos/modelos/orus-i', cta: 'Ver modelo' },
              { eyebrow: 'Modelo Maresme', title: 'Orus II', href: '/productos/toldos/modelos/orus-ii', cta: 'Ver modelo' },
            ],
          },
        ],
      },
    ],
    spotlightImage: '/images/aura_abierto_saxun_seda.png',
    spotlightAlt: 'Toldo cofre de la colección Maresme',
    spotlightEyebrow: 'Modelo Alella Cofre',
    spotlightTitle: 'Complemento perfecto para una protección solar total',
    spotlightText: 'El terminal de toldo cofre es un accesorio funcional y estético diseñado para ofrecer mayor protección y durabilidad a los sistemas de brazos extensibles. Compatible con Aura, Orus I, Orus II y Herta, añade protección solar horizontal al toldo instalado.',
    benefitsTitle: 'Colección Maresme',
    benefitsSubtitle: 'Variantes de brazos extensibles para cada tipo de espacio exterior.',
    showcaseCards: [
      {
        image: '/images/Terminal_Cofre.jpg',
        alt: 'Terminal cofre Zeres beige',
        title: 'Terminal Cofre',
        text: 'Accesorio funcional y estetico para mejorar proteccion horizontal y vida util del sistema.',
      },
      {
        image: '/images/aura.jpg',
        alt: 'Detalle técnico del terminal cofre',
        title: 'Sistemas Aura y Orus',
        text: 'Compatible con Aura, Orus I y Orus II para una sombra flexible con accionamiento preciso.',
      },
      {
        image: '/images/herta.jpg',
        alt: 'Instalación de toldo cofre Maresme',
        title: 'Sistema Herta',
        text: 'Una variante robusta para exteriores exigentes, con integracion limpia en terrazas y jardines.',
      },
    ],
  },
  '/productos/toldos/girona': {
    title: 'Coleccion Girona · Wind Screen',
    intro: 'Pantallas wind screen para proteccion lateral del viento, privacidad y confort en exterior.',
    image: '/images/ws_compact_principal.png',
    description: 'La coleccion Girona integra sistemas Wind Screen pensados para mejorar el confort en terrazas y porches con una presencia discreta y contemporanea.',
    features: [
      'Proteccion frente al viento',
      'Privacidad y control visual',
      'Estetica limpia e integrable',
      'Funcionamiento comodo y fiable',
    ],
    collectionName: 'Girona',
    collectionGroups: [
      {
        title: 'Coleccion Girona',
        subgroups: [
          {
            title: 'Wind Screen',
            items: [
              { eyebrow: 'Modelo Wind', title: 'Wind Screen', href: '/productos/toldos/modelos/wind-screen', cta: 'Ver modelo' },
              { eyebrow: 'Modelo Wind', title: 'Wind Screen Compact', href: '/productos/toldos/modelos/wind-screen-compact', cta: 'Ver modelo' },
              { eyebrow: 'Modelo Wind', title: 'Wind Screen Neo', href: '/productos/toldos/modelos/wind-screen-neo', cta: 'Ver modelo' },
            ],
          },
        ],
      },
    ],
    spotlightImage: '/images/previa_4_wind_screen_vista_general_copia.jpg',
    spotlightAlt: 'Sistema Wind Screen de la coleccion Girona',
    spotlightEyebrow: 'Wind Screen Girona',
    spotlightTitle: 'Confort lateral y privacidad sin perder ligereza visual.',
    spotlightText: 'Una solucion pensada para cerrar lateralmente zonas exteriores expuestas al viento con un acabado elegante y funcional.',
    benefitsTitle: 'Coleccion Girona',
    benefitsSubtitle: 'Variantes Wind Screen para cada necesidad de cerramiento exterior.',
    showcaseCards: [
      {
        image: '/images/ws_compact_principal.png',
        alt: 'Sistema Wind Screen estandar',
        title: 'Wind Screen',
        text: 'Modelo base para proteger zonas exteriores de forma equilibrada.',
      },
      {
        image: '/images/ws_compact_edificio.png',
        alt: 'Sistema Wind Screen Compact',
        title: 'Wind Screen Compact',
        text: 'Version compacta para espacios con necesidades de integracion mas contenidas.',
      },
      {
        image: '/images/ws_neo_web_1.png',
        alt: 'Sistema Wind Screen Neo',
        title: 'Wind Screen Neo',
        text: 'Linea contemporanea para proyectos que priorizan diseno y rendimiento diario.',
      },
    ],
  },
  '/productos/cortinas-de-cristal': {
    title: 'Cortinas de cristal',
    intro: 'Transparencia, protección y un acabado refinado para espacios contemporáneos.',
    image: '/images/pergola_bioclimatica_p_190_principal.jpg',
    description: 'Las cortinas de cristal de Umbral abren la arquitectura al exterior sin renunciar al confort, el control y la elegancia.',
    features: ['Transparencia total', 'Protección climática', 'Acabados premium'],
    collectionName: 'Mediterráneo',
    collectionItems: [
      { eyebrow: 'Colección', title: 'Línea Panorama', href: '/contacto', cta: 'Solicitar información' },
      { eyebrow: 'Colección', title: 'Línea Horizon', href: '/contacto', cta: 'Solicitar información' },
    ],
    spotlightImage: '/images/cortinas_cristal_2.jpg',
    spotlightAlt: 'Cortinas de cristal Umbral',
    spotlightEyebrow: 'Propuesta Umbral',
    spotlightTitle: 'Un cerramiento ligero para abrir el espacio al exterior.',
    spotlightText: 'Diseñadas para disfrutar vistas y luminosidad sin renunciar a protección climática y confort durante todo el año.',
    benefitsTitle: 'Por qué elegir Umbral',
    benefitsSubtitle: 'Transparencia, protección y detalle técnico.',
  },
};

const toldoModelPages = {
  '/productos/toldos/modelos/terminal-cofre': {
    title: 'Terminal Cofre',
    collection: 'Coleccion Maresme',
    intro: 'Accesorio funcional y estetico para proteger y alargar la vida util de los sistemas de brazos extensibles.',
    image: '/images/Terminal_Cofre.jpg',
    description: 'El terminal de toldo cofre aporta proteccion solar horizontal, mejora la durabilidad del sistema y mantiene una integracion visual limpia en exterior.',
    features: ['Compatible con Aura, Orus I, Orus II y Herta', 'Proteccion adicional del tejido', 'Acabado premium para terrazas y porches'],
    gallery: ['/images/Terminal_Cofre.jpg', '/images/terminal_cofre_1.jpg', '/images/terminal_cofre_zeres_beige.png'],
  },
  '/productos/toldos/modelos/aura': {
    title: 'Aura',
    collection: 'Coleccion Maresme · Brazos extensibles',
    intro: 'Modelo de brazos extensibles para sombra flexible y confort diario en espacios exteriores.',
    image: '/images/aura.jpg',
    description: 'Aura combina lineas limpias y apertura precisa para crear zonas de sombra elegantes en terrazas y jardines.',
    features: ['Apertura y recogida fluida', 'Integracion estetica contemporanea', 'Preparado para uso intensivo en exterior'],
    gallery: ['/images/aura.jpg', '/images/aura_abierto_saxun_seda.png', '/images/toldos_2.jpg'],
  },
  '/productos/toldos/modelos/herta': {
    title: 'Herta',
    collection: 'Coleccion Maresme · Brazos extensibles',
    intro: 'Sistema robusto para exteriores exigentes con una presencia sobria y funcional.',
    image: '/images/herta.jpg',
    description: 'Herta ofrece una solucion fiable para crear sombra con estabilidad y un acabado de alta calidad.',
    features: ['Estructura resistente', 'Uso comodo y duradero', 'Ideal para terrazas residenciales y contract'],
    gallery: ['/images/herta.jpg', '/images/herta_abierto_saxun_beige.png', '/images/toldos.jpg'],
  },
  '/productos/toldos/modelos/orus-i': {
    title: 'Orus I',
    collection: 'Coleccion Maresme · Brazos extensibles',
    intro: 'Modelo versatil de brazos extensibles para proyectos con foco en simplicidad y rendimiento.',
    image: '/images/orus_i.jpg',
    description: 'Orus I aporta una configuracion equilibrada de sombra, confort y diseno para uso diario.',
    features: ['Mecanica precisa', 'Estetica limpia', 'Excelente relacion entre rendimiento y confort'],
    gallery: ['/images/orus_i.jpg', '/images/terminal_cofre_1.jpg', '/images/toldos_2.jpg'],
  },
  '/productos/toldos/modelos/orus-ii': {
    title: 'Orus II',
    collection: 'Coleccion Maresme · Brazos extensibles',
    intro: 'Evolucion de la linea Orus con una solucion de sombra adaptable para exterior.',
    image: '/images/orus_i.jpg',
    description: 'Orus II esta pensado para quienes buscan una solucion de brazos extensibles con alto nivel de funcionalidad y presencia arquitectonica.',
    features: ['Extension adaptable segun necesidad', 'Diseno integrado en fachada', 'Confort termico y visual'],
    gallery: ['/images/orus_i.jpg', '/images/toldos.jpg', '/images/terminal_cofre_1.jpg'],
  },
  '/productos/toldos/modelos/wind-screen': {
    title: 'Wind Screen',
    collection: 'Coleccion Girona · Wind Screen',
    intro: 'Proteccion lateral para viento y privacidad con una integracion discreta.',
    image: '/images/previa_4_wind_screen_vista_general_copia.jpg',
    description: 'Wind Screen mejora el confort de zonas exteriores al reducir el impacto del viento y reforzar la privacidad.',
    features: ['Proteccion lateral efectiva', 'Acabado limpio', 'Ideal para porches y terrazas expuestas'],
    gallery: ['/images/previa_4_wind_screen_vista_general_copia.jpg', '/images/ws_compact_principal.png', '/images/ws_compact_edificio.png'],
  },
  '/productos/toldos/modelos/wind-screen-compact': {
    title: 'Wind Screen Compact',
    collection: 'Coleccion Girona · Wind Screen',
    intro: 'Version compacta para proyectos que requieren cerramiento lateral eficiente y contenido.',
    image: '/images/ws_compact_principal.png',
    description: 'Compact ofrece una presencia minima con gran eficacia frente al viento y una estetica contemporanea.',
    features: ['Formato compacto', 'Integracion visual elegante', 'Confort lateral diario'],
    gallery: ['/images/ws_compact_principal.png', '/images/ws_compact_edificio.png', '/images/ws_neo_web_1.png'],
  },
  '/productos/toldos/modelos/wind-screen-neo': {
    title: 'Wind Screen Neo',
    collection: 'Coleccion Girona · Wind Screen',
    intro: 'Linea avanzada de Wind Screen para proyectos premium de exterior.',
    image: '/images/ws_neo_web_1.png',
    description: 'Neo combina prestaciones de cerramiento lateral con una expresion estetica mas depurada.',
    features: ['Diseno actual', 'Proteccion y privacidad', 'Ideal para arquitectura exterior de alto nivel'],
    gallery: ['/images/ws_neo_web_1.png', '/images/ws_compact_principal.png', '/images/previa_4_wind_screen_vista_general_copia.jpg'],
  },
};

const product = productPages[path];
const toldoModel = toldoModelPages[path];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {isModelPage ? <ModelPage /> : isCompanyPage ? <CompanyPage /> : isProjectsPage ? <ProjectsPage /> : isContactPage ? <ContactPage /> : isToldosLanding ? <ToldosPage /> : toldoModel ? <ToldoModelPage model={toldoModel} /> : product ? <ProductDetailPage product={product} /> : isProductsPage ? <ProductsPage /> : <App />}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
