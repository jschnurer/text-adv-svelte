export default function incVar(name) {
  this.setVarValue((this.getVarValue(name) || 0) + 1);
}