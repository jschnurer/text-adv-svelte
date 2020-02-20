export default function loadRoom (slug) {
  if (!this.rooms[slug]) {
    alert(`Room '${slug}' not found!`);
    return;
  }

  this.room = this.rooms[slug];

  this.look();

  if (this.room.load) {
    this.parseCmds(this.room.load);
  }
};