<script>
  import { onMount } from "svelte";
  import config from "./config.json";
  let output = null;
  
  let items = [];

  let inventory = [];
  let gameVars = {};

  let rooms = {};

  let isGameOver = false;
  let room = null;
  let text = "";
  let title = "";
  
  let entry = "";

  onMount(async () => {
    await loadRoom(`${config.initial_area}/${config.initial_room}`);

    const itemsF = await fetch(
      `/items.json`
    );
    const itemsJ = await itemsF.json();
    items = itemsJ;
  });

  const getRoom = async (roomAreaSlug) => {
    const resp = await fetch(
      `/Rooms/${roomAreaSlug}.json`
    );
    const j = await resp.json();
    return j;
  }

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
          ifVar.apply(this, [gameVars, ...cmd.args]);
          break;
        case "setGVar":
          setVar.apply(this, [gameVars, ...cmd.args]);
          break;
        case "ifLVar":
          ifVar.apply(this, [getLocalVars(), ...cmd.args]);
          break;
        case "setLVar":
          setVar.apply(this, [getLocalVars(), ...cmd.args]);
          break;
        case "addItem":
          addItem.apply(this, cmd.args);
          break;
        case "destroyFeature":
          destroyFeature.apply(this, cmd.args);
          break;
      }
    });
  };

  const parseStringCmd = (cmd, feature) => {
    if (cmd.startsWith('SETFLAG')) {
      let vars = getLocalVars();
      vars[cmd.split(':')[1]] = true;
      return true;
    } else if (cmd.startsWith('CHECKFLAG')) {
      let vars = getLocalVars();
      return !!vars[cmd.split(':')[1]];
    } else if (cmd.startsWith('ADDITEM')) {
      inventory.push(Object.assign({}, items.find(x => x.slug === cmd.split(':')[1])));
      return true;
    } else if (cmd.startsWith('DESTROY')) {
      if (cmd === 'DESTROY') {
        destroyFeature(feature.slug);
        return true;
      } else {
        // TODO: allow destroying other things
        return true;
      }
    } else if(cmd.startsWith('UPDATELOOK')) {
      let chunks = cmd.split(':');
      let numChunks = cmd.length;
      if (numChunks === 2) {
        // TODO: Update own look
      } else if (numChunks >= 3) {
        // update other look
        let f = room.features.find(x => x.slug === chunks[1]);
        f.look = [ chunks[2] ];
      }
      return true;
    } else if(cmd.startsWith('GAMEOVER')) {
      let chunks = cmd.split(':');
      gameOver(chunks[1]);
      return false;
    } else {
      write(cmd);
      return true;
    }
  }

  const write = msg => {
    text += "\n" + msg;

    output.scrollTop = output.scrollHeight;
  };

  const ifVar = (vars, name, checkVal, trueCmds, falseCmds) => {
    if ((checkVal == false && !(name in vars)) || vars[name] == checkVal) {
      parseRoomCmds(trueCmds);
    } else {
      if (falseCmds) {
        parseRoomCmds(falseCmds);
      }
    }
  };

  const setVar = (vars, name, value) => {
    vars[name] = value;
  };

  const addItem = (slug) => {
    inventory.push(Object.assign({}, items[slug]));
  }

  const destroyFeature = (slug) => {
    room.features = room.features.filter(x => x.slug !== slug);
  }

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

  const focus = el => {
    el.focus();
  };

  const submit = () => {
    let chunks = entry.split(/ (.+)/).filter(x => x);
    let cmd = chunks[0];
    let args = chunks.filter((_, ix) => ix > 0);
    switch (cmd) {
      case "look":
        look.apply(this, args);
        break;
      case "inventory":
        listInventory();
        break;
      case "take":
        take.apply(this, args);
        break;
      case "north":
        move("north");
        break;
      case "south":
        move("south");
        break;
      case "east":
        move("east");
        break;
      case "west":
        move("west");
        break;
      default:
        unknownCmd(cmd);
        break;
    }
    entry = "";
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
      let t = findTarget(target);

      if (!t) {
        unknownTarget(target);
        return;
      }

      if (t.take) {
        parseRoomCmds(t.take, t);
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
    } else {
      write("You don't have anything.");
    }
  }

  const move = (dir) => {
    if (!room[dir]) {
      write("You can't go that way.");
      return false;
    }

    loadRoom(room[dir]);
  }

  const loadRoom = async (roomAreaSlug) => {
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
  }

  const gameOver = (msg) => {
    title = "GAME OVER";
    text = msg;
    isGameOver = true;
  }

  const unknownCmd = cmd => {
    write(`I don't know how to ${cmd}.`);
  };

  const unknownTarget = target => {
    write(`You don't see ${target} anywhere.`);
  };
</script>

<main>
  <room bind:this={output}>
    <h3>{title}</h3>
    {#each text.split('\n') as line}
      <p>{line}</p>
    {/each}
  </room>
  {#if !isGameOver}
    <form on:submit|preventDefault={submit}>
      <input use:focus bind:value={entry} />
    </form>
  {:else}
    <button on:click={() => location.reload()}>Try again</button>
  {/if}
</main>
