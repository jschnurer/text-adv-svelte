export default function showFeatures(features) {
  features
    .filter(x => x.roomDesc)
    .forEach(f => {
      this.parseCmds(f.roomDesc);
    });
};