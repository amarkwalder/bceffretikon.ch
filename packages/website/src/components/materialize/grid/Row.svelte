<script>
    export let id = undefined;
    export let clazz = undefined;
</script>

<div id="{id}" class="row{clazz?' ' + clazz:''}">
    <slot></slot>
</div>
