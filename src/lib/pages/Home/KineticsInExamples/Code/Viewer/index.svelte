<script lang="ts">
  import Switch from './Switch/index.svelte'
  import codeBasicEndpoint from './codes/basic-endpoint.txt?theme=custom&language=rust&code'
  import codeDatabase from './codes/database.txt?theme=custom&language=rust&code'
  import codeSendAMessage from './codes/send-a-message.txt?theme=custom&language=rust&code'
  import Tooltip from '$lib/common/Tooltip/index.svelte'
  import {OutlineButton} from '$lib/common/buttons'

  const items = [
    {
      codeHTML: codeBasicEndpoint.html,
      href: 'https://github.com/ottofeller/kinetics/blob/main/examples/src/basic/endpoint.rs',
      title: 'Basic endpoint',
    },

    {
      codeHTML: codeDatabase.html,
      href: 'https://github.com/ottofeller/kinetics/blob/main/examples/src/database.rs',
      title: 'Database',
    },

    {
      codeHTML: codeSendAMessage.html,
      href: 'https://github.com/ottofeller/kinetics/blob/main/examples/src/queue.rs',
      title: 'Send a message',
    },
  ]

  let selectedItemIndex = $state(0)
  let codeElement: HTMLElement = $state(null!)
  let isCollapsed = $state(true)

  $effect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- is used to track changes.
    selectedItemIndex

    isCollapsed = true
    codeElement?.scroll({top: 0})
  })

  const expand = () => {
    isCollapsed = false
  }

  const codeCollapser = (element: HTMLElement) => {
    const lineElements = element.querySelectorAll(':scope > .line')
    let lastSpanIndex = -1
    let inImport = false

    lineElements.forEach((lineElement, lineElementIndex) => {
      const text = lineElement.textContent.trim()

      if (inImport) {
        if (text.endsWith(';')) {
          lastSpanIndex = lineElementIndex
          inImport = false
        }
      } else if (text.startsWith('use ')) {
        inImport = true
      }
    })

    element
      .querySelectorAll<HTMLElement>(`:scope > span:nth-child(-n + ${lastSpanIndex + 1} of .line)`)
      .forEach((lineElement) => {
        if (isCollapsed) {
          lineElement.style.setProperty('display', 'none')
        } else {
          lineElement.style.removeProperty('display')
        }
      })
  }
</script>

<div
  class="relative grid h-130 grid-rows-[auto_minmax(0,1fr)] overflow-clip rounded-xl after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring after:ring-29292a after:ring-inset"
>
  <div
    class="grid grid-flow-col content-center justify-between gap-x-3 bg-1b1b1c p-3 [box-shadow:0_calc(--spacing(0.25)*-1)_var(--color-29292a)_inset]"
  >
    <Switch {items} bind:selectedItemIndex />
    <OutlineButton alt="Github" href={items[selectedItemIndex].href} icon="github" />
  </div>

  {#key items[selectedItemIndex].codeHTML}
    <code
      bind:this={codeElement}
      class="overflow-y-auto bg-121213 p-3 font-code text-term break-all whitespace-nowrap *:min-h-lh *:whitespace-pre [&>.line]:block"
      {@attach codeCollapser}
    >
      {#if isCollapsed}
        <div class="flex">
          <span class="text-(--code-token-keyword)">use</span>

          <Tooltip>
            Click to expand the range

            {#snippet target({id})}
              <button
                {id}
                class="ml-[1ex] cursor-pointer rounded-sm bg-82f1f7/20 ring ring-82f1f7/30 transition-colors ring-inset hover:bg-82f1f7/30"
                onclick={expand}
                type="button"
              >
                ...
              </button>
            {/snippet}
          </Tooltip>

          <span>;</span>
        </div>
      {/if}

      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html items[selectedItemIndex].codeHTML}
    </code>
  {/key}
</div>
