<script lang="ts">
  import type {ClassValue} from 'svelte/elements'
  import Link from './Link/index.svelte'
  import {OutlineButton} from '$lib/common/buttons'

  let {
    class: className,
  }: {
    class?: ClassValue
  } = $props()
</script>

<div class={['grid grid-flow-col items-center gap-x-8', className]}>
  <Link href="/pricing">Pricing</Link>

  <div class="grid grid-flow-col items-center gap-x-2">
    <OutlineButton alt="Github" href="https://github.com/ottofeller/kinetics" icon="github" size="sm" />
    <OutlineButton href="/#get-started" label="Get started" size="sm" />
  </div>
</div>
