<script>
  import { onMount } from "svelte";
  import config from "./config.json";

  let gameVars = {};
  let room = null;
  let text = "";
  let title = "";
  let entry = "";
  let output = null;

  onMount(async () => {
    const resp = await fetch(
      `/Rooms/${config.initial_area}/${config.initial_room}.json`
    );
    const j = await resp.json();
    start(j);
  });

  const start = r => {
    room = r;

    title = r.name;

    look();
  };

  const parseRoomCmds = cmds => {
    cmds.forEach(cmd => {
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
          if (!gameVars[room.name]) {
            gameVars[room.name] = {};
          }
          ifVar.apply(this, [gameVars[room.name], ...cmd.args]);
          break;
        case "setLVar":
          if (!gameVars[room.name]) {
            gameVars[room.name] = {};
          }
          setVar.apply(this, [gameVars[room.name], ...cmd.args]);
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

  const showFeatures = features => {
    features
      .filter(x => !x.needNotice)
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
      default:
        unknownCmd(cmd);
        break;
    }
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
    } else {
      // TODO: check look target
    }
  };

  const unknownCmd = cmd => {
    write(`I don't know how to ${cmd}.`);
  };

  const unknownTargets = targets => {
    let t = targets.join(", ");
    write(`I'm not sure what a ${t} is.`);
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
