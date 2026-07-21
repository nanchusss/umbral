import { useEffect, useMemo, useState } from 'react';
import { jsPDF } from 'jspdf';
import { FiAward, FiDownload, FiLock, FiLogIn, FiLogOut, FiPlus, FiSend, FiShield, FiSun, FiTool, FiTrash2 } from 'react-icons/fi';
import { adminAccessoryOptions, adminCatalog, companyProfile } from './adminCatalog';

const SESSION_KEY = 'umbral_admin_session_v1';

const formatCurrency = (value) => new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
}).format(value || 0);

const parseNumber = (value) => {
  const normalized = String(value ?? '').replace(',', '.');
  const number = Number.parseFloat(normalized);
  return Number.isFinite(number) ? number : 0;
};

const generateProposalNumber = () => {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const serial = String(Math.floor(Math.random() * 900) + 100);
  return `${yy}${mm}${dd}-${serial}`;
};

const imageUrlToDataUrl = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('No se pudo cargar una imagen para el PDF.');
  }

  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('No se pudo convertir la imagen para el PDF.'));
    reader.readAsDataURL(blob);
  });
};

const imageUrlToAsset = async (url) => {
  const dataUrl = await imageUrlToDataUrl(url);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        dataUrl,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
      });
    };
    img.onerror = () => reject(new Error('No se pudo leer el tamano de la imagen.'));
    img.src = dataUrl;
  });
};

const drawContainedImage = (doc, asset, x, y, width, height) => {
  const safeWidth = Math.max(1, asset?.width || width);
  const safeHeight = Math.max(1, asset?.height || height);
  const scale = Math.min(width / safeWidth, height / safeHeight);
  const targetWidth = safeWidth * scale;
  const targetHeight = safeHeight * scale;
  const offsetX = x + ((width - targetWidth) / 2);
  const offsetY = y + ((height - targetHeight) / 2);

  doc.setFillColor(255, 255, 255);
  doc.rect(x, y, width, height, 'F');
  doc.addImage(asset.dataUrl, getImageFormat(asset.dataUrl), offsetX, offsetY, targetWidth, targetHeight);
};

const drawFeatureBadgeIcon = (doc, index, centerX, centerY) => {
  doc.setDrawColor(41, 73, 59);
  doc.setLineWidth(1.1);

  const iconType = index % 4;
  if (iconType === 0) {
    // Sun icon
    doc.circle(centerX, centerY, 4.2);
    doc.line(centerX, centerY - 8, centerX, centerY - 5.7);
    doc.line(centerX, centerY + 8, centerX, centerY + 5.7);
    doc.line(centerX - 8, centerY, centerX - 5.7, centerY);
    doc.line(centerX + 8, centerY, centerX + 5.7, centerY);
  } else if (iconType === 1) {
    // Shield icon
    doc.lines([
      [0, -6],
      [5.2, 2.2],
      [0, 6.8],
      [-5.2, -6.8],
      [0, -2.2],
    ], centerX, centerY, [1, 1], 'S', true);
  } else if (iconType === 2) {
    // Star icon
    doc.line(centerX, centerY - 7, centerX, centerY + 7);
    doc.line(centerX - 7, centerY, centerX + 7, centerY);
    doc.line(centerX - 5.2, centerY - 5.2, centerX + 5.2, centerY + 5.2);
    doc.line(centerX + 5.2, centerY - 5.2, centerX - 5.2, centerY + 5.2);
  } else {
    // Tool-like icon
    doc.circle(centerX - 2.2, centerY - 2.2, 2.6);
    doc.line(centerX, centerY, centerX + 6.5, centerY + 6.5);
    doc.circle(centerX + 7.6, centerY + 7.6, 1.6);
  }
};

const featurePreviewIcons = [FiSun, FiShield, FiAward, FiTool];

const getBeneficiaryLabel = (nameRaw) => {
  const name = String(nameRaw || '').trim();
  if (!name) {
    return 'Sr./Sra. Cliente';
  }

  const hasPrefix = /^(sr\.?|sra\.?)\s+/i.test(name);
  return hasPrefix ? name : `Sr./Sra. ${name}`;
};

const getImageFormat = (dataUrl) => (String(dataUrl).startsWith('data:image/png') ? 'PNG' : 'JPEG');

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

const normalizePhoneForWhatsapp = (phoneRaw) => {
  const cleaned = String(phoneRaw || '').trim().replace(/[^\d+]/g, '');
  if (!cleaned) {
    return '';
  }

  if (cleaned.startsWith('+')) {
    return cleaned.slice(1);
  }

  if (cleaned.startsWith('00')) {
    return cleaned.slice(2);
  }

  const digitsOnly = cleaned.replace(/\D/g, '');
  if (digitsOnly.length === 9) {
    return `34${digitsOnly}`;
  }

  return digitsOnly;
};

const buildModelDescription = (model) => {
  if (!model) {
    return '';
  }

  const parts = [model.technicalDescription];
  if (Array.isArray(model.technicalBullets) && model.technicalBullets.length) {
    parts.push(model.technicalBullets.slice(0, 3).join(' · '));
  }

  return parts.filter(Boolean).join('\n');
};

const createLineItemFromModel = (model) => ({
  id: `item-${Date.now()}`,
  title: model?.offerTitle || model?.name || 'Elemento',
  description: buildModelDescription(model),
  image: model?.technicalImage || model?.commercialImage || '/images/logo.png',
  unitPrice: String(model?.basePrice || 0),
  quantity: 1,
});

