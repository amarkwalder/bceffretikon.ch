<style lang="scss" global>
    @import '../styles/global.scss';
</style>

<script>
    import { onMount, beforeUpdate, afterUpdate } from 'svelte';

    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';

    export let segment;

    let materializeCssReady = false;
    let mounted = false;

    onMount(() => {
        mounted = true;
        if (materializeCssReady) {
            M.AutoInit();
        }
    });

    function materializeCssLoaded() {
        materializeCssReady = true;
        if (mounted) {
            M.AutoInit();
        }
    }

    afterUpdate(() => {
        if (materializeCssReady && mounted) {
            M.AutoInit();
        }
    });
</script>

<svelte:head>
    <title>Badminton Club Effretikon</title>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
        on:load="{materializeCssLoaded}"
    ></script>
</svelte:head>

<Header {segment}></Header>

<main>
    <slot {segment}></slot>
</main>

<Footer></Footer>
