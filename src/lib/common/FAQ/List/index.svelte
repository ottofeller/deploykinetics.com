<script lang="ts">
  import Card from './Card/index.svelte'
  import Block from '$lib/common/Block/index.svelte'
  import Section from '$lib/common/Section/index.svelte'

  let {
    list,
  }: {
    list: Array<{description: string; title: string}>
  } = $props()

  let selectedItemIndex = $state(0)

  const select = (index: number) => {
    selectedItemIndex = index
  }
</script>

<Section>
  <Block
    class="col-start-[outer-start] col-end-[inner-start] -mr-px -mb-px ml-(--outer-indent-x) lg:col-end-[track-start_4]"
  />

  <div class="col-[inner] grid lg:col-[track-start_4/track-end_9]">
    {#each list as item, itemIndex (item.title)}
      <Card
        class="-mb-px"
        description={item.description}
        isSelected={selectedItemIndex === itemIndex}
        onclick={() => select(itemIndex)}
        title={item.title}
      />
    {/each}
  </div>

  <Block
    class="col-start-[inner-end] col-end-[outer-end] mr-(--outer-indent-x) -mb-px -ml-px lg:col-start-[track-end_9]"
  />
</Section>
