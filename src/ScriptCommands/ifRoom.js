export default function ifRoom(slug, trueCmds, falseCmds, feature) {
  if (slug === this.room.slug) {
    this.parseCmds(trueCmds, feature);
  } else if (falseCmds) {
    this.parseCmds(falseCmds, feature);
  }
};