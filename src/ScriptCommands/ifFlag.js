export default function ifFlag(name, trueCmds, falseCmds, feature) {
  let value = this.getFlag(name);

  if (value === true && trueCmds) {
    this.parseCmds(trueCmds, feature);
  } else if (value !== true && falseCmds) {
    this.parseCmds(falseCmds, feature);
  }
};