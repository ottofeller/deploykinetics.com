<script lang="ts">
  import type {Snippet} from 'svelte'
  import type {ClassValue} from 'svelte/elements'
  import {checkPageLoaded} from '$lib/common/helpers'

  let {
    children,
    class: className,
  }: {
    children: Snippet
    class?: ClassValue
  } = $props()
</script>

<main class={['page min-h-svh', checkPageLoaded() && 'animate-opacity', className]}>
  {@render children()}
</main>

<style lang="postcss">
  @reference '$lib/layouts/Root/styles.css';
  @keyframes --opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .page {
    animation: --opacity 1s cubic-bezier(0, 0, 0, 1) forwards;
  }
</style>
