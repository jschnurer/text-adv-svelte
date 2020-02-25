export default function ifIsIn(args) {
  if (!args.length || args.length !== 4) {
    return;
  }

  let val = this.getVarValue(args[0]);

  let match = args[1].map((x, ix) => ({ val: x, ix })).find(x => x.val == val);

  if (match) {
    this.parseCmds(args[2]);
  } else {
    this.parseCmds(args[3]);
  }
}