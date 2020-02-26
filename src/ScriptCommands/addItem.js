export default function addItem(id) {
  let item = this.items.find(x => x.id === id);

  if (!item) {
    alert(`Item ${id} not found!`);
    return;
  }

  // If this is the first time picking up this item,
  // add it to the overall item count stat.
  // (Only for non-tutorial items!)
  if (id.indexOf('TUTORIAL') == -1 && !this.getFlag(`G.ITEM_PICKUP_${id}`)) {
    this.setFlag(`G.ITEM_PICKUP_${id}`);
    this.incVar('G.TOTAL_ITEMS_FOUND');
    this.setVarValue('G.ITEMPERCENT',
      Math.floor(
        parseFloat(this.getVarValue('G.TOTAL_ITEMS_FOUND'), 10)
        / parseFloat(this.items.filter(x => x.id.indexOf('TUTORIAL') === -1).length) * 100) + ' %'
    );
  }

  this.inventory.push(Object.assign({}, item));
};