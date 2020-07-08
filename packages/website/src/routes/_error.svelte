<script>
    import { _ } from 'svelte-i18n';

    import ParallaxContainerM from '../components/materialize/ParallaxContainer.svelte';
    import ContainerM from '../components/materialize/Container.svelte';
    import SectionM from '../components/materialize/grid/Section.svelte';
    import RowM from '../components/materialize/grid/Row.svelte';
    import ColM from '../components/materialize/grid/Col.svelte';
    import IconM from '../components/materialize/Icon.svelte';

    export let status;
    export let error;

    const dev = process.env.NODE_ENV === 'development';
</script>

<ParallaxContainerM id="index-banner" clazz="valign-wrapper" image="/img/badminton-racket.jpg" alt="Badminton Racket">
    <SectionM clazz="no-pad-bot">
        <ContainerM>
            <h1 class="header center">{$_('error.title')}</h1>
            <RowM clazz="center">
                <h5 class="header col s12">{status}</h5>
                <p class="center">{error.message}</p>
            </RowM>
        </ContainerM>
    </SectionM>
</ParallaxContainerM>

{#if dev && error.stack}
<ContainerM>
    <SectionM>
        <ContainerM>
            <RowM>
                <ColM clazz="s12 center">
                    <pre>{error.stack}</pre>
                </ColM>
            </RowM>
        </ContainerM>
    </SectionM>
</ContainerM>
{/if}
