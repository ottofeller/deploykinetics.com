<script lang="ts">
  import type {Snippet} from 'svelte'
  import './styles.css'
  import {afterNavigate, onNavigate} from '$app/navigation'
  import {page} from '$app/state'
  import fontHackRegular from '$content/fonts/hack-regular.ttf?family=Hack&style=normal&weight=400&font'
  import fontRedHatDisplayMedium from '$content/fonts/red-hat-display-medium.ttf?family=Red Hat Display&style=normal&weight=500&font'
  import fontRedHatDisplayRegular from '$content/fonts/red-hat-display-regular.ttf?family=Red Hat Display&style=normal&weight=400&font'
  import {meta} from '$content/meta'
  import {checkPageLoaded} from '$lib/common/helpers'

  let {
    children,
  }: {
    children: Snippet
  } = $props()

  let rootElement: HTMLElement = $state(null!)

  // Fade out page on navigation.
  onNavigate(async (navigation) => {
    if (navigation.from?.url.pathname !== navigation.to?.url.pathname) {
      await rootElement.animate({'--page-opacity': ['1', '0']}, {duration: 200, easing: 'cubic-bezier(0, 0, 0, 1)'})
        .finished
    }
  })

  afterNavigate((navigation) => {
    // Don't reset scroll position on page refresh.
    if (navigation.type !== 'enter') {
      if (page.url.hash) {
        // "setTimeout" is used to correctly calculate "scroll-margin-top" after navigation.
        setTimeout(() => document.querySelector(page.url.hash)?.scrollIntoView({behavior: 'instant'}))
      } else {
        // Prevent scrolling after navigate.
        scrollTo({behavior: 'instant', top: 0})
      }
    }
  })
</script>

<svelte:head>
  <link href={meta.favicon} rel="icon" type="image/svg+xml" />
  <link href={meta.appleTouchIcon} rel="apple-touch-icon" />
  <link crossorigin="use-credentials" href="/manifest.json" rel="manifest" type="application/manifest+json" />

  <!-- eslint-disable svelte/no-at-html-tags -->
  {@html fontHackRegular.html}
  {@html fontRedHatDisplayMedium.html}
  {@html fontRedHatDisplayRegular.html}
  <!-- eslint-enable svelte/no-at-html-tags -->
</svelte:head>

<div bind:this={rootElement} inert={!checkPageLoaded()}>
  {@render children()}
</div>

<style lang="postcss">
  /* Typing `--page-opacity` is needed for the fade-out animation when leaving the page. */
  @property --page-opacity {
    syntax: '<number>';
    inherits: true;
    initial-value: 1;
  }
</style>
