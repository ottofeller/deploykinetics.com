<script lang="ts">
  import type {ClassValue} from 'svelte/elements'
  import Body from './Body/index.svelte'
  import MobileBody from './MobileBody/index.svelte'
  import {meta} from '$content/meta'
  import logo from '$lib/common/assets/logo.svg'

  let {
    class: className,
  }: {
    class?: ClassValue
  } = $props()

  let isMobilePanelShown = $state(false)
</script>

<div
  class={[
    'grid h-(--header-height) grid-cols-entire items-center backdrop-blur-[--spacing(5)] transition-colors',
    isMobilePanelShown ? 'bg-08090a' : 'bg-08090a/80',
    className,
  ]}
>
  <div class="col-[inner] grid grid-cols-[minmax(0,1fr)_auto] items-center">
    <a class="h-8 content-center justify-self-start" href="/">
      <img class="aspect-90/16 w-31.5 select-text" alt={meta.siteName} src={logo} />
    </a>

    <Body class="max-sm:hidden" />
    <MobileBody class="sm:hidden" bind:isPanelShown={isMobilePanelShown} />
  </div>
</div>
