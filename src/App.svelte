<script>
  import { Router, Route } from "svelte-routing";
  import Start from "./Start.svelte";
  import Walkthrough from "./Walkthrough.svelte";

  export let url = "";
</script>

<Router url={url}>
  <Route path={window.hostDir + "/walkthrough"} component={Walkthrough} />
  <Route path="" component={Start} />
</Router>