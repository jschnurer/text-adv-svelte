export default function combine(args) {
  if (args === null) {
    this.write("Combine what with what?");
    return;
  }

  let matches = args.trim().match("(.+) with (.+)");

  if (matches.length !== 3) {
    this.write("Huh? Try \"combine x with y\" instead.");
    return;
  }

  // Find the two targets.
  let target1 = this.findTarget(slug1);
  let target2 = this.findTarget(slug2);

  if (!target1) {
    this.unknownTarget(slug1);
    return;
  }

  if (!target2) {
    this.unknownTarget(slug2);
    return;
  }

  let cmds = null;

  if (target1["combine"]) {
    cmds = target1["combine"][slug2];
  }

  if (!cmds) {
    if (target2["combine"]) {
      cmds = target2["combine"][slug1];
    }
  }

  // Neither has the ability to combine with the other.
  if (!cmds) {
    this.write("That doesn't seem to work.");
    return;
  }

  // Execute the combine commands.
  this.parseCmds(cmds);
}