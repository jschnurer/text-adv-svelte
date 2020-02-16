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
    this.write(`~${this.getVarValue(varName)}~`);
  } else if(str.startsWith('incVar')) {
    let varName = str.split('|')[1];
    this.incVar(varName);
    this.write(`~Incremented ${varName}~`);
  } else if(str.startsWith('decVar')) {
    let varName = str.split('|')[1];
    this.decVar(varName);
    this.write(`~Decremented ${varName}~`);
  } else if(str.startsWith('loadRoom')) {
    let varName = str.split('|')[1];
    this.loadRoom(varName);
  } else if (str.startsWith('cleanInventory')) {
    this.inventory = this.inventory.filter(x => !!x && x.slug);
    this.write("~Cleaned inventory of undefined objects~");
  }
}