export default function incVar(name, amount) {
  this.setVarValue((this.getVarValue(name) || 0) + (amount || 1));
}