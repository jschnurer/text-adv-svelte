export default function pickOne(args) {
  this.parseCmds(args[Math.floor(Math.random() * args.length)]);
}