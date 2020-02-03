<script>
  import Modal from "../Modal.svelte";
  import CommandEditor from "./CommandEditor.svelte";
  import Command from "./Command.svelte";

  let output = '';

  let room = {
    name: "",
    slug: "",
    description: "",
    exits: {
      north: [],
      south: [],
      east: [],
      west: []
    },
    cmds: {
      look: []
    }
  };

  let saver;
  let cmdList = null;
  let cmdIx = -1;
  let editCmd = null;
  let cmdEditorVisible = false;

  const newProp = () => {
    let prop = prompt("Enter new prop name:", "");
    if (!prop) {
      return;
    }

    room[prop] = [];
  };

  const newCmd = prop => {
    // List of commands in this property.
    cmdList = prop;
    // Cmd to send to editor.
    editCmd = "";
    // Save index for updating later.
    cmdIx = prop.length;
    // Show editor
    cmdEditorVisible = true;
  };

  const saveCmd = ({ detail }) => {
    cmdList[cmdIx] = detail;
    room = room;
  };

  const exportJson = () => {
    output = JSON.stringify(room);
  }
</script>

<style>
  main {
    width: 90vw;
    height: 90vh;
    overflow: auto;
    display: flex;
  }
  content {
    flex: auto;
    overflow: auto;
  }
  input[type="text"],
  textarea {
    font-size: 1em;
  }
  .room-name {
    font-size: 1.25em !important;
    flex: auto;
  }
  button {
    font-size: 0.75em;
    color: #222;
    background-color: #ddd;
    cursor: pointer;
  }
  row {
    display: flex;
    flex-direction: row;
  }
  .save-button {
    flex: 0;
    display: block;
    padding: 0 2em;
  }
</style>

<bg />
<main>
  <row>
    <input
      class="room-name"
      type="text"
      placeholder="Room Name (shown to player)" />
      <button class="save-button" on:click={exportJson}>Export JSON</button>
  </row>
  <input type="text" placeholder="area/slug" />
  <textarea placeholder="description (shown when entering and looking)" />
  <content>
    <h3>Exits</h3>

    <h3>Commands</h3>
    {#each Object.keys(room.cmds) as prop, ix}
      <Command
        cmdList={room.cmds}
        name={prop}
        index={ix}
        on:newCmd={({ detail }) => newCmd(detail)} />
    {/each}
    <div>
      <button on:click={newProp}>+New Cmd</button>
    </div>
    <h3>Features</h3>
  </content>
</main>

{#if cmdEditorVisible}
  <Modal>
    <CommandEditor
      on:save={saveCmd}
      on:close={() => (cmdEditorVisible = false)}
      cmd={editCmd} />
  </Modal>
{/if}

{#if output}
  <Modal>
    <textarea>{output}</textarea>
    <button on:click={() => output = ""}>Close</button>
  </Modal>
{/if}