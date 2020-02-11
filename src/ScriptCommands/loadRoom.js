export default function loadRoom (slug) {
  this.room = this.rooms[slug];
  if (!this.room) {
    console.log(`Room '${slug}' not found!`);
  }
  this.lookRoom();
  if (this.room.load) {
    this.parseCmds(this.room.load);
  }
};