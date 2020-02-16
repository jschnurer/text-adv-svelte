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

  this.userEntry = entry;

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
  } else if (cmd === "put") {
    let putMatches = entry.match(/put (.+?) (in|on) (.+)/);
    if(putMatches) {
      cmd = "use";
      args[0] = putMatches[1] + " on " + putMatches[3];
    }
  }

  if (!this.allowedVerbs.find(x => x === cmd)) {
    this.unknownCmd(cmd);
    return;
  }

  // Convert shortcuts to full words to match with properties.
  if (shortcuts[cmd]) {
    cmd = shortcuts[cmd];
  }

  // Handle input in a darkened room.
  if(!this.handleDarkRoom(cmd, args)) {
    return;
  }

  // Special cases for 4-word commands and others.
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
    case "incant":
      this.incant(args.length > 0 ? args[0] : null);
      return;
  }

  if (args.length > 0) {
    target = this.findTarget(args[0]);
    if (!target) {
      this.unknownTarget(args[0]);
      return;
    }
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
      this.look();
      break;
    case "inventory":
      this.listInventory();
      break
    case "incantations":
      this.incantations();
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
    case "stand":
      if (this.room.stand) {
        this.parseCmds(this.room.stand);
      }
      break;
    case "sit":
      this.write("What do you want to sit on?");
      break;
    default:
      this.write("What do you want to " + cmd + "?");
      break;
  }
};