import { createI18n } from 'vue-i18n';
import en from './en.js'
import zh from './zh.js'
import zhTW from './zh-TW.js'

const i18n = createI18n({
    legacy: false,
    locale: 'zh-TW',
    fallbackLocale: 'zh-TW',
    messages: {
        'zh-TW': zhTW,
        zh,
        en
    },
});

export default i18n;
