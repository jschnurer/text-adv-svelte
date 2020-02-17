<script>
  import CmdListEditor from "../CmdListEditor.svelte";

  export let obj = {};
  $: flag = obj.args[0];
</script>

<style>
  input {
    display: inline;
  }
  flexcol,
  flexrow {
    display: block;
  }
  div {
    border-left: 1px blue solid;
    padding-left: 1em;
  }
</style>

<div>
  <flexcol>
    <flexrow>
      <label>If this flag...</label>
      <input bind:value={flag} />
    </flexrow>
    <label>...is true do this:</label>
    <CmdListEditor obj={obj.args} prop={1} />
    <label>...else do this:</label>
    <br />
    <CmdListEditor obj={obj.args} prop={2} />
  </flexcol>
</div>
