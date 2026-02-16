<script lang="ts">
  import Block from '$lib/common/Block/index.svelte'
  import Section from '$lib/common/Section/index.svelte'
  import Subtitle from '$lib/common/Subtitle/index.svelte'
</script>

{#snippet description()}
  <div
    class="grid max-w-[18em] gap-y-4 text-838484 md:*:first:[text-box:trim-start_ex_alphabetic] md:*:last:[text-box:trim-end_ex_alphabetic]"
  >
    <p>
      All examples are available in our GitHub repository here. Install kinetics, and run kinetics deploy. Or simply
      call them locally with kinetics invoke.
    </p>

    <p>Add tabs with these examples there.</p>
  </div>
{/snippet}

<Section>
  <div class="col-[outer] grid grid-cols-subgrid">
    <Block
      class="col-start-[outer-start] col-end-[outer-end] -mb-px ml-(--outer-indent-x) max-md:mr-(--outer-indent-x) md:col-end-[track-end_4] lg:col-end-[track-end_6]"
    >
      <div class="grid h-full content-end gap-y-2 pt-26 pb-8 md:pt-28 md:pb-4 md:supports-text-box:gap-y-6 xl:pt-48">
        <Subtitle>Examples</Subtitle>

        <div class="grid gap-y-4 md:*:span-full">
          <h2 class="text-h2 md:[text-box:trim-both_ex_alphabetic]">
            Kinetics
            <br />
            <span class="text-838484">in examples</span>
          </h2>

          <div class="md:invisible" aria-hidden="true">
            {@render description()}
          </div>
        </div>
      </div>
    </Block>

    <Block
      class="col-start-[track-end_4] col-end-[outer-end] mr-(--outer-indent-x) -mb-px -ml-px max-md:hidden lg:col-start-[track-end_6]"
    >
      <div class="grid h-full content-end pt-26 pb-8 md:pt-28 md:pb-4 xl:pt-48">
        {@render description()}
      </div>
    </Block>
  </div>
</Section>
