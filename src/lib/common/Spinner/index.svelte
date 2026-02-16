<script lang="ts">
  import type {ClassValue} from 'svelte/elements'

  let {
    class: className,
  }: {
    class?: ClassValue
  } = $props()
</script>

<svg class={['spinner size-8', className]} viewBox="0 0 50 50">
  <circle class="fill-none stroke-current stroke-5 [stroke-linecap:round]" cx="25" cy="25" r="20" />
</svg>

<style lang="postcss">
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  .spinner {
    animation: rotate 2s linear infinite;
    & > circle {
      animation: dash 1.5s ease-in-out infinite;
    }
  }
</style>
