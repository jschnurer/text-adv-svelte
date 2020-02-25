const singleWordCmds = [
  "saveGame",
  "look"
]

export default function parseStringCmd(cmd) {
  let chunks = cmd.split("|");

  if (chunks.length > 1 || singleWordCmds.indexOf(cmd) > -1) {
    // First part is a command!
    let func = this[chunks[0]];
    if (func) {
      // Invoke the function.
      func.apply(this, chunks.filter((_, ix) => ix > 0));
      return true;
    } else {
      alert("unknown function: " + chunks[0]);
      return false;
    }
  }

  this.write(cmd);
  return true;
};