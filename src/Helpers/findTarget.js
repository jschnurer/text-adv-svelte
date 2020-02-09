export default function findTarget(slug) {
  let roomFeature = this.room.features.find(x => {
    // Check to ensure that it's not destroyed.
    if (!this.getFeature(x.slug)) {
      return false;
    }

    if (x.slug.toLowerCase() === slug || (x.altSlugs && x.altSlugs.map(z => z.toLowerCase()).indexOf(slug) > -1)) {
      if (x.targetFlag) {
        if (this.getLocalVars()[x.targetFlag] || this.globalVars[x.targetFlag]) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  });

  if (roomFeature) {
    return roomFeature;
  }

  let invItem = this.inventory.find(x => x.slug.toLowerCase() === slug || (x.altSlugs && x.altSlugs.map(z => z.toLowerCase()).indexOf(slug) > -1));

  return invItem;
};