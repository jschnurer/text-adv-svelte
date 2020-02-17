<script>
  import CmdListEditor from "./CmdListEditor.svelte";

  export let featuresList = [];
  export let index = -1;

  const notDynProps = ["slug", "altSlugs"]
  $: properties = Object.keys(featuresList[index]).filter(x => notDynProps.indexOf(x) === -1);
</script>

<style>
  div {
    border-left: 1px gray solid;
    padding-left: 1em;
    margin-bottom: .5em;
  }
</style>

<div>
  <input bind:value={featuresList[index].slug} placeholder="slug" />
  <input bind:value={featuresList[index].altSlugs} placeholder="altSlugs comma delimited" />
  {#each properties as prop}
    <frow>
      <button>x</button><label>{prop}</label>
      <CmdListEditor obj={featuresList[index]} prop={prop} />
    </frow>
  {/each}
</div>
