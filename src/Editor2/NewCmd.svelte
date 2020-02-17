<script>
  import { createEventDispatcher } from "svelte";
  let dispatch = createEventDispatcher();

  let cmdType = "write";

  const commands = {
    write: { group: "Common", label: "Write Text", obj: "text" },
    setFlag: { group: "Flags", label: "set flag = true", obj: "setFlag|" },
    unsetFlag: { group: "Flags", label: "set flag = false", obj: "unsetFlag|" },
    ifFlag: {
      group: "Conditionals",
      label: "if flag is true...",
      obj: {
        cmd: "ifFlag",
        args: ["flagName", [], []]
      }
    },
    loadRoom: { group: "Common", label: "load new room", obj: "loadRoom|" },
    addItem: { group: "Items", label: "add item", obj: "addItem|" },
    removeItem: { group: "Items", label: "remove item", obj: "removeItem|" },
    ifHasItem: {
      group: "Items",
      label: "if player has item...",
      obj: {
        cmd: "ifHasItem",
        args: ["itemId", [], []]
      }
    },
    incVar: { group: "Vars", label: "var++", obj: "incVar|" },
    decVar: { group: "Vars", label: "var--", obj: "decVar|" },
    ifVar: { group: "Conditionals", label: "if var ...", obj: {
      cmd: "ifVar",
      args: ["varName",">","value",[],[]]
    } },
    ifRoom: {
      group: "Conditionals",
      label: "if current room is...",
      obj: {
        cmd: "ifRoom",
        args: ["roomSlug", [], []]
      }
    },
    callCommon: {
      group: "Common",
      label: "call common",
      obj: "callCommon|funcName|roomName"
    },
    waitForInput: {
      group: "Common",
      label: "wait for input",
      obj: "waitForInput"
    },
    dialog: {
      group: "Common",
      label: "dialog",
      obj: {
        cmd: "dialog",
        args: {
          "": ["unknownTopicPhrase"]
        }
      }
    },
    choice: {
      group: "Common",
      label: "choice",
      obj: {
        cmd: "choice",
        args: [
          ["unknownChoiceResponse"],
          ["choice1", "choice2"],
          {
            choice1: [],
            choice2: []
          }
        ]
      }
    },
    saveGame: { group: "Common", label: "save game", obj: "saveGame" },
    gameOver: { group: "Common", label: "game over", obj: "gameOver|" }
  };

  $: cmdList = Object.keys(commands);
  $: groups = [...new Set(cmdList.map(x => commands[x].group))];

  const focus = el => el.focus();

  const save = cmd => {
    dispatch("save", commands[cmd].obj);
    dispatch("close");
  };
</script>

<style>
  container {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #111;
    padding: 1em;
  }
  header {
    display: block;
    font-size: 1.5em;
  }
  form {
    display: block;
    flex: auto;
    overflow: auto;
    overflow-x: hidden;
  }
  actions {
    display: block;
  }
  button {
    display: block;
    width: 100%;
  }
  button:hover {
    cursor: pointer;
    background-color: #fff;
  }
  div {
    column-count: 2;
    display: inline-block;
  }
</style>

<container>
  <header>New Command</header>
  <form on:submit|preventDefault={save}>
    <div>
      {#each groups as group}
        <h5>{group}</h5>
        {#each cmdList.filter(x => commands[x].group === group) as cmd}
          <button on:click={() => save(cmd)}>{commands[cmd].label}</button>
        {/each}
      {/each}
    </div>
  </form>
  <actions>
    <button style="width: auto;" on:click={() => dispatch('close')}>Cancel</button>
  </actions>
</container>
