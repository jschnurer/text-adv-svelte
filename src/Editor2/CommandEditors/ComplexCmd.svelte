<script>
  import IfFlag from "./IfFlag.svelte";
  import IfHasItem from "./IfHasItem.svelte";
  import IfVar from "./IfVar.svelte";
  import IfRoom from "./IfRoom.svelte";
  import Dialog from "./Dialog.svelte";

  export let obj = {};

  $: cmd = obj.cmd;
</script>

{#if cmd === 'ifFlag'}
  <IfFlag {obj} />
{:else if cmd === 'ifHasItem'}
  <IfHasItem {obj} />
{:else if cmd === 'ifVar'}
  <IfVar {obj} />
{:else if cmd === 'ifRoom'}
  <IfRoom {obj} />
{:else if cmd === 'dialog'}
  <Dialog {obj} />
{/if}
