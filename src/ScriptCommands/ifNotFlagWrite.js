export default function ifNotFlagWrite(flag, message) {
  if (!this.getFlag(flag)) {
    this.write(message);
  }
}