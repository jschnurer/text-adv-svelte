export default function gameOver(msg) {
  this.text = msg;
  this.isGameOver = true;
  this.update();
};