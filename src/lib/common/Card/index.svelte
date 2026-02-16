<script lang="ts">
  import type {Snippet} from 'svelte'
  import type {ClassValue} from 'svelte/elements'

  let {
    children,
    class: className,
  }: {
    children: Snippet
    class?: ClassValue
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

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={[
    'group/card grid rounded-(--border-radius) ring-1 ring-(--card-ring-color,var(--color-29292a)) [--border-radius:var(--card-border-radius,var(--radius-xl))] ring-inset *:span-full',
    className,
  ]}
  {onpointermove}
>
  <div
    class="pointer-events-none rounded-[inherit] opacity-0 drop-shadow-none transition-[opacity,filter] pointer-fine:group-hover/card:opacity-100 pointer-fine:group-hover/card:drop-shadow-[0_0_--spacing(3)_var(--color-82f1f7)]"
  >
    <div class="relative h-full overflow-clip rounded-[inherit]">
      <div
        style:--translate-x="{pointerCoords.x}px"
        style:--translate-y="{pointerCoords.y}px"
        class="absolute mt-[-50%] ml-[-50%] aspect-square w-full translate-x-(--translate-x) translate-y-(--translate-y) bg-radial-[50%_50%_at_50%_50%] from-82f1f7 to-transparent will-change-transform"
      ></div>
    </div>
  </div>

  <div
    class="overflow-clip rounded-[inherit] [clip-path:inset(--spacing(0.25)_round_calc(var(--border-radius)---spacing(0.25)))]"
  >
    {@render children()}
  </div>
</div>
