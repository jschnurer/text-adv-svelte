<script>
  import { onMount } from "svelte";
  import config from "./config.json";
  import getGameState from "./Helpers/getGameState.js";

  let gs = getGameState();
  gs.updateScroll = () => window.setTimeout(() => output.scrollTop = output.scrollHeight + output.offsetTop, 1);
  $: gameState = gs;

  gs.update = function () {
    gameState = gameState;
  }

  let output = null;
  let helpVisible = false;

  let entry = "";

  onMount(async () => {
    await gameState.loadRoom(`${config.initial_area}/${config.initial_room}`);
  });

  const focus = el => {
    el.focus();
  };

  const submit = () => {
    if (!entry) {
      return;
    }
    gameState.handleUserEntry(entry.trim());
    entry = "";
  };

  const help = () => {
    helpVisible = true;
  };
</script>

<style>
  form {
    display: flex;
    flex-direction: row;
  }

  form > input {
    flex: auto;
  }

  form > span {
    background-color: transparent;
    color: white;
    border: 1px white solid;
    border-radius: 2em;
    vertical-align: middle;
    height: 1.5em;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    padding: 0 0.2em;
    margin: 0.3em 0 0 0.5em;
  }
</style>

<bg />
<main>
  {#if helpVisible}
    <h3>Help</h3>
    <p>
      Type commands to try things in the game. You can move between areas by
      using the commands "north", "south", "east", and "west" (or "n", "s", "e",
      "w" for short).
    </p>
    <p>
      You can do things like "look" or "take" (and many other things too!) When
      you want to interact with something specific, type it after your command.
      The commands should be very simple. For example, instead of saying "look
      at the tree" you would say "look tree". Generally, anything you type
      should be either one or two words (separated by a space).
    </p>
    <p>You can check what you're carrying with the "inventory" command too!</p>
    <p>
      Hint: You should probably "look" at things a lot. Who know's what might be
      useful? And death lurks around every corner.
    </p>
    <p>&nbsp;</p>
    <button on:click={() => (helpVisible = false)}>Ok, ok. Let me play!</button>
  {:else}
    <room bind:this={output}>
      {#if gameState.isGameOver}
        <h3>GAME OVER</h3>
      {:else}
        <h3>{!!gameState.room ? gameState.room.name : ""}</h3>
      {/if}

      {#each gameState.text.split('\n') as line}
        <p>{line}</p>
      {/each}
    </room>
    {#if !gameState.isGameOver}
      <form on:submit|preventDefault={submit}>
        <input use:focus bind:value={entry} />
        <span on:click={help}>❔</span>
      </form>
    {:else}
      <button on:click={() => location.reload()}>Try again</button>
    {/if}
  {/if}
</main>
