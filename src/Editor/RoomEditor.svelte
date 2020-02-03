<script>
  import { onMount } from "svelte";
  import getGameState from "../Helpers/getGameState.js";
  import Modal from "../Modal.svelte";
  import Editor from "./Editor.svelte";

  export let area = "";
  export let slug = "";

  let output = "";

  let room = {
    type: "room",
    name: "",
    slug: "",
    description: "",
    cmds: {},
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
          feature[cmdName].forEach((x, arrIx) => {
            if (typeof x === "object") {
              x.args.forEach((val, ix) => {
                if(typeof val === 'object' && val.length === 0) {
                  feature[cmdName][arrIx].args[ix] = null;
                }
              });
            }
          });
        });

        delete feature.cmds;
        delete feature.type;
      });
    }

    output = JSON.stringify(outRoom, null, 2);
  };

  onMount(() => {
    if (slug) {
      let gs = getGameState();
      let loadRoom = gs.rooms[`${area}/${slug}`];

      room.name = loadRoom.name;
      room.slug = loadRoom.slug;
      room.description = loadRoom.description;

      let dontCopy = ["features", "name", "slug", "description"];
      Object.keys(loadRoom)
        .filter(x => dontCopy.indexOf(x) === -1)
        .forEach(x => {
          room.cmds[x] = loadRoom[x];
        });

      if (loadRoom.features) {
        let notCmdsFeat = ["name", "slug", "description", "targetFlag"];

        loadRoom.features.forEach(feat => {
          let loadFeat = { type: "feature", cmds: [] };
          Object.keys(feat).forEach(prop => {
            if (notCmdsFeat.indexOf(prop) > -1) {
              loadFeat[prop] = feat[prop];
            } else {
              feat[prop].forEach(x => {
                if (typeof x === "object") {
                  if (x.cmd === "ifFlag") {
                    if (x.args[1] === null) {
                      x.args[1] = [];
                    }

                    if (x.args[2] === null) {
                      x.args[2] = [];
                    }
                  }
                }
              });

              loadFeat.cmds[prop] = feat[prop];
            }
          });
          room.features.push(loadFeat);
        });

        room.features = room.features;
      }
    }
  });
</script>

<style>
  main {
    width: 90vw;
    height: 90vh;
    overflow: auto;
    display: flex;
  }
  textarea {
    font-size: 0.75em;
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
