<script>
  import CmdListEditor from "../CmdListEditor.svelte";

  export let obj = {};
  $: roomName = obj.args[0];
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
    border-left: 1px orange solid;
    padding-left: 1em;
  }
</style>

<div>
  <fcol>
    <frow>
      <label>If current room is...</label>
      <input bind:value={roomName} />
    </frow>
    <label>...then do this:</label>
    <CmdListEditor obj={obj.args} prop={1} />
    <label>...else do this:</label>
    <br />
    <CmdListEditor obj={obj.args} prop={2} />
  </fcol>
</div>
