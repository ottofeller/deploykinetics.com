<script lang="ts">
  import type {Snippet} from 'svelte'

  let {
    children,
    href,
  }: {
    children: Snippet
    href: string
  } = $props()

  const isExternal = $derived(href.startsWith('http'))
</script>

<a
  class="group/link grid h-8 grid-flow-col items-center px-2 text-link2 text-838484 before:transition-transform before:content-['['] after:transition-transform after:content-[']'] hover:before:-translate-x-2 hover:after:translate-x-2"
  {href}
  rel={isExternal ? 'noopener noreferrer' : null}
  target={isExternal ? '_blank' : null}
>
  <span class="transition-colors group-hover/link:text-efefef">{@render children()}</span>
</a>
