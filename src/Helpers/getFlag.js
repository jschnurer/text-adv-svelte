export default function getFlag(name) {
  if (name.indexOf('!') === 0) {
    let flagName = name.substring(1);
    return !this.getVarValue(flagName);
  } else {
    return this.getVarValue(name);
  }
}