<script>
  import IfFlag from "./IfFlag.svelte";
  import IfHasItem from "./IfHasItem.svelte";
  import IfVar from "./IfVar.svelte";

  export let obj = {};

  $: cmd = obj.cmd;
</script>

{#if cmd === 'ifFlag'}
  <IfFlag {obj} />
{:else if cmd === 'ifHasItem'}
  <IfHasItem {obj} />
{:else if cmd === 'ifVar'}
  <IfVar {obj} />
{/if}
