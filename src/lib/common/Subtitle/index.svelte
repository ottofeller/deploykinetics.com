<script lang="ts">
  import type {Snippet} from 'svelte'

  let {
    children,
  }: {
    children: Snippet
  } = $props()
</script>

<p class="text-add1 text-838484">[ {@render children()} ]</p>
