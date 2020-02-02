<script>
  import { onMount } from "svelte";
  import config from "./config.json";
  import getGameState from "./Helpers/getGameState.js";

  let gs = getGameState();
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
    return text.replace(/%(.+?)%/g, "<hint>$1</hint>")
      .replace(/\^(.+?)\^/g, "<h3>$1</h3>");
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

  .help p {
    margin: initial 1em;
  }
</style>

<bg />
<main>
  {#if helpVisible}
    <h3>Help</h3>
    <room class="help">
      <h4>Entering Commands</h4>
      <p>Control the game and interact with the world by typing commands.</p>
      <p>
        You can do things like "look" (l) or "take" (t) (and many other things
        too!) When you want to interact with something specific, type it after
        your command. The commands should be very simple. For example, instead
        of saying "look at the tree" you would say "look tree". Generally,
        anything you type should be either one or two words (separated by a
        space). Sometimes, however, you may have to type more words to interact
        with certain objects. For example, if you see "scorch marks" and want to
        look at them, you would have to type "look scorch marks" since typing
        "look marks" or "look scorch" doesn't really convey what you want to do.
      </p>
      <h4>Exploring the World</h4>
      <p>
        You can move between areas by using the commands "north" (n), "south"
        (s), "east" (e), "west" (w), "up" (u), and "down" (d). Area descriptions
        will tell you the directions you're able to move.
      </p>
      <h4>Items and Inventory</h4>
      <p>
        When you acquire things in the game, they are added to your inventory.
        You can carry a LOT of stuff. You can check what with the "inventory"
        (or "i") command! You can look at things in your inventory too! In fact,
        you can do all sorts of things to the stuff in your inventory.
      </p>
      <h4>Advice</h4>
      <p>
        You should probably "look" at things a lot. Who know's what might be
        useful or hiding something else? And death lurks around every corner.
      </p>
      <p>
        Throughout the game world you may come across cairns. In the game world,
        these are small stacks of stones measuring only 2-3 feet tall that are
        imbued with some sort of supernatural power to aid travelers and
        explorers. When you find one in the world, you should "touch" it. When
        you touch one, you attune your soul to the cairn. If your adventure is
        cut short by tragedy, you can restart from the last cairn you touched.
      </p>
      <h4>Hint System</h4>
      <p>
        If you're having a really hard time, you can turn on hints. This will
        cause
        <hint>interactable objects</hint>
        in the game world to be visually identifiable with an underline. I
        <b>strongly recommend</b>
        trying to play the game without hints first because part of the fun of
        playing a text adventure is investigating the environment yourself.
      </p>
    </room>
    <button on:click={() => (helpVisible = false)}>Ok, ok. Let me play!</button>
  {:else}
    <room bind:this={output}>
      {#if gameState.isGameOver}
        <h3>GAME OVER</h3>
      {/if}

      {#each gameState.text.split('\n') as line}
        <p>
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
</main>
