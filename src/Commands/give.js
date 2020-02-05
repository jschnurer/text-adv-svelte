export default function give(args) {
  if (args === null) {
    this.write("Give what to whom?");
    return;
  }

  let matches = args.trim().match("(.+) to (.+)");

  if (matches.length !== 3) {
    this.write("Huh? Try \"give [object] to [recipient]\" instead.");
    return;
  }

  this.tryObjectInteraction(matches[2], matches[1], "give", true, "");
}