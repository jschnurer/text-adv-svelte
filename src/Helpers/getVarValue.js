export default function getVarValue(name) {
  if (name.startsWith('G.')) {
    return this.globalVars[name];
  } else {
    return this.getLocalVars()[name];
  }
}