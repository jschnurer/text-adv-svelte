export default function give(args) {
  if (args === null) {
    this.write("Give what to whom?");
    return;
  }

  let matches = args.trim().match("(.+) to (.+)");

  if (!matches || matches.length !== 3) {
    this.write("Huh? Try \"give [item] to [person]\" instead.");
    return;
  }

  let item = this.findItem(matches[1]);

  if (!item) {
    this.write(`You don't have a ${matches[1]}.`);
    return;
  }

  let target = this.findTarget(matches[2]);

  if (!target) {
    this.unknownTarget(matches[2]);
    return;
  }

  if (!target.give) {
    this.write(`You can't give things to ${matches[2]}.`);
    return;
  }

  if (target.give._requiredFlag && !this.getFlag(target.give._requiredFlag)) {
    this.write(`You can't give things to ${matches[2]} yet.`);
    return;
  }

  if (!target.give[item.id]) {
    if (target.give[""]) {
      this.parseCmds(target.give[""]);
    } else {
      this.write("You can't give that to them.");
    }
    return;
  }

  this.parseCmds(target.give[item.id]);
}