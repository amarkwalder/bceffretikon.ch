<script>
    import ColM from './materialize/grid/Col.svelte';
    import IconM from './materialize/Icon.svelte';

    export let id = undefined;
    export let clazz = undefined;
    export let icon;
    export let iconSize = undefined;
    export let title;
</script>

<ColM id="{id}" clazz="{clazz}">
    <div class="icon-block">
        <h2 class="center">
            <IconM icon="{icon}" size="{iconSize}"></IconM>
        </h2>
        <h5 class="center">{title}</h5>
        <p class="center light">
            <slot></slot>
        </p>
    </div>
</ColM>
