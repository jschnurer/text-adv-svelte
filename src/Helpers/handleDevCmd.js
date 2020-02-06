export default function handleDevCmd(str) {
  if (str.startsWith('setFlag')) {
    let flagName = str.split('|')[1];
    this.setFlag(flagName);
    this.write(`~Set ${flagName} to true.~`);
  } else if (str.startsWith('unsetFlag')) {
    let flagName = str.split('|')[1];
    this.unsetFlag(flagName);
    this.write(`~Set ${flagName} to false.~`);
  } else if (str.startsWith('addItem')) {
    let itemId = str.split('|')[1];
    this.addItem(itemId);
    this.write(`~Added ${itemId} to inventory.~`);
  } else if (str.startsWith('removeItem')) {
    let itemId = str.split('|')[1];
    this.removeItem(itemId);
    this.write(`~Removed ${itemId} from inventory.~`);
  } else if (str === 'saveGame') {
    this.saveGame();
    this.write('~Game Saved~');
  } else if (str.startsWith('getVar')) {
    let varName = str.split('|')[1];
    if (varName.startsWith('G.')) {
      this.write(`~${this.globalVars[varName]}~`);
    } else {
      this.write(`~${this.getLocalVars()[varName]}~`);
    }
  }
}