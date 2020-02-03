<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let cmdList = [];
  export let index = -1;
  export let name = "";
</script>

<style>
  .cmd {
    margin: 0.5em 0;
    border-top: 1px #aaa solid;
    padding-top: 0.5em;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  .cmd-0 {
    border-top: none;
  }
  .cmd > label {
    width: 10em;
  }
  .cmd > .cmd-list {
    flex: auto;
    display: flex;
    flex-direction: column;
  }
  button {
    font-size: 0.75em;
    color: #222;
    background-color: #ddd;
    cursor: pointer;
    border-radius: .33em;
  }
</style>

<div class="cmd cmd-{index}">
  <label>{name}</label>
  <div class="cmd-list">
    {#each cmdList[name] as cmd}
      {#if typeof cmd === 'string'}
        <div>{cmd}</div>
      {:else}
        <div>Complex cmd</div>
      {/if}
    {/each}
    <div>
      <button on:click={() => dispatch('newCmd', cmdList[name])}>
        +New Step
      </button>
    </div>
  </div>
</div>
