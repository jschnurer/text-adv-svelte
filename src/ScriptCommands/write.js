export default function write(msg){
  if (this.options.showHints) {
    let hintMsg = msg;

    this.room.features.forEach(x => {
      hintMsg = hintMsg.replace(new RegExp(x.slug, 'g'), '%' + x.slug + '%');
    });

    this.text += "\n" + hintMsg;
  } else {
    this.text += "\n" + msg;
  }

  let paragraphs = this.text.split("\n");

  if (paragraphs.length > 30) {
    this.text = paragraphs.slice(paragraphs.length - 30).join('\n');
  }

  this.updateScroll();
  this.update();
};