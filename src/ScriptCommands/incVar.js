export default function incVar(name, amount) {
  this.setVarValue(name, (this.getVarValue(name) || 0) + (amount || 1));
}