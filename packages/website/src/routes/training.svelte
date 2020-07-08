<script context="module">
    export function preload({ params, query }) {
        return this.fetch(`holidays.json`)
            .then((r) => r.json())
            .then((holidays) => {
                return { holidays };
            });
    }
</script>

<script>
    import ParallaxContainerM from '../components/materialize/ParallaxContainer.svelte';
    import ContainerM from '../components/materialize/Container.svelte';
    import SectionM from '../components/materialize/grid/Section.svelte';
    import RowM from '../components/materialize/grid/Row.svelte';
    import ColM from '../components/materialize/grid/Col.svelte';
    import IconM from '../components/materialize/Icon.svelte';

    import Highlight from '../components/Highlight.svelte';

    import { getCurrentLang } from '../utils/language';

    export let holidays;
</script>

<ParallaxContainerM id="index-banner" clazz="valign-wrapper" image="/img/badminton-racket.jpg" alt="Badminton Racket">
    <SectionM clazz="no-pad-bot">
        <ContainerM>
            <h1 class="header center">Training</h1>
            <RowM clazz="center">
                <h5 class="header col s12">
                    Club- und Juniorentraining
                </h5>
            </RowM>
        </ContainerM>
    </SectionM>
</ParallaxContainerM>

<ContainerM>
    <SectionM>
        <RowM>
            <ColM clazz="s12 center">
                <h2>Clubtraining</h2>
            </ColM>
        </RowM>
        <RowM>
            <Highlight clazz="s12 m4" icon="people" title="Wer / Was">
                Bei uns spielen Jung und Alt gemeinsam Badminton. Plausch, Fairness und sportliche Leistung verbindet
                uns. Wir spielen jeweils Einzel, Doppel und Mixed.
            </Highlight>
            <Highlight clazz="s12 m4" icon="access_time" title="Wann">
                <p>Dienstag, 20:00 - 21:45<br />(Einzel, Doppel und Mixed)</p>
            </Highlight>
            <Highlight clazz="s12 m4" icon="add_location" title="Wo">
                Schulhaus Watt<br />Lindenstrasse 6A<br />8307 Illnau-Effretikon
            </Highlight>
        </RowM>
    </SectionM>
</ContainerM>

<ParallaxContainerM clazz="valign-wrapper" image="/img/badminton-net.jpg" alt="Badminton Net">
    <SectionM clazz="no-pad-bot">
        <ContainerM>
            <RowM clazz="center">
                <h5 class="header col s12">
                    Interessierte junge Leute ab 12 Jahren sind jederzeit im Juniorentraining herzlich willkommen.
                </h5>
            </RowM>
        </ContainerM>
    </SectionM>
</ParallaxContainerM>

<ContainerM>
    <SectionM>
        <RowM>
            <ColM clazz="s12 center">
                <h2>Juniorentraining</h2>
            </ColM>
        </RowM>
        <RowM>
            <Highlight clazz="s12 m4" icon="people" title="Wer / Was">
                Die Junioren werden durch unseren Trainer in verschiedenen Übungen nebst den Grundzügen des Spiels und
                der Technik auch der Spass am Badminton vermittelt.
            </Highlight>
            <Highlight clazz="s12 m4" icon="access_time" title="Wann">
                <p>Mittwoch, 18:00 - 20:00<br />(geführtes Juniorentraining)</p>
            </Highlight>
            <Highlight clazz="s12 m4" icon="add_location" title="Wo">
                Schulhaus Watt<br />Lindenstrasse 6A<br />8307 Illnau-Effretikon<br />
            </Highlight>
        </RowM>
    </SectionM>
</ContainerM>

<ParallaxContainerM clazz="valign-wrapper" image="/img/badminton-shuttles.jpg" alt="Badminton Shuttles">
    <SectionM clazz="no-pad-bot">
        <ContainerM>
            <RowM clazz="center">
                <h5 class="header col s12 light">
                    Möchtest Du den Badminton Sport und unseren Club näher kennenlernen?
                </h5>
            </RowM>
            <RowM clazz="center">
                <a href="/contact" id="download-button" class="btn-large waves-effect waves-light"
                    >Hier gehts zur Anmeldung</a
                >
            </RowM>
        </ContainerM>
    </SectionM>
</ParallaxContainerM>

<ContainerM>
    <SectionM>
        <RowM>
            <ColM clazz="s12 center">
                <h2>Hallendaten</h2>
                <p>An folgenden Daten findet <strong>KEIN</strong> Club- / Juniorentraining statt:</p>
                <table class="centered">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Von</th>
                            <th>Bis</th>
                        </tr>
                    </thead>

                    <tbody>
                        {#each holidays as holiday}
                        <tr>
                            <td>{holiday['title_' + getCurrentLang()]}</td>
                            <td>{holiday.from}</td>
                            <td>{holiday.to}</td>
                        </tr>
                        {/each}
                    </tbody>
                </table>
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
