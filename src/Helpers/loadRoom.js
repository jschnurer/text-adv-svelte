export default async function (roomAreaSlug) {
  this.room = this.rooms[roomAreaSlug];
  this.look();
};