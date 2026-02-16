<script lang="ts">
  import {onDestroy, untrack} from 'svelte'
  import {on} from 'svelte/events'
  import {meta} from '$content/meta'
  import logo from '$lib/common/assets/logo.svg'

  let {
    isPointerEntered,
  }: {
    isPointerEntered: boolean
  } = $props()

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
          await sleep(800)
          animationState = 1.25
          await sleep(800)
          animationState = 1.5
          await sleep(800)
          animationState = 2
          await sleep(500)
          animationState = 2.125
          await sleep(800)
          animationState = 2.25
          await sleep(800)
          animationState = 2.5
          await sleep(800)
          animationState = 3
          await sleep(800)
          animationState = 3.25
          await sleep(800)
          animationState = 0
          isAnimationStarted = false
          await sleep(800)

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

  let leftLineElementWidth = $state(0)
  let centralLineElementHeight = $state(0)
  let rightLineElementWidth = $state(0)

  const resizeSVGPathObserver = (onResize: (element: SVGPathElement) => void) => (element: SVGPathElement) => {
    new ResizeObserver(() => {
      onResize(element)
    }).observe(element)
  }

  let leftCurveElementLength = $state(0)

  const updateLeftCurveElementLength = (element: SVGPathElement) => {
    leftCurveElementLength = element.getTotalLength()
  }

  let rightCurveElementLength = $state(0)

  const updateRightCurveElementLength = (element: SVGPathElement) => {
    rightCurveElementLength = element.getTotalLength()
  }

  let centralCurveElementLength = $state(0)

  const updateCentralCurveElementLength = (element: SVGPathElement) => {
    centralCurveElementLength = element.getTotalLength()
  }
</script>

<div
  class="relative grid h-50 grid-cols-[auto_minmax(0,1fr)_auto] grid-rows-3 place-content-between justify-items-center p-4"
