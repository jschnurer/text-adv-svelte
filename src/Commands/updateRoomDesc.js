export default function updateRoomDesc(slug, roomDesc) {
  let f = this.getFeature(slug);
  f.roomDesc = roomDesc;
};