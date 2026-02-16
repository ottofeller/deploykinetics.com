<script lang="ts" module>
  import iconCheck from './icon-check.svg'
  import iconCopy from './icon-copy.svg'
  import iconGithub from './icon-github.svg'

  const icons = {
    check: iconCheck,
    copy: iconCopy,
    github: iconGithub,
  }
</script>

<script lang="ts">
  import type {ClassValue} from 'svelte/elements'

  let {
    class: className,
    name,
    noMask = false,
  }: {
    class?: ClassValue
    name: keyof typeof icons
    noMask?: boolean
  } = $props()
</script>

<span
  style:--image="url({icons[name]})"
  class={[
    'pointer-events-none block contain-strict',

    noMask
      ? 'bg-(image:--image) bg-contain bg-center bg-no-repeat'
      : 'bg-current mask-(--image) mask-contain mask-center mask-no-repeat',

    className,
  ]}
></span>
