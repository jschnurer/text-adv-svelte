<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let hasSavedGame = false;
  $: continueDisabled = !hasSavedGame;

  onMount(() => {
    if (localStorage.getItem("game_state")) {
      hasSavedGame = true;
    }
  });
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
</style>

<h1>Adventure</h1>
<p>A world of mystery and adventure awaits!</p>
<p>&nbsp;</p>
<button on:click={() => dispatch('newGame')}>New Game</button>
<button
  class:continueDisabled
  disabled={continueDisabled}
  on:click={() => dispatch('continueGame')}>
  Continue Saved Game
</button>
