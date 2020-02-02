<script>
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";

  export let width = undefined;

  const dispatch = createEventDispatcher();

  function close() {
    dispatch("close");
  }
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
    z-index: 1000;
    background-color: #fff;
    padding: 1em;
    position: fixed;
    border: 1px solid #eee;
    border-radius: 5px;
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
</style>

<fade transition:fade={{ duration: 200 }} />
<modal
  style={width ? 'width:' + width + 'px' : ''}
  transition:fly={{ y: 25, duration: 300 }}>
  <slot />
</modal>
