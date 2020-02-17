<script>
  import NewCmd from "./NewCmd.svelte";
  import ComplexCmd from "./CommandEditors/ComplexCmd.svelte";

  export let obj = {};
  export let prop = "";

  let newCmdVisible = false;

  const newCmdList = () => {
    obj[prop] = [];
  }

  const addNewCmd = ({ detail }) => {
    obj[prop] = [...obj[prop], detail];
  };

  const deleteCmd = () => {
    if (Array.isArray(obj)) {
      obj = obj.filter((_, ix) => ix != prop);
    }
  }
</script>

<style>
  .list {
    border-left: 1px gray solid;
    padding-left: 1em;
  }
  input {
    display: inline-block;
  }
  .b {
    display: block;
  }
</style>

{#if !obj[prop]}
  <button on:click={newCmdList}>+CmdList</button>
{/if}

{#if obj[prop]}
  {#if typeof obj[prop] === 'string'}
    <div>
      <input bind:value={obj[prop]} />
      <button on:click={deleteCmd}>x</button>
    </div>
  {:else if obj[prop].hasOwnProperty('length')}
    <div class="list">
      {#each obj[prop] as cmd, ix}
        <svelte:self obj={obj[prop]} prop={ix} />
      {/each}
      <button class="b" on:click={() => (newCmdVisible = true)}>+</button>
    </div>
  {:else}
    <ComplexCmd obj={obj[prop]} />
  {/if}
{/if}

{#if newCmdVisible}
  <NewCmd on:close={() => (newCmdVisible = false)} on:save={addNewCmd} />
{/if}
