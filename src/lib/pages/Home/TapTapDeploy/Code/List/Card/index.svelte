<script lang="ts">
  import type {ClassValue} from 'svelte/elements'
  import Command from './Command/index.svelte'
  import Block from '$lib/common/Block/index.svelte'

  let {
    class: className,
    command,
    description,
    isSelected,
    onclick,
    title,
  }: {
    class?: ClassValue
    command: string
    description: string
    isSelected: boolean
    onclick: VoidFunction
    title: string
  } = $props()

  let contentElementHeight = $state(0)
</script>

<!-- FEATURE: Instead of "div", use the HTML "details" element when animation support for it becomes available in all browsers. -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  class={[
    'group/button block text-left transition-[flex-grow,background-color] [counter-increment:card] max-lg:h-60',
    isSelected ? 'bg-0d0e0f select-text' : 'cursor-pointer hover:bg-0d0e0f',
    className,
  ]}
  {onclick}
  tabindex="0"
>
  <Block class="h-full">
    <div class="relative grid h-full content-end overflow-clip max-md:p-2">
      <div
        class={[
          'absolute inset-x-2 top-2 text-add1 text-838484 transition-opacity before:content-["[_"counter(card,decimal-leading-zero)"_]"] md:inset-x-0 md:top-0',
          !isSelected && 'opacity-0',
        ]}
      ></div>

      <div
        style:--translate-y="-{contentElementHeight}px"
        class={['transition-transform', isSelected && 'translate-y-(--translate-y)']}
      >
        <h4
          class={[
            'text-h3 transition-colors',
            isSelected ? 'cursor-text' : 'text-838484 group-hover/button:text-efefef',
          ]}
        >
          {title}
        </h4>

        <div
          class={['absolute inset-x-0 top-full transition-[opacity,visibility]', !isSelected && 'invisible opacity-0']}
          bind:offsetHeight={contentElementHeight}
        >
          <p class={['mt-3 cursor-text text-838484', !isSelected && 'select-none']}>
            {description}
          </p>

          <Command class="mt-6" value={command} />
        </div>
      </div>
    </div>
  </Block>
</div>
