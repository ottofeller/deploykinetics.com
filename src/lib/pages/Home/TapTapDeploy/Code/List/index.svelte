<script lang="ts">
  import type {ClassValue} from 'svelte/elements'
  import {MediaQuery} from 'svelte/reactivity'
  import Card from './Card/index.svelte'
  import {tailwindConfig} from '$lib/common/helpers'

  let {
    class: className,
    items,
    selectedItemIndex = $bindable(0),
  }: {
    class?: ClassValue
    items: Array<{command: string; description: string; title: string}>
    selectedItemIndex: number
  } = $props()

  const mediaQueryViewportMinWidthLgInstance = new MediaQuery(`(min-width: ${tailwindConfig.theme.screens.lg})`)

  const select = (index: number) => {
    selectedItemIndex = index
  }
</script>

<div class={['flex flex-col', className]}>
  {#each items as item, itemIndex (item.title)}
    {@const isSelected = selectedItemIndex === itemIndex || !mediaQueryViewportMinWidthLgInstance.current}

    <Card
      class={['-mb-px', isSelected ? 'grow' : 'grow-0']}
      command={item.command}
      description={item.description}
      {isSelected}
      onclick={() => select(itemIndex)}
      title={item.title}
    />
  {/each}
</div>
