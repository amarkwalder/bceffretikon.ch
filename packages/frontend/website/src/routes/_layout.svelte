<style lang="scss" global>
    @import '../styles/global.scss';
</style>

<script>
    import { onMount } from 'svelte';

    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';

    export let segment;

    let materializeCssReady = false;
    let mounted = false;

    onMount(() => {
        mounted = true;
        if (materializeCssReady) {
            initiMaterializeCss();
        }
    });

    function materializeCssLoaded() {
        materializeCssReady = true;
        if (mounted) {
            initiMaterializeCss();
        }
    }

    function initiMaterializeCss() {
        M.AutoInit();
    }
</script>

<svelte:head>
    <title>Badminton Club Effretikon</title>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
        on:load="{materializeCssLoaded}"
    ></script>
</svelte:head>

<Header></Header>

<main>
    <slot segment="{segment}"></slot>
</main>

<Footer></Footer>
