<script>
  import { Route, Router } from "svelte-routing";
  import Start from "./Start.svelte";

  export let url = "";
</script>

<Router url={url}>
  <Route path="" component={Start} />
</Router>