<script lang="ts">
  import {onMount} from 'svelte'
  import List from './List/index.svelte'
  import codeAuthenticate from './codes/authenticate.ans?theme=custom&language=ansi&code'
  import codeDeployToTheCloud from './codes/deploy-to-the-cloud.ans?theme=custom&language=ansi&code'
  import codeInitializeAProject from './codes/initialize-a-project.ans?theme=custom&language=ansi&code'
  import codeInstallKinetics from './codes/install-kinetics.ans?theme=custom&language=ansi&code'
  import codeInvokeLocally from './codes/invoke-locally.ans?theme=custom&language=ansi&code'
  import Block from '$lib/common/Block/index.svelte'
  import Section from '$lib/common/Section/index.svelte'
  import Terminal from '$lib/common/Terminal/index.svelte'
  const lastCrateVersionMarker = '__VERSION__'
  let lastCrateVersion = $state('v0.11.6')

  onMount(async () => {
    const response = await fetch('https://crates.io/api/v1/crates/kinetics')
    const json = await response.json()
    lastCrateVersion = json.crate.max_version
  })

  const items = $derived([
    {
      codeHTML: codeInstallKinetics.html.replaceAll(lastCrateVersionMarker, lastCrateVersion),
      command: 'cargo install kinetics',
      description: 'Install the Kinetics CLI using Cargo to make it available globally.',
      title: 'Install Kinetics',
    },

    {
      codeHTML: codeAuthenticate.html,
      command: 'kinetics login johndoe@kinetics.com',
      description: 'Log in or create an account. An authentication code will be sent to your email.',
      title: 'Authenticate',
    },

    {
      codeHTML: codeInitializeAProject.html,
      command: 'kinetics init test && cd test',
      description: 'Bootstrap a new project from the default template and enter the project directory.',
      title: 'Initialize a Project',
    },

    {
      codeHTML: codeInvokeLocally.html,
      command: 'kinetics invoke BasicEndpointEndpoint',
      description: 'Run a function locally to test execution and behavior before deployment.',
      title: 'Invoke Locally',
    },

    {
      codeHTML: codeDeployToTheCloud.html,
      command: 'kinetics deploy',
      description: 'Deploy the entire project to the cloud with a single command.',
      title: 'Deploy to the Cloud',
    },
  ])

  let selectedItemIndex = $state(0)
</script>

<Section>
  <div class="col-[outer] grid grid-cols-subgrid lg:h-116">
    <Block class="col-start-[outer-start] col-end-[inner-start] -mr-px -mb-px ml-(--outer-indent-x)" />
    <List class="col-start-[inner-start] col-end-[inner-end] lg:col-end-[track-end_6]" {items} bind:selectedItemIndex />
    <Block class="col-start-[inner-end] col-end-[outer-end] mr-(--outer-indent-x) -mb-px -ml-px lg:hidden" />

    <Block class="col-start-[track-end_6] col-end-[outer-end] mr-(--outer-indent-x) -mb-px -ml-px max-lg:hidden">
      <Terminal
        class="h-full"
        codeHTML={items[selectedItemIndex].codeHTML}
        command={items[selectedItemIndex].command}
      />
    </Block>
  </div>
</Section>
