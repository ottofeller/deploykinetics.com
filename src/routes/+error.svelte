<script lang="ts">
  import {page} from '$app/state'
  import Error from '$lib/pages/Error/index.svelte'
  const status = $derived(page.status === 404 ? 404 : 500)
  const message = $derived(page.status === 404 ? 'Page not found' : 'Internal error')
</script>

<Error {message} {status} />
