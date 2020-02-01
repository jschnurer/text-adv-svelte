export default function parseStringCmd(cmd, feature) {
  let chunks = cmd.split(":");

  if (cmd.startsWith("SETFLAG")) {
    let vars = this.getLocalVars();
    vars[chunks[1]] = true;
    return true;
  } else if (cmd.startsWith("CHECKFLAG")) {
    let vars = this.getLocalVars();
    return !!vars[chunks[1]];
  } else if (cmd.startsWith("ADDITEM")) {
    this.addItem(chunks[1]);
    return true;
  } else if (cmd.startsWith("REMOVEITEM")) {
    this.removeItem(chunks[1]);
    return true;
  } else if (cmd.startsWith("DESTROY")) {
    if (cmd === "DESTROY") {
      this.destroyFeature(feature.slug);
      return true;
    } else {
      // TODO: allow destroying other things
      return true;
    }
  } else if (cmd.startsWith("UPDATELOOK")) {
    let numChunks = cmd.length;
    if (numChunks === 2) {
      // TODO: Update own look
    } else if (numChunks >= 3) {
      // update other look
      let f = this.getFeature(chunks[1]);
      f.look = [chunks[2]];
    }
    return true;
  } else if (cmd.startsWith("GAMEOVER")) {
    this.gameOver(chunks[1]);
    return false;
  } else if (cmd.startsWith("INVOKEROOM")) {
    this.invokeRoom(chunks[1]);
    return false;
  } else if (cmd.startsWith("UPDATEROOMDESC")) {
    this.updateRoomDesc(chunks[1], chunks[2]);
    return true;
  } else if (cmd.startsWith("UNKNOWNTARGET")) {
    this.unknownTarget(feature.slug);
    return true;
  } else {
    this.write(cmd);
    return true;
  }
};