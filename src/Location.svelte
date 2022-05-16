<script>
  export let coords = "";
  export let hasCompass = false;
  export let isDark = false;
  export let isLightOn = false;
  export let exits = [];

  $: coordsNum = coords ? coords.split(" ")[1] : undefined;
  $: coordsXY =
    coordsNum && coordsNum !== "???"
      ? [coordsNum[0], Number(coordsNum[1])]
      : undefined;

  const letters = ["A", "B", "C", "D", "E", "F", "G"];
  const rows = [0, 1, 2, 3, 4, 5, 6];
</script>

<style>
  .location {
    z-index: 1;
    position: relative;
    box-shadow: 0 0 10em #222;
    background-color: #222;
    padding: 1em;
    flex: none;
    overflow: auto;
    align-self: flex-start;
    font-size: 0.85em;
    width: 270px;
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;
  }

  h4 {
    margin: 0;
  }

  .room {
    width: 5em;
    height: 5em;
    border: 1px gray solid;
    margin: 1em;
    position: relative;
  }

  .exit {
    position: absolute;
    width: 1em;
    height: 1em;
  }

  .north {
    top: -1.25em;
    left: 50%;
    transform: translateX(-50%);
  }

  .north::after {
    content: "🡅";
  }

  .south {
    bottom: -1.25em;
    left: 50%;
    transform: translateX(-50%);
  }

  .south::after {
    content: "🡇";
  }

  .east {
    right: -1.25em;
    top: 50%;
    transform: translateY(-50%);
  }

  .east::after {
    content: "🡆";
  }

  .west {
    left: -1.25em;
    top: 50%;
    transform: translateY(-50%);
  }

  .west::after {
    content: "🡄";
  }

  .up {
    left: 50%;
    top: 50%;
    transform: translate(-100%, -50%);
  }

  .up::after {
    content: "🠕";
  }

  .down {
    left: 50%;
    top: 50%;
    transform: translate(100%, -50%);
  }

  .down::after {
    content: "🠗";
  }

  table {
    border-spacing: 2px;
    margin: 0;
  }

  td {
    background-color: gray;
    width: 0.5em;
    height: 0.5em;
  }

  td.active {
    background-color: white;
  }
</style>

{#if coords}
  <div class="location">
    {#if isDark && !isLightOn}
      A Dark and Terrible Place...
    {:else}
      {#if hasCompass}
        <h4>{coords}</h4>
      {:else}
        <h4>{coords.substring(0, coords.indexOf(' '))}</h4>
      {/if}
      <div class="room">
        {#each exits as exit}
          <div class="exit {exit}" />
        {/each}
      </div>
    {/if}

    {#if coordsXY && hasCompass}
      <table class="map">
        {#each rows as num}
          <tr>
            {#each letters as letter}
              <td
                class={coordsXY[0] === letter && coordsXY[1] - 1 === num ? 'active' : ''} />
            {/each}
          </tr>
        {/each}
      </table>
    {/if}
  </div>
{/if}
