export default function getFlag(name) {
  if (name.startsWith('G.')) {
    return this.globalVars[name.replace('G.', '')];
  } else {
    return this.getLocalVars()[name];
  }
}