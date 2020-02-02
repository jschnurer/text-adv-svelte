export default function choice(repeatText, options, resolutionObj) {
  this.choiceObj = {
    repeat: repeatText,
    options,
    resolution: resolutionObj
  };
};