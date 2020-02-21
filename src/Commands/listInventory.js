const sorter = (a, b) => a.slug < b.slug ? -1 : 1;
const mapper = item => '• ' + item.slug;

export default function listInventory() {
  if (this.inventory.length) {
    this.inventory = this.inventory.sort(sorter);

    this.write("You check what you're carrying and find:");

    if (this.inventory.length <= 10) {
      this.write(this.inventory.map(mapper).join('\\'));
    } else {
      let colLength = this.inventory.length / 2;

      if (Math.floor(colLength) !== colLength) {
        // Uneven cols. Add one so that first col has the extra.
        colLength = Math.floor(colLength);
        colLength++;
      }

      let invLines = [];

      for (let i = 0; i < colLength; i++) {
        let itemLeft = this.inventory[i];
        let itemRight = this.inventory[i + colLength];
        let str = mapper(itemLeft).padEnd(30, ' ');
        if(itemRight) {
          str += mapper(itemRight);
        }
        invLines.push(str);
      }

      this.write("#" + invLines.join('\\') + "#");
    }
  } else {
    this.write("You're not carrying anything.");
  }
}