<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let showHints = false;
  $: onOrOff = showHints ? "on" : "off";
  $: opposite = showHints ? "off" : "on";

</script>

<style>
  p {
    margin: initial 1em;
  }
</style>

<h3>Help</h3>
<room>
  <h4>Playing the Game</h4>
  <p>Control the game and interact with the world by typing commands.</p>
  <p>
    You can do things like "look" (l) or "take" (t) (and many other things too!)
    When you want to interact with something specific, type it after your
    command. The commands should be very simple. For example, instead of saying
    "look at the tree" you would say "look tree". Generally, anything you type
    should be either one or two words (separated by a space). Sometimes,
    however, you may have to type more words to interact with certain objects.
    For example, if you see "scorch marks" and want to look at them, you would
    have to type "look scorch marks" since typing "look marks" or "look scorch"
    doesn't really convey what you want to do.
  </p>
  <p>
    The game will display the 30 most recent messages. You can scroll to review
    old message if you think it would help. If it ever gets unbearable and you
    want a blank slate, you can use the "clear" (cl) command to clear out all
    messages. Afterward, you should "look" again or else you're just looking at
    a blank screen.
  </p>
  <h4>Exploring the World</h4>
  <p>
    You can move between areas by using the commands "north" (n), "south" (s),
    "east" (e), "west" (w), "up" (u), and "down" (d). Area descriptions will
    tell you the directions you're able to move.
  </p>
  <h4>Items and Inventory</h4>
  <p>
    When you acquire things in the game, they are added to your inventory. You
    can carry a LOT of stuff. You can check what with the "inventory" (or "i")
    command! You can look at things in your inventory too! In fact, you can do
    all sorts of things to the stuff in your inventory.
  </p>
  <h4>Advice</h4>
  <p>
    You should probably "look" at things a lot. Who know's what might be useful
    or hiding something else? And death lurks around every corner. You can also
    look at the area you're in by typing just "look" without a target.
  </p>
  <p>
    Throughout the game world you may come across cairns. In the game world,
    these are small stacks of stones measuring only 2-3 feet tall that are
    imbued with some sort of supernatural power to aid travelers and explorers.
    When you find one in the world, you should "touch" it. When you touch one,
    you attune your soul to the cairn. If your adventure is cut short by
    tragedy, you can restart from the last cairn you touched.
  </p>
  <h4>Hint System</h4>
  <p>
    If you're having a really hard time, you can turn on hints. This will cause
    <hint>interactable objects</hint>
    in the game world to be visually identifiable with an underline. I
    <b>strongly recommend</b>
    trying to play the game without hints first because part of the fun of
    playing a text adventure is investigating the environment yourself.
  </p>
  <p>
    Hints are currently {onOrOff}. <button on:click={() => dispatch('toggleHints')}>Turn hints {opposite}</button>
  </p>
</room>
