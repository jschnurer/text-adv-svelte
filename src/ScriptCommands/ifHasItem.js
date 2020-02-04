export default function ifHasItem(slug, trueCmds, falseCmds, feature) {
  if (this.inventory.find(x => x.slug === slug)) {
    this.parseCmds(trueCmds, feature);
  } else {
    this.parseCmds(falseCmds, feature);
  }
};