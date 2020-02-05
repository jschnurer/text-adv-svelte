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

  this.tryObjectInteraction(matches[1], matches[2], 'combine');
}