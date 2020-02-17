<script>
  import CmdListEditor from "./CmdListEditor.svelte";
  import Feature from "./Feature.svelte";
  import NewCmd from "./NewCmd.svelte";

  const dirs = ["north", "south", "east", "west", "up", "down"];
  const notDynamicProps = dirs.concat(["name", "slug", "description", "features"]);

  let newCmdVisible = true;

  let room = {
    north: ["loadRoom|blabla"],
    south: ["Something is amiss...", "loadRoom|blablabla2"],
    throw: [],
    features: [{
      "slug": "wooo",
      "look": ["there it is"]
    }]
  };

  $: dProps = Object.keys(room).filter(x => notDynamicProps.indexOf(x) === -1);
</script>

<style>
  .outer {
    padding: 0 1em;
  }
  h2,h4 {
    margin: 0 0 0.5em 0;
  }
  :global(input),
  :global(textarea) {
    display: block;
    font-size: initial;
    margin: 0 0 0.5em 0;
    flex: auto;
  }

  :global(button) {
    font-size: initial;
  }

  :global(label) {
    margin-right: 0.5em;
    font-size: initial;
    min-width: 80px;
  }

  :global(frow),
  :global(fcol) {
    flex: auto;
  }
</style>

<div class="outer">
  <h2>Room Editor</h2>
  <frow>
    <fcol>
      <input placeholder="name" bind:value={room.name} />
      <input placeholder="slug" bind:value={room.slug} />
      <textarea placeholder="description" bind:value={room.description} />
    </fcol>
    &nbsp;
    <fcol>
      {#each dirs as dir}
        <frow>
          <label>{dir}</label>
          <CmdListEditor obj={room} prop={dir} />
        </frow>
      {/each}
    </fcol>
  </frow>
  <h4>Other Room Props</h4>
  <fcol>
    {#each dProps as dProp}
      <frow>
        <label>{dProp}</label>
        <CmdListEditor obj={room} prop={dProp} />
      </frow>
    {/each}
  </fcol>
  <h4>Features</h4>
  <fcol>
    {#each room.features as feat, ix}
      <Feature featuresList={room.features} index={ix} />
    {/each}
  </fcol>
  <button on:click={() => console.log(room)}>Export Room to Json</button>
</div>

{#if newCmdVisible}
  <NewCmd />
{/if}