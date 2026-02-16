<script lang="ts">
  import Button from './Button/index.svelte'
  import iconArrow from './icon-arrow.svg'

  let {
    items,
    selectedItemIndex = $bindable(),
  }: {
    items: Array<{title: string}>
    selectedItemIndex: number
  } = $props()

  // Prevents the slider from animating until the first interaction.
  let isDirty = $state(false)

  const select = (index: number) => {
    isDirty = true
    selectedItemIndex = index
  }

  // "$state()" is what is needed here.
  // svelte-ignore state_referenced_locally
  const buttonElementsWidth = $state(items.map(() => 0))
</script>

<label
  class="relative grid h-10 items-stretch rounded-md bg-08090a shadow-[0_0_0_rgb(from_var(--color-82f1f7)_r_g_b/40%)] ring ring-29292a transition-[color,background-color,box-shadow,filter] will-change-[box-shadow] ring-inset *:span-full hover:bg-121213 hover:shadow-[0_0_--spacing(3)_rgb(from_var(--color-82f1f7)_r_g_b/40%)] hover:ring-82f1f7 sm:hidden"
>
  <div class="grid grid-flow-col items-center gap-x-2.5 pr-1 pl-3">
    <span class="text-btn text-838484">
      {items[selectedItemIndex].title}
    </span>

    <img class="size-6" alt="" src={iconArrow} />
  </div>

  <select class="absolute inset-0 opacity-0" bind:value={() => selectedItemIndex, select}>
    {#each items as { title }, itemIndex (itemIndex)}
      <option value={itemIndex}>{title}</option>
    {/each}
  </select>
</label>

<div class="relative grid h-10 grid-flow-col rounded-md bg-08090a max-sm:hidden">
  <div
    style:--width={buttonElementsWidth[selectedItemIndex]}
    style:--left={buttonElementsWidth.reduce((acc, num, i) => (i < selectedItemIndex ? acc + num : acc), 0)}
    class={[
      'pointer-events-none absolute inset-y-0 left-0 w-[calc(var(--width)*1px)] translate-x-[calc(var(--left)*1px)] rounded-[inherit] bg-82f1f7',
      isDirty && 'transition-[width,translate]',
    ]}
  ></div>

  {#each items as { title }, itemIndex (itemIndex)}
    <Button
      class="isolate"
      isSelected={itemIndex === selectedItemIndex}
      label={title}
      onclick={() => select(itemIndex)}
      bind:rootElementWidth={buttonElementsWidth[itemIndex]}
    />
  {/each}
</div>
