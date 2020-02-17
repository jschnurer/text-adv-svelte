<script>
  import NewCmd from "./NewCmd.svelte";
  import ComplexCmd from "./CommandEditors/ComplexCmd.svelte";

  export let obj = {};
  export let prop = "";

  let newCmdVisible = false;

  const addNewCmd = ({ detail }) => {
    console.log(obj[prop]);
    obj[prop] = [...obj[prop], detail];
    console.log(obj[prop]);
  };
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
  <button>+Cmd</button>
{/if}

{#if obj[prop]}
  {#if typeof obj[prop] === 'string'}
    <div>
      <input bind:value={obj[prop]} />
      <button>x</button>
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
