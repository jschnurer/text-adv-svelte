export default function getLocalVars() {
  if (!this.gameVars[this.room.name]) {
    this.gameVars[this.room.name] = {};
  }

  return this.gameVars[this.room.name];
};