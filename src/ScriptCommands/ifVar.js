export default function ifVar(name, operator, compareValue, trueCmds, falseCmds, feature) {
  let value = this.getVarValue(name);
  let checkVal = compareValue;
  let checkVarName = getVarName(compareValue);
  if (checkVarName) {
    this.getVarValue(checkVarName);
  }

  let checkResult = false;

  switch (operator) {
    case "==": checkResult = value == checkVal; break;
    case "===": checkResult = value === checkVal; break;
    case ">": checkResult = value > checkVal; break;
    case ">=": checkResult = value >= checkVal; break;
    case "<": checkResult = value < checkVal; break;
    case "<=": checkResult = value <= checkVal; break;
  }

  if (checkResult && trueCmds) {
    this.parseCmds(trueCmds, feature);
  } else if (!checkResult && falseCmds) {
    this.parseCmds(falseCmds, feature);
  }
};

function getVarName(compareValue) {
  // Check if it's "{example}". If so,
  // get the value of the "example" variable.
  let varMatches = compareValue.match("^%(.+?)%$");
  if (varMatches && varMatches.length === 2) {
    return varMatches[1];
  }
}