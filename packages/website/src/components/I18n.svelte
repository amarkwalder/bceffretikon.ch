<script context="module">
    import { addMessages, register, locale, init, getLocaleFromNavigator, waitLocale } from 'svelte-i18n';
    import { getCookie, setCookie } from '../utils/cookies';

    register('de', () => import('../translations/de.json'));
    register('en', () => import('../translations/en.json'));
    register('fr', () => import('../translations/fr.json'));
    register('it', () => import('../translations/it.json'));

    let lang = process.browser ? getCookie('current_lang') : undefined;
    if (!lang) lang = getLocaleFromNavigator();
    if (lang && lang.length > 2) {
        lang = lang.substring(0, 2);
    }

    init({
        fallbackLocale: 'de',
        initialLocale: lang,
    });

    export async function preload() {
        return waitLocale();
    }
</script>

<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { isLoading } from 'svelte-i18n';
    const dispatch = createEventDispatcher();

    onMount(async () => {
        await waitLocale();
        dispatch('loaded');
    });
</script>
