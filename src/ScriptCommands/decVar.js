export default function decVar(name) {
  this.setVarValue((this.getVarValue(name) || 0) - 1);
}