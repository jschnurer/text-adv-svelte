export default function removeItem(id) {
  this.inventory = this.inventory.filter(x => x.id !== id);
};