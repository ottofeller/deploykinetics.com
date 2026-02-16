<script lang="ts">
  import type {ComponentProps} from 'svelte'
  import Button from '$lib/common/buttons/common/Button/index.svelte'

  let {
    class: className,
    isHoverPersistent,
    ...props
  }: ComponentProps<typeof Button> & {isHoverPersistent?: boolean} = $props()
</script>

<Button
  {...props}
  class={[
    'transition-[color,background-color,filter] will-change-[box-shadow]',
    props.isDisabled
      ? 'bg-82f1f7/50 text-08090a'
      : isHoverPersistent
        ? 'bg-82f1f7 text-08090a shadow-[0_0_--spacing(3)_rgb(from_var(--color-82f1f7)_r_g_b/40%)]'
        : props.isLoading
          ? 'bg-82f1f7/50 text-08090a/50'
          : 'bg-82f1f7 text-08090a shadow-[0_0_0_rgb(from_var(--color-82f1f7)_r_g_b/40%)] hover:shadow-[0_0_--spacing(3)_rgb(from_var(--color-82f1f7)_r_g_b/40%)]',

    className,
  ]}
/>
