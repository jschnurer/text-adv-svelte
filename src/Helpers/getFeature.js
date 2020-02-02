export default function getFeature(slug) {
  return this.room.features.find(x => x.slug === slug);
};