export default function loadRoom (slug) {
  this.room = this.rooms[slug];
  if (!this.room) {
    console.log(`Room '${slug}' not found!`);
  }
  this.look();
};