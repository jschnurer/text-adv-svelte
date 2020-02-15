/// Calls a common function of the room's _common object.
export default function callCommon(name, roomSlug) {
  let room = this.room;

  if (roomSlug) {
    room = this.rooms[roomSlug];
  }

  if (!room._common) {
    return;
  }

  if (!room._common[name]) {
    console.log(`Common not found: ${name}`);
    return;
  }

  this.parseCmds(room._common[name]);
}