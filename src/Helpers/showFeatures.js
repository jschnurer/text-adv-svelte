export default function showFeatures(features) {
  features
    .filter(x => x.roomDesc)
    .forEach(f => {
      this.write(f.roomDesc);
    });
};