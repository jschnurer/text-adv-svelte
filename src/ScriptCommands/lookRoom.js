export default function look(target) {
  if (!target) {
    this.text = '';
    
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

    this.write("...");
  } else {
    let t = this.findTarget(target);

    if (!t) {
      this.write(`I don't see ${target} anywhere.`);
      return;
    }

    if (t.look) {
      this.parseCmds(t.look);
    } else {
      this.write(t.description);
    }
  }
};