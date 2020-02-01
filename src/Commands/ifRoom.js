export default function ifRoom(roomAreaSlug, trueCmds, falseCmds, feature) {
  if (roomAreaSlug === `${this.room.area}/${this.room.slug}`) {
    this.parseCmds(trueCmds, feature);
  } else if (falseCmds) {
    this.parseCmds(falseCmds, feature);
  }
};