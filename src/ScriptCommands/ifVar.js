export default function ifVar(name, operator, compareValue, trueCmds, falseCmds, feature) {
  if (this.getFlag(name) == true) {
    this.parseCmds(trueCmds, feature);
  } else {
    if (falseCmds) {
      this.parseCmds(falseCmds, feature);
    }
  }
};