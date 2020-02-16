export default function getFeature(slug) {
  return (this.room.features || []).find(x => x.slug === slug
    && (!x.destroyedFlag || !this.getFlag(x.destroyedFlag)));
};