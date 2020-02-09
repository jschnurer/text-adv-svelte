export default function write(msg) {
  let wc = this.writeCapturing;

  if (this.options.showHints) {
    let hintMsg = msg;

    this.room.features.forEach(x => {
      let slugs = [];
      x.slug.split('|').forEach(z => slugs.push(z));
      if(x.altSlugs) {
        slugs = slugs.concat(x.altSlugs);
      }
      
      slugs.forEach(slug => {
        hintMsg = hintMsg.replace(new RegExp("\\b" + slug + "\\b", 'gi'), (match) => {
          return '%' + match + '%';
        });
      });
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
      gameState.writeCapturing = true;
      gameState.parseCmds(feat.notice);
      gameState.writeCapturing = false;
      if (gameState.capturedText) {
        return gameState.capturedText.replace('\n', '');
      } else {
        return '';
      }
    }
    return '';
  });
}

function replaceVariables(haystack, gameState) {
  return haystack.replace(/\$(.+?)\$/g, (_, varName) => {
    let val = gameState.getVarValue(varName);
    if (val === undefined || val === null) {
      return '';
    }
    return val;
  });
}