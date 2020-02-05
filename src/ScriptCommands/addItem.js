export default function addItem(id) {
  this.inventory.push(Object.assign({}, this.items.find(x => x.id === id)));
};