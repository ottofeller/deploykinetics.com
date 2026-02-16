<script lang="ts">
  import FAQ from './FAQ/index.svelte'
  import Hero from './Hero/index.svelte'
  import KineticsInExamples from './KineticsInExamples/index.svelte'
  import KineticsRunsAllYourBackends from './KineticsRunsAllYourBackends/index.svelte'
  import TapTapDeploy from './TapTapDeploy/index.svelte'
  import Page from '$lib/common/Page/index.svelte'
</script>

<Page>
  <Hero />
  <KineticsRunsAllYourBackends />
  <TapTapDeploy />
  <KineticsInExamples />
  <FAQ />
</Page>
