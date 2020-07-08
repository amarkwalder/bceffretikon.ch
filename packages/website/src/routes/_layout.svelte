<style type="text/scss" global>
    @import '../styles/global.scss';
</style>

<script>
    import Materialize from '../components/materialize/Materialize.svelte';
    import I18n from '../components/I18n.svelte';
    import CookieConsent from '../components/cookieconsent/CookieConsent.svelte';
    import Analytics from '../components/Analytics.svelte';

    import Navbar from '../components/Navbar.svelte';
    import Footer from '../components/Footer.svelte';

    export let segment;

    let materializeLoaded = false;
    let i18nLoaded = false;
    $: isLoading = !materializeLoaded || !i18nLoaded;

    function onMaterializeLoaded() {
        console.log('onMaterializeLoaded');
        materializeLoaded = true;
    }

    function onI18nLoaded() {
        console.log('onI18nLoaded');
        i18nLoaded = true;
    }
</script>

<svelte:head>
    <title>Badminton Club Effretikon</title>
</svelte:head>

<Materialize on:loaded="{onMaterializeLoaded}"></Materialize>
<I18n on:loaded="{onI18nLoaded}"></I18n>

{#if isLoading}
<p>Loading...</p>
{:else}
<CookieConsent></CookieConsent>
<Analytics></Analytics>

<Navbar {segment}></Navbar>

<main>
    <slot {segment}></slot>
</main>

<Footer></Footer>
{/if}
