<script lang="ts">
  import type {Snippet} from 'svelte'
  import Field from '$lib/pages/Home/KineticsRunsAllYourBackends/List/illustrations/IllustrationSecrets/Field/index.svelte'

  let {
    children,
  }: {
    children: Snippet
  } = $props()
</script>

<Field>
  {@render children()}
</Field>
