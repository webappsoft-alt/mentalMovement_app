// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";

import enTranslations from './en.json'; // English translations
import esTranslations from './es.json'; // Spanish translations

const LANGUAGE_DETECTOR = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    AsyncStorage.getItem("selectedLanguage", async (err, language) => {

      // if error fetching stored data or no language was stored
      // display errors when in DEV mode as console statements
      if (err || !language) {
        if (err) {
          console.log(
            "Error fetching Languages from asyncstorage ",
            err
          );
        } else {
          console.log(
            "No language is set, choosing English as fallback"
          );
        }
        callback("es");
        AsyncStorage.setItem("selectedLanguage", "es");
        return;
      } else {
        callback(language);
      }
    });
  },
  init: () => { },
  cacheUserLanguage: (language) => {
    AsyncStorage.setItem("selectedLanguage", language);
  },
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next) // Initialize react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      es: {
        translation: esTranslations,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
