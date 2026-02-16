<script lang="ts">
  import Section from '$lib/common/Section/index.svelte'
  const buildYear = new Date(import.meta.env.BUILD_TIME).getFullYear().toString()
</script>

<Section isLast>
  <div
    class="col-[inner] grid justify-items-start gap-y-4 pt-38 pb-4 text-add1 text-838484 sm:grid-cols-[minmax(0,1fr)_auto] sm:pt-48 xl:pt-60"
  >
    <a class="transition-colors hover:text-efefef sm:order-last" href="/policies">Policies</a>

    <p>
      ©
      <time datetime={buildYear}>{buildYear}</time>
      Kinetics. All rights reserved
    </p>
  </div>
</Section>
