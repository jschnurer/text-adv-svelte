export default function ask(args) {
  if (args === null) {
    this.write("Ask who about what?");
    return;
  }

  let matches = args.trim().match("(.+) about (.+)");

  if (matches.length !== 3) {
    this.write("Huh? Try \"ask x about y\" instead.");
    return;
  }

  this.tryObjectInteraction(matches[1], matches[2], "ask", true, "");
}