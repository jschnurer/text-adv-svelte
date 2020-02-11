export default function decVar(name, amount) {
  this.setVarValue(name, parseInt((this.getVarValue(name)) || 0, 10) - parseInt((amount || 1), 10));
}