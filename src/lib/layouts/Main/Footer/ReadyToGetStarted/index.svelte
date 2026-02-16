<script lang="ts">
  import Dialog from './Dialog/index.svelte'
  import iconExternalLink from './icon-external-link.svg'
  import {meta} from '$content/meta'
  import Card from '$lib/common/Card/index.svelte'
  import Portal from '$lib/common/Portal/index.svelte'
  import Section from '$lib/common/Section/index.svelte'
  import Subtitle from '$lib/common/Subtitle/index.svelte'
  let isDialogShown = $state(false)

  const showDialog = () => {
    isDialogShown = true
  }

  const hideDialog = () => {
    isDialogShown = false
  }
</script>

<Section>
  <div
    class="col-[inner] grid grid-cols-subgrid items-start gap-y-4 pt-40 pb-(--inner-gap-x) sm:gap-y-8 sm:pt-52 xl:pt-64"
  >
    <div class="col-[inner] grid content-start gap-y-4 lg:col-[track-start_1/track-end_4]">
      <h2 class="text-h2">
        Ready to
        <br class="max-sm:hidden" />
        get started
        <br />
        with
        <span class="text-838484">Kinetics</span>
        ?
      </h2>

      <p class="max-w-[17.5em] text-838484">
        Use Kinetics locally, explore the workflow, or reach out if you want to discuss your use case, architecture, or
        roadmap.
      </p>
    </div>

    <Card
      class="col-[inner] h-40 max-sm:mt-4 sm:col-[track-start_1/track-end_4] sm:h-50 lg:col-[track-start_5/track-end_8]"
    >
      <div class="relative grid h-full grid-rows-[minmax(0,1fr)_auto_auto] gap-y-3 bg-121213 p-4 md:p-6">
        <Subtitle>Email us</Subtitle>
        <a class="text-link1 after:absolute after:inset-0" href="mailto:{meta.contactEmail}">{meta.contactEmail}</a>
        <p class="max-w-[18em] text-838484">Reach us directly — we usually respond within one business day.</p>
      </div>
    </Card>

    <Card class="col-[inner] h-40 sm:col-[track-start_5/track-end_8] sm:h-50 lg:col-[track-start_9/track-end_12]">
      <div class="relative grid h-full grid-rows-[minmax(0,1fr)_auto_auto] gap-y-3 bg-121213 p-4 md:p-6">
        <Subtitle>Meet with us</Subtitle>

        <button
          class="cursor-pointer text-left text-link1 after:absolute after:inset-0"
          onclick={showDialog}
          type="button"
        >
          Book a meeting with us
          <img class="inline-block size-[.75em]" alt="" src={iconExternalLink} />
        </button>

        <p class="max-w-[18em] text-838484">Book a technical call to walk through your use case and architecture.</p>
      </div>
    </Card>
  </div>
</Section>

{#if isDialogShown}
  <Portal>
    <Dialog hide={hideDialog} />
  </Portal>
{/if}
