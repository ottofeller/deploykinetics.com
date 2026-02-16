<script lang="ts">
  import Card from './Card/index.svelte'
  import Section from '$lib/common/Section/index.svelte'

  // Use `*` to highlight substrings. Use `\\*` for escaping.
  const items = [
    {
      features: [
        {description: 'Up to *100,000* functions invocations'},
        {description: 'Function memory limit *128mb*'},
      ],

      isAccent: false,
      type: 'Free',
      value: 0,
    },

    {
      features: [
        {description: 'Up to *1,000,000* functions invocations'},
        {description: 'Function memory limit *256mb*'},
      ],

      isAccent: false,
      type: 'Starter',
      value: 10,
    },

    {
      features: [
        {description: 'Up to *10,000,000* functions invocations'},
        {description: 'Function memory limit *256mb*'},
      ],

      isAccent: true,
      type: 'Growth',
      value: 80,
    },

    {
      features: [
        {description: 'Up to *10,000,000* functions invocations'},
        {description: 'Function memory limit *512mb*', note: 'Higher limits discussed separately'},
      ],

      isAccent: false,
      type: 'Enterprise',
      value: null,
    },
  ]
</script>

<Section>
  <div class="col-[inner] grid grid-cols-1 gap-(--inner-gap-x) py-(--inner-gap-x) sm:grid-cols-2 lg:grid-cols-3">
    {#each items as item, itemIndex (itemIndex)}
      <Card
        class={[itemIndex === 0 && 'lg:col-span-full']}
        features={item.features}
        isAccent={item.isAccent}
        type={item.type}
        value={item.value}
      />
    {/each}
  </div>
</Section>
