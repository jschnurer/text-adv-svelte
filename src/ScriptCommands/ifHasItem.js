export default function ifHasItem(id, trueCmds, falseCmds, feature) {
  if (this.inventory.find(x => x.id === id)) {
    this.parseCmds(trueCmds, feature);
  } else {
    this.parseCmds(falseCmds, feature);
  }
};