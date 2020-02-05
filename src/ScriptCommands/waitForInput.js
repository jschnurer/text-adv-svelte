export default function waitForInput(args) {
  if (!args || !args.length) {
    console.log("Invalid args sent to waitForInput!");
    return;
  }

  this.waitCmds = args[0];

  this.write("Press enter to continue...");
}