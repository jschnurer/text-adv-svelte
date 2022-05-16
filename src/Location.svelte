<script>
  export let coords = "";
  export let hasCompass = false;
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
  }

  h4 {
    margin: 0;
  }
</style>

{#if coords}
  <div class="location">
    {#if hasCompass}
      <h4>{coords}</h4>
    {:else}
      <h4>{coords.substring(0, coords.indexOf(' '))}</h4>
    {/if}
  </div>
{/if}
