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

  let target = this.findTarget(matches[1]);

  if (!target) {
    this.unknownTarget();
    return;
  }

  let topic = matches[2];

  if (!target.ask || !target.ask[topic]) {
    this.parseCmds(target.ask[""]);
    return;
  }

  this.parseCmds(target.ask[topic]);
}