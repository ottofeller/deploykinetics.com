<script lang="ts">
  import {getCleanedString, highlight} from './highlight'
  import Icon from '$lib/common/Icon/index.svelte'

  let {
    description,
    note,
  }: {
    description: string
    note?: string
  } = $props()

  const cleanedDescription = $derived(getCleanedString(description))
</script>

<li class="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2">
  <span class="grid h-lh content-center">
    <span class="grid size-4 place-items-center rounded-full bg-1b1b1c ring ring-29292a">
      <Icon name="check" class="size-2" />
    </span>
  </span>

  <span class="relative">
    <span class="highlight" {@attach highlight(description)}>
      {cleanedDescription}
    </span>

    {#if note}
      <span class="absolute inset-x-0 top-full mt-1 text-add2 text-838484">
        {note}
      </span>
    {/if}
  </span>
</li>

<style lang="postcss">
  @reference '$lib/layouts/Root/styles.css';
  .highlight {
    &::highlight(--highlight) {
      @apply text-82f1f7;
    }
  }
</style>
