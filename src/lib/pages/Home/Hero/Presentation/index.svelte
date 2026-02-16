<script lang="ts">
  import type {ClassValue} from 'svelte/elements'
  import Block from '$lib/common/Block/index.svelte'
  import Terminal from '$lib/common/Terminal/index.svelte'

  let {
    class: className,
    codeHTML,
    command,
    onanimationend,
  }: {
    class?: ClassValue
    codeHTML: string
    command: string
    onanimationend: VoidFunction
  } = $props()
</script>

<div class={['grid lg:grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)]', className]}>
  <Block class="-mb-px max-lg:hidden" />

  <Block class="h-64 lg:-mb-px lg:h-116">
    <Terminal class="h-full" {codeHTML} {command} {onanimationend} />
  </Block>

  <Block class="max-lg:hidden" />
</div>
