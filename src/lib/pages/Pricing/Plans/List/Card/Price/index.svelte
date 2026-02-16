<script lang="ts">
  let {
    value,
  }: {
    value: number
  } = $props()

  const formatter = new Intl.NumberFormat('en-US', {currency: 'USD', minimumFractionDigits: 0, style: 'currency'})

  const valueParts = $derived(formatter.formatToParts(value))
</script>

<p class="grid grid-flow-col items-baseline">
  {#each valueParts as valuePart, valuePartIndex (valuePartIndex)}
    {#if valuePart.type === 'currency'}
      <span class="text-h2 text-838484">{valuePart.value}</span>
    {:else}
      <span class="text-h1">{valuePart.value}</span>
    {/if}
  {/each}

  <span class="ml-2 text-838484">/per month</span>
</p>
