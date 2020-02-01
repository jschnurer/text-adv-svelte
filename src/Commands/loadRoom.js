export default async function (roomAreaSlug) {
  if (this.rooms[roomAreaSlug]) {
    this.room = this.rooms[roomAreaSlug];
    this.look();
  } else {
    let j = await getRoom(roomAreaSlug);
    this.rooms[roomAreaSlug] = j;
    this.room = this.rooms[roomAreaSlug];
    this.look();
  }
};

async function getRoom(roomAreaSlug) {
  const resp = await fetch(`${window.hostDir}/Rooms/${roomAreaSlug}.json`);
  const j = await resp.json();
  return j;
};