function setVarValue(varName, value) {
  if (name.startsWith('G.')) {
    this.globalVars[varName] = value;
  } else {
    this.getLocalVars()[varName] = value;
  }
}