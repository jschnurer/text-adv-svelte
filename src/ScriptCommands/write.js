export default function write(msg) {
  let wc = this.writeCapturing;

  if (wc) {
    this.capturedText = "\n" + msg;
  } else {
    this.text += "\n" + msg;
  }

  if (wc) {
    this.capturedText = addHints(replaceVariables(replaceNotices(this.capturedText, this), this), this).replace(/%%/g, "%");
  } else {
    this.text = addHints(replaceVariables(replaceNotices(this.text, this), this), this).replace(/%%/g, "%");
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

function addHints(msg, gameState) {
  if (gameState.options.showHints
    && !msg.match(/^\^.+?\^$/)) {
    let hintMsg = msg;

    (gameState.room.features || []).forEach(x => {
      let slugs = [];
      x.slug.split('|').forEach(z => slugs.push(z));
      if (x.altSlugs) {
        slugs = slugs.concat(x.altSlugs);
      }

      slugs.forEach(slug => {
        hintMsg = hintMsg.replace(new RegExp("\\b" + slug + "\\b", 'gi'), (match) => {
          return '%' + match + '%';
        });
      });
    });

    return hintMsg;
  } else {
    return msg;
  }
}