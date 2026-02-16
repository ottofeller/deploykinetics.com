<script lang="ts">
  import {untrack} from 'svelte'
  import About from './About/index.svelte'
  import Presentation from './Presentation/index.svelte'
  import codeCrons from './codes/crons.ans?theme=custom&language=ansi&code'
  import codeQueueWorkers from './codes/queue-workers.ans?theme=custom&language=ansi&code'
  import codeRestAPIs from './codes/rest-apis.ans?theme=custom&language=ansi&code'
  import Section from '$lib/common/Section/index.svelte'

  const items = [
    {
      codeHTML: codeRestAPIs.html,
      command: 'kinetics invoke BasicEndpointEndpoint',
      phrase: 'REST APIs',
    },

    {
      codeHTML: codeQueueWorkers.html,
      command: 'kinetics invoke QueueQueue --with-queue',
      phrase: 'queue workers',
    },

    {
      codeHTML: codeCrons.html,
      command: 'kinetics invoke BasicCronCron',
      phrase: 'crons',
    },
  ]

  let currentItemIndex = $state(0)
  let isAboutAnimationEnd = $state(false)

  const onAboutAnimationEnd = () => {
    isAboutAnimationEnd = true
  }

  let isPresentationAnimationEnd = $state(false)

  const onPresentationAnimationEnd = () => {
    isPresentationAnimationEnd = true
  }

  $effect(() => {
    if (isAboutAnimationEnd && isPresentationAnimationEnd) {
      isAboutAnimationEnd = false
      isPresentationAnimationEnd = false

      setTimeout(() => {
        currentItemIndex = (untrack(() => currentItemIndex) + 1) % items.length
      }, 3000)
    }
  })
</script>

<Section>
  <div class="col-[outer] grid grid-cols-subgrid lg:min-h-[min(100svh-var(--header-height),--spacing(210))]">
    <About
      class="col-start-[outer-start] col-end-[outer-end] -mb-px ml-(--outer-indent-x) max-lg:mr-(--outer-indent-x) lg:col-end-[track-end_6]"
      onanimationend={onAboutAnimationEnd}
      phrase={items[currentItemIndex].phrase}
    />

    <Presentation
      class="col-start-[outer-start] col-end-[outer-end] mr-(--outer-indent-x) -mb-px -ml-px max-lg:ml-(--outer-indent-x) lg:col-start-[track-end_6]"
      codeHTML={items[currentItemIndex].codeHTML}
      command={items[currentItemIndex].command}
      onanimationend={onPresentationAnimationEnd}
    />
  </div>
</Section>
