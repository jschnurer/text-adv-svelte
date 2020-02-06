export default function handleDevCmd(str) {
  if (str.startsWith('setFlag')) {
    let flagName = str.split('|')[1];
    this.setFlag(flagName);
    console.log(`Set ${flagName} to true.`);
  } else if (str.startsWith('unsetFlag')) {
    let flagName = str.split('|')[1];
    this.unsetFlag(flagName);
    console.log(`Set ${flagName} to false.`);
  } else if (str.startsWith('addItem')) {
    let itemId = str.split('|')[1];
    this.addItem(itemId);
    console.log(`Add ${itemId} to inventory.`);
  } else if (str.startsWith('removeItem')) {
    let itemId = str.split('|')[1];
    this.removeItem(itemId);
    console.log(`Removed ${itemId} from inventory.`);
  } else if (str === 'saveGame') {
    this.saveGame();
    console.log('Game saved.');
  }
}