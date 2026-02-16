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
    'ring transition-[color,background-color,box-shadow,filter] will-change-[box-shadow] ring-inset',
    props.isDisabled
      ? 'ring-29292a/50'
      : isHoverPersistent
        ? 'shadow-[0_0_--spacing(3)_rgb(from_var(--color-82f1f7)_r_g_b/40%)] ring-82f1f7'
        : props.isLoading
          ? 'ring-29292a/50'
          : 'shadow-[0_0_0_rgb(from_var(--color-82f1f7)_r_g_b/40%)] ring-29292a hover:bg-121213 hover:shadow-[0_0_--spacing(3)_rgb(from_var(--color-82f1f7)_r_g_b/40%)] hover:ring-82f1f7',

    className,
  ]}
/>
