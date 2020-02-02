export default function findTarget(slug) {
  let roomFeature = this.room.features.find(x => {
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