>
  <div class="absolute top-13 left-12 h-7 w-[calc(50%---spacing(21))]" bind:offsetWidth={leftLineElementWidth}>
    <svg class="h-full overflow-visible fill-none stroke-29292a" viewBox="0 0 {leftLineElementWidth} 28">
      <path
        class="[stroke-dasharray:--spacing(0.5)_--spacing(0.5)]"
        d="M.5 28V8.5a8 8 0 0 1 8-8H{leftLineElementWidth}"
      />

      <path
        style:--curve-length="{leftCurveElementLength}px"
        class={[
          'stroke-82f1f7 [stroke-width:--spacing(0.5)] drop-shadow-[0_0_--spacing(3)_var(--color-82f1f7)] transition-[stroke-dashoffset] duration-800 [stroke-dasharray:--spacing(2)_9999] [stroke-linecap:round]',
          animationState === 1
            ? '[stroke-dashoffset:calc((--spacing(0.5)+var(--curve-length))*-1)]'
            : '[stroke-dashoffset:10]',
        ]}
        {@attach resizeSVGPathObserver(updateLeftCurveElementLength)}
        d="M.5 28V8.5a8 8 0 0 1 8-8H{leftLineElementWidth}"
      />
    </svg>
  </div>

  <div
    class="absolute top-13 right-12 grid h-7 w-[calc(50%---spacing(21))] justify-items-end"
    bind:offsetWidth={rightLineElementWidth}
  >
    <svg class="h-full overflow-visible fill-none stroke-29292a" viewBox="0 0 {rightLineElementWidth} 28">
      <path
        class="[stroke-dasharray:--spacing(0.5)_--spacing(0.5)]"
        d="M{rightLineElementWidth} 28V8.5a8 8 0 0 0-8-8H0"
      />

      <path
        style:--curve-length="{rightCurveElementLength}px"
        class={[
          'stroke-82f1f7 [stroke-width:--spacing(0.5)] drop-shadow-[0_0_--spacing(3)_var(--color-82f1f7)] transition-[stroke-dashoffset] duration-800 [stroke-dasharray:--spacing(0.5)_--spacing(1)_--spacing(0.5)_--spacing(1)_--spacing(0.5)_--spacing(1)_--spacing(0.5)_9999] [stroke-linecap:round]',
          animationState === 3
            ? '[stroke-dashoffset:calc((--spacing(0.5)+var(--curve-length))*-1)]'
            : '[stroke-dashoffset:20]',
        ]}
        {@attach resizeSVGPathObserver(updateRightCurveElementLength)}
        d="M{rightLineElementWidth} 28V8.5a8 8 0 0 0-8-8H0"
      />
    </svg>
  </div>

  <div class="absolute bottom-18 left-1/2 aspect-1/40 w-px" bind:offsetHeight={centralLineElementHeight}>
    <svg class="h-full overflow-visible fill-none stroke-29292a" viewBox="0 0 1 {centralLineElementHeight}">
      <path class="[stroke-dasharray:--spacing(0.5)_--spacing(0.5)]" d="M.5 {centralLineElementHeight}V0" />

      <path
        style:--curve-length="{centralCurveElementLength}px"
        class={[
          'stroke-82f1f7 [stroke-width:--spacing(0.5)] drop-shadow-[0_0_--spacing(3)_var(--color-82f1f7)] transition-[stroke-dashoffset] duration-800 [stroke-dasharray:--spacing(2)_9999] [stroke-linecap:round]',
          animationState === 2.125
            ? '[stroke-dashoffset:calc((--spacing(0.5)+var(--curve-length))*-1)]'
            : '[stroke-dashoffset:20]',
        ]}
        {@attach resizeSVGPathObserver(updateCentralCurveElementLength)}
        d="M.5 {centralLineElementHeight}V0"
      />
    </svg>
  </div>

  <div
    class="isolate col-2 row-1 grid size-18 content-between justify-items-center rounded-xl bg-1b1b1c py-2 ring ring-29292a ring-inset"
  >
    <div
      class={[
        'size-2.5 rounded-full ring ring-29292a transition-[background-color,box-shadow] ring-inset',
        isAnimationStarted
          ? 'bg-82f1f7 shadow-[0_0_--spacing(3)_rgb(from_var(--color-82f1f7)_r_g_b/50%)]'
          : 'bg-121213 shadow-[0_0_--spacing(3)_rgb(from_var(--color-82f1f7)_r_g_b/0%)]',
      ]}
    ></div>

    <img class="aspect-90/16 w-14.5 select-text" alt={meta.siteName} src={logo} />
    <p class="text-add2 text-838484">cloud</p>
  </div>

  <div
    class={[
      'isolate col-3 row-2 grid h-12 w-16 place-items-center self-end rounded-xl bg-1b1b1c text-add2 text-838484 ring transition-shadow duration-500 ring-inset',
      animationState === 3 || animationState === 3.25
        ? 'shadow-[0_0_--spacing(3)_rgb(from_var(--color-82f1f7)_r_g_b/50%)] ring-82f1f7'
        : 'shadow-[0_0_--spacing(3)_rgb(from_var(--color-82f1f7)_r_g_b/0%)] ring-29292a',
    ]}
  >
    Queue
  </div>

  <div
    class={[
      'isolate col-2 row-3 h-12 w-16 rounded-xl bg-1b1b1c text-add2 text-838484 ring ring-29292a transition-shadow duration-500 ring-inset',
      animationState === 2 || animationState === 2.25
        ? 'shadow-[0_0_--spacing(3)_rgb(from_var(--color-82f1f7)_r_g_b/50%)]'
        : 'shadow-[0_0_--spacing(3)_rgb(from_var(--color-82f1f7)_r_g_b/0%)]',
    ]}
  >
    <div
      class={[
        'progress h-full rounded-[inherit] duration-500',
        animationState >= 2
          ? 'transition-[--progress-angle,--progress-color] [--progress-angle:1turn]'
          : '[--progress-angle:0turn]',
        animationState > 2.25 ? '[--progress-color:transparent]' : '[--progress-color:var(--color-82f1f7)]',
      ]}
    >
      <div
        class="grid h-full place-items-center bg-1b1b1c [clip-path:inset(--spacing(0.25)_round_calc(var(--radius-xl)---spacing(0.25)))]"
      >
        Cron
      </div>
    </div>
  </div>

  <div
    class={[
      'isolate col-1 row-2 grid h-12 w-16 place-items-center self-end rounded-xl bg-1b1b1c text-add2 text-838484 ring transition-shadow duration-500 ring-inset',
      animationState === 1 || animationState === 1.25
        ? 'shadow-[0_0_--spacing(3)_rgb(from_var(--color-82f1f7)_r_g_b/50%)] ring-82f1f7'
        : 'shadow-[0_0_--spacing(3)_rgb(from_var(--color-82f1f7)_r_g_b/0%)] ring-29292a',
    ]}
  >
    REST API
  </div>
</div>

<style lang="postcss">
  @reference '$lib/layouts/Root/styles.css';
  @property --progress-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0turn;
  }
  @property --progress-color {
    syntax: '<color>';
    inherits: false;
    initial-value: transparent;
  }
  .progress {
    background-image: conic-gradient(var(--progress-color) 0 var(--progress-angle), transparent 0);
  }
</style>
