export default function setFlag(name) {
  let lVars = this.getLocalVars();
  lVars[name] = true;
}