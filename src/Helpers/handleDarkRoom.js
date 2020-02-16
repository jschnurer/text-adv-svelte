const oppositeDirs = {
  "north": "south",
  "south": "north",
  "east": "west",
  "west": "east",
  "up": "down",
  "down": "up"
}

export default function handleDarkRoom(cmd, args) {
  if (this.room.dark && !this.getFlag("G.HASLIGHT")) {
    // Player is in a dark room without a light source.
    // If they neither activated a light source nor
    // left the way they came, a grue eats them.
    if (oppositeDirs[cmd] && oppositeDirs[cmd] === this.lastMoveDir) {
      return true;
    }

    if (cmd === "use"
      && args.length === 1) {
      let invItem = this.findItem(args[0]);
      if (invItem && invItem.id === "FLASHLIGHT") {
        return true;
      }
    }

    this.parseStringCmd("gameOver|You fumble around in the dark for a few moments. You think you hear something so you immediately stop what you're doing, ears attuned to the silence all around you. Did you really hear something or are your ears playing tricks on you? Your question is answered only a few seconds later. The sound of slapping feet approaches, its direction indeterminate!\nClaws dig into your flesh and something large and leather wraps long, spindly arms around you. You struggle to free yourself but the grue is far, far stronger than you are. You let out a scream as it bites down on your neck.\nYou should fear the dark...");

    return false;
  }

  return true;
}