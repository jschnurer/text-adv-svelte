export default function give(args) {
  if (args === null) {
    this.write("Give what to whom?");
    return;
  }

  let matches = args.trim().match("(.+) to (.+)");

  if (matches.length !== 3) {
    this.write("Huh? Try \"give [item] to [person]\" instead.");
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

  if (!target.give) {
    this.write(`You can't give things to ${matches[2]}.`);
    return;
  }

  if (!target.give[item.id]) {
    this.parseCmds(target.give[""]);
    return;
  }

  this.parseCmds(target.give[item.id]);
}