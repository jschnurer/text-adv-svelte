export default function destroyFeature(slug) {
  this.room.features = this.room.features.filter(x => x.slug !== slug);
};