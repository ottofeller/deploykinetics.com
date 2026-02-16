<script lang="ts">
  import type {ClassValue} from 'svelte/elements'
  import Block from '$lib/common/Block/index.svelte'

  let {
    class: className,
    description,
    isSelected,
    onclick,
    title,
  }: {
    class?: ClassValue
    description: string
    isSelected: boolean
    onclick: VoidFunction
    title: string
  } = $props()
</script>

<!-- FEATURE: Instead of "button", use the HTML "details" element when animation support for it is available in all browsers. -->
<button
  class={[
    'group/button block text-left transition-colors',
    isSelected ? 'bg-0d0e0f select-text' : 'cursor-pointer text-838484 hover:bg-0d0e0f',
    className,
  ]}
  {onclick}
  type="button"
>
  <Block>
    <div class="max-md:p-2">
      <h4 class={['text-h3', isSelected && 'cursor-text']}>{title}</h4>

      <div
        class={[
          'grid overflow-clip transition-[grid-template-rows] duration-300',
          isSelected ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        ]}
      >
        <div class="min-h-0">
          <p class={['pt-6 text-838484', isSelected && 'cursor-text']}>
            {description}
          </p>
        </div>
      </div>
    </div>
  </Block>
</button>
