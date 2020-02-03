export default function ifFlag(name, trueCmds, falseCmds, feature) {
  const vars = this.getLocalVars();

  if (vars[name] == true) {
    this.parseCmds(trueCmds, feature);
  } else {
    if (falseCmds) {
      this.parseCmds(falseCmds, feature);
    }
  }
};