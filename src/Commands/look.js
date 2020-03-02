export default function look() {
  this.text = '';

  if (this.room.dark && !this.getFlag("G.HASLIGHT")) {
    this.write("^A Very Dark Place^");
    this.write("This place is so dark that you can't even see your hand in front of your face. Strange and terrible things make their homes in the dark. If you value your life, you should head back the way you came IMMEDIATELY and return with a light source.\nIt is pitch black. You are likely to be eaten by a grue.");
  } else {
    if (this.inventory.find(x => x.id === "COMPASS") && this.room.coords) {
      this.write(`^${this.room.name} (${this.room.coords})^`);
    } else {
      this.write(`^${this.room.name}^`);
    }

    if (this.room.description) {
      this.parseCmds(this.room.description);
    }

    if (this.room.look) {
      this.parseCmds(this.room.look);
    }

    if (this.room.features) {
      this.showFeatures(this.room.features);
    }

    if (this.getFlag("G.HASLIGHT") && this.room.slug.indexOf('Memories/') === -1) {
      this.write("Your flashlight is on.");
    }
  }
};