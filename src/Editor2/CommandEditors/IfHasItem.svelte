<script>
  import CmdListEditor from "../CmdListEditor.svelte";

  export let obj = {};
  $: itemId = obj.args[0];
</script>

<style>
  input {
    display: inline;
  }
  fcol,
  frow {
    display: block;
  }
  div {
    border-left: 1px yellow solid;
    padding-left: 1em;
  }
</style>

<div>
  <fcol>
    <frow>
      <label>If player has item...</label>
      <input bind:value={itemId} />
    </frow>
    <label>...then do this:</label>
    <CmdListEditor obj={obj.args} prop={1} />
    <label>...else do this:</label>
    <br />
    <CmdListEditor obj={obj.args} prop={2} />
  </fcol>
</div>
