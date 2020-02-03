export default function ifFlag(name, trueCmds, falseCmds, feature) {
  let checkName = name;
  let vars = {};

  if (name.startsWith('G.')) {
    checkName = name.replace('G.', '');
    vars = this.globalVars();
  } else {
    vars = this.getLocalVars();
  }

  if (vars[checkName] == true) {
    this.parseCmds(trueCmds, feature);
  } else {
    if (falseCmds) {
      this.parseCmds(falseCmds, feature);
    }
  }
};