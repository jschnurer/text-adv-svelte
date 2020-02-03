export default function combineWith(args) {
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
  let target1 = this.findTarget(matches[1]);
  let target2 = this.findTarget(matches[2]);

  if(!target1) {
    this.unknownTarget(matches[1]);
    return;
  }

  if(!target2) {
    this.unknownTarget(matches[2]);
    return;
  }
  
  // Find the combine commands on one of them.
  let combineCmds = null;

  if (target1["combine"]) {
    combineCmds = target1["combine"][target2.slug];
  }

  if (!combineCmds) {
    if (target2["combine"]) {
      combineCmds = target2["combine"][target1.slug];
    }
  }

  // If neither can combine with the other...
  if (!combineCmds) {
    this.write("You're not sure how you would combine them.");
    return;
  }

  // Execute the combine commands.
  this.parseCmds(combineCmds);
}