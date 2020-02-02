export default function addItem(slug) {
  this.inventory.push(Object.assign({}, this.items.find(x => x.slug === slug)));
};