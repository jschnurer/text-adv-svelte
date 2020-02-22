export default function getFlag(name) {

  const getFlagValue = (fName) => {
    if (fName.indexOf('!') === 0) {
      let flagName = fName.substring(1);
      return !this.getVarValue(flagName);
    } else {
      return this.getVarValue(fName);
    }
  }

  if (name.indexOf('&') > -1) {
    // Only return true if none of the flags are false.
    return name.split('&').filter(f => !getFlagValue(f)).length === 0;
  } else if(name.indexOf('|') > -1) {
    // Return true if any of the flags are true.
    return name.split('|').filter(f => !!getFlagValue(f)).length > 0;
  } else {
    return getFlagValue(name);
  }
}

