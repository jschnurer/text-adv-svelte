<script>
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";

  export let width;
  export let height;
  export let showClose = false;

  const dispatch = createEventDispatcher();
  let windowWidth = 0;

  $: widthStyle = width ? `width: ${width};` : "";
  $: heightStyle = height ? `height: ${height};` : "";
  $: modalStyle = widthStyle + heightStyle;

  const getTransition = () => {
    if (windowWidth > 500) {
      return { y: 25, duration: 300 };
    } else {
      return { y: 0, duration: 300 };
    }
  };
</script>

<style>
  fade {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: black;
    opacity: 0.85;
    z-index: 1000;
  }
  modal {
    background-color: white;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    z-index: 1000;
    background-color: #fff;
    padding: 1em;
    position: fixed;
    border: 1px solid #eee;
    border-radius: 5px;
    overflow: auto;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    color: #222;
    width: 100%;
    box-sizing: border-box;
  }
  @media (min-width: 500px) {
    modal {
      max-height: calc(100% - 40px);
      min-width: 500px;
      width: auto;
      left: 50%;
      top: 50%;
      right: initial;
      bottom: initial;
      -webkit-transform: perspective(1px) translateY(-50%) translateX(-50%);
      transform: perspective(1px) translateY(-50%) translateX(-50%);
    }
  }

  span {
    position: absolute;
    top: 0;
    right: 0.2em;
    font-variant: small-caps;
    color: black;
    cursor: pointer;
    padding: 0.5em;
    z-index: 1;
  }

  span:hover {
    background-color: rgb(244, 0, 0, 0.2);
  }

  .showClose {
    padding-top: 1.5em;
  }
</style>

<svelte:window bind:innerWidth={windowWidth} />

<fade transition:fade={{ duration: 200 }} />
<modal class:showClose style={modalStyle} transition:fly={getTransition()}>
  {#if showClose}
    <span on:click={() => dispatch('close')}>x</span>
  {/if}
  <slot />
</modal>