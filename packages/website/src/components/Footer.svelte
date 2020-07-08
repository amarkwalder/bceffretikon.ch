<script>
    import ParallaxContainerM from '../components/materialize/ParallaxContainer.svelte';
    import ContainerM from '../components/materialize/Container.svelte';
    import SectionM from '../components/materialize/grid/Section.svelte';
    import RowM from '../components/materialize/grid/Row.svelte';
    import ColM from '../components/materialize/grid/Col.svelte';
</script>

<footer class="page-footer teal">
    <ContainerM>
        <RowM>
            <ColM clazz="l9 s12">
                <img height="50" src="/img/logo-white.jpg" alt="Logo" />
                <p>
                    <a class="white-text" href="email:info@bceffretikon.ch">info@bceffretikon.ch</a>
                </p>
            </ColM>
            <ColM clazz="l3 s12">
                <h5 class="white-text">Links</h5>
                <ul>
                    <li><a class="white-text" href="/">Home</a></li>
                    <li><a class="white-text" href="/training/">Training</a></li>
                    <li><a class="white-text" href="/interclub/">Interclub</a></li>
                    <li><a class="white-text" href="/about/">Über uns</a></li>
                    <li><a class="white-text" href="/contact/">Kontakt</a></li>
                    <li><a class="white-text" href="/login/">Login</a></li>
                </ul>
            </ColM>
        </RowM>
    </ContainerM>
    <div class="footer-copyright">
        <ContainerM>
            <RowM>
                <ColM clazz="s12 l9">
                    Urheberrecht &copy; 2020 Badminton Club Effretikon. Alle Rechte vorbehalten.
                </ColM>
                <ColM clazz="s12 l3 white-text">
                    <a class="white-text" href="/dataprotection/">Datenschutz</a>
                    <br />
                    <a class="white-text" href="/legalnotice/">Impressum</a>
                </ColM>
            </RowM>
        </ContainerM>
    </div>
</footer>
