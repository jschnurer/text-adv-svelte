<script>
  import { Router, Route } from "svelte-routing";
  import RoomEditor from "./Editor2/RoomEditor.svelte";
  import Start from "./Start.svelte";

  export let url = "";
</script>

<Router url={url}>
  <Route path="/edit/:area/:slug" component={RoomEditor} />
  <Route path="/edit" component={RoomEditor} />
  <Route path="" component={Start} />
</Router>