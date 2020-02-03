<script>
  import Modal from "../Modal.svelte";
  import Editor from "./Editor.svelte";

  let output = "";

  let room = {
    type: "room",
    name: "",
    slug: "",
    description: "",
    cmds: {
      look: []
    },
    features: []
  };

  const exportJson = () => {
    let outRoom = {};

    Object.keys(room)
      .filter(x => x != "cmds" && x != "type")
      .forEach(propName => {
        outRoom[propName] = room[propName];
      });

    Object.keys(room.cmds).forEach(cmdName => {
      outRoom[cmdName] = room.cmds[cmdName];
    });

    if (outRoom.features) {
      outRoom.features.forEach(feature => {
        Object.keys(feature.cmds).forEach(cmdName => {
          feature[cmdName] = feature.cmds[cmdName];
        });

        delete feature.cmds;
        delete feature.type;
      });
    }

    output = JSON.stringify(outRoom, null, 2);
  };
</script>

<style>
  main {
    width: 90vw;
    height: 90vh;
    overflow: auto;
    display: flex;
  }
  textarea {
    font-size: .75em;
    min-height: 15em;
  }
</style>

<bg />
<main>
  <button class="save-button" on:click={exportJson}>Export JSON</button>
  <Editor obj={room} />
</main>

{#if output}
  <Modal>
    <textarea>{output}</textarea>
    <button on:click={() => (output = '')}>Close</button>
  </Modal>
{/if}
