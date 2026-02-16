<script lang="ts">
  import FAQ from '$lib/common/FAQ/index.svelte'

  const list = [
    {
      description:
        'Kinetics supports multiple backend workloads out of the box, including HTTP endpoints, queue workers, and cron jobs. All workloads are defined as Rust functions and executed through the same runtime and CLI, without separate infrastructure or configuration layers.',

      title: 'What kind of workloads can I run with Kinetics?',
    },

    {
      description:
        'No. Infrastructure is provisioned and managed automatically by Kinetics. You don’t configure servers, queues, databases, or deployment pipelines. The only thing you write and maintain is Rust code.',

      title: 'Do I need to configure or manage infrastructure myself?',
    },

    {
      description:
        'Yes. Kinetics is designed with a local-first workflow. Functions, queues, and database interactions can all be executed locally without requiring a network connection. Cloud deployment is only required when you explicitly deploy.',

      title: 'Can I run and test everything locally without an internet connection?',
    },

    {
      description:
        'Every project is provisioned with a SQL database automatically. Database connection details are injected into your functions at runtime. SQL migrations are built in and applied automatically when a function is invoked locally or deployed.',

      title: 'How does Kinetics handle databases and migrations?',
    },

    {
      description:
        'Environment variables can be defined directly in code and deployed independently from function code. Secrets are loaded from a .env.secrets file and securely provisioned into the runtime environment without being committed to source control.',

      title: 'How are environment variables and secrets managed?',
    },

    {
      description:
        'Kinetics is built with production use in mind, focusing on deterministic execution, explicit behavior, and predictable performance. The project is under active development, and production usage should follow documented best practices and deployment guidelines.',

      title: 'Is Kinetics suitable for production workloads?',
    },
  ]
</script>

<FAQ {list} />
