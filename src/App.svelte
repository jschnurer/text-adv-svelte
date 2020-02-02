<script>
  import { Router, Route } from "svelte-routing";
  import Editor from "./Editor/RoomEditor.svelte";
  import Game from "./Game.svelte";

  export let url = "";
</script>

<Router url={url}>
  <Route path="/edit" component={Editor} />
  <Route path="" component={Game} />
</Router>