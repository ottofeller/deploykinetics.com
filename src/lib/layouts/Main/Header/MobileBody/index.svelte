<script lang="ts">
  import type {ClassValue} from 'svelte/elements'
  import {MediaQuery} from 'svelte/reactivity'
  import Panel from './Panel/index.svelte'
  import Portal from '$lib/common/Portal/index.svelte'
  import {tailwindConfig} from '$lib/common/helpers'

  let {
    class: className,
    isPanelShown = $bindable(false),
  }: {
    class?: ClassValue
    isPanelShown: boolean
  } = $props()

  const togglePanel = () => {
    isPanelShown = !isPanelShown
  }

  const hidePanel = () => {
    isPanelShown = false
  }

  const mediaQueryViewportMinWidthSmInstance = new MediaQuery(`(min-width: ${tailwindConfig.theme.screens.sm})`)

  $effect(() => {
    if (mediaQueryViewportMinWidthSmInstance.current && isPanelShown) {
      hidePanel()
    }
  })
</script>

<button
  class={[
    'grid size-8 cursor-pointer content-center gap-y-1.5 px-1 *:h-0.5 *:rounded-full *:bg-current *:transition-transform',

    isPanelShown &&
      '[&>span:nth-child(1)]:translate-y-2 [&>span:nth-child(1)]:rotate-45 [&>span:nth-child(2)]:scale-x-0 [&>span:nth-child(3)]:-translate-y-2 [&>span:nth-child(3)]:-rotate-45',

    className,
  ]}
  aria-label="Toggle menu"
  onclick={togglePanel}
  type="button"
>
  <span></span>
  <span></span>
  <span></span>
</button>

{#if isPanelShown}
  <Portal>
    <Panel hide={hidePanel} />
  </Portal>
{/if}
