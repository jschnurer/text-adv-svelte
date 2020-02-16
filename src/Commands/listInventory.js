export default function listInventory() {
  if (this.inventory.length) {
    this.write("You check what you're carrying and find:");
    this.write(this.inventory.sort((a, b) => a.slug < b.slug ? -1 : 1).map(x => '• ' + x.slug).join('\\'));
  } else {
    this.write("You don't have anything.");
  }
};