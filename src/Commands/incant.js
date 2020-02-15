const incantations = [
  "deisigh", // repair
  "scrios", // destroy
  "nocht", // reveal
];

export default function incant(incantation) {
  let knowsAnyIncantations = incantations.some(x => this.getFlag('G.' + x.toUpperCase()));

  if (!knowsAnyIncantations) {
    this.unknownCmd('incant');
    return false;
  }

  if (!incantation) {
    this.write("You must incant a specific incantation. (\"incant [incantation]\")");
    return false;
  }

  if (incantations.indexOf(incantation.toLowerCase()) === -1) {
    this.write("You murmur useless syllables. It wasn't an incantation. You must've gotten it wrong...");
    return false;
  }

  if (!this.room.incant) {
    this.write("You murmur the incantation. Nothing happens...");
    return false;
  }

  this.parseCmds(this.room.incant[incantation]);
};