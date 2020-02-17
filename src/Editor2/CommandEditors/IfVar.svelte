<script>
  import CmdListEditor from "../CmdListEditor.svelte";

  export let obj = {};
  $: varName = obj.args[0];
  $: compareVal = obj.args[2];

  const operators = ["==", "===", ">", ">=", "<", "<="];
</script>

<style>
  input {
    display: inline-block;
    width: 7em;
  }
  flexcol {
    display: block;
  }
  div {
    border-left: 1px red solid;
    padding-left: 1em;
  }
</style>

<div>
  <flexcol>
    <label>If</label>
    <input bind:value={varName} />
    <select bind:value={obj.args[1]}>
      {#each operators as op}
        <option value={op}>{op}</option>
      {/each}
    </select>
    <input bind:value={compareVal} />
    <br />
    <label>... then do this:</label>
    <CmdListEditor obj={obj.args} prop={3} />
    <label>...else do this:</label>
    <br />
    <CmdListEditor obj={obj.args} prop={4} />
  </flexcol>
</div>
