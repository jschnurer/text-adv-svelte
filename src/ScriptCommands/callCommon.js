/// Calls a common function of the room's _common object.
export default function callCommon(name) {
  if (!this.room._common) {
    return;
  }

  if (!this.room._common[name]) {
    console.log(`Common not found: ${name}`);
    return;
  }

  this.parseCmds(this.room._common[name]);
}