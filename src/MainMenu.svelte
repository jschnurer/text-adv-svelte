<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import Modal from "./Modal.svelte";

  const dispatch = createEventDispatcher();
  let hasSavedGame = false;
  $: continueDisabled = !hasSavedGame;
  let exportString = "";
  let exportTextbox = null;

  onMount(() => {
    if (localStorage.getItem("game_state")) {
      hasSavedGame = true;
    }
  });

  const startImport = () => {
    if (hasSavedGame) {
      if (
        !confirm(
          "Importing a game will erase your current saved game. Continue?"
        )
      ) {
        return;
      }
    }

    var gameStr = prompt("Paste your save code here and press OK.", "");

    if (!gameStr) {
      return;
    }

    try {
      let json = atob(gameStr);
      let gameState = JSON.parse(json);
      localStorage.setItem("game_state", json);
      dispatch("continueGame");
    } catch {
      alert("Your save code is invalid.");
    }
  };

  const startExport = () => {
    exportString = btoa(localStorage.getItem("game_state"));
  };

  const copyExport = () => {
    exportTextbox.select();
    try {
      document.execCommand("copy");
      alert("Copied to clipboard. Paste it somewhere safe!");
    } catch {
      alert(
        "FAiled to copy to clipboard. Select everything in the textbox manually and press CTRL+C instead."
      );
    }
  };
</script>

<style>
  button {
    width: 15em;
  }
  .continueDisabled {
    background-color: #666;
    color: #999;
    border-style: solid;
    border-color: #666;
  }
  .export-text {
    font-size: 0.5em;
    min-height: 15em;
  }
  .copy {
    text-decoration: underline;
    color: #0000ee;
    cursor: pointer;
    display: block;
    margin-top: 0.5em;
  }
  .copy > span {
    font-size: 0.875em;
    margin-right: 0.125em;
    position: relative;
    top: -0.25em;
    left: -0.125em;
  }
  .copy > span > span {
    position: absolute;
    top: 0.25em;
    left: 0.25em;
  }
</style>

<h1>Adventure</h1>
<p>A world of mystery and adventure awaits!</p>
<button on:click={() => dispatch('newGame')}>New Game</button>
<button
  class:continueDisabled
  disabled={continueDisabled}
  on:click={() => dispatch('continueGame')}>
  Continue Saved Game
</button>
<p>
  If you want to move your saved game onto a different browser, you can export
  it to text and then import it in a different browser.
</p>
<button on:click={startImport}>Import Saved Game ←</button>
{#if hasSavedGame}
  <button on:click={startExport}>Export Saved Game →</button>
{/if}
<p>
  Download and print a few
  <a href={window.hostDir + '/adventure-blank-map.pdf'} target="_blank">
    blank maps
  </a>
  and fill them in as you play the game!<br />(Make sure to find the in-game compass first!)
</p>
<p>
    Did you like the game? Hate it? Or did you find a bug or a typo? I'd love
    to hear about it! Go check out the
    <a href="https://github.com/jschnurer/text-adv-svelte#readme">readme at github</a>
    for my contact info!
  </p>
{#if exportString}
  <Modal showClose={true} on:close={() => (exportString = '')}>
    <p>
      Copy this save code and put it somewhere safe. Then, on another computer,
      you can import this save by clicking Import Saved Game and pasting this
      code in.
    </p>
    <textarea
      value={exportString}
      readonly="readonly"
      class="export-text"
      bind:this={exportTextbox} />
    <span class="copy" on:click={copyExport}>
      <span>
        📄
        <span>📄</span>
      </span>
      Copy to clipboard
    </span>
  </Modal>
{/if}
