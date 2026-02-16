<script lang="ts">
  import type {Snippet} from 'svelte'
  import Footer from './Footer/index.svelte'
  import Header from './Header/index.svelte'
  import {onNavigate} from '$app/navigation'

  let {
    children,
  }: {
    children: Snippet
  } = $props()

  let update = $state(false)

  onNavigate((navigation) => {
    if (navigation.from && navigation.to && navigation.from.route.id === navigation.to.route.id) {
      update = !update
    }
  })
</script>

<div class="relative grid min-h-svh grid-rows-[auto_minmax(0,1fr)]">
  <Header class="sticky top-0 z-30" />

  <div class="grid grid-rows-[minmax(0,1fr)_auto] content-start opacity-(--page-opacity)">
    <div>
      {#key update}
        {@render children()}
      {/key}
    </div>

    <Footer />
  </div>
</div>
