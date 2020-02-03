<script>
  import { createEventDispatcher } from "svelte";
  import Modal from "../Modal.svelte";
  import CommandEditor from "./CommandEditor.svelte";
  import Command from "./Command.svelte";

  export let obj = {};

  const dispatch = createEventDispatcher();

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

    obj[prop] = [];
  };

  const newFeature = () => {
    let slug = prompt("Enter new feature slug:", "");
    if (!slug) {
      return;
    }

    obj.features = [
      ...obj.features,
      {
        type: "feature",
        slug,
        cmds: { look: [] },
        description: ""
      }
    ];
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
    obj = obj;
  };

  const deleteFeature = ixToRemove => {
    if (confirm("Really delete?")) {
      obj.features = obj.features.filter((_, ix) => ix !== ixToRemove);
    }
  };
</script>

<style>
  input[type="text"],
  textarea {
    font-size: 1em;
  }
  button {
    font-size: 0.75em;
    color: #222;
    background-color: #ddd;
    cursor: pointer;
    border-radius: 0.33em;
  }
  sub {
    display: flex;
    flex-direction: column;
    margin-left: 2em;
    border: 1px #ddd solid;
    padding: 1em;
    margin-bottom: 1em;
  }
  .del-row {
    text-align: right;
  }
  .delete-button {
    background-color: pink;
    margin-top: 1em;
  }
</style>

{#if obj.hasOwnProperty('name')}
  <input
    bind:value={obj.name}
    type="text"
    placeholder="Name (shown to player)" />
{/if}
<input
  type="text"
  placeholder="slug (UNIQUE; for targeting)"
  bind:value={obj.slug} />
{#if obj.hasOwnProperty('description')}
  <textarea
    placeholder="description (shown when entering a room and looking)"
    bind:value={obj.description} />
{/if}
{#if obj.type === 'feature'}
  <input
    type="text"
    placeholder="not targetable until this flag is true (leave blank if targetable by default, prepend with 'G.' if global flag)"
    bind:value={obj.targetFlag} />
{/if}
{#if obj.cmds}
  {#each Object.keys(obj.cmds) as prop, ix}
    <Command
      cmdList={obj.cmds}
      name={prop}
      index={ix}
      on:newCmd={({ detail }) => newCmd(detail)} />
  {/each}
{/if}
<div>
  <button on:click={newProp}>+New Property</button>
</div>
{#if obj.type === 'room'}
  <h3>Features</h3>
  {#each obj.features as feat, ix}
    <sub>
      <svelte:self obj={feat} />
      <div class="del-row">
        <button class="delete-button" on:click={() => deleteFeature(ix)}>
          x Delete
        </button>
      </div>
    </sub>
  {/each}
  <div>
    <button on:click={newFeature}>+New Feature</button>
  </div>
{/if}

{#if cmdEditorVisible}
  <Modal>
    <CommandEditor
      on:save={saveCmd}
      on:close={() => (cmdEditorVisible = false)}
      cmd={editCmd} />
  </Modal>
{/if}
