import * as rooms from "../Rooms/room-index.js";

export default function () {
  let dict = {};
  Object.keys(rooms).forEach(prop => {
    let r = rooms[prop];
    dict[r.slug] = r;
  });

  return dict;
}