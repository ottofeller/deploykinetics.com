<script lang="ts">
  import {untrack} from 'svelte'
  import type {ClassValue} from 'svelte/elements'
  import Block from '$lib/common/Block/index.svelte'
  import Subtitle from '$lib/common/Subtitle/index.svelte'
  import {AccentButton, OutlineButton} from '$lib/common/buttons'
  import {checkPageLoaded} from '$lib/common/helpers'

  let {
    class: className,
    onanimationend,
    phrase,
  }: {
    class?: ClassValue
    onanimationend: VoidFunction
    phrase: string
  } = $props()

  let newString = $state('')

  $effect(() => {
    if (checkPageLoaded()) {
      newString = phrase
      let animationFrameID = 0

      // Inspired by https://codepen.io/soulwire/pen/mEMPrK.
      untrack(() => {
        const chars = '!<>-_\\/[]{}—=+*^?#________'
        const previousString = phrase
        const longestStringLength = Math.max(previousString.length, newString.length)
        const queue: Array<{from: string; to: string; start: number; end: number; char: null | string}> = []

        for (let i = 0; i < longestStringLength; i++) {
          const from = previousString[i] ?? ''
          const to = newString[i] ?? ''
          const start = Math.floor(Math.random() * 40)
          const end = start + Math.floor(Math.random() * 40)
          queue.push({from, to, start, end, char: null})
        }

        let frame = 0

        const update = () => {
          let output = ''
          let complete = 0

          queue.forEach((item) => {
            if (frame >= item.end) {
              complete++
              output += item.to
            } else if (frame >= item.start) {
              if (!item.char || Math.random() < 0.28) {
                item.char = chars[Math.floor(Math.random() * chars.length)]
              }

              output += item.char
            } else {
              output += item.from
            }
          })

          newString = output

          if (complete === queue.length) {
            cancelAnimationFrame(animationFrameID)
            onanimationend()
          } else {
            animationFrameID = requestAnimationFrame(update)
            frame++
          }
        }

        update()
      })

      return () => {
        cancelAnimationFrame(animationFrameID)
      }
    }
  })
</script>

<Block class={className}>
  <div class="grid h-full content-center max-lg:pt-10 max-lg:pb-6 max-md:pt-12 max-md:pb-10">
    <Subtitle>Rust dev-tool</Subtitle>

    <h1 class="mt-4 text-h1">
      Deploy
      <br />
      Rust backends,
      <br />
      <span class="text-838484">not infrastructure</span>
    </h1>

    <p class="mt-4 xl:mt-6">
      Cloud platform for Rust workload,
      <br class="sm:hidden" />
      deploy
      <span class="text-838484">[ {newString} ]</span>
    </p>

    <div class="mt-8 grid grid-flow-col justify-start gap-x-(--inner-gap-x) max-sm:grid-cols-2">
      <AccentButton class="sm:w-36 xl:w-45" href="/#get-started" label="Get started" />
      <OutlineButton class="sm:w-36 xl:w-45" href="/pricing" label="View Pricing" />
    </div>
  </div>
</Block>
