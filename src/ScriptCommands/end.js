export default function end(msg) {
  this.text = msg;
  this.isEnd = true;
  this.update();
}