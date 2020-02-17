<script>
  import { createEventDispatcher } from "svelte";
  let dispatch = createEventDispatcher();

  let cmdType = "write";

  const simpleCmds = {
    write: "Write Text",
    setFlag: "set flag = true",
    unsetFlag: "set flag = false",
    ifFlag: "if flag is true...",
    loadRoom: "load new room",
    addItem: "add item",
    removeItem: "remove item",
    ifHasItem: "if player has item...",
    incVar: "var++",
    decVar: "var--",
    ifVar: "if var ...",
    ifRoom: "if current room is...",
    callCommon: "call common",
    waitForInput: "wait for input",
    dialog: "dialog",
    choice: "choice",
    saveGame: "save game",
    gameOver: "game over",
  };

  $: simpleCmdList = Object.keys(simpleCmds);

  const focus = el => el.focus();

  const save = () => {
    dispatch("close");
  };
</script>

<style>
  container {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #111;
    padding: 1em;
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
  actions {
    display: block;
  }
  input {
    display: inline-block;
  }
  label {
    display: block;
  }
  div {
    column-count: 2;
    display: inline-block;
  }
</style>

<container>
  <header>New Command</header>
  <form on:submit|preventDefault={save}>
    <h5>Command</h5>
    <div>
      {#each simpleCmdList as cmd}
        <label>
          <input type="radio" bind:group={cmdType} value={cmd} />
          {simpleCmds[cmd]}
        </label>
      {/each}
    </div>
  </form>
  <actions>
    <button on:click={save}>Save</button>
    <button on:click={() => dispatch('close')}>Cancel</button>
  </actions>
</container>
