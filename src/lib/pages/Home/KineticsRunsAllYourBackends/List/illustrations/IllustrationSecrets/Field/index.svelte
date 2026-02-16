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
</script>

<div
  class={['h-12 content-center rounded-xl bg-1b1b1c px-4 font-code text-term ring ring-29292a ring-inset', className]}
>
  {@render children()}
</div>
