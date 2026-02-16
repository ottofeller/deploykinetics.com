<script lang="ts">
  import type {Component} from 'svelte'
  import type {ClassValue} from 'svelte/elements'
  import Card from '$lib/common/Card/index.svelte'
  import {checkHover} from '$lib/common/helpers'

  let {
    class: className,
    description,
    icon,
    Illustration,
    title,
  }: {
    class?: ClassValue
    description: string
    icon: string
    Illustration: Component<{isPointerEntered: boolean}>
    title: string
  } = $props()

  let isPointerEntered = $derived(!checkHover())

  const onpointerenter = () => {
    isPointerEntered = true
  }

  const onpointerleave = () => {
    if (checkHover()) {
      isPointerEntered = false
    }
  }
</script>

<Card class={['h-90 md:h-95', className]}>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] gap-y-4 bg-0d0e0f pt-4" {onpointerenter} {onpointerleave}>
    <div class="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-1 px-4">
      <img class="size-5" alt="" src={icon} />
      <h5 class="text-h4">{title}</h5>
    </div>

    <p class="px-4 text-838484">{description}</p>
    <Illustration {isPointerEntered} />
  </div>
</Card>
