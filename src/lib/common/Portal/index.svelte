<script lang="ts">
  import {getAllContexts, mount, unmount, untrack, type Snippet} from 'svelte'
  import Consumer from './Consumer/index.svelte'

  let {
    children,
    onclose,
    target,
  }: {
    children: Snippet
    onclose?: VoidFunction
    target?: HTMLElement | string
  } = $props()

  $effect(() => {
    const targetElement =
      typeof target === 'string' ? document.querySelector<HTMLElement>(target) : (target ?? document.body)

    if (!targetElement) {
      throw new Error(`Invalid Portal target: ${target}`)
    }

    let instance: ReturnType<typeof mount>
    const allContexts = getAllContexts()

    // https://github.com/sveltejs/svelte/discussions/15770#discussioncomment-12849992 - `setTimeout` is used to break the connection between parent and child Portal components.
    const timer = setTimeout(() => {
      instance = mount(Consumer, {
        context: untrack(() => allContexts),
        props: {children},
        target: targetElement,
      })
    })

    return () => {
      if (instance) {
        onclose?.()
        unmount(instance, {outro: true})
      } else {
        clearTimeout(timer)
      }
    }
  })
</script>
