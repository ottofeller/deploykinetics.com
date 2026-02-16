<script lang="ts">
  import type {Snippet} from 'svelte'
  import Field from '$lib/pages/Home/KineticsRunsAllYourBackends/List/illustrations/IllustrationSecrets/Field/index.svelte'

  let {
    children,
    isPointerEntered,
  }: {
    children: Snippet
    isPointerEntered: boolean
  } = $props()
</script>

<Field class="group/field">
  <span class={['grid grid-cols-1 items-center transition-colors *:span-full', isPointerEntered && 'text-82f1f7']}>
    <span class="block h-lh overflow-clip">
      {@render children()}
    </span>

    <span class="block h-lh bg-1b1b1c transition-opacity group-hover/field:opacity-0">
      <span class={['block h-[inherit] overflow-clip transition-[filter]', !isPointerEntered && 'blur-sm']}>
        ••••••••••••••••••••••••••••••••••••••••
      </span>
    </span>
  </span>
</Field>
