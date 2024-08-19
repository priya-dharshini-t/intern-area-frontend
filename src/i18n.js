import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import hi from './locales/hi.json';
import pt from './locales/pt.json';
import zh from './locales/zh.json';

const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  },
  fr: {
    translation: fr
  },
  hi: {
    translation: hi
  },
  pt: {
    translation: pt
  },
  zh: {
    translation: zh
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
