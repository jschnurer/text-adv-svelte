<script>
  import { onMount } from "svelte";
  import config from "./config.json";
  import Help from "./Help.svelte";
  import getGameState from "./Helpers/getGameState.js";

  export let loadGame = false;

  let gs = getGameState(loadGame);
  gs.updateScroll = () =>
    window.setTimeout(
      () => (output.scrollTop = output.scrollHeight + output.offsetTop),
      1
    );
  $: gameState = gs;

  gs.update = function() {
    gameState = gameState;
  };

  let output = null;
  let helpVisible = false;

  let entry = "";

  onMount(async () => {
    if (!loadGame) {
      await gameState.loadRoom(config.initial_room);
    } else {
      gameState.look();
    }
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

  var tagBody = "(?:[^\"'>]|\"[^\"]*\"|'[^']*')*";

  var tagOrComment = new RegExp(
    "<(?:" +
      // Comment body.
      "!--(?:(?:-*[^->])*--+|-?)" +
      // Special "raw text" elements whose content should be elided.
      "|script\\b" +
      tagBody +
      ">[\\s\\S]*?</script\\s*" +
      "|style\\b" +
      tagBody +
      ">[\\s\\S]*?</style\\s*" +
      // Regular name
      "|/?[a-z]" +
      tagBody +
      ")>",
    "gi"
  );
  const sanitize = text => {
    var oldHtml;
    do {
      oldHtml = text;
      text = text.replace(tagOrComment, "");
    } while (text !== oldHtml);
    return text.replace(/</g, "&lt;");
  };

  const convertSyntax = text => {
    let nt = text
      .replace(/%(.+?)%/g, "<hint>$1</hint>")
      .replace(/\^(.+?)\^/g, "<h3>$1</h3>")
      .replace(/~(.+?)~/g, "<entry>$1</entry>")
      .replace(/\\/g, "<br />");

    if (nt.startsWith(']')) {
      return nt.substring(1);
    } else {
      return nt;
    }
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

  button {
    margin-top: 1.5em;
  }

  .indent {
    margin-left: 2em;
  }

  :global(entry) {
    color: #666;
  }

  :global(entry)::before {
    content: '> ';
  }
</style>

{#if helpVisible}
  <Help
    showHints={gameState.options.showHints}
    on:toggleHints={() => (gameState.options.showHints = !gameState.options.showHints)} />
  <button on:click={() => (helpVisible = false)}>Ok, ok. Let me play!</button>
{:else}
  <room bind:this={output}>
    {#if gameState.isGameOver}
      <h3>GAME OVER</h3>
    {/if}

    {#each gameState.text.split('\n') as line}
      <p class={line.startsWith(']') ? "indent" : ""}>
        {@html convertSyntax(sanitize(line))}
      </p>
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
