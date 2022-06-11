import { createI18n } from "vue-i18n";
import es from "@/locales/languages/es.json"
import en from "@/locales/languages/en.json"

const i18n = createI18n({
    locale: "en",
    fallbackLocale: 'es',
    messages:{
        es: es,
        en: en
    },
});

export default i18n;