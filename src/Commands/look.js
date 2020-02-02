export default function look(target) {
  if (!target) {
    if (this.room.description) {
      this.text = this.room.description;
    }

    if (this.room.features) {
      this.showFeatures(this.room.features);
    }

    if (this.room.look) {
      this.parseCmds(this.room.look);
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