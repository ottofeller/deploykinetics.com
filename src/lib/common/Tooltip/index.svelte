<script lang="ts">
  import {getAbortSignal, onMount, type Snippet} from 'svelte'
  import {on} from 'svelte/events'
  import Content from './Content/index.svelte'
  import Portal from '$lib/common/Portal/index.svelte'

  let {
    children,
    id,
    target,
  }: {
    children?: Snippet
    id?: string
    target: Snippet<[{id: string}]>
  } = $props()

  const componentId = $props.id()
  const targetId = $derived(id ?? componentId)
  let isMouseEnter = $state(false)
  let isFocusIn = $state(false)
  const isShown = $derived(isFocusIn || isMouseEnter)

  onMount(() => {
    const targetElement = document.querySelector(`#${targetId}`)

    if (targetElement) {
      on(targetElement, 'mousemove', () => (isMouseEnter = true), {signal: getAbortSignal()})
      on(targetElement, 'mouseleave', () => (isMouseEnter = false), {signal: getAbortSignal()})
      on(targetElement, 'wheel', () => (isMouseEnter = false), {signal: getAbortSignal()})

      on(
        targetElement,
        'focusin',

        (event) => {
          // Show focus tooltip only if the focus is explicit.
          if (event.currentTarget instanceof HTMLElement && event.currentTarget.matches(':focus-visible')) {
            isFocusIn = true
          }
        },

        {signal: getAbortSignal()},
      )

      on(targetElement, 'focusout', () => (isFocusIn = false), {signal: getAbortSignal()})
    }
  })
</script>

{@render target({id: targetId})}

{#if children && isShown}
  <Portal>
    <Content {children} {targetId} />
  </Portal>
{/if}
