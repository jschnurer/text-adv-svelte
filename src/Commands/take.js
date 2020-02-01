export default function take (target) {
  if (!target) {
    this.write("Take what?");
  } else {
    if (target.take) {
      this.parseCmds(target.take, target);
    } else {
      this.write("You can't take that.");
    }
  }
};