<script>
  export let obj = {};
  export let prop = "";
</script>

<style>
  div {
    border-left: 1px gray solid;
    padding-left: 1em;
  }
  input {
    display: inline-block;
  }
  .b {
    display: block;
  }
</style>

{#if !obj[prop]}
  <button>+Cmd</button>
{/if}

{#if obj[prop]}
  {#if typeof obj[prop] === 'string'}
    <input bind:value={obj[prop]} />
    <button>x</button>
  {:else}
    <div>
      {#each obj[prop] as cmd, ix}
        <svelte:self obj={obj[prop]} prop={ix} />
      {/each}
      <button class="b">+</button>
    </div>
  {/if}
{/if}
