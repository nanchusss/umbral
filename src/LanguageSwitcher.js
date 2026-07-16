import { useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const SCRIPT_ID = 'google-translate-script';
const BASE_LANG = 'es';
const LANGUAGE_OPTIONS = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'ca', label: 'CA' },
];

function getLanguageFromCookie() {
  const match = document.cookie.match(/(?:^|; )googtrans=([^;]+)/);
  if (!match) return BASE_LANG;

  const decoded = decodeURIComponent(match[1]);
  const parts = decoded.split('/').filter(Boolean);
  return parts[1] || BASE_LANG;
}

function setGoogleTranslateCookie(targetLang) {
  const cookieValue = `/es/${targetLang}`;
  document.cookie = `googtrans=${cookieValue};path=/`;
  document.cookie = `googtrans=${cookieValue};domain=.${window.location.hostname};path=/`;
}

function LanguageSwitcher({ mode = 'header' }) {
  const [currentLanguage, setCurrentLanguage] = useState(BASE_LANG);
  const [menuOpen, setMenuOpen] = useState(false);
  const switcherRef = useRef(null);

  useEffect(() => {
    setCurrentLanguage(getLanguageFromCookie());
  }, []);

  useEffect(() => {
    if (window.google?.translate?.TranslateElement) {
      if (!window.__umbralTranslateInit) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: BASE_LANG,
            includedLanguages: 'es,en,ca',
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
        window.__umbralTranslateInit = true;
      }
      return;
    }

    window.googleTranslateElementInitUmbral = () => {
      if (window.__umbralTranslateInit) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: BASE_LANG,
          includedLanguages: 'es,en,ca',
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
      window.__umbralTranslateInit = true;
    };

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInitUmbral';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const applyLanguage = (targetLang) => {
    setGoogleTranslateCookie(targetLang);
    setCurrentLanguage(targetLang);
    setMenuOpen(false);

    const translateSelect = document.querySelector('.goog-te-combo');
    if (translateSelect) {
      translateSelect.value = targetLang;
      translateSelect.dispatchEvent(new Event('change'));
      return;
    }

    window.location.reload();
  };

  const currentLanguageLabel = LANGUAGE_OPTIONS.find((option) => option.code === currentLanguage)?.label || 'ES';

  return (
    <>
      <div id="google_translate_element" className="google-translate-anchor" />

      <div
        ref={switcherRef}
        className={`language-switcher language-switcher-${mode} notranslate`}
        aria-label="Selector de idioma"
        translate="no"
      >
        <button
          type="button"
          className="language-switcher-trigger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
        >
          <span>{currentLanguageLabel}</span>
          <FiChevronDown size={14} className={menuOpen ? 'open' : ''} />
        </button>

        {menuOpen && (
          <div className="language-switcher-menu" role="menu" aria-label="Idiomas disponibles">
            {LANGUAGE_OPTIONS.map((language) => (
              <button
                key={language.code}
                type="button"
                className={`language-switcher-option ${currentLanguage === language.code ? 'active' : ''}`}
                onClick={() => applyLanguage(language.code)}
                aria-pressed={currentLanguage === language.code}
              >
                {language.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default LanguageSwitcher;
