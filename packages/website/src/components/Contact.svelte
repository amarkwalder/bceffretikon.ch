<script>
    import { onMount } from 'svelte';

    import ParallaxContainerM from '../components/materialize/ParallaxContainer.svelte';
    import ContainerM from '../components/materialize/Container.svelte';
    import SectionM from '../components/materialize/grid/Section.svelte';
    import RowM from '../components/materialize/grid/Row.svelte';
    import ColM from '../components/materialize/grid/Col.svelte';
    import IconM from '../components/materialize/Icon.svelte';

    import Highlight from '../components/Highlight.svelte';
    import Map from '../components/Map.svelte';
    import Recaptcha from '../components/Recaptcha.svelte';

    let birthday;
    let message;
    onMount(() => {
        M.Datepicker.init(birthday, {
            autoClose: true,
            format: 'dd.mm.yyyy',
            firstDay: 1,
            yearRange: [1950, 2020],
            showDaysInNextAndPreviousMonths: true,
            showClearBtn: true,
            i18n: {
                cancel: 'Abrechen',
                clear: 'Löschen',
                done: 'OK',
                months: [
                    'Januar',
                    'Februar',
                    'März',
                    'April',
                    'Mai',
                    'Juni',
                    'Juli',
                    'August',
                    'September',
                    'Oktober',
                    'November',
                    'Dezember',
                ],
                monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
                weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
                weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                weekdaysAbbrev: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
            },
        });
        M.CharacterCounter.init(message);
    });
</script>

<form name="contact" class="col s12" method="post" data-netlify-recaptcha="true" data-netlify="true">
    <RowM>
        <div class="input-field col s6">
            <i class="material-icons prefix">account_circle</i>
            <input required id="first_name" name="first_name" type="text" class="validate" />
            <label for="first_name">Vorname</label>
        </div>
        <div class="input-field col s6">
            <input required id="last_name" name="last_name" type="text" class="validate" />
            <label for="last_name">Nachname</label>
        </div>
    </RowM>
    <RowM>
        <div class="input-field col s12">
            <i class="material-icons prefix">add_location</i>
            <input required id="address" name="address" type="text" class="validate" />
            <label for="address">Adresse</label>
        </div>
    </RowM>
    <RowM>
        <div class="input-field col s4">
            <i class="material-icons prefix">location_city</i>
            <input required id="zip" name="zip" type="text" class="validate" />
            <label for="zip">PLZ</label>
        </div>
        <div class="input-field col s8">
            <input required id="city" name="city" type="text" class="validate" />
            <label for="city">Ort</label>
        </div>
    </RowM>
    <RowM>
        <div class="input-field col s12">
            <i class="material-icons prefix">email</i>
            <input required id="email" name="email" type="email" class="validate" />
            <label for="email">Email</label>
        </div>
    </RowM>
    <RowM>
        <div class="input-field col s12">
            <i class="material-icons prefix">phone</i>
            <input required id="phone" name="phone" type="tel" class="validate" />
            <label for="phone">Telefonnummer</label>
        </div>
    </RowM>
    <RowM>
        <div class="input-field col s12">
            <i class="material-icons prefix">today</i>
            <input required id="birthday" name="birthday" type="text" class="datepicker" bind:this="{birthday}" />
            <label for="birthday">Geburtsdatum</label>
        </div>
    </RowM>
    <RowM>
        <div class="input-field col s12">
            <i class="material-icons prefix">message</i>
            <textarea
                id="message"
                name="message"
                class="materialize-textarea"
                data-length="500"
                bind:this="{message}"
            ></textarea>
            <label for="message">Nachricht</label>
        </div>
    </RowM>

    <RowM>
        <div class="col s6">
            <div data-netlify-recaptcha="true"></div>
        </div>
        <div class="col s6">
            <button type="submit" class="waves-effect waves-light btn">
                <i class="material-icons left">email</i>Abschicken
            </button>
        </div>
    </RowM>
</form>
