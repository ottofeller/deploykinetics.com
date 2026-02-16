<script lang="ts">
  import Card from './Card/index.svelte'
  import iconBuiltInLogs from './icons/built-in-logs.svg'
  import iconEnvironmentConfig from './icons/environment-config.svg'
  import iconLocalRustExecution from './icons/local-rust-execution.svg'
  import iconManagedSQL from './icons/managed-sql.svg'
  import iconSecrets from './icons/secrets.svg'
  import iconUnifiedWorkloads from './icons/unified-workloads.svg'
  import IllustrationBuiltInLogs from './illustrations/IllustrationBuiltInLogs/index.svelte'
  import IllustrationEnvironmentConfig from './illustrations/IllustrationEnvironmentConfig/index.svelte'
  import IllustrationLocalRustExecution from './illustrations/IllustrationLocalRustExecution/index.svelte'
  import IllustrationManagedSQL from './illustrations/IllustrationManagedSQL/index.svelte'
  import IllustrationSecrets from './illustrations/IllustrationSecrets/index.svelte'
  import IllustrationUnifiedWorkloads from './illustrations/IllustrationUnifiedWorkloads/index.svelte'
  import Section from '$lib/common/Section/index.svelte'

  const items = [
    {
      class: 'sm:col-span-3',
      description: 'Deploy REST APIs, queue workers, and cron jobs with automatic infrastructure provisioning.',
      icon: iconUnifiedWorkloads,
      Illustration: IllustrationUnifiedWorkloads,
      title: 'Unified Workloads',
    },

    {
      class: 'sm:col-span-5',

      description:
        'Just annotate your functions — run and test everything locally, with databases and queues served offline.',

      icon: iconLocalRustExecution,
      Illustration: IllustrationLocalRustExecution,
      title: 'Local Rust Execution',
    },

    {
      class: 'sm:col-span-4',
      description:
        'Every project comes with a provisioned SQL database. Connection strings and migrations are handled automatically on local and cloud execution.',

      icon: iconManagedSQL,
      Illustration: IllustrationManagedSQL,
      title: 'Managed SQL',
    },

    {
      class: 'sm:col-span-4 lg:col-span-5',
      description: 'Access per-function logs directly from the CLI.',
      icon: iconBuiltInLogs,
      Illustration: IllustrationBuiltInLogs,
      title: 'Built-in Logs',
    },

    {
      class: 'sm:col-span-5 lg:col-span-4',
      description: 'Secrets are automatically provisioned from .env.secrets and injected at runtime.',
      icon: iconSecrets,
      Illustration: IllustrationSecrets,
      title: 'Secrets',
    },

    {
      class: 'sm:col-span-3',
      description: 'Define environment variables in code and deploy updates independently from function code.',
      icon: iconEnvironmentConfig,
      Illustration: IllustrationEnvironmentConfig,
      title: 'Environment Config',
    },
  ]
</script>

<Section>
  <div class="col-[inner] grid grid-cols-1 gap-(--inner-gap-x) py-(--inner-gap-x) sm:grid-cols-8 lg:grid-cols-12">
    {#each items as item, itemIndex (itemIndex)}
      <Card
        class={item.class}
        Illustration={item.Illustration}
        description={item.description}
        icon={item.icon}
        title={item.title}
      />
    {/each}
  </div>
</Section>
