import i18next from 'i18next';
import zh from './zh.js'
import zhTW from './zh-TW.js'
import en from './en.js'
import app from '../hono/hono';

const SUPPORTED_LANGS = ['zh-TW', 'zh', 'en']

function resolveLang(header) {
	if (!header) {
		return 'zh-TW'
	}
	const raw = header.trim()
	if (SUPPORTED_LANGS.includes(raw)) {
		return raw
	}
	const lower = raw.toLowerCase()
	if (lower === 'zh-tw' || lower.startsWith('zh-hant') || lower.startsWith('zh-hk')) {
		return 'zh-TW'
	}
	if (lower.startsWith('zh')) {
		return 'zh'
	}
	if (lower.startsWith('en')) {
		return 'en'
	}
	return 'zh-TW'
}

app.use('*', async (c, next) => {
	const lang = resolveLang(c.req.header('accept-language'))
	i18next.init({
		lng: lang,
	});
	return await next()
})

const resources = {
	'zh-TW': {
		translation: zhTW,
	},
	en: {
		translation: en
	},
	zh: {
		translation: zh,
	},
};

i18next.init({
	fallbackLng: 'zh-TW',
	resources,
});

export const t = (key, values) => i18next.t(key, values)

export default i18next;
