export default function getLocalVars() {
  if (!this.roomVars[this.room.name]) {
    this.roomVars[this.room.name] = {};
  }

  return this.roomVars[this.room.name];
};