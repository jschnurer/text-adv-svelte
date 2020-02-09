export default function ask(args) {
  if (args === null) {
    this.write("Ask who about what?");
    return;
  }

  let matches = args.trim().match("(.+) about (.+)");

  if (!matches || matches.length !== 3) {
    this.write("Huh? Try \"ask x about y\" instead.");
    return;
  }

  let target = this.findTarget(matches[1]);

  if (!target) {
    this.unknownTarget(matches[1]);
    return;
  }

  let topic = matches[2];

  if (!target.ask) {
    this.write("You can't ask " + target.slug + " anything.");
    return;
  }

  if (target.ask.requiredFlag) {
    if (!this.getFlag(target.ask.requiredFlag)) {
      this.parseCmds(target.ask.cantAsk);
      return;
    }
  } else if (target.ask.requiredNotFlag) {
    if (this.getFlag(target.ask.requiredNotFlag)) {
      this.parseCmds(target.ask.cantAsk);
      return;
    }
  }

  if (!target.ask[topic]) {
    this.parseCmds(target.ask[""]);
    return;
  }

  this.parseCmds(target.ask[topic]);
}