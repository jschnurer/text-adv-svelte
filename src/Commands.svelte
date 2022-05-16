<script>
  export let showIncantations = false;
</script>

<style>
  .commands {
    z-index: 1;
    position: relative;
    box-shadow: 0 0 10em #222;
    background-color: #222;
    padding: 1em;
    flex: none;
    overflow: auto;
    align-self: flex-start;
    font-size: .85em;
    width: 270px;
  }

  h4 {
    margin-top: 0;
  }

  ul {
    margin: 0;
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  li {
    flex-basis: 50%;
  }

  .shortcut {
    color: white;
    white-space: nowrap;
  }
</style>

<div class="commands">
  <h4>Common Commands</h4>
  <ul>
    <li title="Looks all around you."><span class="shortcut">l</span>ook</li>
    <li title="Looks at a specific object or person."><span class="shortcut">l</span>ook [target]</li>
    <li title="Takes an object and adds it to your inventory."><span class="shortcut">t</span>ake [target]</li>
    <li title="Lists the items in your inventory."><span class="shortcut">i</span>nventory</li>
    <li title="Travel north."><span class="shortcut">n</span>orth</li>
    <li title="Travel south."><span class="shortcut">s</span>outh</li>
    <li title="Travel east."><span class="shortcut">e</span>ast</li>
    <li title="Travel west."><span class="shortcut">w</span>est</li>
    <li title="Travel upward."><span class="shortcut">u</span>p</li>
    <li title="Travel downward."><span class="shortcut">d</span>own</li>
    <li title="Enters a building."><span class="shortcut">enter</span> [target]</li>
    <li title="Clears the game window of all text."><span class="shortcut">cl</span>ear</li>
    <li title="Moves the target out of the way."><span class="shortcut">move</span> [target]</li>
    <li title="Uses the specified object."><span class="shortcut">use</span> [target]</li>
    <li title="Opens the specified object."><span class="shortcut">open</span> [target]</li>
    <li title="Closes the specified object."><span class="shortcut">close</span> [target]</li>
    <li title="Greets a person and starts a conversation."><span class="shortcut">greet</span> [person]</li>
    <li title="Gives the specified object to the specified person."><span class="shortcut">give</span> [object] to [person]</li>
    {#if showIncantations}
    <li title="Incants an incantation."><span class="shortcut">incant</span> [incantation]</li>
    <li title="Lists the incantations known to you."><span class="shortcut">incantations</span></li>
    {/if}
    <li title="Uses a specific object on the target."><span class="shortcut">use [object] on [target]</span></li>
    <li title="Asks a person about a specific topic."><span class="shortcut">ask [person] about [topic]</span></li>
  </ul>
</div>
