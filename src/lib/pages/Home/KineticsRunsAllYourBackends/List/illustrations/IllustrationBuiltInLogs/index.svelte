<script lang="ts">
  import {onDestroy} from 'svelte'
  import {on} from 'svelte/events'
  import String from './String/index.svelte'
  import {highlightCommandLineTokens} from '$lib/common/attachments'

  let {
    isPointerEntered,
  }: {
    isPointerEntered: boolean
  } = $props()

  const output: Array<string> = $state([])
  const controller = new AbortController()
  let timerId: ReturnType<typeof setTimeout> | undefined = undefined
  let rejectCallback: VoidFunction | undefined = undefined

  const onReject = () => {
    clearTimeout(timerId)
    rejectCallback?.()
  }

  on(controller.signal, 'abort', onReject)

  const sleep = (ms: number) =>
    new Promise((resolve, reject) => {
      timerId = setTimeout(resolve, ms)
      rejectCallback = reject
    })

  const print = (text: string) => {
    output.push(text)
  }

  const clear = () => {
    output.splice(0, output.length)
  }

  $effect(() => {
    if (isPointerEntered) {
      const update = async () => {
        try {
          await sleep(800)
          print('\n')
          print('[INFO] <span style="color: var(--code-ansi-cyan)">execution started</span>')
          await sleep(800)
          print('\n')
          print('[INFO] <span style="color: var(--code-ansi-cyan)">loading function binary</span>')
          await sleep(800)
          print('\n')
          print('[INFO] <span style="color: var(--code-ansi-cyan)">runtime initialized</span>')
          await sleep(800)
          print('\n')
          print('[INFO] <span style="color: var(--code-ansi-cyan)">environment variables injected</span>')
          await sleep(800)
          print('\n')
          print('[INFO] <span style="color: var(--code-ansi-cyan)">secrets loaded</span>')
          await sleep(800)
          print('\n')
          print('[INFO] <span style="color: var(--code-ansi-cyan)">database connection established</span>')
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

<div class="h-50 pt-4 pl-4" aria-hidden="true">
  <div
    class="relative grid h-full grid-cols-1 grid-rows-[auto_minmax(0,1fr)] overflow-clip rounded-tl-xl after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring after:ring-29292a after:ring-inset"
  >
    <div
      class="h-9 content-center bg-1b1b1c px-3 text-add2 text-838484 [box-shadow:0_calc(--spacing(0.25)*-1)_var(--color-29292a)_inset]"
    >
      Function logs
    </div>

    <div class="overflow-clip bg-121213 p-3 font-code text-term break-all whitespace-pre-wrap">
      <span class="inline-grid *:transition-opacity *:span-full">
        <dpan class="select-none">
          <span class="text-838484">❯</span>
          <span class="text-838484" aria-hidden="true">kinetics logs BasicWorkerWorker</span>
        </dpan>

        <span class={[!isPointerEntered && 'opacity-0']}>
          <span class="text-838484">❯</span>

          <span class="highlight-command-line-tokens" {@attach highlightCommandLineTokens}>
            kinetics logs BasicWorkerWorker
          </span>
        </span>
      </span>

      <br />

      {#each output as string, stringIndex (stringIndex)}
        <String value={string} />
      {/each}
    </div>
  </div>
</div>
