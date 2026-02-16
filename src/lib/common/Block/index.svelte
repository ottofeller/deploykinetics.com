<script lang="ts">
  import type {Snippet} from 'svelte'
  import type {ClassValue} from 'svelte/elements'

  let {
    children,
    class: className,
    isLast = false,
  }: {
    children?: Snippet
    class?: ClassValue
    isLast?: boolean
  } = $props()
</script>

<div
  class={[
    'grid *:span-full',
    isLast
      ? '[box-shadow:--spacing(0.25)_--spacing(0.25)_var(--color-29292a)_inset,--spacing(-0.25)_0_var(--color-29292a)_inset]'
      : 'ring ring-29292a ring-inset',
    className,
  ]}
>
  <div class="grid overflow-clip *:span-full">
    <div class="pointer-events-none sticky top-(--header-height) z-10 -mt-px h-0">
      <div class="h-px bg-29292a"></div>
    </div>

    <div class="pointer-events-none sticky top-(--header-height) z-10 h-0">
      <div class="top-corners h-1.25"></div>
    </div>

    {#if !isLast}
      <div class="pointer-events-none sticky top-(--header-height) z-10 grid h-0 content-end self-end">
        <div class="bottom-corners h-1.25"></div>
      </div>
    {/if}
  </div>

  {#if children}
    <div class="min-h-0 p-(--inner-gap-x)">
      {@render children()}
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference '$lib/layouts/Root/styles.css';
  .top-corners {
    background-image:
      linear-gradient(
        to right,
        var(--color-5d5d5d) --spacing(1.25),
        transparent --spacing(1.25) calc(100% - --spacing(1.25)),
        var(--color-5d5d5d) calc(100% - --spacing(1.25))
      ),
      linear-gradient(
        to right,
        var(--color-5d5d5d) --spacing(0.25),
        transparent --spacing(0.25) calc(100% - --spacing(0.25)),
        var(--color-5d5d5d) calc(100% - --spacing(0.25))
      );
    background-size:
      auto --spacing(0.25),
      auto --spacing(1.25);
    background-repeat: no-repeat;
  }
  .bottom-corners {
    background-image:
      linear-gradient(
        to right,
        var(--color-5d5d5d) --spacing(1.25),
        transparent --spacing(1.25) calc(100% - --spacing(1.25)),
        var(--color-5d5d5d) calc(100% - --spacing(1.25))
      ),
      linear-gradient(
        to right,
        var(--color-5d5d5d) --spacing(0.25),
        transparent --spacing(0.25) calc(100% - --spacing(0.25)),
        var(--color-5d5d5d) calc(100% - --spacing(0.25))
      );
    background-size:
      auto --spacing(0.25),
      auto --spacing(1.25);
    background-repeat: no-repeat;
    background-position: bottom;
  }
</style>
