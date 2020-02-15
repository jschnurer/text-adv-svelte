export default function showFeatures(features) {
  features.filter(x => {
    if (!x.roomDesc) {
      return false;
    }

    if (x.destroyedFlag) {
      if (this.getFlag(x.destroyedFlag)) {
        return false;
      } else {
        return true;
      }
    }

    return true;
  }).forEach(f => {
    this.parseCmds(f.roomDesc);
  });
};