<script lang="ts">
  import type {ClassValue} from 'svelte/elements'
  import {OutlineButton} from '$lib/common/buttons'
  import {Copy} from '$lib/common/helpers'

  let {
    class: className,
    value,
  }: {
    class?: ClassValue
    value: string
  } = $props()

  const copyInstance = $derived(new Copy(value))

  const copy = async () => {
    await copyInstance.copy()
  }
</script>

<div
  class={[
    'grid h-10 grid-flow-col items-center justify-between gap-x-3 rounded-md bg-121213 px-3 ring ring-29292a ring-inset',
    className,
  ]}
>
  <span class="cursor-text overflow-x-auto font-code text-term whitespace-nowrap scrollbar-hidden">{value}</span>

  <OutlineButton
    alt={copyInstance.message}
    icon={copyInstance.isCopied ? 'check' : 'copy'}
    onclick={copy}
    onmouseenter={copyInstance.clearTimer}
    size="xs"
  />
</div>
