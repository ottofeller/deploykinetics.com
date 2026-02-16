<script lang="ts">
  import {fade} from 'svelte/transition'
  import Link from './Link/index.svelte'
  import {closeByEscape, focusTrap, scrollLock} from '$lib/common/attachments'
  import {OutlineButton} from '$lib/common/buttons'

  let {
    hide,
  }: {
    hide: VoidFunction
  } = $props()
</script>

<div
  class="fixed inset-0 top-(--header-height) bottom-0 z-30 grid grid-rows-[auto_minmax(0,1fr)]"
  {@attach closeByEscape(hide)}
  {@attach focusTrap}
  {@attach scrollLock}
  transition:fade|global={{duration: 100}}
>
  <div
    class="grid gap-y-8 bg-08090a pb-4 [box-shadow:0_--spacing(0.25)_var(--color-29292a)_inset,0_--spacing(-0.25)_var(--color-29292a)_inset]"
  >
    <Link href="/pricing" onclick={hide}>Pricing</Link>

    <div class="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 px-4">
      <OutlineButton
        alt="Github"
        href="https://github.com/ottofeller/kinetics"
        icon="github"
        onclick={hide}
        size="sm"
      />
      <OutlineButton href="/#get-started" label="Get started" onclick={hide} size="sm" />
    </div>
  </div>

  <button class="bg-08090a/80" aria-label="Hide menu" onclick={hide} type="button"></button>
</div>
