<script lang="ts">
  import {tick} from 'svelte'
  import type {ClassValue} from 'svelte/elements'
  import {highlightCommandLineTokens} from '../attachments'
  import {checkPageLoaded} from '../helpers'

  let {
    class: className,
    codeHTML,
    command,
    onanimationend,
  }: {
    class?: ClassValue
    codeHTML: string
    command: string
    onanimationend?: VoidFunction
  } = $props()

  let printedCommand = $state('')
  let printedOutput = $state('')

  const typewriter = (
    element: HTMLElement,

    {
      speed = 0.03,
      tick,
      value,
    }: {
      speed?: number
      tick: ({element, t, value}: {element: HTMLElement; t: number; value: Array<string>}) => void
      value: Array<string>
    },
  ) => ({duration: value.length / speed, tick: (t: number) => tick({element, t, value})})

  let isOutputStarted = $state(false)

  const clearOutput = () => {
    printedOutput = ''
    isOutputStarted = false
  }

  const printOutput = () => {
    isOutputStarted = true
  }
</script>

<div
  class={[
    'relative grid grid-rows-[auto_minmax(0,1fr)] overflow-clip rounded-xl after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring after:ring-29292a after:ring-inset',
    className,
  ]}
>
  <div
    class="h-9 content-center bg-1b1b1c px-3 text-add2 text-838484 [box-shadow:0_calc(--spacing(0.25)*-1)_var(--color-29292a)_inset]"
  >
    Kinetics CLI
  </div>

  <code class="overflow-y-hidden bg-121213 p-3 font-code text-term break-all">
    <span class="text-838484">❯</span>

    {#if checkPageLoaded()}
      {#key command}
        <span
          onintroend={printOutput}
          onintrostart={clearOutput}
          in:typewriter|global={{
            tick: async ({element, t, value}) => {
              printedCommand = value.slice(0, Math.trunc(value.length * t)).join('')
              await tick()
              element.parentElement?.scrollTo({top: element.parentElement.scrollHeight})
            },

            value: command.split(''),
          }}
        >
          {#key printedCommand}
            <span class="highlight-command-line-tokens" {@attach highlightCommandLineTokens}>{printedCommand}</span>
          {/key}
        </span>
      {/key}
    {/if}

    <br />
    <br />

    <span class="whitespace-pre-wrap">
      {#if isOutputStarted}
        <span
          onintroend={onanimationend}
          in:typewriter={{
            speed: 0.01,

            tick: async ({element, t, value}) => {
              printedOutput = value.slice(0, Math.trunc(value.length * t)).join('\n')
              await tick()
              element.parentElement?.scrollTo({top: element.parentElement.scrollHeight})
            },

            value: codeHTML.split('\n'),
          }}
        >
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html printedOutput}
        </span>
      {/if}
    </span>
  </code>
</div>
