<script>
    import { _, locale, locales } from 'svelte-i18n';
    import { onMount } from 'svelte';
    import { getCookie, setCookie } from '../utils/cookies';
    import { changeLang, getCurrentLang } from '../utils/language';
    import { stores } from '@sapper/app';
    const { page } = stores();

    export let segment;

    let sidenav, dropdownNavMain, dropdownNavMobile;
    onMount(() => {
        M.Sidenav.init(sidenav);
        M.Dropdown.init(dropdownNavMain);
        M.Dropdown.init(dropdownNavMobile);
    });
</script>

<div class="navbar-fixed">
    <nav class="white" role="navigation">
        <div class="nav-wrapper container">
            <a id="logo-container" href="/" class="brand-logo">
                <img height="28" src="/img/logo-black.jpg" alt="Logo" />
            </a>
            <ul id="nav" class="right hide-on-med-and-down">
                <li class:active="{segment === undefined && $page.path === '/'}">
                    <a rel="prefetch" href="/">{$_('nav.home')}</a>
                </li>
                <li class:active="{segment === 'training'}">
                    <a rel="prefetch" href="/training/">{$_('nav.training')}</a>
                </li>
                <li class:active="{segment === 'interclub'}">
                    <a rel="prefetch" href="/interclub/">{$_('nav.interclub')}</a>
                </li>
                <li class:active="{segment === 'contact'}">
                    <a rel="prefetch" href="/contact/">{$_('nav.contact')}</a>
                </li>
                <li class:active="{segment === 'about'}">
                    <a rel="prefetch" href="/about/">{$_('nav.about')}</a>
                </li>
                <li class:active="{segment === 'login'}">
                    <a rel="prefetch" href="/login/">{$_('nav.login')}</a>
                </li>
                <li>
                    <ul id="language-selector" class="dropdown-content">
                        <li>
                            <a href="#!" on:click="{() => (changeLang($locale))}">{getCurrentLang().toUpperCase()}</a>
                        </li>
                        {#each $locales as lang} {#if lang !== getCurrentLang()}
                        <li><a href="#!" on:click="{() => (changeLang(lang))}">{lang.toUpperCase()}</a></li>
                        {/if} {/each}
                    </ul>
                    <a class="dropdown-trigger" href="#!" data-target="language-selector" bind:this="{dropdownNavMain}">
                        {$locale.toUpperCase()}
                        <i class="material-icons right">arrow_drop_down</i>
                    </a>
                </li>
            </ul>
            <a href="#!" data-target="nav-mobile" class="sidenav-trigger">
                <i class="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" class="sidenav" bind:this="{sidenav}">
                <li>
                    <ul id="language-selector-mobile" class="dropdown-content">
                        <li>
                            <a href="#!" on:click="{() => (changeLang($locale))}">{getCurrentLang().toUpperCase()}</a>
                        </li>
                        {#each $locales as lang} {#if lang !== getCurrentLang()}
                        <li><a href="#!" on:click="{() => (changeLang(lang))}">{lang.toUpperCase()}</a></li>
                        {/if} {/each}
                    </ul>
                    <a
                        class="dropdown-trigger"
                        href="#!"
                        data-target="language-selector-mobile"
                        bind:this="{dropdownNavMobile}"
                    >
                        {$locale.toUpperCase()}
                        <i class="material-icons right">arrow_drop_down</i>
                    </a>
                </li>
                <li class="divider"></li>
                <li class:active="{segment === undefined && $page.path === '/'}">
                    <a rel="prefetch" href="/">{$_('nav.home')}</a>
                </li>
                <li class:active="{segment === 'training'}">
                    <a rel="prefetch" href="/training/">{$_('nav.training')}</a>
                </li>
                <li class:active="{segment === 'interclub'}">
                    <a rel="prefetch" href="/interclub/">{$_('nav.interclub')}</a>
                </li>
                <li class:active="{segment === 'contact'}">
                    <a rel="prefetch" href="/contact/">{$_('nav.contact')}</a>
                </li>
                <li class:active="{segment === 'about'}">
                    <a rel="prefetch" href="/about/">{$_('nav.about')}</a>
                </li>
                <li class:active="{segment === 'login'}">
                    <a rel="prefetch" href="/login/">{$_('nav.login')}</a>
                </li>
            </ul>
        </div>
    </nav>
</div>
