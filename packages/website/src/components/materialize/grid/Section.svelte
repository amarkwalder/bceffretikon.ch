<script>
    export let id = undefined;
    export let clazz = undefined;
</script>

<div id="{id}" class="section{clazz?' ' + clazz:''}">
    <slot></slot>
</div>
