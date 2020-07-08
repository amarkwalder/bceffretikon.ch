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
            <h1 class="header center">Willkommen beim Badminton Club Effretikon</h1>
        </ContainerM>
    </SectionM>
</ParallaxContainerM>

<ContainerM>
    <SectionM>
        <ContainerM>
            <RowM>
                <ColM clazz="s12 center">
                    <h2>Badminton - Die schnellste Ballsportart der Welt</h2>
                    <p class="left-align">
                        Badminton wird häufig mit dem landläufig bekannten Federball verwechselt, welches gleichfalls
                        mit Schlägern (Rackets) und einem Federball (Shuttle) gespielt wird. Beim Badminton werden
                        jedoch zusätzlich ein Netz und eine Spielfeldbezeichnung benötigt. Im Gegensatz zum Federball,
                        wo man versucht, den Ball möglichst lange im Spiel zu halten, wird beim Badminton versucht, den
                        Gegner raschmöglichst auszuspielen und den Punkt zu machen, das heisst, den Shuttle auf den
                        Boden des gegnerischen Spielfelds zu bringen. Dazu braucht ein Spieler vielerlei Fähigkeiten.
                        Gute Reflexe, Kraft und Schnelligkeit, aber auch Ausdauer, Geschicklichkeit und Phantasie sind
                        notwendig, will man diesen schnellen, abwechslungsreichen und anspruchsvollen Sport erfolgreich
                        betreiben.
                    </p>
                    <p class="left-align">
                        Harte, gut platzierte Schläge - dabei kann der Shuttle Anfangsgeschwindigkeiten von bis zu 300
                        km/h erreichen - wie auch sanft gespielte Bälle knapp übers Netz, verlangen einen eingeübten
                        Bewegungsablauf, viel Ballgefühl und eine hohe Konzentrationsfähigkeit.
                    </p>
                    <p class="left-align">
                        Badminton kann als Einzel-, Doppel oder Mixed (gemischtes Doppel) gespielt werden und gilt
                        gemeinhin als sehr faire Sportart. In der Schweiz wird dieser Sport mittlerweile von tausenden
                        begeisterten aktiven Spielerinnen und Spielern betrieben.
                    </p>
                </ColM>
            </RowM>
        </ContainerM>
    </SectionM>
</ContainerM>

<ParallaxContainerM clazz="valign-wrapper" image="/img/badminton-net.jpg" alt="Badminton Net">
    <SectionM clazz="no-pad-bot">
        <ContainerM>
            <RowM clazz="center">
                <h5 class="header col s12">
                    Seit über 50 Jahren smashen und dropen badmintonbegeisterte im Schulhaus Watt in Effretikon.
                </h5>
            </RowM>
        </ContainerM>
    </SectionM>
</ParallaxContainerM>

<ContainerM>
    <SectionM>
        <ContainerM>
            <RowM>
                <ColM clazz="s12 center">
                    <div class="icon-block">
                        <h2 class="center brown-text">
                            <i class="material-icons">send</i>
                        </h2>
                        <h5>Interessiert?</h5>
                        <p class="left-align light">
                            Wir sind stets an aufgestellten Leuten in unseren Reihen interessiert. Auch Junioren und
                            Jugendliche sind bei uns jederzeit herzlich willkommen.
                        </p>
                    </div>
                </ColM>
            </RowM>
        </ContainerM>
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
