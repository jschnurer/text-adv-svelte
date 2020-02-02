export default function updateLook(slug, newLook) {
  let feature = this.getFeature(slug);
  feature.look = typeof newLook === "string" ? [newLook] : newLook;
}