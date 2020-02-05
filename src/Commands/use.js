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

  let item = this.findItem(matches[1]);

  if (!item) {
    this.write(`You don't have a ${matches[1]}.`);
    return;
  }

  let target = this.findTarget(matches[2]);

  if(!target) {
    this.unknownTarget(matches[2]);
    return;
  }

  if (!target.use || !target.use[item.id]) {
    this.write("That's not going to work.");
    return;
  }

  this.parseCmds(target.use[item.id]);
}