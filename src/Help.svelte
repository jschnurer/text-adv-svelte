<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let allowTogglingHints = false;
  export let showHints = false;
  $: onOrOff = showHints ? "on" : "off";
  $: opposite = showHints ? "off" : "on";
</script>

<h3>Help</h3>
<room>
  <h4>Playing the Game</h4>
  <p>Control the game and interact with the world by typing commands.</p>
  <p>
    You play Adventure by typing commands into the textbox and pressing Enter.
    Many commands have a shorthand so you don't have to type the entire word.
    For example, "look" is a command you should use A LOT. Instead of typing
    "look" all the time, you can just enter "l". Whenever a command is mentioned
    below, its shortcut (if there is one) is written after it in parentheses.
  </p>
  <p>
    You can do things like "look" (l) or "take" (t) (and many other things too!)
    When you want to interact with something specific, type it after your
    command. The commands should be very simple. For example, instead of saying
    "look at the tree" you would say "look tree". Generally, anything you type
    should be either one or two words (separated by a space). Sometimes,
    however, you may need to be more descriptive. For example, if you see
    "scorch marks" and want to look at them, you would have to type "look scorch
    marks" since typing "look marks" or "look scorch" doesn't really convey what
    you want to do.
  </p>
  <p>
    The game will display the 30 most recent messages. You can scroll to review
    old message if you think it would help. If it ever gets unbearable and you
    want a blank slate, you can use the "clear" (cl) command to clear out all
    messages. Afterward, you should "look" again or else you're just looking at
    a blank screen.
  </p>
  <p>
    Pressing up lets you cycle through your most-recently entered 10 commands.
    You can also press down to cycle the other way.
  </p>
  <h4>Interacting With Objects</h4>
  <p>
    You will need to often interact with objects in the environment and items in
    your inventory. To do so, you can most of the time do what makes sense. If
    you see a button, you can probably "push button". However, sometimes
    interacting with something doesn't really have a single verb that makes
    sense. For example, what verb would you use to interact with a computer?
    "type computer"? "type keyboard"? "push keys"? None of these really convey
    using a computer. In these cases, you can simply type "use [target]".
  </p>
  <p>
    Sometimes, interacting with something requires more than just using it. You
    may need to use another item on the thing you want to interact with. For
    example, if you want to unlock a locked door and you have a key, you may
    need to type "use key on door". You can try using anything on anything else
    just to see if it works. If it doesn't work, you won't lose your item.
  </p>
  <h4>Navigating the World</h4>
  <p>
    You can move between areas by using the commands "north" (n), "south" (s),
    "east" (e), "west" (w), "up" (u), and "down" (d). Area descriptions will
    tell you the directions you're able to move (e.g. "a path leads north").
  </p>
  <p>
    If you have a hard time keeping track of where you are or the layout of the
    game world, you could always have a piece of paper and jot down the names of
    the areas with lines connecting them. Oldschool!
  </p>
  <p>
    <a href={window.hostDir + "/adventure-blank-map.pdf"} target="_blank">
      Click here to download a blank map to get you started!
    </a>
  </p>
  <h4>Items and Inventory</h4>
  <p>
    When you acquire things in the game, usually by using "take [target]", they
    are added to your inventory. You can carry a LOT of stuff. You can check
    what you're carrying by typing the "inventory" (or "i") command! You can
    look at things in your inventory too! In fact, you can do all sorts of
    things to the stuff in your inventory.
  </p>
  <h4>Meeting and Greeting</h4>
  <p>
    Sometimes you may meet characters in the game world. Characters have a few
    special interactions that objects in the world don't have. The first of
    which is the ability to greet them. You can greet a character by typing
    "greet [target]".
  </p>
  <p>
    Some characters will even let you ask them about things. You can ask
    questions by typing "ask [target] about [topic]". If the topic is something
    they'd know about, they'll respond. Feel free to ask about all kinds of
    stuff!
  </p>
  <p>
    You can also give things to characters. You can give an item to someone by
    typing "give [item] to [target]". If it's something that the character
    wants, they're respond.
  </p>
  <h4>Advice</h4>
  <p>
    You should probably "look" at things a lot. Who know's what might be useful
    or hiding something else? And death lurks around every corner. You can also
    look at the area you're in by typing just "look" without a target.
  </p>
  <p>
    Most of the time you won't learn about everything that's in an area just by
    entering it and looking at the area overall. As you look at specific things
    in the world you may learn about things you hadn't noticed before. For
    example, when you enter some area it might tell you that there's a box. If
    you tried to "look box" you might learn that there's an item in the box.
    After you learn that there's an item in the box, you could look or take that
    item!
  </p>
  <p>
    Throughout the game world you may come across cairns. In the game world,
    these are small stacks of stones measuring only 2-3 feet tall that are
    imbued with some sort of supernatural power to aid travelers and explorers.
    When you find one in the world, you should "touch" it. When you touch one,
    you attune your soul to the cairn. If your adventure is cut short by
    tragedy, you can restart from the last cairn you touched.
  </p>
  <p>
    If you need more help, you can view the
    <a href="https://github.com/jschnurer/text-adv-svelte/wiki/Adventure-Walkthrough" target="_blank">Spoiler-riffic Walkthrough.</a>
  </p>
  {#if allowTogglingHints}
    <h4>Hints / Enable Clicking</h4>
    <p>
      If you'd like, you can enable the experimental "hint" feature. This will
      cause interactable things to be marked with a dashed underline. They will
      then be interactable via clicking.
    </p>
    <p>
      Hints are currently {onOrOff}. After toggling hints on or off, hints will
      begin appearing the next time text is written on the screen.
    </p>
    <p>
      <button
        on:click={() => {
          dispatch("toggleHints");
          showHints = !showHints;
        }}
      >
        Turn Hints {opposite}
      </button>
    </p>
  {/if}
</room>

<style>
  p {
    margin: initial 1em;
  }
</style>
