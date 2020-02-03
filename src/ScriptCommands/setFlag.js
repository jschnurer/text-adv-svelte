/// If the name begins with "G.", a global flag will be set instead.
export default function setFlag(name) {
  if (name.startsWith('G.')) {
    this.globalVars[name] = true;
  } else {
    this.getLocalVars()[name] = true;
  }
}