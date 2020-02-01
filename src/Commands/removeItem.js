export default function removeItem(slug) {
  this.inventory = this.inventory.filter(x => x.slug !== slug);
};