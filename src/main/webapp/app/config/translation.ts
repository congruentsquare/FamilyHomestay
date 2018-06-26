import axios from 'axios';
import { TranslatorContext, Storage } from 'react-jhipster';

import { setLocale } from 'app/shared/reducers/locale';

export const locales = [
  'ar-ly',
  'hy',
  'id',
  'ca',
  'zh-cn',
  'zh-tw',
  'cs',
  'da',
  'nl',
  'en',
  'et',
  'fr',
  'gl',
  'de',
  'el',
  'hi',
  'hu',
  'it',
  'ja',
  'ko',
  'mr',
  'pl',
  'pt-br',
  'pt-pt',
  'ro',
  'ru',
  'sk',
  'sr',
  'es',
  'sv',
  'tr',
  'ta',
  'th',
  'ua',
  'vi'
];

let currentLocale;
const savedLocale = Storage.session.get('locale', 'en');
TranslatorContext.setDefaultLocale('en');
TranslatorContext.setRenderInnerTextForMissingKeys(false);

const languages: any = {
  'ar-ly': { name: 'العربية', rtl: true },
  hy: { name: 'Հայերեն', rtl: false },
  ca: { name: 'Català', rtl: false },
  'zh-cn': { name: '中文（简体）', rtl: false },
  'zh-tw': { name: '繁體中文', rtl: false },
  cs: { name: 'Český', rtl: false },
  da: { name: 'Dansk', rtl: false },
  nl: { name: 'Nederlands', rtl: false },
  en: { name: 'English', rtl: false },
  et: { name: 'Eesti', rtl: false },
  fr: { name: 'Français', rtl: false },
  gl: { name: 'Galego', rtl: false },
  de: { name: 'Deutsch', rtl: false },
  el: { name: 'Ελληνικά', rtl: false },
  hi: { name: 'हिंदी', rtl: false },
  hu: { name: 'Magyar', rtl: false },
  id: { name: 'Bahasa Indonesia', rtl: false },
  it: { name: 'Italiano', rtl: false },
  ja: { name: '日本語', rtl: false },
  ko: { name: '한국어', rtl: false },
  mr: { name: 'मराठी', rtl: false },
  pl: { name: 'Polski', rtl: false },
  'pt-br': { name: 'Português (Brasil)', rtl: false },
  'pt-pt': { name: 'Português', rtl: false },
  ro: { name: 'Română', rtl: false },
  ru: { name: 'Русский', rtl: false },
  sk: { name: 'Slovenský', rtl: false },
  sr: { name: 'Srpski', rtl: false },
  es: { name: 'Español', rtl: false },
  sv: { name: 'Svenska', rtl: false },
  tr: { name: 'Türkçe', rtl: false },
  ta: { name: 'தமிழ்', rtl: false },
  th: { name: 'ไทย', rtl: false },
  ua: { name: 'Українська', rtl: false },
  vi: { name: 'Tiếng Việt', rtl: false }
  // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
};

export const isRTL = (lang: string): boolean => languages[lang] && languages[lang].rtl;

export const registerLocales = store => {
  locales.forEach(locale => {
    axios.get(`/i18n/${locale}.json`).then(response => {
      TranslatorContext.registerTranslations(locale, response.data);
    });
  });
  store.subscribe(() => {
    const previousLocale = currentLocale;
    currentLocale = store.getState().locale.currentLocale;
    if (previousLocale !== currentLocale) {
      Storage.session.set('locale', currentLocale);
      TranslatorContext.setLocale(currentLocale);
    }
  });
  store.dispatch(setLocale(savedLocale));
};
