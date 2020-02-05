export default function findItem(slug) {
  return this.inventory.find(x => x.slug === slug || (x.altSlugs && x.altSlugs.indexOf(slug) > -1));
}