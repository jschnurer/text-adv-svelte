/// If the name begins with "G.", a global flag will be set instead.
export default function setFlag(name) {
  let lVars = this.getLocalVars();
  lVars[name] = true;
}