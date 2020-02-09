export default function ifFlagWrite(flag, message) {
  if (this.getFlag(flag)) {
    this.write(message);
  }
}