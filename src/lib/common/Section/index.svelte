<script lang="ts">
  import type {Snippet} from 'svelte'
  import type {ClassValue} from 'svelte/elements'
  import Block from '$lib/common/Block/index.svelte'

  let {
    children,
    class: className,
    isLast = false,
  }: {
    children: Snippet
    class?: ClassValue
    isLast?: boolean
  } = $props()
</script>

<div class={['grid grid-cols-entire [--outer-indent-x:calc(var(--outer-gap-x)/2)] *:row-span-full', className]}>
  <Block class="col-[outer] mx-(--outer-indent-x) -mb-px" {isLast} />

  <div
    class="line left-line pointer-events-none sticky top-(--header-height) col-[entire-start/outer-start] -mr-(--outer-indent-x) h-px"
  ></div>

  <div
    class="line right-line pointer-events-none sticky top-(--header-height) col-[outer-end/entire-end] -ml-(--outer-indent-x) h-px"
  ></div>

  <div class="col-[outer] grid grid-cols-subgrid">
    {@render children()}
  </div>
</div>

<style lang="postcss">
  @reference '$lib/layouts/Root/styles.css';
  .line {
    background-size: calc(--spacing(63) + calc(var(--outer-gap-x) / 2));
    background-repeat: no-repeat;
  }
  .left-line {
    background-image: linear-gradient(
      to right,
      transparent,
      var(--color-29292a) calc(100% - calc(var(--outer-gap-x) / 2)),
      var(--color-29292a) calc(100% - calc(var(--outer-gap-x) / 2)) calc(100% - --spacing(1)),
      var(--color-5d5d5d) 0
    );
    background-position-x: right;
  }
  .right-line {
    background-image: linear-gradient(
      to left,
      transparent,
      var(--color-29292a) calc(100% - calc(var(--outer-gap-x) / 2)),
      var(--color-29292a) calc(100% - calc(var(--outer-gap-x) / 2)) calc(100% - --spacing(1)),
      var(--color-5d5d5d) 0
    );
    background-position-x: left;
  }
</style>
