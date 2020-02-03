const shortcuts = {
  "n": "north",
  "s": "south",
  "e": "east",
  "w": "west",
  "cl": "clear",
  "l": "look",
  "t": "take"
}

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

  // Convert shortcuts to full words to match with properties.
  if (shortcuts[cmd]) {
    cmd = shortcuts[cmd];
  }

  // If targeting something and that something has the command in it, run those commands.
  if (target && target[cmd]) {
    this.parseCmds(target[cmd], target);
    return;
  }

  switch (cmd) {
    case "look":
      // Look needs to be checked here because if there is no
      // target, it should run the look command without one.
      this.look();
      break;
    case "inventory":
      this.listInventory();
      break;
    case "north":
      this.move("north");
      break;
    case "south":
      this.move("south");
      break;
    case "east":
      this.move("east");
      break;
    case "west":
      this.move("west");
      break;
    case "clear":
      this.clear();
      break;
    default:
      this.write("What do you want to " + cmd + "?");
      break;
  }
};