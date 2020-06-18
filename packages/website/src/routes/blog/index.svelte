<script context="module">
    export function preload({ params, query }) {
        return this.fetch(`blog.json`)
            .then((r) => r.json())
            .then((posts) => {
                return { posts };
            });
    }
</script>

<script>
    export let posts;
</script>

<div class="container">
    <div class="section">
        <div class="row">
            {#each posts as post}
            <div class="col s12 m4">
                <div class="icon-block">
                    <h4 class="center">
                        <a rel="prefetch" href="blog/{post.slug}">{post.title}</a>
                    </h4>
                    <p class="light">
                        Blog Description
                    </p>
                </div>
            </div>
            {/each}
        </div>
    </div>
</div>
