<script>
    export let segment;
    export let stories = [];
</script>

<nav class="white" role="navigation">
    <div class="nav-wrapper container">
        <a id="logo-container" href="#!" class="brand-logo">Logo</a>

        <ul class="right hide-on-med-and-down">
            <li class="{segment === undefined ? 'selected' : ''}">
                <a href="."> Index </a>
            </li>
            {#each stories as story}
            <li class="{story.full_slug === segment ? 'selected' : ''}">
                <a href="{story.full_slug}"> {story.name} </a>
            </li>
            {/each}
        </ul>

        <ul id="nav-mobile" class="sidenav">
            <li class="{segment === undefined ? 'selected' : ''}">
                <a href="."> Index </a>
            </li>
            {#each stories as story}
            <li class="{story.full_slug === segment ? 'selected' : ''}">
                <a href="{story.full_slug}"> {story.name} </a>
            </li>
            {/each}
        </ul>

        <a href="#!" data-target="nav-mobile" class="sidenav-trigger">
            <i class="material-icons">menu</i>
        </a>
    </div>
</nav>
