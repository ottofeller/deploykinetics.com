<script lang="ts">
  import Key from './Key/index.svelte'
  import Value from './Value/index.svelte'

  let {
    isPointerEntered,
  }: {
    isPointerEntered: boolean
  } = $props()
</script>

<div class="grid h-50 grid-cols-2 gap-x-1 gap-y-3 p-4">
  <Key>DATABASE_URL</Key>
  <Value {isPointerEntered}>A7$Q9X2mZ8S#dQ7eR!Kp0W&6gJH4L@5M9X2DSF^a</Value>
  <Key>API_KEY</Key>
  <Value {isPointerEntered}>R5M@Z8xD2P0M$e!Q9LrA#KJ&7WgH6X2S96f5a7TF</Value>
  <Key>JWT_SECRET</Key>
  <Value {isPointerEntered}>Q7!S@9X$2ZK8mP0W#D5e&JHArgLfd7saqf@#Aafx</Value>
</div>
