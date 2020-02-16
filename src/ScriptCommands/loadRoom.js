export default function loadRoom (slug) {
  this.room = this.rooms[slug];
  if (!this.room) {
    alert(`Room '${slug}' not found!`);
    return;
  }

  if (this.room.load) {
    this.parseCmds(this.room.load);
  }

  this.lookRoom();
};