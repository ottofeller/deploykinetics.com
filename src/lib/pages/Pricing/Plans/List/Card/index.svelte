<script lang="ts">
  import type {ClassValue} from 'svelte/elements'
  import Feature from './Feature/index.svelte'
  import Price from './Price/index.svelte'
  import Card from '$lib/common/Card/index.svelte'
  import {AccentButton} from '$lib/common/buttons'

  let {
    class: className,
    features,
    isAccent,
    type,
    value,
  }: {
    class?: ClassValue
    features: Array<{description: string; note?: string}>
    isAccent: boolean
    type: string
    value: number | null
  } = $props()
</script>

<Card class={[isAccent && '[--card-ring-color:var(--color-82f1f7)] ', className]}>
  <div class="@container/card h-full">
    <div
      class={[
        'relative grid h-full gap-x-(--inner-gap-x) px-4 py-6 sm:px-6 @max-2xl/card:grid-rows-[auto_auto_auto_minmax(0,1fr)_auto] @2xl/card:grid-cols-[minmax(0,1fr)_var(--track-4)_minmax(0,1fr)] @2xl:items-end',
        isAccent ? 'bg-[color-mix(in_oklab,var(--color-121213)_98%,var(--color-82f1f7))]' : 'bg-121213',
      ]}
    >
      <p class="text-h3 @2xl/card:col-span-full">
        <span class="text-838484">[</span>
        <span>{type}</span>
        <span class="text-838484">]</span>
      </p>

      <div class="relative mt-8 grid grid-flow-col justify-start whitespace-nowrap xl:mt-14">
        {#if value === null}
          <p class="text-h1">
            Custom
            <span class="absolute inset-x-0 top-full mt-1 text-add2 text-838484">Pay per usage, discounts apply</span>
          </p>
        {:else}
          <Price {value} />
        {/if}
      </div>

      <hr class="-mx-6 mt-6 text-29292a sm:mt-8 @2xl/card:hidden" />

      <ul class="relative mt-6 grid content-start gap-y-3">
        {#each features as feature, featureIndex (featureIndex)}
          <Feature description={feature.description} note={feature.note} />
        {/each}
      </ul>

      <AccentButton
        class="mt-10 w-full justify-self-end md:mt-16 @2xl/card:max-w-[calc(var(--track-2)---spacing(6))]"
        isDisabled
        label="Coming soon"
        onclick={() => {}}
      />
    </div>
  </div>
</Card>
