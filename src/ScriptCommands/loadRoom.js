export default async function loadRoom (slug) {
  this.room = this.rooms[slug];
  this.room.explored = true;
  this.look();
};