export default function findTarget(slug) {
  let roomFeature = (this.room.features || []).find(x => {
    // Check to ensure that it's not destroyed.
    if (!this.getFeature(x.slug)) {
      return false;
    }

    if (x.slug.toLowerCase() === slug || (x.altSlugs && x.altSlugs.map(z => z.toLowerCase()).indexOf(slug) > -1)) {
      if (x.targetFlag) {
        if (x.targetFlag.indexOf('&')) {
          if (x.targetFlag.split('&').filter(f => !this.getFlag(f)).length) {
            // One or more targetFlags is not true.
            return false;
          } else {
            return true;
          }
        }

        if (this.getFlag(x.targetFlag)) {
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