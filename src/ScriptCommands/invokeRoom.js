export default function invokeRoom(cmdName) {
  this.parseCmds(this.room[cmdName]);
};