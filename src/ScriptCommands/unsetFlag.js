/// If the name begins with "G.", a global flag will be set instead.
export default function unsetFlag(name) {
  if (name.startsWith('G.')) {
    this.globalVars[name] = false;
  } else {
    this.getLocalVars()[name] = false;
  }
}