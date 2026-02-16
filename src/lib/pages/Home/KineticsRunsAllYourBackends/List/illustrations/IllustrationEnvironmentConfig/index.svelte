<script lang="ts">
  import {onDestroy} from 'svelte'
  import {on} from 'svelte/events'
  import Row from './Row/index.svelte'

  let {
    isPointerEntered,
  }: {
    isPointerEntered: boolean
  } = $props()

  const controller = new AbortController()
  let timerId: ReturnType<typeof setTimeout> | undefined = undefined
  let rejectCallback: VoidFunction | undefined = undefined

  const onReject = () => {
    clearTimeout(timerId)
    rejectCallback?.()
  }

  on(controller.signal, 'abort', onReject)

  const texts = [
    {from: 'staging', to: 'production'},
    {from: '500ms', to: '400ms'},
  ]

  let output1 = $state(texts[0].from)
  let output2 = $state(texts[1].from)

  const sleep = (ms: number) =>
    new Promise((resolve, reject) => {
      timerId = setTimeout(resolve, ms)
      rejectCallback = reject
    })

  // Inspired by https://codepen.io/soulwire/pen/mEMPrK.
  const switchText = (from: string, to: string, callback: (output: string) => void) =>
    new Promise((resolve) => {
      let animationFrameID = 0
      let newString = to
      const chars = '!<>-_\\/[]{}—=+*^?#________'
      const previousString = from
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
        callback(newString)
        resolve(null)

        if (complete === queue.length) {
          cancelAnimationFrame(animationFrameID)
        } else {
          animationFrameID = requestAnimationFrame(update)
          frame++
        }
      }

      update()
    })

  const clear = () => {
    if (output1 !== texts[0].from) {
      switchText(output1, texts[0].from, (output) => {
        output1 = output
      })
    }

    if (output2 !== texts[1].from) {
      switchText(output2, texts[1].from, (output) => {
        output2 = output
      })
    }
  }

  $effect(() => {
    if (isPointerEntered) {
      const update = async () => {
        try {
          await sleep(0)

          await switchText(output1, texts[0].to, (output) => {
            output1 = output
          })

          await sleep(2000)

          await switchText(output2, texts[1].to, (output) => {
            output2 = output
          })
        } catch {}
      }

      update()

      return () => {
        onReject()
        clear()
      }
    }
  })

  onDestroy(() => {
    controller?.abort()
  })
</script>

<div class="h-50 px-4 pt-4" aria-hidden="true">
  <div
    class="relative grid h-full grid-cols-1 grid-rows-[auto_minmax(0,1fr)] overflow-clip rounded-t-xl after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring after:ring-29292a after:ring-inset"
  >
    <div
      class="grid h-9 grid-flow-col items-center justify-between gap-x-3 bg-1b1b1c px-3 text-add2 text-838484 [box-shadow:0_calc(--spacing(0.25)*-1)_var(--color-29292a)_inset]"
    >
      Environment

      <div
        class={[
          'size-2.5 rounded-full ring ring-29292a transition-[background-color,box-shadow] ring-inset',
          isPointerEntered
            ? 'bg-82f1f7 shadow-[0_0_--spacing(3)_rgb(from_var(--color-82f1f7)_r_g_b/50%)]'
            : 'bg-121213 shadow-[0_0_--spacing(3)_rgb(from_var(--color-82f1f7)_r_g_b/0%)]',
        ]}
      ></div>
    </div>

    <div class="bg-121213 p-3">
      <Row {isPointerEntered} key="MODE" value={output1} />
      <hr class="text-29292a" />
      <Row {isPointerEntered} key="REGION" value="eu-west" />
      <hr class="text-29292a" />
      <Row {isPointerEntered} key="TIMEOUT" value={output2} />
      <hr class="text-29292a" />
      <Row {isPointerEntered} key="LOG_LEVEL" value="info" />
    </div>
  </div>
</div>
