export default function write(msg){
  this.text += "\n" + msg;
  this.updateScroll();
  this.update();
};