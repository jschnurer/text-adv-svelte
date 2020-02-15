import incantsList from "../incantations.json";

export default function incantations() {
  if (!this.knowsAnyIncantations()) {
    this.unknownCmd('incantations');
    return false;
  }

  this.write("You have remembered the following incantations:");
  incantsList.forEach(inc => {
    if (this.getFlag('G.' + inc.name.toUpperCase())) {
      this.write(`"${inc.name}", ${inc.description}`);
    }
  });

  this.write("You can evoke the magic of a Charm by typing \"incant [incantation]\".")
}