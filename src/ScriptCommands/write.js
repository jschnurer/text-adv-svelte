export default function write(msg) {
  let wc = this.writeCapturing;

  if (this.options.showHints) {
    let hintMsg = msg;

    this.room.features.forEach(x => {
      hintMsg = hintMsg.replace(new RegExp(x.slug, 'g'), '%' + x.slug + '%');
    });

    if (wc) {
      this.capturedText = "\n" + hintMsg;
    } else {
      this.text += "\n" + hintMsg;
    }
  } else {
    if (wc) {
      this.capturedText = "\n" + msg;
    } else {
      this.text += "\n" + msg;
    }
  }

  if (wc) {
    this.capturedText = replaceVariables(replaceNotices(this.capturedText, this), this);
  } else {
    this.text = replaceVariables(replaceNotices(this.text, this), this);
  }

  if (!wc) {
    let paragraphs = this.text.split("\n");

    if (paragraphs.length > 30) {
      this.text = paragraphs.slice(paragraphs.length - 30).join('\n');
    }
  }

  this.updateScroll();
  this.update();
};

function replaceNotices(haystack, gameState) {
  return haystack.replace(/{(.+?)}/g, (_, p1) => {
    let feat = gameState.getFeature(p1);

    if (feat) {
      if (typeof feat.notice === 'string') {
        return feat.notice;
      } else {
        gameState.writeCapturing = true;
        gameState.parseCmds(feat.notice);
        gameState.writeCapturing = false;
        return gameState.capturedText.replace('\n', '');
      }
    }
    return '';
  });
}

function replaceVariables(haystack, gameState) {
  return haystack.replace(/\$(.+?)\$/g, (_, varName) => {
    return gameState.getVarValue(varName);
  });
}