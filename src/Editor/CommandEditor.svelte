<script>
  import { createEventDispatcher } from "svelte";
  let dispatch = createEventDispatcher();
  let type = "simple";
  let cmdText = "";

  export let cmd = {};
  $: editCmd = cmd;
  $: type = typeof editCmd === "string" ? "simple" : "complex";

  const focus = el => el.focus();

  const save = () => {
    dispatch(
      "save",
      type === "simple"
        ? cmdText
        : {
            // TODO: fill obj
          }
    );
    dispatch("close");
  };
</script>

<style>
  container {
    display: flex;
    flex-direction: column;
    height: 80vh;
  }
  header {
    display: block;
    font-size: 1.5em;
  }
  form {
    display: block;
    flex: auto;
    overflow: auto;
    overflow-x: hidden;
  }
  form > div {
    margin-bottom: 0.5em;
  }
  actions {
    display: block;
  }
  input[type="text"] {
    background: initial;
    color: initial;
    font-size: initial;
  }
  row {
    display: flex;
    flex-direction: row;
  }
  row > * {
    flex: auto;
  }
  row > label {
    flex: 0;
    white-space: nowrap;
    margin-right: 1em;
  }
</style>

<container>
  <header>
    {#if cmd}Edit{:else}New{/if}
    Command
  </header>
  <form on:submit|preventDefault={save}>
    <div>
      Cmd Type:
      <br />
      <label>
        <input type="radio" value="simple" bind:group={type} />
        Simple
      </label>
      <label>
        <input type="radio" value="complex" bind:group={type} />
        Complex
      </label>
    </div>
    <div>
      {#if type === 'simple'}
        <row>
          <label>Cmd Text</label>
          <input type="text" bind:value={cmdText} use:focus />
        </row>
      {:else}
        Okay. This is gon' be complex.
      {/if}
    </div>
  </form>
  <actions>
    <button on:click={save}>Save</button>
    <button on:click={() => dispatch('close')}>Cancel</button>
  </actions>
</container>
