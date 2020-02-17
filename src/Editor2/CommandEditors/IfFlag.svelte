<script>
  import CmdListEditor from "../CmdListEditor.svelte";

  export let obj = {};
  $: flag = obj.args[0];
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
    border-left: 1px green solid;
    padding-left: 1em;
  }
</style>

<div>
  <fcol>
    <frow>
      <label>If this flag...</label>
      <input bind:value={flag} />
    </frow>
    <label>...is true do this:</label>
    <CmdListEditor obj={obj.args} prop={1} />
    <label>...else do this:</label>
    <br />
    <CmdListEditor obj={obj.args} prop={2} />
  </fcol>
</div>
