<script>
    import LibLoader from '../LibLoader.svelte';
    import { _ } from 'svelte-i18n';

    function onCookieConsentLoaded() {
        window.cookieconsent.initialise({
            palette: {
                popup: {
                    background: '#383b75',
                },
                button: {
                    background: '#f1d600',
                },
            },
            position: 'bottom-right',
            content: {
                message: $_('cookie_consent.message'),
                dismiss: $_('cookie_consent.dismiss'),
                link: $_('cookie_consent.link'),
                href: '/dataprotection/',
            },
        });
    }
</script>

<LibLoader
    url="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
    on:loaded="{onCookieConsentLoaded}"
></LibLoader>
