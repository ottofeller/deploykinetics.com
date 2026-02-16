<script lang="ts">
  import type {Snippet} from 'svelte'

  let {
    children,
    href,
    onclick,
  }: {
    children: Snippet
    href: string
    onclick: VoidFunction
  } = $props()

  const isExternal = $derived(href.startsWith('http'))
</script>

<a
  class="group/link grid grid-flow-col items-center justify-start px-4 py-4 text-link2 text-838484 [box-shadow:0_--spacing(-0.25)_var(--color-29292a)_inset] before:text-838484 before:transition-transform before:content-['['] after:text-838484 after:transition-transform after:content-[']'] hover:before:-translate-x-2 hover:after:translate-x-2"
  {href}
  {onclick}
  rel={isExternal ? 'noopener noreferrer' : null}
  target={isExternal ? '_blank' : null}
>
  <span class="transition-colors group-hover/link:text-efefef">{@render children()}</span>
</a>
