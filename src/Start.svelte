<script>
  import MainMenu from "./MainMenu.svelte";
  import Game from "./Game.svelte";

  let playing = false;
  let loadGame = false;

  const newGame = () => {
    loadGame = false;
    playing = true;
  };

  const continueGame = () => {
    loadGame = true;
    playing = true;
  };
</script>

<style>
  div {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
  }
</style>

<bg />
<main>
  {#if !playing}
    <div>
      <MainMenu on:newGame={newGame} on:continueGame={continueGame} />
    </div>
  {:else}
    <Game {loadGame} />
  {/if}
</main>
