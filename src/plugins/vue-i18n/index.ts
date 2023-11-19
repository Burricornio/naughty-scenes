import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'

const i18n = createI18n({
  locale: 'es',
  messages: {
    es,
    en
  }
})

export default i18n
