// i18n.js
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import enTranslations from './en.json'; // English translations
import esTranslations from './es.json'; // Spanish translations

i18n
  .use(initReactI18next) // Initialize react-i18next
  .init({
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    resources: {
      en: {
        translation: enTranslations,
      },
      es: {
        translation: esTranslations,
      },
    },
  });

export default i18n;
