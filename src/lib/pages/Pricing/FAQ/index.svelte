<script lang="ts">
  import FAQ from '$lib/common/FAQ/index.svelte'

  const list = [
    {
      description:
        'Pricing plans are currently being finalized while the platform is in active development. We want to make sure limits, performance characteristics, and usage-based pricing accurately reflect real-world workloads before opening billing.',

      title: 'Why are the plans marked as “Coming soon”?',
    },

    {
      description:
        'Yes. The Free plan is designed as an entry point to explore Kinetics, test local workflows, and deploy small workloads. It will remain available once billing is enabled, with clear limits on invocations and memory.',

      title: 'Will I be able to start on the Free plan?',
    },

    {
      description:
        'A function invocation is counted each time a workload is executed — whether it’s an HTTP endpoint call, a queue worker execution, or a cron job run. Local executions are not counted toward plan limits.',

      title: 'What counts as a function invocation?',
    },

    {
      description:
        'Yes. Plans will be flexible. You’ll be able to upgrade, downgrade, or switch plans at any time as your workload grows or changes. Usage will always be tracked transparently.',

      title: 'Can I upgrade or downgrade my plan later?',
    },

    {
      description:
        'The Enterprise plan is tailored to specific requirements. It allows for higher limits, custom memory configurations, and dedicated support. Details are discussed individually based on workload characteristics.',

      title: 'How does the Enterprise plan work?',
    },

    {
      description:
        'Billing will be enabled once the platform reaches a stable release milestone. If you want early access or to discuss a specific use case, you can contact us directly — we’re happy to talk.',

      title: 'When will pricing and billing become available?',
    },
  ]
</script>

<FAQ {list} />
