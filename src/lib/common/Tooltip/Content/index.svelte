<script lang="ts">
  import * as floatingUI from '@floating-ui/dom'
  import type {Snippet} from 'svelte'
  import {fade} from 'svelte/transition'
  import {float} from '$lib/common/attachments'

  let {
    children,
    targetId,
  }: {
    children: Snippet
    targetId: string
  } = $props()
</script>

<div
  class="pointer-events-none fixed top-0 left-0 z-50 w-fit max-w-64 rounded-md bg-1b1b1c px-2 py-1.5 text-add2 ring ring-29292a ring-inset"
  {@attach float({
    middleware: [floatingUI.flip({padding: 10}), floatingUI.offset(10), floatingUI.shift({padding: 10})],
    placement: 'top',
    targetId,
  })}
  in:fade|global={{delay: 500, duration: 100}}
  out:fade|global={{duration: 100}}
>
  {@render children()}
</div>
