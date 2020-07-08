<style>
    iframe {
        border: 0;
    }
</style>

<script>
    export let title = 'Schulhaus Watt';
    //    export let q = 'place_id:ChIJ2_kSGXqimkcR-sPGXYmliic';
    export let q = '47.42879856236816, 8.69397819042206';
    export let center = '47.42879856236816, 8.69397819042206';
    export let width = 800;
    export let height = 600;
    export let language = 'de';
    export let mode = 'place';
    export let zoom = '18';
    export let maptype = 'roadmap';
    export let key = 'AIzaSyBKwuF8lV3v9WquQylsdXStOqNkPt9vZ2U';

    let url =
        `https://www.google.com/maps/embed/v1/${mode}?` +
        (key ? `key=${key}&` : ``) +
        (language ? `language=${language}&` : ``) +
        (maptype ? `maptype=${maptype}&` : ``) +
        (q ? `q=${q}&` : ``) +
        (center ? `center=${center}&` : ``) +
        (zoom ? `zoom=${zoom}&` : ``);
</script>

<iframe
    title="{title}"
    width="{width}"
    height="{height}"
    frameborder="0"
    scrolling="no"
    marginheight="0"
    marginwidth="0"
    src="{url}"
    allowfullscreen
></iframe>
