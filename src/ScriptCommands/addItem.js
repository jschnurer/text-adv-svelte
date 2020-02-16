export default function addItem(id) {
  let item = this.items.find(x => x.id === id);

  if(!item) {
    alert(`Item ${id} not found!`);
    return;
  }

  this.inventory.push(Object.assign({}, item));
};