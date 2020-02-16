export default function look() {
  this.text = '';

  if (this.room.dark && !this.getFlag("G.HASLIGHT")) {
    this.write("^A Very Dark Place^");
    this.write("This place is so dark that you can't even see your hand in front of your face. Strange and terrible things make their homes in the dark. You should head back the way you came immediately and return with a light source.\nIt is pitch black. You are likely to be eaten by a grue.");
  } else {
    this.write(`^${this.room.name}^`);

    if (this.room.description) {
      this.write(this.room.description);
    }

    if (this.room.look) {
      this.parseCmds(this.room.look);
    }

    if (this.room.features) {
      this.showFeatures(this.room.features);
    }

    if(this.getFlag("G.HASLIGHT")) {
      this.write("Your flashlight is on.");
    }
  }

  this.write("...");
};