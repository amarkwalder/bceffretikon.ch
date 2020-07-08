<script>
    import LibLoader from './LibLoader.svelte';

    function onGoogleAnalyticsLoaded() {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'UA-170848097-1');
    }
</script>

<LibLoader
    url="https://www.googletagmanager.com/gtag/js?id=UA-170848097-1"
    on:loaded="{onGoogleAnalyticsLoaded}"
></LibLoader>
