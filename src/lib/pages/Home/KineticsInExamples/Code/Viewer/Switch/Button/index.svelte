<script lang="ts">
  import type {ClassValue} from 'svelte/elements'

  let {
    class: className,
    isSelected,
    label,
    onclick,
    rootElementWidth = $bindable(),
  }: {
    class?: ClassValue
    isSelected: boolean
    label: string
    onclick: VoidFunction
    rootElementWidth: number
  } = $props()
</script>

<button
  class={[
    'h-full content-center rounded-[inherit] px-4.5 text-btn transition-colors',
    isSelected ? 'cursor-default text-08090a' : 'cursor-pointer not-hover:text-838484',
    className,
  ]}
  {onclick}
  type="button"
  bind:offsetWidth={rootElementWidth}
>
  {label}
</button>
