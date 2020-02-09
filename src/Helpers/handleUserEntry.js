const shortcuts = {
  "n": "north",
  "s": "south",
  "e": "east",
  "w": "west",
  "u": "up",
  "d": "down",
  "cl": "clear",
  "l": "look",
  "t": "take",
  "i": "inventory"
}

export default function handleUserEntry(entry) {
  if (entry.startsWith('dev|')) {
    this.handleDevCmd(entry.replace('dev|', ''));
    return;
  }

  this.capturedText = '';

  if (this.waitCmds) {
    this.parseCmds(this.waitCmds);
    this.waitCmds = null;
    return;
  } else if (!entry) {
    return;
  }

  this.write(`~${entry}~`);

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

  // Replace common verbs with their engine equivalent
  if (cmd === "talk") {
    cmd = "greet";
  }

  if (!this.allowedVerbs.find(x => x === cmd)) {
    this.unknownCmd(cmd);
    return;
  }

  // Special case for Combine since it is a 4-word command.
  // Special cases for 4-word commands.
  switch (cmd) {
    case "ask":
      this.ask(args.length > 0 ? args[0] : null);
      return;
    case "combine":
      this.combine(args.length > 0 ? args[0] : null);
      return;
    case "use":
      this.use(args.length > 0 ? args[0] : null);
      return;
    case "give":
      this.give(args.length > 0 ? args[0] : null);
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
  if (target) {
    if (target[cmd]) {
      this.parseCmds(target[cmd], target);
    } else {
      let propKey = Object.keys(target).find(x => x.split('|').indexOf(cmd) > -1);
      if (propKey) {
        this.parseCmds(target[propKey], target);
      } else {
        this.write(`You can't ${cmd} that.`);
      }
    }
    return;
  }

  switch (cmd) {
    case "look":
      // Look needs to be checked here because if there is no
      // target, it should run the look command without one.
      this.lookRoom();
      break;
    case "inventory":
      this.listInventory();
      break;
    case "north":
    case "south":
    case "east":
    case "west":
    case "up":
    case "down":
      this.move(cmd);
      break;
    case "clear":
      this.clear();
      break;
    default:
      this.write("What do you want to " + cmd + "?");
      break;
  }
};