<script>
  import { onMount } from "svelte";
  import verbs from "./verbs.json";
  import config from "./config.json";

  let output = null;
  let helpVisible = false;

  let items = [];

  let inventory = [];
  let gameVars = {};

  let rooms = {};

  let isGameOver = false;
  let room = null;
  let text = "";
  let title = "";

  let entry = "";

  let choiceObj;

  onMount(async () => {
    await loadRoom(`${config.initial_area}/${config.initial_room}`);

    const itemsF = await fetch(`${window.hostDir}/items.json`);
    const itemsJ = await itemsF.json();
    items = itemsJ;
  });

  const getRoom = async roomAreaSlug => {
    const resp = await fetch(`${window.hostDir}/Rooms/${roomAreaSlug}.json`);
    const j = await resp.json();
    return j;
  };

  const parseRoomCmds = (cmds, feature) => {
    let bail = false;

    cmds.forEach(cmd => {
      if (bail) {
        return;
      }

      if (typeof cmd === "string") {
        if (!parseStringCmd(cmd, feature)) {
          bail = true;
        }
        return;
      }
      switch (cmd.cmd) {
        case "write":
          write.apply(this, cmd.args);
          break;
        case "ifGVar":
          ifVar.apply(this, [gameVars, ...cmd.args, feature]);
          break;
        case "setGVar":
          setVar.apply(this, [gameVars, ...cmd.args, feature]);
          break;
        case "ifLVar":
          ifVar.apply(this, [getLocalVars(), ...cmd.args, feature]);
          break;
        case "setLVar":
          setVar.apply(this, [getLocalVars(), ...cmd.args, feature]);
          break;
        case "addItem":
          addItem.apply(this, cmd.args);
          break;
        case "removeItem":
          removeItem.apply(this, cmd.args);
          break;
        case "destroyFeature":
          destroyFeature.apply(this, cmd.args);
          break;
        case "ifRoom":
          ifRoom.apply(this, cmd.args);
          break;
        case "choice":
          choice.apply(this, cmd.args);
          break;
      }
    });
  };

  const parseStringCmd = (cmd, feature) => {
    let chunks = cmd.split(":");

    if (cmd.startsWith("SETFLAG")) {
      let vars = getLocalVars();
      vars[chunks[1]] = true;
      return true;
    } else if (cmd.startsWith("CHECKFLAG")) {
      let vars = getLocalVars();
      return !!vars[chunks[1]];
    } else if (cmd.startsWith("ADDITEM")) {
      addItem(chunks[1]);
      return true;
    } else if (cmd.startsWith("REMOVEITEM")) {
      removeItem(chunks[1]);
      return true;
    } else if (cmd.startsWith("DESTROY")) {
      if (cmd === "DESTROY") {
        destroyFeature(feature.slug);
        return true;
      } else {
        // TODO: allow destroying other things
        return true;
      }
    } else if (cmd.startsWith("UPDATELOOK")) {
      let numChunks = cmd.length;
      if (numChunks === 2) {
        // TODO: Update own look
      } else if (numChunks >= 3) {
        // update other look
        let f = getFeature(chunks[1]);
        f.look = [chunks[2]];
      }
      return true;
    } else if (cmd.startsWith("GAMEOVER")) {
      gameOver(chunks[1]);
      return false;
    } else if (cmd.startsWith("INVOKEROOM")) {
      invokeRoom(chunks[1]);
      return false;
    } else if (cmd.startsWith("UPDATEROOMDESC")) {
      updateRoomDesc(chunks[1], chunks[2]);
      return true;
    } else if (cmd.startsWith("UNKNOWNTARGET")) {
      unknownTarget(feature.slug);
      return true;
    } else {
      write(cmd);
      return true;
    }
  };

  const getFeature = slug => {
    return room.features.find(x => x.slug === slug);
  };

  const updateRoomDesc = (slug, roomDesc) => {
    let f = getFeature(slug);
    f.roomDesc = roomDesc;
  };

  const write = msg => {
    text += "\n" + msg;

    output.scrollTop = output.scrollHeight;
  };

  const ifVar = (vars, name, checkVal, trueCmds, falseCmds, feature) => {
    if ((checkVal == false && !(name in vars)) || vars[name] == checkVal) {
      parseRoomCmds(trueCmds, feature);
    } else {
      if (falseCmds) {
        parseRoomCmds(falseCmds, feature);
      }
    }
  };

  const ifRoom = (roomAreaSlug, trueCmds, falseCmds, feature) => {
    if (roomAreaSlug === `${room.area}/${room.slug}`) {
      parseRoomCmds(trueCmds, feature);
    } else if (falseCmds) {
      parseRoomCmds(falseCmds, feature);
    }
  };

  const setVar = (vars, name, value) => {
    vars[name] = value;
  };

  const addItem = slug => {
    inventory.push(Object.assign({}, items.find(x => x.slug === slug)));
  };

  const removeItem = slug => {
    inventory = inventory.filter(x => x.slug !== slug);
  };

  const destroyFeature = slug => {
    room.features = room.features.filter(x => x.slug !== slug);
  };

  const getLocalVars = () => {
    if (!gameVars[room.name]) {
      gameVars[room.name] = {};
    }

    return gameVars[room.name];
  };

  const showFeatures = features => {
    let lVars = getLocalVars();
    let gVars = gameVars;

    features
      .filter(x => x.roomDesc && !x.hidden)
      .forEach(f => {
        write(f.roomDesc);
      });
  };

  const choice = (repeatText, options, resolutionObj) => {
    choiceObj = {
      repeat: repeatText,
      options,
      resolution: resolutionObj
    };
  };

  const focus = el => {
    el.focus();
  };

  const submit = () => {
    if (choiceObj) {
      handleChoiceInput();
      entry = "";
      return;
    }

    let chunks = entry
      .toLowerCase()
      .split(/ (.+)/)
      .filter(x => x);
    let cmd = chunks[0];
    let args = chunks.filter((_, ix) => ix > 0);
    let target = null;
    entry = "";

    if (!verbs.find(x => x === cmd)) {
      unknownCmd(cmd);
      return;
    }

    if (args.length > 0) {
      target = findTarget(args[0]);
      if (!target) {
        unknownTarget(args[0]);
        return;
      }
    }

    if (target && target[cmd]) {
      parseRoomCmds(target[cmd], target);
      return;
    }

    switch (cmd) {
      case "look":
      case "l":
        look.apply(this, args);
        break;
      case "inventory":
        listInventory();
        break;
      case "take":
        take(target);
        break;
      case "north":
      case "n":
        move("north");
        break;
      case "south":
      case "s":
        move("south");
        break;
      case "east":
      case "e":
        move("east");
        break;
      case "west":
      case "w":
        move("west");
        break;
      default:
        unknownCmd(cmd);
        break;
    }
  };

  const handleChoiceInput = () => {
    if (
      choiceObj.options
        .map(x => x.toLowerCase())
        .indexOf(entry.toLowerCase()) === -1
    ) {
      write(choiceObj.repeat);
      return;
    }
    let resolutionPath = choiceObj.resolution[entry.toLowerCase()];
    choiceObj = null;
    parseRoomCmds(resolutionPath);
  };

  const look = target => {
    if (!target) {
      if (room.description) {
        text = room.description;
      }

      if (room.features) {
        showFeatures(room.features);
      }

      if (room.look) {
        parseRoomCmds(room.look);
      }

      write("...");
    } else {
      let t = findTarget(target);

      if (!t) {
        write(`I don't see ${target} anywhere.`);
        return;
      }

      if (t.look) {
        parseRoomCmds(t.look);
      } else {
        write(t.description);
      }
    }
  };

  const take = target => {
    if (!target) {
      write("Take what?");
    } else {
      if (target.take) {
        parseRoomCmds(target.take, target);
      } else {
        write("You can't take that.");
      }
    }
  };

  const findTarget = slug => {
    let roomFeature = room.features.find(x => {
      if (x.slug === slug) {
        if (x.targetFlag) {
          if (getLocalVars()[x.targetFlag] || gameVars[x.targetFlag]) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    });

    if (roomFeature) {
      return roomFeature;
    }

    let invItem = inventory.find(x => x.slug === slug);

    return invItem;
  };

  const listInventory = () => {
    text = "You check what you're carrying...";
    if (inventory.length) {
      write("You have:");
      inventory.forEach(x => write(x.slug));
      write("...");
    } else {
      write("You don't have anything.");
      write("...");
    }
  };

  const move = dir => {
    if (!room[dir]) {
      write("You can't go that way.");
      return false;
    }

    loadRoom(room[dir]);
  };

  const throwItem = slug => {
    if (!inventory.filter(x => x.slug === slug)) {
      write(`You don't have a ${slug}.`);
      return false;
    }

    if (!room.throw || !room.throw[slug]) {
      write(`You don't see any reason to.`);
      return false;
    }

    parseRoomCmds(room.throw[slug]);
  };

  const invokeRoom = cmdName => {
    parseRoomCmds(room[cmdName]);
  };

  const loadRoom = async roomAreaSlug => {
    if (rooms[roomAreaSlug]) {
      room = rooms[roomAreaSlug];
      title = room.name;
      look();
    } else {
      let j = await getRoom(roomAreaSlug);
      rooms[roomAreaSlug] = j;
      room = rooms[roomAreaSlug];
      title = room.name;
      look();
    }
  };

  const gameOver = msg => {
    title = "GAME OVER";
    text = msg;
    isGameOver = true;
  };

  const unknownCmd = cmd => {
    write(`You don't know how to ${cmd}.`);
  };

  const unknownTarget = target => {
    write(`You don't see ${target} anywhere.`);
  };

  const help = () => {
    helpVisible = true;
  };
</script>

<style>
  form {
    display: flex;
    flex-direction: row;
  }

  form > input {
    flex: auto;
  }

  form > span {
    background-color: transparent;
    color: white;
    border: 1px white solid;
    border-radius: 2em;
    vertical-align: middle;
    height: 1.5em;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    padding: 0 0.2em;
    margin: 0.3em 0 0 0.5em;
  }
</style>

<bg />
<main>
  {#if helpVisible}
    <h3>Help</h3>
    <p>
      Type commands to try things in the game. You can move between areas by
      using the commands "north", "south", "east", and "west" (or "n", "s", "e",
      "w" for short).
    </p>
    <p>
      You can do things like "look" or "take" (and many other things too!) When
      you want to interact with something specific, type it after your command.
      The commands should be very simple. For example, instead of saying "look
      at the tree" you would say "look tree". Generally, anything you type
      should be either one or two words (separated by a space).
    </p>
    <p>You can check what you're carrying with the "inventory" command too!</p>
    <p>
      Hint: You should probably "look" at things a lot. Who know's what might be
      useful? And death lurks around every corner.
    </p>
    <p>&nbsp;</p>
    <button on:click={() => (helpVisible = false)}>Ok, ok. Let me play!</button>
  {:else}
    <room bind:this={output}>
      <h3>{title}</h3>
      {#each text.split('\n') as line}
        <p>{line}</p>
      {/each}
    </room>
    {#if !isGameOver}
      <form on:submit|preventDefault={submit}>
        <input use:focus bind:value={entry} />
        <span on:click={help}>❔</span>
      </form>
    {:else}
      <button on:click={() => location.reload()}>Try again</button>
    {/if}
  {/if}
</main>
