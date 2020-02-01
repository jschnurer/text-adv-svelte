export default function move(dir) {
  if (!this.room[dir]) {
    this.write("You can't go that way.");
    return false;
  }

  this.loadRoom(this.room[dir]);
};