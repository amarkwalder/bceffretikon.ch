import { getCookie, setCookie } from './cookies';
import { locale } from 'svelte-i18n';

export function changeLang(lang) {
    locale.set(lang);
    setCookie('current_lang', lang, 1);
}

let currentLocale;
locale.subscribe((value) => {
    currentLocale = value;
});

export function getCurrentLang() {
    let currentLang = getCookie('current_lang');
    if (!currentLang) currentLang = currentLocale;
    return currentLang;
}
