export default function dialog(dialogObj) {
  let args = this.userEntry;

  if (args === null) {
    this.write("Ask who about what?");
    return;
  }

  let matches = args.trim().match("ask (.+?) about (.+)");

  if (!matches || matches.length !== 3) {
    this.write("Huh? Try \"ask x about y\" instead.");
    return;
  }

  let topic = matches[2];
  let topicCmds = dialogObj[topic];

  if (!topicCmds) {
    let topicName = Object.keys(dialogObj)
      .find(x => x.split('|')
        .find(z => z.toLowerCase() === topic));
    
    if (topicName) {
      topicCmds = dialogObj[topicName];
    }
  }

  if (!topicCmds) {
    this.parseCmds(dialogObj[""]);
    return;
  }

  this.parseCmds(topicCmds);
}