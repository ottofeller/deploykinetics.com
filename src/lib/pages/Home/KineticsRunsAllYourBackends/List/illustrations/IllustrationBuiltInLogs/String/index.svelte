<script lang="ts">
  import {sineInOut} from 'svelte/easing'
  import {fade} from 'svelte/transition'

  let {
    value,
  }: {
    value: string
  } = $props()
</script>

<span transition:fade|global={{duration: 150, easing: sineInOut}}>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html value}
</span>
