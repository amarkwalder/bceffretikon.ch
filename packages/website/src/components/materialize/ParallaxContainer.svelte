<script>
    import { onMount } from 'svelte';

    export let id = undefined;
    export let clazz = undefined;
    export let image;
    export let alt;

    let parallax;
    onMount(() => {
        M.Parallax.init(parallax);
    });
</script>

<div id="{id}" class="parallax-container{clazz?' ' + clazz:''}">
    <slot></slot>
    <div class="parallax" bind:this="{parallax}">
        <img src="{image}" alt="{alt}" />
    </div>
</div>
