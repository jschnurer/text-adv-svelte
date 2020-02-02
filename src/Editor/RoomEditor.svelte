<script>
  import Modal from "../Modal.svelte";
  import CommandEditor from "./CommandEditor.svelte";

  let room = {
    look: []
  };
  let saver;
  let editCmd = null;
  let cmdEditorVisible = false;

  const newProp = () => {
    let prop = prompt("Enter new prop name:", "");
    if (!prop) {
      return;
    }

    room[prop] = [];
  };

  const newCmd = (prop) => {
    prop = [...prop, ""];
    saver = (newVal) =>  {
      prop[prop.length - 1] = newVal
    };
    editCmd = prop[prop.length - 1];
    cmdEditorVisible = true;
  };

  const saveCmd = ({detail}) => {
    // todo: this doesn't work.
    saver(detail);
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
  content > div {
    margin: 0.5em 0;
    border-top: 1px #aaa solid;
    padding-top: 0.5em;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  content > div:first-child {
    border-top: none;
  }
  content > div > label {
    width: 10em;
  }
  content > div > div {
    flex: auto;
  }
  span {
    display: block;
  }
</style>

<bg />
<main>
  <input class="room-name" type="text" placeholder="Room Name" />
  <content>
    {#each Object.keys(room) as prop}
      <div>
        <label>{prop}</label>
        {#each room[prop] as cmd}
          <span>{cmd}</span>
        {/each}
        <div>
          <button on:click={() => newCmd(room[prop])}>+</button>
        </div>
      </div>
    {/each}
    <div>
      <button on:click={newProp}>+</button>
    </div>
  </content>
</main>

{#if cmdEditorVisible}
  <Modal>
    <CommandEditor on:save={saveCmd} on:close={() => (cmdEditorVisible = false)} cmd={editCmd} />
  </Modal>
{/if}
