export default function handleUserEntry(entry) {
  if (this.choiceObj) {
    this.handleChoiceInput(entry);
    return;
  }

  let chunks = entry
    .toLowerCase()
    .split(/ (.+)/)
    .filter(x => x);
  let cmd = chunks[0];
  let args = chunks.filter((_, ix) => ix > 0);
  let target = null;

  if (!this.allowedVerbs.find(x => x === cmd)) {
    this.unknownCmd(cmd);
    return;
  }

  if (args.length > 0) {
    target = this.findTarget(args[0]);
    if (!target) {
      this.unknownTarget(args[0]);
      return;
    }
  }

  // Shorthand.
  if (cmd === "t") {
    cmd = "take";
  } else if (cmd === "l") {
    cmd = "look";
  }

  if (target && target[cmd]) {
    this.parseCmds(target[cmd], target);
    return;
  }

  switch (cmd) {
    case "look":
      this.look();
      break;
    case "inventory":
    case "i":
      this.listInventory();
      break;
    case "north":
    case "n":
      this.move("north");
      break;
    case "south":
    case "s":
      this.move("south");
      break;
    case "east":
    case "e":
      this.move("east");
      break;
    case "west":
    case "w":
      this.move("west");
      break;
  }
};