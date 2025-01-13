import { createI18n } from 'vue-i18n';

const supportedLocales = ['ru', 'en'] as const;
type Locale = typeof supportedLocales[number];

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {
    ru: {},
    en: {},
  },
  warnHtmlMessage: false,
});

const loadedLanguages: Set<string> = new Set();
export async function loadLocaleMessages(locale: Locale) {
  if (!loadedLanguages.has(locale)) {
    try {
      const messages = await import(`./locales/${locale}.json`);
      i18n.global.setLocaleMessage(locale, messages.default);
      loadedLanguages.add(locale);
    } catch (error) {
      console.error(`Ошибка загрузки переводов для языка: ${locale}`, error);
    }
  }
  i18n.global.locale.value = locale;
}

await loadLocaleMessages('ru');

export default i18n;
