export default function getFlag(name) {
  if (name.startsWith('G.')) {
    return this.globalVars[name];
  } else {
    return this.getLocalVars()[name];
  }
}