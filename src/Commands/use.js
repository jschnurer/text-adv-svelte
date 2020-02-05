export default function use(args) {
  if (args === null) {
    this.write("Use what on what?");
    return;
  }

  let matches = args.trim().match("(.+) on (.+)");

  if (matches.length !== 3) {
    this.write("Huh? Try \"use x on y\" instead.");
    return;
  }

  this.tryObjectInteraction(matches[1], matches[2], 'use');
}