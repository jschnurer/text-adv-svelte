export default function tryObjectInteraction(slug1, slug2, verb, oneWay, fallbackSlug2) {
  // Find the two targets.
  let target1 = this.findTarget(slug1);
  let target2 = this.findTarget(slug2);

  if (!target1) {
    this.unknownTarget(slug1);
    return;
  }

  if (!oneWay) {
    if (!target2) {
      this.unknownTarget(slug2);
      return;
    }
  }

  // Find the commands for that verb for the other.
  let cmds = null;

  if (target1[verb]) {
    cmds = target1[verb][slug2];
  }

  if (!cmds && oneWay) {
    if (fallbackSlug2 != undefined && target1[verb] && target1[verb][fallbackSlug2]) {
      this.parseCmds(target1[verb][fallbackSlug2]);
      return;
    } else {
      this.write("That doesn't seem to work.");
      return;
    }
  }

  if (!cmds && !oneWay) {
    if (target2[verb]) {
      cmds = target2[verb][slug1];
    }
  }

  // Neither has that verb for the other.
  if (!cmds) {
    this.write("That doesn't seem to work.");
    return;
  }

  // Execute the combine commands.
  this.parseCmds(cmds);
}