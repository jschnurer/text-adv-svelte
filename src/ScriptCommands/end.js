export default function end(msg) {
  this.text = '';
  this.write(msg);
  this.isEnd = true;
  this.update();
}