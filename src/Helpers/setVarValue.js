export default function setVarValue(name, value) {
  if (name.startsWith('G.')) {
    this.globalVars[name] = value;
  } else {
    this.getLocalVars()[name] = value;
  }
}