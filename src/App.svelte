<script>
  import { onMount } from "svelte";
  import config from "./config.json";
  let output = null;
  
  let items = [];

  let inventory = [];
  let gameVars = {};

  let rooms = {};

  let room = null;
  let text = "";
  let title = "";
  
  let entry = "";

  onMount(async () => {
    const resp = await fetch(
      `/Rooms/${config.initial_area}/${config.initial_room}.json`
    );
    const j = await resp.json();

    rooms[`${j.area}/${j.name}`] = j;

    const itemsF = await fetch(
      `/Rooms/${config.initial_area}/${config.initial_room}.json`
    );
    const itemsJ = await itemsF.json();
    items = itemsJ;

    start(rooms[`${j.area}/${j.name}`]);
  });

  const start = r => {
    room = r;

    title = r.name;

    look();
  };

  const parseRoomCmds = cmds => {
    cmds.forEach(cmd => {
      if (typeof cmd === "string") {
        write(cmd);
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
    features
      .filter(x => !x.hidden)
      .forEach(f => {
        write(f.description);
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

      if (room.onLook) {
        parseRoomCmds(room.onLook);
      }

      write("...");
    } else {
      let t = findTarget(target);

      if (!t) {
        write(`I don't see ${target} anywhere.`);
        return;
      }

      if (t.onLook) {
        parseRoomCmds(t.onLook);
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

      if (t.onTake) {
        parseRoomCmds(t.onTake);
      } else {
        write("I can't take that.");
      }
    }
  };

  const findTarget = slug => {
    // TODO: search other places for the target too! (e.g. inventory)
    return room.features.find(x => {
      if (x.slug === slug) {
        if (x.untargetableUntilLVar) {
          if (getLocalVars()[x.untargetableUntilLVar]) {
            return true;
          } else {
            return false;
          }
        } else if (x.untargetableUntilGVar) {
          if (gameVars[x.untargetableUntilGVar]) {
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
  };

  const listInventory = () => {
    text = "You check what you're carrying...";
    if (inventory.length) {
      write("You have:");
      inventory.forEach(x => write(x));
    } else {
      write("I don't have anything.");
    }
  }

  const unknownCmd = cmd => {
    write(`I don't know how to ${cmd}.`);
  };

  const unknownTarget = target => {
    write(`I don't see ${target} anywhere.`);
  };
</script>

<main>
  <room bind:this={output}>
    <h3>{title}</h3>
    {#each text.split('\n') as line}
      <p>{line}</p>
    {/each}
  </room>
  <form on:submit|preventDefault={submit}>
    <input use:focus bind:value={entry} />
  </form>
</main>
