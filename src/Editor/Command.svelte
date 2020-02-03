<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let cmdList = [];
  export let index = -1;
  export let name = "";

  const changeFlag = (cmdName) => {
    let cmd = cmdList[cmdName][0];
    let argsList = cmd.args;

    let newVal = prompt('Enter flag', argsList[0]);
    if(newVal) {
      argsList[0] = newVal;
    }
  }
</script>

<style>
  .cmd {
    margin: 0.5em 0;
    border-top: 1px #aaa solid;
    padding-top: 0.5em;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  .cmd-0 {
    border-top: none;
  }
  .cmd > label {
    flex-grow: 0;
    flex-basis: 6em;
    flex-shrink: 0;
    font-weight: bold;
    
    white-space: -moz-pre-wrap !important;  /* Mozilla, since 1999 */
    white-space: -webkit-pre-wrap; /*Chrome & Safari */ 
    white-space: -pre-wrap;        /* Opera 4-6 */
    white-space: -o-pre-wrap;      /* Opera 7 */
    white-space: pre-wrap;         /* CSS3 */
    word-wrap: break-word;         /* Internet Explorer 5.5+ */
    word-break: break-all;
    white-space: normal;
  }
  .cmd > .cmd-list {
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
  }
  .cmd-list > div {
    border-top: 1px #666 solid;
    padding: .2em 0;
  }
  button {
    font-size: 0.75em;
    color: #222;
    background-color: #ddd;
    cursor: pointer;
    border-radius: 0.33em;
  }
</style>

<div class="cmd cmd-{index}">
  <label>{name}</label>
  <div class="cmd-list">
    {#each cmdList[name] as cmd}
      {#if typeof cmd === 'string'}
        <div>{cmd}</div>
      {:else}
        <div>
          {#if cmd.cmd === "ifFlag"}
            <div>If Flag <button on:click={() => changeFlag(name)}>{cmd.args[0]}</button> is true:</div>
            {#if cmd.args[1]}
              <svelte:self cmdList={cmd.args} name="1" index={1} />
            {/if}
            <div>else:</div>
            {#if cmd.args[2]}
              <svelte:self cmdList={cmd.args} name="2" index={2} />
            {/if}
          {/if}
        </div>
      {/if}
    {/each}
    <div>
      <button on:click={() => dispatch('newCmd', cmdList[name])}>
        +New Step
      </button>
    </div>
  </div>
</div>
