export default function listInventory() {
  this.text = "You check what you're carrying...";
  if (this.inventory.length) {
    this.write("You have:");
    this.inventory.sort((a,b) => a.slug < b.slug ? -1 : 1).forEach(x => this.write(x.slug));
    this.write("...");
  } else {
    this.write("You don't have anything.");
    this.write("...");
  }
};