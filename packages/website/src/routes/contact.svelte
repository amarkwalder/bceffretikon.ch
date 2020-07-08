<script>
    import ParallaxContainerM from '../components/materialize/ParallaxContainer.svelte';
    import ContainerM from '../components/materialize/Container.svelte';
    import SectionM from '../components/materialize/grid/Section.svelte';
    import RowM from '../components/materialize/grid/Row.svelte';
    import ColM from '../components/materialize/grid/Col.svelte';
    import IconM from '../components/materialize/Icon.svelte';

    import Highlight from '../components/Highlight.svelte';
    import Contact from '../components/Contact.svelte';
    import Map from '../components/Map.svelte';

    import { stores } from '@sapper/app';
    const { page } = stores();
    const { query } = $page;
</script>

<ParallaxContainerM id="index-banner" clazz="valign-wrapper" image="/img/badminton-racket.jpg" alt="Badminton Racket">
    <SectionM clazz="no-pad-bot">
        <ContainerM>
            <h1 class="header center">Kontakt</h1>
            <RowM clazz="center">
                <h5 class="header col s12">
                    Hast Du eine Frage oder willst Du Dich bei uns zu einem Probetraining anmelden?
                </h5>
            </RowM>
        </ContainerM>
    </SectionM>
</ParallaxContainerM>

<ContainerM>
    <SectionM>
        <RowM>
            <ColM clazz="s12 center">
                <div class="icon-block">
                    <h2 class="center">
                        <i class="material-icons">email</i>
                    </h2>
                    <h5 class="center">Kontaktformular</h5>
                </div>

                {#if query.state === 'OK'}
                <p>Vielen Dank für die Kontaktanfrage. Wir setzen uns sobald wie möglich mit Dir in Verbindung.</p>

                {:else if query.state === 'ERR-1'}
                <p>Bei der Übermittlung ist etwas schief gelaufen. Der Formular Schutz funktioniert nicht richtig.</p>

                {:else if query.state === 'ERR-2'}
                <p>Bei der Übermittlung ist etwas schief gelaufen. Womöglich bist Du ein Bot?</p>

                {:else if query.state === 'ERR-3'}
                <p>Bei der Übermittlung ist ein technischer Fehler aufgetreten.</p>

                {:else}
                <Contact></Contact>

                {/if}
            </ColM>
        </RowM>
    </SectionM>
</ContainerM>

<ParallaxContainerM clazz="valign-wrapper" image="/img/badminton-shuttles.jpg" alt="Badminton Shuttles">
    <SectionM clazz="no-pad-bot">
        <ContainerM>
            <RowM clazz="center">
                <h5 class="header col s12 light">
                    Melde Dich bei uns um ein Probetraining zu absolvieren.
                </h5>
            </RowM>
            <RowM clazz="center">
                <a href="/contact" id="download-button" class="btn-large waves-effect waves-light">Anmelden</a>
            </RowM>
        </ContainerM>
    </SectionM>
</ParallaxContainerM>

<ContainerM>
    <SectionM>
        <RowM>
            <ColM clazz="s12 m12 center">
                <div class="icon-block">
                    <h2 class="center">
                        <i class="material-icons">add_location</i>
                    </h2>
                    <h5 class="center">Badminton Halle</h5>
                </div>
            </ColM>
        </RowM>
        <RowM>
            <ColM clazz="s12 m6 center">
                <div class="map-responsive">
                    <Map></Map>
                </div>
            </ColM>
            <ColM clazz="s12 m6 center">
                <p class="center light">Schulhaus Watt<br />Lindenstrasse 6A<br />8307 Illnau-Effretikon</p>
            </ColM>
        </RowM>
    </SectionM>
</ContainerM>

<ParallaxContainerM clazz="valign-wrapper" image="/img/badminton-shuttles.jpg" alt="Badminton Shuttles">
    <SectionM clazz="no-pad-bot">
        <ContainerM>
            <RowM clazz="center">
                <h5 class="header col s12 light">
                    Melde Dich bei uns um ein Probetraining zu absolvieren.
                </h5>
            </RowM>
            <RowM clazz="center">
                <a href="/contact" id="download-button" class="btn-large waves-effect waves-light">Anmelden</a>
            </RowM>
        </ContainerM>
    </SectionM>
</ParallaxContainerM>
