export default function switchBranch(args) {
  if (!args.length || args.length !== 2) {
    return;
  }

  let val = this.getVarValue(args[0]);

  if (args[1][val]) {
    this.parseCmds(args[1][val]);
  }
}