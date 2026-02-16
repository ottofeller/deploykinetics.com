<script lang="ts">
  let {
    isPointerEntered,
    key,
    value,
  }: {
    isPointerEntered: boolean
    key: string
    value: string
  } = $props()
</script>

<div class="grid grid-cols-2 pt-1.5 pb-1 font-code text-term">
  <div class="text-838484">{key}</div>
  <div class={['transition-colors', isPointerEntered && 'text-82f1f7']}>{value}</div>
</div>
