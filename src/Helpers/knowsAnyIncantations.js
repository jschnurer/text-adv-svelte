import incantations from "../incantations.json";

export default function knowsAnyIncantations() {
  return incantations.some(x => this.getFlag('G.' + x.name.toUpperCase()));
}