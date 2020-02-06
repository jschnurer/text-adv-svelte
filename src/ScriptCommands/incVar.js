export default function incVar(name) {
  if (name.startsWith('G.')) {
    this.globalVars[name] = (this.globalVars[name] || 0) + 1;
  } else {
    this.getLocalVars()[name] = (this.getLocalVars()[name] || 0) + 1;
  }
}