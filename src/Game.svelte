<script>
  import { onMount } from "svelte";
  import config from "./config.json";
  import Help from "./Help.svelte";
  import getGameState from "./Helpers/getGameState.js";
  import Commands from "./Commands.svelte";
  import Location from "./Location.svelte";

  function getRoomExits(gameState) {
    if (!gameState
    || !gameState.room) {
      return [];
    }

    let room = gameState.room;
    let exits = [];

    exits.push(room.north && (!room.northFlag || gameState.getFlag(room.northFlag)) ? "north" : undefined);
    exits.push(room.south && (!room.southFlag || gameState.getFlag(room.southFlag)) ? "south" : undefined);
    exits.push(room.east && (!room.eastFlag || gameState.getFlag(room.eastFlag)) ? "east" : undefined);
    exits.push(room.west && (!room.westFlag || gameState.getFlag(room.westFlag)) ? "west" : undefined);
    exits.push(room.up && (!room.upFlag || gameState.getFlag(room.upFlag)) ? "up" : undefined);
    exits.push(room.down && (!room.downFlag || gameState.getFlag(room.downFlag)) ? "down" : undefined);

    return exits.filter(x => x);
  }

  export let loadGame = false;

  let gs;
  let previousInputs = [];
  let cmdIx = -1;
  let output = null;
  $: gameState = gs;
  $: hasCompass = gameState
    ? gameState.inventory.some(x => x.id === "COMPASS")
    : false;
  $: knowsAnyIncantations = gameState
    ? gameState.knowsAnyIncantations()
    : false;
  $: coords = gameState && gameState.room && gameState.room.coords ? gameState.room.coords : "";
  $: exits = getRoomExits(gameState);
  $: isDark = gameState && gameState.room ? gameState.room.dark : false;
  $: isLightOn = gameState && gameState.getFlag("G.HASLIGHT");

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
    let ent = entry.trim();
    if (!ent.startsWith("dev|")) {
      ent = ent.toLowerCase();
    }
    submitUserEntry(ent);
  };

  const submitUserEntry = ent => {
    gameState.handleUserEntry(ent);
    previousInputs = [...previousInputs, ent];
    if (previousInputs.length > 10) {
      previousInputs = previousInputs.slice(1);
    }
    entry = "";
    cmdIx = -1;
    document.getElementById("userInput").focus();
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
      .replace(/\^(.+?)\^/g, "<h3>$1</h3>")
      .replace(/~(.+?)~/g, "<entry>$1</entry>")
      .replace(/#(.+?)#/g, "<pre>$1</pre>")
      .replace(/\\/g, "<br />")
      .replace(/"(.+?)"/g, '<speech>"$1"</speech>')
      .replace(/^\+(.+?)\+$/, "<waitForInput>$1</waitForInput>")
      .replace(/%(.+?)%/g, `<hint>$1</hint>`);

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

  const hintize = line => {
    if (line.indexOf("<hint>") === -1) {
      return [{ type: "html", value: line }];
    }

    let chunks = [];
    let matches = line.match(/<hint>(.+?)<\/hint>/gi);

    let tempLine = line;

    matches.forEach(x => {
      let ix = tempLine.indexOf(x);

      if (ix > 0) {
        chunks.push({ type: "html", value: tempLine.substr(0, ix) });
        tempLine = tempLine.substr(ix);
      }

      const hintMatch = x.match(/<hint>(.+?)<\/hint>/);

      chunks.push({ type: "hint", value: hintMatch[1] });
      tempLine = tempLine.substr(hintMatch[0].length);
    });

    if (tempLine.length) {
      chunks.push({ type: "html", value: tempLine });
    }

    return chunks;
  };

  const clickHint = item => {
    submitUserEntry("look " + item.target.innerText);
  };

  function travel(event) {
    submitUserEntry(event.detail.direction);
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
    align-items: center;
    flex: none;
  }

  form > input {
    flex: auto;
    width: 10px;
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

  .side-menu {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
</style>

<main>
  {#if helpVisible}
    <Help
      showHints={gameState.options.showHints}
      on:toggleHints={() => (gameState.options.showHints = !gameState.options.showHints)} />
    <button on:click={() => (helpVisible = false)}>Ok, ok. Let me play!</button>
  {:else if gameState}
    <room bind:this={output}>
      {#if gameState.isGameOver}
        <h3>GAME OVER</h3>
      {:else if gameState.isEnd}
        <h3>The End</h3>
      {/if}

      {#each gameState.text.split('\n').filter(x => !!x) as line}
        <p class={getClass(line)}>
          {#if line.indexOf('^') === 0}
            {@html convertSyntax(line)}
          {:else}
            {#each hintize(convertSyntax(sanitize(line))) as chunk}
              {#if chunk.type === 'html'}
                {@html chunk.value}
              {:else}
                <hint on:click={clickHint}>{chunk.value}</hint>
              {/if}
            {/each}
          {/if}
        </p>
      {/each}
    </room>
    {#if gameState.isGameOver}
      <button on:click={() => location.reload()}>Try again</button>
    {:else if gameState.isEnd}
      <button on:click={() => location.reload()}>New Game</button>
    {:else}
      <form on:submit|preventDefault={submit} id="inputForm">
        <input
          use:focus
          bind:value={entry}
          on:keydown={keydown}
          id="userInput" />
        <span on:click={help}>❔</span>
      </form>
    {/if}
  {/if}
</main>
<div class="side-menu">
  <Commands
    showIncantations={knowsAnyIncantations}
    on:command={(event) => {
      submitUserEntry(event.detail.command);
    }}
  />
  <Location
    coords={coords}
    hasCompass={hasCompass}
    exits={exits}
    isDark={isDark}
    isLightOn={isLightOn}
    on:travel={travel}
  />
</div>
