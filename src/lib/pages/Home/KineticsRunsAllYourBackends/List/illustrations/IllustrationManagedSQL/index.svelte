<script lang="ts">
  import {onDestroy, untrack} from 'svelte'
  import {on} from 'svelte/events'
  import Pancake from './Pancake/index.svelte'

  let {
    isPointerEntered,
  }: {
    isPointerEntered: boolean
  } = $props()

  let markerElementWidth = $state(0)
  let isAnimationStarted = $state(false)
  let animationState = $state(0)
  const controller = new AbortController()
  let timerId: ReturnType<typeof setTimeout> | undefined = undefined
  let rejectCallback: VoidFunction | undefined = undefined

  const onReject = () => {
    clearTimeout(timerId)
    rejectCallback?.()
  }

  on(controller.signal, 'abort', onReject)

  const sleep = (ms: number) =>
    new Promise((resolve, reject) => {
      timerId = setTimeout(resolve, ms)
      rejectCallback = reject
    })

  $effect(() => {
    if (isPointerEntered && untrack(() => !isAnimationStarted)) {
      const update = async () => {
        try {
          isAnimationStarted = true
          animationState = 1
          await sleep(500)
          animationState = 2
          await sleep(1000)
          animationState = 3
          await sleep(500)
          animationState = 0
          isAnimationStarted = false

          if (isPointerEntered) {
            update()
          }
        } catch {}
      }

      update()
    }
  })

  onDestroy(() => {
    controller?.abort()
  })
</script>

<div
  style:--marker-width="{markerElementWidth}px"
  class="grid h-50 grid-cols-[--spacing(25)_minmax(0,1fr)_--spacing(25)] grid-rows-[auto_minmax(0,1fr)] items-center p-4"
>
  <div class="col-span-full mr-25" bind:offsetWidth={markerElementWidth}></div>

  <div class="grid">
    <Pancake
      class={[
        'z-4',
        animationState === 0 && 'fill-1b1b1c stroke-29292a',
        animationState === 1 && 'transition-colors duration-500',

        animationState >= 1 &&
          animationState <= 2 &&
          'fill-[color-mix(in_oklab,var(--color-121213)_90%,var(--color-82f1f7))] stroke-82f1f7',

        animationState === 2 && 'transition-transform duration-1000',
        animationState >= 2 && 'translate-x-(--marker-width)',
        animationState === 3 && 'fill-1b1b1c stroke-29292a transition-colors duration-500',
      ]}
    />

    <Pancake
      class={[
        'z-3 fill-1b1b1c stroke-29292a',
        animationState >= 2 && '-translate-y-6 transition-transform duration-1000',
      ]}
    />

    <Pancake
      class={[
        'z-2 fill-1b1b1c stroke-29292a',
        animationState >= 2 && '-translate-y-6 transition-transform duration-1000',
      ]}
    />

    <Pancake
      class={[
        'z-1 fill-1b1b1c stroke-29292a',
        animationState >= 2 && '-translate-y-6 transition-transform duration-1000',
      ]}
    />

    <Pancake
      class={[
        'z-0 -mb-6 fill-1b1b1c stroke-29292a',
        animationState >= 2 ? '-translate-y-6 transition-transform duration-1000' : 'translate-y-25',
      ]}
    />
  </div>

  <svg class="h-7.5 w-16 justify-self-center fill-none stroke-29292a" viewBox="0 0 64 30">
    <path d="m2 10h60l-9.697-9m9.697 19h-60l9.697 9" stroke-linecap="round" />
  </svg>

  <div class="grid">
    <Pancake
      class={[
        'z-3 fill-1b1b1c stroke-29292a',
        animationState >= 2 && 'translate-y-6 transition-transform duration-1000',
      ]}
    />

    <Pancake
      class={[
        'z-2 fill-1b1b1c stroke-29292a',
        animationState >= 2 && 'translate-y-6 transition-transform duration-1000',
      ]}
    />

    <Pancake
      class={[
        'z-1 fill-1b1b1c stroke-29292a',
        animationState >= 2 && 'translate-y-6 transition-transform duration-1000',
      ]}
    />

    <Pancake
      class={[
        'z-0 fill-1b1b1c stroke-29292a',
        animationState >= 2 ? 'translate-y-25 transition-transform duration-1000' : '',
      ]}
    />
  </div>
</div>
