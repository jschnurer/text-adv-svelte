export default function findTarget(slug) {
  let roomFeature = this.room.features.find(x => {
    // Check to ensure that it's not destroyed.
    if (!this.getFeature(x.slug)) {
      return false;
    }

    if (x.slug === slug) {
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

  let invItem = this.inventory.find(x => x.slug === slug);

  return invItem;
};