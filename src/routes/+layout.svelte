<script lang="ts">
  import MainLayout from '$lib/layouts/Main/index.svelte'
  import RootLayout from '$lib/layouts/Root/index.svelte'
  let {children} = $props()
</script>

<RootLayout>
  <MainLayout>
    {@render children()}
  </MainLayout>
</RootLayout>
