<script lang="ts">
  import List from './List/index.svelte'
  import Title from './Title/index.svelte'

  let {
    list,
  }: {
    list: Array<{description: string; title: string}>
  } = $props()
</script>

<div>
  <Title />
  <List {list} />
</div>
