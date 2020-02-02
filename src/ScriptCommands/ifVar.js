export default function ifVar(vars, name, checkVal, trueCmds, falseCmds, feature) {
  if ((checkVal == false && !(name in vars)) || vars[name] == checkVal) {
    this.parseCmds(trueCmds, feature);
  } else {
    if (falseCmds) {
      this.parseCmds(falseCmds, feature);
    }
  }
};