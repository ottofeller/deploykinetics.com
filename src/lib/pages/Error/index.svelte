<script lang="ts">
  import mask404 from './404.svg?raw'
  import mask500 from './500.svg?raw'
  import Section from '$lib/common/Section/index.svelte'
  import {OutlineButton} from '$lib/common/buttons'

  let {
    message,
    status,
  }: {
    message: string
    status: number
  } = $props()

  let pointerCoords = $state.raw({x: 0, y: 0})

  const onpointermove = ({
    clientX,
    clientY,
    currentTarget,
  }: {
    clientX: number
    clientY: number
    currentTarget: HTMLElement
  }) => {
    const rect = currentTarget.getBoundingClientRect()
    pointerCoords = {x: clientX - rect.left, y: clientY - rect.top}
  }
</script>

<Section>
  <div
    class="col-[inner] grid min-h-[calc(100svh-var(--header-height))] content-center py-4 lg:col-[track-start_2/track-end_11] xl:col-[track-start_3/track-end_10]"
  >
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="group/mask grid *:aspect-774/280 *:span-full" {onpointermove}>
      <svg>
        <defs class="[&_path]:[vector-effect:non-scaling-stroke]">
          <mask id="mask-outer" stroke="white">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html status === 404 ? mask404 : mask500}
          </mask>

          <mask id="mask-inner" stroke="transparent">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html status === 404 ? mask404 : mask500}
          </mask>
        </defs>
      </svg>

      <div class="bg-29292a mask-[url(#mask-outer)]"></div>

      <div
        class="opacity-0 drop-shadow-none transition-[opacity,filter] pointer-fine:group-hover/mask:opacity-100 pointer-fine:group-hover/mask:drop-shadow-[0_0_--spacing(3)_var(--color-82f1f7)]"
      >
        <div class="relative h-full overflow-clip mask-[url(#mask-outer)]">
          <div
            style:--translate-x="{pointerCoords.x}px"
            style:--translate-y="{pointerCoords.y}px"
            class="absolute mt-[-25%] ml-[-25%] aspect-square w-1/2 translate-x-(--translate-x) translate-y-(--translate-y) bg-radial-[50%_50%_at_50%_50%] from-82f1f7 to-transparent will-change-transform"
          ></div>
        </div>
      </div>

      <div class="bg-121213 mask-[url(#mask-inner)]"></div>
    </div>

    <p class="mt-14 text-center">
      <span class="text-838484">[</span>
      {message}
      <span class="text-838484">]</span>
    </p>

    <OutlineButton class="mt-4 justify-self-center" href="/" label="To homepage" />
  </div>
</Section>
