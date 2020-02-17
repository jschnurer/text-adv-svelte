<script>
  import CmdListEditor from "../CmdListEditor.svelte";

  export let obj = {};

  $: diag = obj.args;

  const newTopic = () => {
    let topic = prompt("Enter new topic");
    if (!topic) {
      return;
    }

    diag[topic] = [];
  };
</script>

<style>
  div {
    border-left: 1px greenyellow solid;
    padding-left: 1em;
  }
</style>

<div>
  <fcol>
    <label>Dialog:</label>
    <label>Unknown Topic Cmds</label>
    <CmdListEditor obj={diag} prop="" />

    {#each Object.keys(diag).filter(x => x) as topic}
      <label>{topic}</label>
      <CmdListEditor obj={diag} prop={topic} />
    {/each}

    <button on:click={newTopic}>+Topic</button>
  </fcol>
</div>
