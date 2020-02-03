<script>
  import { Router, Route } from "svelte-routing";
  import RoomEditor from "./Editor/RoomEditor.svelte";
  import Game from "./Game.svelte";

  export let url = "";
</script>

<Router url={url}>
  <Route path="/edit/:area/:slug" component={RoomEditor} />
  <Route path="/edit" component={RoomEditor} />
  <Route path="" component={Game} />
</Router>