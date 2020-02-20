import incantations from "../incantations.json";

export default function incant(incantation) {
  if (!this.knowsAnyIncantations()) {
    this.unknownCmd('incant');
    return false;
  }

  if (!incantation) {
    this.write("You must incant a specific incantation. (\"incant [incantation]\")");
    return false;
  }

  if (!incantations.find(x => x.name === incantation.toLowerCase())) {
    this.write("You murmur useless syllables. It wasn't an incantation. You must've gotten it wrong...");
    return false;
  }

  if (!this.room.incant || !this.room.incant[incantation]) {
    this.write("You murmur the incantation. Nothing happens...");
    return false;
  }

  this.parseCmds(this.room.incant[incantation]);
};