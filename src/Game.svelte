<script>
  import { onMount } from "svelte";
  import config from "./config.json";
  import Help from "./Help.svelte";
  import getGameState from "./Helpers/getGameState.js";

  export let loadGame = false;

  let gs;
  let previousInputs = [];
  let cmdIx = -1;
  let output = null;
  $: gameState = gs;

  let helpVisible = false;

  let entry = "";

  onMount(async () => {
    gs = getGameState(
      loadGame,
      () =>
        window.setTimeout(
          () => (output.scrollTop = output.scrollHeight + output.offsetTop),
          1
        ),
      function() {
        gameState = gameState;
      }
    );

    if (!loadGame) {
      await gs.loadRoom(config.initial_room);
    }
  });

  const focus = el => {
    el.focus();
  };

  const keydown = ({ keyCode }) => {
    if (keyCode === 38) {
      loadPrevInput(-1);
    } else if (keyCode === 40) {
      loadPrevInput(1);
    }
  };

  const loadPrevInput = dir => {
    if (!previousInputs.length) {
      return;
    }

    if (dir === -1) {
      if (cmdIx === -1) {
        cmdIx = previousInputs.length - 1;
      } else if (cmdIx > 0) {
        cmdIx--;
      } else {
        return;
      }
    } else {
      if (cmdIx === -1) {
        entry = "";
        return;
      } else {
        cmdIx++;
      }
    }

    if (cmdIx > previousInputs.length - 1) {
      cmdIx = -1;
      entry = "";
      return;
    }

    entry = previousInputs[cmdIx];
  };

  const submit = () => {
    gameState.handleUserEntry(entry.trim().toLowerCase());
    previousInputs = [...previousInputs, entry];
    if (previousInputs.length > 10) {
      previousInputs = previousInputs.slice(1);
    }
    entry = "";
    cmdIx = -1;
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
      .replace(/#(.+?)#/g, "<pre>$1</pre>")
      .replace(/\\/g, "<br />")
      .replace(/"(.+?)"/g, '<speech>"$1"</speech>')
      .replace(/^\+(.+?)\+$/, "<waitForInput>$1</waitForInput>");

    if (nt.startsWith("]")) {
      return nt.replace(/^]+/, "");
    } else {
      return nt;
    }
  };

  const getClass = line => {
    if (line.startsWith("]]")) {
      return "indent2";
    } else if (line.startsWith("]")) {
      return "indent";
    }

    return "";
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

  .indent2 {
    margin-left: 4em;
  }

  :global(entry) {
    color: #666;
  }

  :global(entry)::before {
    content: "> ";
  }
</style>

{#if helpVisible}
  <Help
    showHints={gameState.options.showHints}
    on:toggleHints={() => (gameState.options.showHints = !gameState.options.showHints)} />
  <button on:click={() => (helpVisible = false)}>Ok, ok. Let me play!</button>
{:else}
  {#if gameState}
    <room bind:this={output}>
      {#if gameState.isGameOver}
        <h3>GAME OVER</h3>
      {:else if gameState.isEnd}
        <h3>The End</h3>
      {/if}

      {#each gameState.text.split('\n').filter(x => !!x) as line}
        <p class={getClass(line)}>
          {@html convertSyntax(sanitize(line))}
        </p>
      {/each}
    </room>
    {#if gameState.isGameOver}
      <button on:click={() => location.reload()}>Try again</button>
    {:else if gameState.isEnd}
      <button on:click={() => location.reload()}>New Game</button>
    {:else}
      <form on:submit|preventDefault={submit}>
        <input use:focus bind:value={entry} on:keydown={keydown} />
        <span on:click={help}>❔</span>
      </form>
    {/if}
  {/if}
{/if}
