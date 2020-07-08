<script>
    import ParallaxContainerM from '../components/materialize/ParallaxContainer.svelte';
    import ContainerM from '../components/materialize/Container.svelte';
    import SectionM from '../components/materialize/grid/Section.svelte';
    import RowM from '../components/materialize/grid/Row.svelte';
    import ColM from '../components/materialize/grid/Col.svelte';
    import IconM from '../components/materialize/Icon.svelte';

    import Highlight from '../components/Highlight.svelte';
</script>

<ParallaxContainerM id="index-banner" clazz="valign-wrapper" image="/img/badminton-racket.jpg" alt="Badminton Racket">
    <SectionM clazz="no-pad-bot">
        <ContainerM>
            <h1 class="header center">Interclub</h1>
            <RowM clazz="center">
                <h5 class="header col s12">Mannschaften und Spielplan</h5>
            </RowM>
        </ContainerM>
    </SectionM>
</ParallaxContainerM>

<ContainerM>
    <SectionM>
        <RowM>
            <ColM clazz="s12 center">
                <h5 class="header col s12 light">Dieses Jahr haben wir keine Interclub Mannschaft.</h5>
            </ColM>
        </RowM>
    </SectionM>
</ContainerM>