const createAccessoryLine = (option, index = 0) => ({
  id: `acc-${Date.now()}-${index}`,
  accessoryId: option?.id || 'none',
  description: option?.defaultDescription || '',
  unitPrice: String(option?.defaultPrice || 0),
  quantity: 1,
  image: option?.image || '/images/logo.png',
});

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
  const [sessionEmail, setSessionEmail] = useState(() => sessionStorage.getItem(SESSION_KEY) || '');
  const [authError, setAuthError] = useState('');
  const [formError, setFormError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const [selectedProductId, setSelectedProductId] = useState(adminCatalog[0]?.id || '');
  const [selectedCollectionId, setSelectedCollectionId] = useState(adminCatalog[0]?.collections?.[0]?.id || '');
  const [selectedModelId, setSelectedModelId] = useState(adminCatalog[0]?.collections?.[0]?.models?.[0]?.id || '');

  const [quoteData, setQuoteData] = useState({
    proposalNumber: generateProposalNumber(),
    clientName: '',
    companyName: '',
    clientEmail: '',
    clientPhone: '',
    city: '',
    advisorName: '',
    targetDate: '',
    customDescription: '',
    notes: '',
    taxRate: '21',
  });

  const selectedProduct = useMemo(
    () => adminCatalog.find((product) => product.id === selectedProductId) || adminCatalog[0],
    [selectedProductId]
  );

  const selectedCollection = useMemo(
    () => selectedProduct?.collections.find((collection) => collection.id === selectedCollectionId) || selectedProduct?.collections[0],
    [selectedCollectionId, selectedProduct]
  );

  const selectedModel = useMemo(
    () => selectedCollection?.models.find((model) => model.id === selectedModelId) || selectedCollection?.models[0],
    [selectedCollection, selectedModelId]
  );

  const modelFeatureCards = useMemo(() => {
    if (selectedModel?.featureCards?.length) {
      return selectedModel.featureCards.slice(0, 4);
    }

    return (selectedModel?.technicalBullets || []).slice(0, 4).map((bullet, index) => ({
      icon: `0${index + 1}`,
      title: `Prestación ${index + 1}`,
      description: bullet,
    }));
  }, [selectedModel]);

  const modelCommercialClaims = useMemo(() => {
    if (selectedModel?.commercialClaims?.length) {
      return selectedModel.commercialClaims;
    }

    return [selectedProduct?.marketingHeadline, selectedProduct?.marketingSummary].filter(Boolean);
  }, [selectedModel, selectedProduct]);

  const modelCommercialDescription = selectedModel?.commercialDescription || selectedProduct?.marketingSummary || selectedModel?.technicalDescription || '';

  const [lineItems, setLineItems] = useState(() => [createLineItemFromModel(adminCatalog[0]?.collections?.[0]?.models?.[0])]);
  const [accessoryLines, setAccessoryLines] = useState([]);

  useEffect(() => {
    const nextCollectionId = selectedProduct?.collections?.[0]?.id || '';
    setSelectedCollectionId(nextCollectionId);
  }, [selectedProductId, selectedProduct]);

  useEffect(() => {
    const nextModelId = selectedCollection?.models?.[0]?.id || '';
    setSelectedModelId(nextModelId);
  }, [selectedCollectionId, selectedCollection]);

  useEffect(() => {
    if (!selectedModel) {
      return;
    }

    setLineItems((prev) => {
      const next = [...prev];
      if (next.length === 0) {
        return [createLineItemFromModel(selectedModel)];
      }

      next[0] = {
        ...next[0],
        title: selectedModel.offerTitle || selectedModel.name,
        description: buildModelDescription(selectedModel),
        image: selectedModel.technicalImage || selectedModel.commercialImage,
        unitPrice: String(selectedModel.basePrice || 0),
      };
      return next;
    });
  }, [selectedModel]);

  const proposalItems = useMemo(() => {
    const normalizedMainItems = lineItems.map((item) => ({
      ...item,
      unitPriceValue: parseNumber(item.unitPrice),
      quantityValue: Math.max(1, Number.parseInt(String(item.quantity), 10) || 1),
    })).filter((item) => item.title.trim() || item.unitPriceValue > 0);

    const normalizedAccessories = accessoryLines
      .map((line, index) => {
        const option = adminAccessoryOptions.find((item) => item.id === line.accessoryId) || adminAccessoryOptions[0];
        const unitPriceValue = parseNumber(line.unitPrice);
        const quantityValue = Math.max(1, Number.parseInt(String(line.quantity), 10) || 1);

        return {
          id: line.id,
          title: option?.name || `Accesorio ${index + 1}`,
          description: line.description || option?.defaultDescription || '',
          image: line.image || option?.image || selectedProduct?.coverImage,
          unitPriceValue,
          quantityValue,
        };
      })
      .filter((item) => item.title.trim() && item.unitPriceValue > 0);

    return [
      ...normalizedMainItems,
      ...normalizedAccessories,
    ];
  }, [lineItems, accessoryLines, selectedProduct]);

  const subtotal = proposalItems.reduce((acc, item) => acc + (item.unitPriceValue * item.quantityValue), 0);
  const taxRateValue = parseNumber(quoteData.taxRate);
  const taxAmount = subtotal * (taxRateValue / 100);
  const totalWithTax = subtotal + taxAmount;

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

  const addAccessoryLine = () => {
    const defaultOption = adminAccessoryOptions.find((item) => item.id !== 'none') || adminAccessoryOptions[0];
    setAccessoryLines((prev) => [...prev, createAccessoryLine(defaultOption, prev.length)]);
  };

  const updateAccessoryLine = (id, field, value) => {
    setAccessoryLines((prev) => prev.map((line) => (line.id === id ? { ...line, [field]: value } : line)));
  };

  const removeAccessoryLine = (id) => {
    setAccessoryLines((prev) => prev.filter((line) => line.id !== id));
  };

  const handleAccessorySelect = (id, accessoryId) => {
    const option = adminAccessoryOptions.find((item) => item.id === accessoryId) || adminAccessoryOptions[0];
    setAccessoryLines((prev) => prev.map((line) => {
      if (line.id !== id) {
        return line;
      }

      return {
        ...line,
        accessoryId: option.id,
        description: option.defaultDescription,
        unitPrice: String(option.defaultPrice),
        image: option.image,
      };
    }));
  };

  const addCustomLineItem = () => {
    setLineItems((prev) => ([
      ...prev,
      {
        id: `item-${Date.now()}-${prev.length}`,
        title: 'Elemento adicional',
        description: '',
        image: selectedModel?.technicalImage || selectedProduct?.coverImage || '/images/logo.png',
        unitPrice: '0',
        quantity: 1,
      },
    ]));
  };

  const updateLineItem = (id, field, value) => {
    setLineItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeLineItem = (id) => {
    setLineItems((prev) => {
      if (prev.length <= 1) {
        return prev;
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const buildBudgetChannelsMessage = () => {
    const lines = [
      `Hola ${quoteData.clientName || ''},`,
      '',
      `Te enviamos tu Presupuesto Umbral N ${quoteData.proposalNumber}.`,
      `Producto: ${selectedProduct?.name || 'No especificado'}`,
      `Coleccion: ${selectedCollection?.name || 'No especificado'}`,
      `Modelo: ${selectedModel?.name || 'No especificado'}`,
      `Total final (IVA incluido): ${formatCurrency(totalWithTax)}`,
      '',
      'Quedamos disponibles para resolver cualquier duda.',
      'Equipo Umbral',
    ];

    return lines.join('\n');
  };

  const handleSendBudget = () => {
    setFormError('');
    setStatusMessage('');

    if (!quoteData.clientName.trim()) {
      setFormError('Para enviar, primero indica el nombre del cliente.');
      return;
    }

    if (!quoteData.clientEmail.trim() && !quoteData.clientPhone.trim()) {
      setFormError('Para enviar, agrega email o telefono del cliente.');
      return;
    }

    const subject = encodeURIComponent(`Presupuesto Umbral · ${quoteData.proposalNumber}`);
    const body = encodeURIComponent(buildBudgetChannelsMessage());

    let sentViaEmail = false;
    let sentViaWhatsapp = false;

    if (quoteData.clientEmail.trim()) {
      window.location.href = `mailto:${quoteData.clientEmail.trim()}?subject=${subject}&body=${body}`;
      sentViaEmail = true;
    }

    const whatsappPhone = normalizePhoneForWhatsapp(quoteData.clientPhone);
    if (whatsappPhone) {
      window.open(`https://wa.me/${whatsappPhone}?text=${body}`, '_blank', 'noopener,noreferrer');
      sentViaWhatsapp = true;
    }

    if (sentViaEmail && sentViaWhatsapp) {
      setStatusMessage('Presupuesto preparado para envío por email y WhatsApp.');
    } else if (sentViaEmail) {
      setStatusMessage('Presupuesto preparado para envío por email.');
    } else if (sentViaWhatsapp) {
      setStatusMessage('Presupuesto preparado para envío por WhatsApp.');
    }
  };

  const renderTopHeader = (doc, logoDataUrl, pageLabel) => {
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 595, 96, 'F');
    doc.addImage(logoDataUrl, getImageFormat(logoDataUrl), 40, 18, 116, 52);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(58, 70, 77);
    doc.text(companyProfile.phone, 553, 30, { align: 'right' });
    doc.text(companyProfile.email, 553, 43, { align: 'right' });
    doc.text(companyProfile.website, 553, 56, { align: 'right' });
    doc.text(companyProfile.address || companyProfile.zones, 553, 69, { align: 'right' });

    doc.setDrawColor(194, 177, 143);
    doc.line(40, 82, 553, 82);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.4);
    doc.setTextColor(33, 48, 43);
    doc.text(`PROPUESTA N  ${quoteData.proposalNumber}`, 40, 94);
    doc.text(getCurrentDate(), 310, 94);
  };

  const renderPageFooter = (doc, pageLabel) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(108, 116, 122);
    doc.text(`Página ${pageLabel}`, 553, 830, { align: 'right' });
  };

  const handleGeneratePdf = async (event) => {
    event.preventDefault();
    setFormError('');
    setStatusMessage('');

    if (!quoteData.clientName.trim()) {
      setFormError('El nombre del cliente es obligatorio.');
      return;
    }

    if (!selectedProduct || !selectedCollection || !selectedModel) {
      setFormError('Selecciona producto, colección y modelo para generar la propuesta.');
      return;
    }

    if (proposalItems.length === 0) {
      setFormError('Agrega al menos un elemento al presupuesto.');
      return;
    }

    setIsGenerating(true);

    try {
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const logoDataUrl = await imageUrlToDataUrl(`${window.location.origin}/images/logo.png`);
      const commercialAsset = await imageUrlToAsset(`${window.location.origin}${selectedModel.commercialImage || selectedProduct.coverImage}`);
      const commercialDataUrl = commercialAsset.dataUrl;
      // PAGE 1 · PORTADA COMERCIAL
      renderTopHeader(doc, logoDataUrl, '1/3');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(28, 44, 39);
      doc.text('PROPUESTA COMERCIAL', 296, 126, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11.3);
      doc.setTextColor(76, 88, 95);
      doc.text('Propuesta para:', 296, 148, { align: 'center' });
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(28, 44, 39);
      doc.text(quoteData.clientName || 'Cliente', 296, 171, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(`Proyecto: ${selectedModel.name}`, 296, 191, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.2);
      doc.setTextColor(79, 91, 98);
      doc.text(`${selectedProduct.name} · ${selectedCollection.name}`, 296, 207, { align: 'center' });

      doc.setDrawColor(214, 204, 180);
      doc.line(40, 216, 553, 216);
      doc.text(getCurrentDate(), 120, 230, { align: 'center' });
      doc.text(`Propuesta ${quoteData.proposalNumber}`, 296, 230, { align: 'center' });
      doc.text(`Referencia ${quoteData.city || 'Cataluña'}`, 472, 230, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.8);
      doc.setTextColor(78, 90, 96);
      doc.text(`Beneficiario: ${getBeneficiaryLabel(quoteData.clientName)}`, 40, 246);
      doc.text(`Comercial: ${quoteData.advisorName || 'Equipo Umbral'}`, 553, 246, { align: 'right' });

      drawContainedImage(doc, commercialAsset, 40, 256, 513, 220);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12.5);
      doc.setTextColor(33, 49, 44);
      doc.text(selectedModel.name, 296, 496, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const commercialDescriptionLines = doc.splitTextToSize(modelCommercialDescription, 470);
      doc.text(commercialDescriptionLines, 296, 512, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11.2);
      doc.setTextColor(58, 72, 79);
      doc.text('RESUMEN DE PRESTACIONES Y BENEFICIOS', 296, 536, { align: 'center' });

      modelFeatureCards.forEach((feature, index) => {
        const cardW = 120;
        const gap = 11;
        const x = 40 + index * (cardW + gap);
        const y = 548;
        doc.setDrawColor(202, 191, 165);
        doc.rect(x, y, cardW, 86);
        doc.setFillColor(241, 235, 221);
        doc.circle(x + 16, y + 16, 10, 'F');
        drawFeatureBadgeIcon(doc, index, x + 16, y + 16);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.9);
        doc.setTextColor(33, 49, 44);
        const titleLines = doc.splitTextToSize(feature.title, cardW - 12);
        doc.text(titleLines, x + 7, y + 31);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.8);
        doc.setTextColor(70, 82, 89);
        const bodyLines = doc.splitTextToSize(feature.description, cardW - 12);
        doc.text(bodyLines, x + 7, y + 47);
      });

      doc.setDrawColor(214, 204, 180);
      doc.line(40, 642, 553, 642);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11.2);
      doc.setTextColor(58, 72, 79);
      doc.text('DESCRIPCIÓN COMERCIAL', 296, 664, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.2);
      const claimLines = modelCommercialClaims.slice(0, 3).map((claim) => `• ${claim}`);
      doc.text(claimLines, 296, 682, { align: 'center' });
      renderPageFooter(doc, '1/3');

      // PAGE 2 · DETALLE TECNICO (IMAGENES PELADAS/TECNICAS)
      doc.addPage();
      renderTopHeader(doc, logoDataUrl, '2/3');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12.5);
      doc.setTextColor(33, 49, 44);
      doc.text('PRODUCTOS DEL PRESUPUESTO', 40, 124);

      renderPageFooter(doc, '2/3');
      // All budget elements are compacted into this single page.
      const pageTwoTop = 136;
      const pageTwoBottom = 744;
      const itemsCount = Math.max(1, proposalItems.length);
      const slotGap = 8;
      const availableHeight = pageTwoBottom - pageTwoTop - ((itemsCount - 1) * slotGap);
      const slotHeight = Math.max(88, Math.min(154, availableHeight / itemsCount));

      let y = pageTwoTop;
      for (let i = 0; i < proposalItems.length; i += 1) {
        const item = proposalItems[i];
        const itemImageUrl = item.image || selectedModel.technicalImage || selectedModel.commercialImage || selectedProduct.coverImage;

        let itemImageAsset;
        try {
          itemImageAsset = await imageUrlToAsset(`${window.location.origin}${itemImageUrl}`);
        } catch (_err) {
          itemImageAsset = null;
        }

        doc.setFillColor(247, 247, 246);
        doc.rect(40, y, 513, slotHeight, 'F');
        doc.setDrawColor(189, 177, 149);
        doc.rect(40, y, 513, slotHeight);

        doc.setFillColor(31, 72, 56);
        doc.rect(40, y, 513, 20, 'F');
        doc.setTextColor(245, 243, 237);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.6);
        doc.text(`V${String(i + 1).padStart(2, '0')}`, 50, y + 14);
        doc.text(`${item.quantityValue} unidad${item.quantityValue > 1 ? 'es' : ''}`, 545, y + 14, { align: 'right' });

        const imageBoxX = 50;
        const imageBoxY = y + 26;
        const imageBoxW = 104;
        const imageBoxH = Math.max(54, slotHeight - 34);
        if (itemImageAsset) {
          drawContainedImage(doc, itemImageAsset, imageBoxX, imageBoxY, imageBoxW, imageBoxH);
          doc.setDrawColor(206, 196, 173);
          doc.rect(imageBoxX, imageBoxY, imageBoxW, imageBoxH);
        }

        doc.setTextColor(28, 41, 45);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.6);
        doc.text(item.title || `Elemento ${i + 1}`, 164, y + 40);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.7);
        const maxDescLines = Math.max(2, Math.floor((slotHeight - 46) / 10));
        const sourceDescription = item.description || selectedModel.technicalDescription || 'Descripción técnica no especificada';
        const descriptionLines = doc.splitTextToSize(sourceDescription, 262).slice(0, maxDescLines);
        doc.text(descriptionLines, 164, y + 54);

        const itemTotal = item.unitPriceValue * item.quantityValue;
        doc.setFillColor(29, 60, 49);
        doc.rect(446, y + slotHeight - 44, 97, 36, 'F');
        doc.setTextColor(247, 244, 234);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.text('Importe unitario', 495, y + slotHeight - 31, { align: 'center' });
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.7);
        doc.text(formatCurrency(item.unitPriceValue), 495, y + slotHeight - 18, { align: 'center' });
        doc.setTextColor(30, 45, 38);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.2);
        doc.text(`Total: ${formatCurrency(itemTotal)}`, 446, y + slotHeight - 50);

        y += slotHeight + slotGap;
      }

      doc.setDrawColor(200, 186, 157);
      doc.line(40, 758, 553, 758);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.8);
      doc.setTextColor(33, 49, 44);
      doc.text('Total parcial sin IVA', 430, 774, { align: 'right' });
      doc.text(formatCurrency(subtotal), 553, 774, { align: 'right' });

      // PAGE 3 · RESUMEN E INVERSION
      doc.addPage();
      renderTopHeader(doc, logoDataUrl, '3/3');

      let summaryCommercialAsset;
      try {
        summaryCommercialAsset = await imageUrlToAsset(`${window.location.origin}${selectedModel.commercialImage || selectedProduct.coverImage}`);
      } catch (_err) {
        summaryCommercialAsset = { dataUrl: commercialDataUrl, width: 1600, height: 900 };
      }

      drawContainedImage(doc, summaryCommercialAsset, 40, 112, 513, 170);

      doc.setTextColor(31, 47, 41);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('RESUMEN DE LA PROPUESTA', 553, 300, { align: 'right' });
      doc.setFontSize(14.5);
      doc.text(`${selectedProduct.name} · ${selectedModel.name}`, 40, 322);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      const resumeTechnical = doc.splitTextToSize(selectedModel.technicalDescription, 513);
      doc.text(resumeTechnical, 40, 340);

      if (selectedModel.technicalBullets?.length) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('Resumen técnico', 40, 378);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.6);
        selectedModel.technicalBullets.slice(0, 4).forEach((bullet, index) => {
          doc.text(`- ${bullet}`, 40, 394 + (index * 13));
        });
      }

      modelFeatureCards.slice(0, 4).forEach((feature, index) => {
        const cardW = 120;
        const gap = 11;
        const x = 40 + index * (cardW + gap);
        const y = 432;
        doc.setDrawColor(202, 191, 165);
        doc.rect(x, y, cardW, 64);
        doc.setFillColor(241, 235, 221);
        doc.circle(x + 16, y + 16, 10, 'F');
        drawFeatureBadgeIcon(doc, index, x + 16, y + 16);
        doc.setTextColor(33, 49, 44);
        doc.setFontSize(8.8);
        doc.text(doc.splitTextToSize(feature.title, cardW - 12), x + 7, y + 31);
      });

      doc.setDrawColor(200, 186, 157);
      doc.line(40, 504, 553, 504);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11.5);
      doc.setTextColor(33, 49, 44);
      doc.text('Inversión del proyecto', 40, 522);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text('Producto', 40, 542);
      doc.text('Cantidad', 330, 542);
      doc.text('Precio unitario', 405, 542);
      doc.text('Subtotal', 553, 542, { align: 'right' });

      let rowY = 558;
      doc.setFont('helvetica', 'normal');
      proposalItems.slice(0, 4).forEach((item) => {
        const rowSubtotal = item.unitPriceValue * item.quantityValue;
        const rowTitle = doc.splitTextToSize(item.title, 270);
        doc.text(rowTitle, 40, rowY);
        doc.text(String(item.quantityValue), 330, rowY);
        doc.text(formatCurrency(item.unitPriceValue), 405, rowY);
        doc.text(formatCurrency(rowSubtotal), 553, rowY, { align: 'right' });
        rowY += 20;
      });

      doc.setFillColor(31, 72, 56);
      doc.rect(40, 618, 513, 26, 'F');
      doc.setTextColor(246, 243, 233);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12.5);
      doc.text('INVERSION DEL PROYECTO', 296, 635, { align: 'center' });

      doc.setTextColor(33, 49, 53);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.8);
      doc.text('Base imponible', 360, 662);
      doc.text(formatCurrency(subtotal), 553, 662, { align: 'right' });
      doc.text(`IVA ${taxRateValue.toFixed(2)}%`, 360, 680);
      doc.text(formatCurrency(taxAmount), 553, 680, { align: 'right' });

      doc.setFillColor(31, 72, 56);
      doc.rect(40, 696, 513, 34, 'F');
      doc.setTextColor(246, 243, 233);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12.2);
      doc.text('TOTAL IVA INCLUIDO', 410, 717, { align: 'right' });
      doc.text(formatCurrency(totalWithTax), 545, 717, { align: 'right' });

      doc.setTextColor(38, 54, 58);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Próximos pasos', 40, 746);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.3);
      doc.text('1. Confirmación de proyecto', 40, 760);
      doc.text('2. Medición definitiva', 210, 760);
      doc.text('3. Fabricación a medida', 360, 760);
      doc.text('4. Instalación y ajuste final', 40, 772);

      doc.setDrawColor(200, 186, 157);
      doc.line(40, 784, 553, 784);
      doc.setFontSize(8.6);
      doc.text('Gracias por confiar en Umbral.', 296, 798, { align: 'center' });
      doc.text(`${companyProfile.name} · ${companyProfile.phone} · ${companyProfile.email} · ${companyProfile.website}`, 296, 810, { align: 'center' });
      renderPageFooter(doc, '3/3');

      const filename = `presupuesto-umbral-${getFileSafeName(quoteData.clientName)}.pdf`;
      doc.save(filename);
      setStatusMessage('PDF de 3 páginas generado y descargado correctamente.');
    } catch (error) {
      setFormError(error.message || 'No se pudo generar el PDF.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="admin-portal" aria-label="Acceso privado para administradores">
      <div className="admin-portal-heading">
        <p className="eyebrow">Área privada</p>
        <h3>Presupuesto Umbral · formato largo</h3>
        <p>Genera una propuesta comercial de 3 páginas con portada, detalle por elemento y resumen final de inversión.</p>
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
              Sesión activa: {sessionEmail}
            </p>
            <button type="button" className="admin-logout-btn" onClick={handleLogout}>
              <FiLogOut />
              Cerrar sesión
            </button>
          </div>

          <div className="admin-proposal-meta">
            <div className="field-group half">
              <label htmlFor="proposal-number">Número de propuesta</label>
              <input id="proposal-number" value={quoteData.proposalNumber} onChange={(event) => setQuoteData((prev) => ({ ...prev, proposalNumber: event.target.value }))} />
            </div>
            <div className="field-group half">
              <label htmlFor="proposal-date">Fecha objetivo</label>
              <input id="proposal-date" type="date" value={quoteData.targetDate} onChange={(event) => setQuoteData((prev) => ({ ...prev, targetDate: event.target.value }))} />
            </div>
          </div>

          <div className="admin-product-selector">
            <div className="field-group third">
              <label htmlFor="admin-product">Producto principal</label>
              <select id="admin-product" value={selectedProductId} onChange={(event) => setSelectedProductId(event.target.value)}>
                {adminCatalog.map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </div>

            <div className="field-group third">
              <label htmlFor="admin-collection">Colección</label>
              <select id="admin-collection" value={selectedCollectionId} onChange={(event) => setSelectedCollectionId(event.target.value)}>
                {(selectedProduct?.collections || []).map((collection) => (
                  <option key={collection.id} value={collection.id}>{collection.name}</option>
                ))}
              </select>
            </div>

            <div className="field-group third">
              <label htmlFor="admin-model">Modelo</label>
              <select id="admin-model" value={selectedModelId} onChange={(event) => setSelectedModelId(event.target.value)}>
                {(selectedCollection?.models || []).map((model) => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
            </div>
          </div>

          <article className="admin-model-card" aria-label="Modelo seleccionado">
            <img src={selectedModel?.commercialImage || selectedProduct?.coverImage} alt={selectedModel?.name || selectedProduct?.name} />
            <div className="admin-model-copy">
              <p className="eyebrow">{selectedProduct?.name}</p>
              <h4>{selectedModel?.name}</h4>
              <p>{modelCommercialDescription}</p>
              <p className="admin-model-tech">{selectedModel?.technicalDescription}</p>
            </div>
          </article>

          <div className="admin-workspace-grid">
            <form className="admin-quote-form" onSubmit={handleGeneratePdf}>
              <div className="field-group half">
                <label htmlFor="client-name">Propuesta para</label>
                <input id="client-name" value={quoteData.clientName} onChange={(event) => setQuoteData((prev) => ({ ...prev, clientName: event.target.value }))} required />
              </div>

              <div className="field-group half">
                <label htmlFor="company-name">Empresa cliente</label>
                <input id="company-name" value={quoteData.companyName} onChange={(event) => setQuoteData((prev) => ({ ...prev, companyName: event.target.value }))} />
              </div>

              <div className="field-group half">
                <label htmlFor="client-email">Email del cliente</label>
                <input id="client-email" type="email" value={quoteData.clientEmail} onChange={(event) => setQuoteData((prev) => ({ ...prev, clientEmail: event.target.value }))} />
              </div>

              <div className="field-group half">
                <label htmlFor="client-phone">Teléfono</label>
                <input id="client-phone" value={quoteData.clientPhone} onChange={(event) => setQuoteData((prev) => ({ ...prev, clientPhone: event.target.value }))} />
              </div>

              <div className="field-group half">
                <label htmlFor="client-city">Referencia / ciudad</label>
                <input id="client-city" value={quoteData.city} onChange={(event) => setQuoteData((prev) => ({ ...prev, city: event.target.value }))} />
              </div>

              <div className="field-group half">
                <label htmlFor="advisor">Asesor responsable</label>
                <input id="advisor" value={quoteData.advisorName} onChange={(event) => setQuoteData((prev) => ({ ...prev, advisorName: event.target.value }))} />
              </div>

              <div className="field-group full">
                <label htmlFor="custom-desc">Descripción de la propuesta</label>
                <textarea id="custom-desc" rows="4" value={quoteData.customDescription} onChange={(event) => setQuoteData((prev) => ({ ...prev, customDescription: event.target.value }))} />
              </div>

              <div className="admin-line-items-head">
                <h4>Elementos incluidos en el presupuesto</h4>
                <button type="button" className="text-link" onClick={addCustomLineItem}><FiPlus /> Añadir elemento</button>
              </div>

              {lineItems.map((item, index) => {
                const unitValue = parseNumber(item.unitPrice);
                const qtyValue = Math.max(1, Number.parseInt(String(item.quantity), 10) || 1);
                return (
                  <article className="admin-line-item-card" key={item.id}>
                    <div className="admin-line-item-top">
                      <p>V{String(index + 1).padStart(2, '0')}</p>
                      {index > 0 && (
                        <button type="button" className="text-link" onClick={() => removeLineItem(item.id)}>
                          <FiTrash2 /> Quitar
                        </button>
                      )}
                    </div>

                    <div className="field-group full">
                      <label>Título del elemento</label>
                      <input value={item.title} onChange={(event) => updateLineItem(item.id, 'title', event.target.value)} />
                    </div>

                    <div className="field-group full">
                      <label>Descripción técnica + prestaciones</label>
                      <textarea rows="3" value={item.description} onChange={(event) => updateLineItem(item.id, 'description', event.target.value)} />
                    </div>

                    <div className="field-group half">
                      <label>Importe unitario (EUR)</label>
                      <input value={item.unitPrice} onChange={(event) => updateLineItem(item.id, 'unitPrice', event.target.value)} />
                    </div>

                    <div className="field-group half">
                      <label>Unidades</label>
                      <select value={String(item.quantity)} onChange={(event) => updateLineItem(item.id, 'quantity', Number.parseInt(event.target.value, 10))}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                          <option key={qty} value={qty}>{qty}</option>
                        ))}
                      </select>
                    </div>

                    <p className="admin-line-item-total">Importe total elemento: <strong>{formatCurrency(unitValue * qtyValue)}</strong></p>
                  </article>
                );
              })}

              <div className="admin-line-items-head">
                <h4>Accesorios y extras</h4>
                <button type="button" className="text-link" onClick={addAccessoryLine}><FiPlus /> Añadir accesorio</button>
              </div>

              {accessoryLines.map((line, index) => {
                const unitValue = parseNumber(line.unitPrice);
                const qtyValue = Math.max(1, Number.parseInt(String(line.quantity), 10) || 1);
                const selectedOption = adminAccessoryOptions.find((item) => item.id === line.accessoryId);

                return (
                  <article className="admin-accessory-card" key={line.id}>
                    <div className="admin-line-item-top">
                      <p>Extra {index + 1}</p>
                      <button type="button" className="text-link" onClick={() => removeAccessoryLine(line.id)}>
                        <FiTrash2 /> Quitar
                      </button>
                    </div>

                    <div className="admin-accessory-media">
                      <img src={line.image || selectedOption?.image || '/images/logo.png'} alt={selectedOption?.name || `Extra ${index + 1}`} />
                    </div>

                    <div className="field-group half">
                      <label>Accesorio</label>
                      <select value={line.accessoryId} onChange={(event) => handleAccessorySelect(line.id, event.target.value)}>
                        {adminAccessoryOptions.filter((item) => item.id !== 'none').map((item) => (
                          <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="field-group half">
                      <label>Importe unitario accesorio (EUR)</label>
                      <input value={line.unitPrice} onChange={(event) => updateAccessoryLine(line.id, 'unitPrice', event.target.value)} />
                    </div>

                    <div className="field-group half">
                      <label>Unidades accesorio</label>
                      <select value={String(line.quantity)} onChange={(event) => updateAccessoryLine(line.id, 'quantity', Number.parseInt(event.target.value, 10))}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                          <option key={qty} value={qty}>{qty}</option>
                        ))}
                      </select>
                    </div>

                    <div className="field-group full">
                      <label>Descripción de accesorio</label>
                      <textarea rows="3" value={line.description} onChange={(event) => updateAccessoryLine(line.id, 'description', event.target.value)} />
                    </div>

                    <p className="admin-line-item-total">Importe total extra: <strong>{formatCurrency(unitValue * qtyValue)}</strong></p>
                  </article>
                );
              })}

              <div className="field-group half">
                <label htmlFor="tax-rate">IVA (%)</label>
                <input id="tax-rate" value={quoteData.taxRate} onChange={(event) => setQuoteData((prev) => ({ ...prev, taxRate: event.target.value }))} />
              </div>

              <div className="field-group full">
                <label htmlFor="notes">Notas y condiciones</label>
                <textarea id="notes" rows="4" value={quoteData.notes} onChange={(event) => setQuoteData((prev) => ({ ...prev, notes: event.target.value }))} />
              </div>

              <div className="admin-total-box" aria-label="Calculo final">
                <p><span>Base imponible:</span> <strong>{formatCurrency(subtotal)}</strong></p>
                <p><span>IVA ({taxRateValue.toFixed(2)}%):</span> <strong>{formatCurrency(taxAmount)}</strong></p>
                <p className="is-final"><span>Total IVA incluido:</span> <strong>{formatCurrency(totalWithTax)}</strong></p>
              </div>

              {formError && <p className="form-error">{formError}</p>}
              {statusMessage && <p className="form-success">{statusMessage}</p>}

              <div className="admin-action-row">
                <button type="submit" className="primary-btn admin-download-btn" disabled={isGenerating}>
                  <FiDownload />
                  {isGenerating ? 'Generando PDF...' : 'Generar PDF (3 páginas)'}
                </button>

                <button type="button" className="secondary-btn admin-send-btn" onClick={handleSendBudget}>
                  <FiSend />
                  Enviar presupuesto
                </button>
              </div>
            </form>

            <aside className="admin-pdf-preview" aria-label="Vista previa del PDF">
              <article className="admin-preview-page" aria-label="Página 1 de 3">
                <div className="admin-pdf-preview-head is-light">
                  <img src="/images/logo.png" alt="Umbral" />
                  <div>
                    <p>Presupuesto Umbral · Portada</p>
                    <span>{quoteData.proposalNumber} · {getCurrentDate()}</span>
                  </div>
                </div>

                <div className="admin-preview-cover-meta">
                  <p><strong>Cliente:</strong> {getBeneficiaryLabel(quoteData.clientName)}</p>
                  <p><strong>Comercial:</strong> {quoteData.advisorName || 'Equipo Umbral'}</p>
                  <p><strong>Contacto Umbral:</strong> {companyProfile.phone} · {companyProfile.email} · {companyProfile.website}</p>
                </div>

                <div className="admin-pdf-preview-image is-full">
                  <img src={selectedModel?.commercialImage || selectedProduct?.coverImage} alt={selectedModel?.name || selectedProduct?.name} />
                </div>

                <div className="admin-pdf-preview-body">
                  <h4>{selectedModel?.offerTitle || selectedModel?.name}</h4>
                  <p>Propuesta para: {quoteData.clientName || 'No especificado'}</p>
                  <p>Producto: {selectedProduct?.name} · {selectedCollection?.name} · {selectedModel?.name}</p>
                  <p>Referencia: {quoteData.city || 'No especificado'}</p>

                  <div className="admin-preview-notes">
                    <strong>Descripción comercial</strong>
                    <p>{modelCommercialClaims.slice(0, 3).join(' · ')}</p>
                  </div>

                  <div className="admin-preview-icon-grid">
                    {modelFeatureCards.slice(0, 4).map((feature, index) => (
                      <div key={`feature-cover-${index}`} className="admin-preview-icon-card">
                        {(() => {
                          const Icon = featurePreviewIcons[index % featurePreviewIcons.length];
                          return <span><Icon /></span>;
                        })()}
                        <strong>{feature.title}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="admin-preview-page-number">Página 1/3</p>
              </article>

              <article className="admin-preview-page" aria-label="Página 2 de 3">
                <div className="admin-pdf-preview-head is-light">
                  <img src="/images/logo.png" alt="Umbral" />
                  <div>
                    <p>Presupuesto Umbral · Detalle técnico</p>
                    <span>{quoteData.proposalNumber} · {getCurrentDate()}</span>
                  </div>
                </div>

                <div className="admin-pdf-preview-image is-technical">
                  <img src={selectedModel?.technicalImage || selectedModel?.commercialImage || selectedProduct?.coverImage} alt={`${selectedModel?.name || selectedProduct?.name} técnico`} />
                </div>

                <div className="admin-pdf-preview-body">
                  <h4>Elementos de la propuesta</h4>
                  <dl className="admin-preview-list">
                    {proposalItems.slice(0, 4).map((item, index) => (
                      <div key={`${item.id}-preview`}>
                        <dt>V{String(index + 1).padStart(2, '0')} · {item.quantityValue} ud.</dt>
                        <dd>{item.title} · {formatCurrency(item.unitPriceValue * item.quantityValue)}</dd>
                      </div>
                    ))}
                  </dl>
                  <p>Total parcial sin IVA: <strong>{formatCurrency(subtotal)}</strong></p>
                </div>

                <p className="admin-preview-page-number">Página 2/3</p>
              </article>

              <article className="admin-preview-page" aria-label="Página 3 de 3">
                <div className="admin-pdf-preview-head is-light">
                  <img src="/images/logo.png" alt="Umbral" />
                  <div>
                    <p>Presupuesto Umbral · Resumen e inversión</p>
                    <span>{quoteData.proposalNumber} · {getCurrentDate()}</span>
                  </div>
                </div>

                <div className="admin-pdf-preview-image">
                  <img src={selectedModel?.commercialImage || selectedProduct?.coverImage} alt={`${selectedModel?.name || selectedProduct?.name} comercial`} />
                </div>

                <div className="admin-pdf-preview-body">
                  <h4>Resumen final</h4>
                  <div className="admin-preview-icon-grid">
                    {modelFeatureCards.slice(0, 4).map((feature, index) => (
                      <div key={`feature-summary-${index}`} className="admin-preview-icon-card">
                        {(() => {
                          const Icon = featurePreviewIcons[index % featurePreviewIcons.length];
                          return <span><Icon /></span>;
                        })()}
                        <strong>{feature.title}</strong>
                      </div>
                    ))}
                  </div>

                  <dl className="admin-preview-list">
                    <div><dt>Base imponible</dt><dd>{formatCurrency(subtotal)}</dd></div>
                    <div><dt>IVA ({taxRateValue.toFixed(2)}%)</dt><dd>{formatCurrency(taxAmount)}</dd></div>
                    <div><dt>Total IVA incluido</dt><dd>{formatCurrency(totalWithTax)}</dd></div>
                  </dl>

                  <div className="admin-preview-notes">
                    <strong>Próximos pasos</strong>
                    <p>Confirmación · Medición definitiva · Fabricación · Instalación final</p>
                  </div>
                </div>

                <p className="admin-preview-page-number">Página 3/3</p>
              </article>
            </aside>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminQuotePortal;
