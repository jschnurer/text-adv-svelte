export default function updateRoomDesc(slug, roomDesc) {
  if (slug === "ROOM") {
    this.room.description = roomDesc;
  } else {
    let f = this.getFeature(slug);
    f.roomDesc = roomDesc;
  }
};