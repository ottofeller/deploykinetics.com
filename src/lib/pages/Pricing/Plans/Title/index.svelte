<script lang="ts">
  import Block from '$lib/common/Block/index.svelte'
  import Section from '$lib/common/Section/index.svelte'
  import Subtitle from '$lib/common/Subtitle/index.svelte'
</script>

{#snippet description()}
  <div
    class="grid max-w-[18em] gap-y-4 text-838484 lg:*:first:[text-box:trim-start_ex_alphabetic] lg:*:last:[text-box:trim-end_ex_alphabetic]"
  >
    <p>Simple, transparent pricing designed to scale with your workloads.</p>
  </div>
{/snippet}

<Section>
  <div class="col-[outer] grid grid-cols-subgrid">
    <Block
      class="col-start-[outer-start] col-end-[outer-end] -mb-px ml-(--outer-indent-x) max-lg:mr-(--outer-indent-x) lg:col-end-[track-end_6]"
    >
      <div
        class="grid h-full content-end gap-y-2 pt-12 pb-10 md:pt-10 md:pb-6 lg:supports-text-box:gap-y-6 xl:pt-16 xl:pb-12"
      >
        <Subtitle>Pricing</Subtitle>

        <div class="grid gap-y-4 lg:*:span-full">
          <h1 class="text-h1 lg:[text-box:trim-both_ex_alphabetic]">
            Choose your
            <br />
            <span class="text-838484">convenient plan</span>
          </h1>

          <div class="lg:invisible" aria-hidden="true">
            {@render description()}
          </div>
        </div>
      </div>
    </Block>

    <Block class="col-start-[track-end_6] col-end-[outer-end] mr-(--outer-indent-x) -mb-px -ml-px max-lg:hidden">
      <div class="grid h-full content-end pt-12 pb-10 md:pt-10 md:pb-6 xl:pt-16 xl:pb-12">
        {@render description()}
      </div>
    </Block>
  </div>
</Section>
