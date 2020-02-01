export default function handleChoiceInput(entry) {
  if (
    this.choiceObj.options
      .map(x => x.toLowerCase())
      .indexOf(entry.toLowerCase()) === -1
  ) {
    this.write(choiceObj.repeat);
    return;
  }
  let resolutionPath = this.choiceObj.resolution[entry.toLowerCase()];
  this.choiceObj = null;
  this.parseCmds(resolutionPath);
};