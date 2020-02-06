function getVarValue(name) {
  if (name.startsWith('G.')) {
    return this.globalVars[varName];
  } else {
    return this.getLocalVars()[varName];
  }
}