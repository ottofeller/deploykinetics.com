<script lang="ts">
  import type {ComponentProps} from 'svelte'
  import type {ClassValue, HTMLAttributes, KeyboardEventHandler, MouseEventHandler} from 'svelte/elements'
  import {fade} from 'svelte/transition'
  import Icon from '$lib/common/Icon/index.svelte'
  import Spinner from '$lib/common/Spinner/index.svelte'
  import Tooltip from '$lib/common/Tooltip/index.svelte'

  let {
    alt,
    class: className,
    href,
    icon,
    iconClassName,
    id,
    isDisabled,
    isFocusable = true,
    isLoading = false,
    label,
    onclick,
    onkeydown,
    onmouseenter,
    size = 'md',
    type = 'button',
  }: {
    class?: ClassValue
    id?: string
    isDisabled?: boolean
    isFocusable?: boolean
    isLoading?: boolean
    onkeydown?: KeyboardEventHandler<HTMLElement>
    onmouseenter?: MouseEventHandler<HTMLElement>

    /**
     * Sizes map:
     *
     * - "xs" - 24px
     * - "sm" - 32px
     * - "md" - 36px (default)
     */
    size?: 'xs' | 'sm' | 'md'
    type?: Extract<HTMLButtonElement['type'], 'button' | 'submit'>
  } & (
    | {
        href: string
        onclick?: MouseEventHandler<HTMLElement>
      }
    | {
        href?: string
        onclick: MouseEventHandler<HTMLElement>
      }
  ) &
    (
      | {
          alt?: never
          icon?: never
          iconClassName?: never
          label: string
        }
      | {
          alt: string
          icon: ComponentProps<typeof Icon>['name']
          iconClassName?: HTMLAttributes<HTMLElement>['class']
          label?: never
        }
      | {
          alt?: never
          icon: ComponentProps<typeof Icon>['name']
          iconClassName?: HTMLAttributes<HTMLElement>['class']
          label: string
        }
    ) = $props()

  const isExternal = $derived(href?.startsWith('http') ?? false)
  const isButton = $derived(href === undefined)
</script>

{#snippet tooltipChildren()}
  {alt}
{/snippet}

<Tooltip {id} children={alt ? tooltipChildren : undefined}>
  {#snippet target({id: targetId})}
    <svelte:element
      this={isButton ? 'button' : 'a'}
      id={targetId}
      class={[
        'button group/button grid h-(--button-height) cursor-pointer place-items-center overflow-clip rounded-(--border-radius) px-(--button-padding-x) text-(length:--button-font-size) leading-(--button-line-height) font-(--button-font-weight) tracking-(--button-letter-spacing) *:span-full disabled:cursor-not-allowed',
        icon && !label && 'is-icon-only aspect-square',
        size,
        className,
      ]}
      aria-label={alt}
      disabled={isDisabled || isLoading}
      href={isDisabled ? undefined : href}
      {onclick}
      {onkeydown}
      {onmouseenter}
      rel={isExternal ? 'noopener noreferrer' : null}
      role={isButton ? 'button' : null}
      tabindex={isFocusable ? 0 : -1}
      target={isExternal ? '_blank' : null}
      {type}
    >
      {#if isLoading}
        <span transition:fade={{duration: 150}}>
          <Spinner class="size-(--icon-size)!" />
        </span>
      {/if}

      <span
        class={[
          'grid items-center transition-opacity *:span-full',
          isLoading ? 'opacity-0 duration-150' : 'duration-75',
        ]}
      >
        {#if label}
          {#snippet content()}
            <span class="truncate">
              {label}
            </span>
          {/snippet}

          {#if icon}
            <span class="grid grid-cols-[auto_1fr] items-center gap-x-(--button-gap-x)">
              <Icon name={icon} class="size-(--icon-size)" />
              {@render content()}
            </span>
          {:else}
            <span
              class={[
                'translate-y-0 transition-transform',
                !isDisabled && 'group-hover/button:-translate-y-(--button-height)',
              ]}
            >
              {@render content()}
            </span>

            <span
              class={[
                'translate-y-(--button-height) transition-transform',
                !isDisabled && 'group-hover/button:translate-y-0',
              ]}
              aria-hidden="true"
            >
              {@render content()}
            </span>
          {/if}
        {:else if icon}
          <Icon name={icon} class={['size-(--icon-size)', iconClassName]} />
        {/if}
      </span>
    </svelte:element>
  {/snippet}
</Tooltip>

<style lang="postcss">
  @reference '$lib/layouts/Root/styles.css';
  .button {
    &.xs {
      --border-radius: var(--radius-md);
      --button-gap-x: --spacing(1);
      --button-height: --spacing(6);
      --button-font-size: var(--text-btn);
      --button-font-weight: var(--text-btn--font-weight);
      --button-line-height: var(--text-btn--line-height);
      --button-letter-spacing: var(--text-btn--letter-spacing);
      --icon-size: --spacing(3);
      &:not(.is-icon-only) {
        --button-padding-x: --spacing(5);
      }
    }
    &.sm {
      --border-radius: var(--radius-md);
      --button-gap-x: --spacing(1.5);
      --button-height: --spacing(8);
      --button-font-size: var(--text-btn);
      --button-font-weight: var(--text-btn--font-weight);
      --button-line-height: var(--text-btn--line-height);
      --button-letter-spacing: var(--text-btn--letter-spacing);
      --icon-size: --spacing(4);
      &:not(.is-icon-only) {
        --button-padding-x: --spacing(6);
      }
    }
    &.md {
      --border-radius: var(--radius-md);
      --button-gap-x: --spacing(1.5);
      --button-height: --spacing(10);
      --button-font-size: var(--text-btn);
      --button-font-weight: var(--text-btn--font-weight);
      --button-line-height: var(--text-btn--line-height);
      --button-letter-spacing: var(--text-btn--letter-spacing);
      --icon-size: --spacing(5);
      &:not(.is-icon-only) {
        --button-padding-x: --spacing(6);
      }
    }
    &.is-icon-only {
      --button-padding-x: 0;
    }
  }
</style>
