export default function getFlag(name) {

  const getFlagValue = (fName) => {
    if (fName.indexOf('!') === 0) {
      let flagName = fName.substring(1);
      return !this.getVarValue(flagName);
    } else {
      return this.getVarValue(fName);
    }
  }

  if (name.indexOf('&')) {
    if (name.split('&').filter(f => !getFlagValue(f)).length) {
      // One or more targetFlags is not true.
      return false;
    } else {
      return true;
    }
  }

  
}

