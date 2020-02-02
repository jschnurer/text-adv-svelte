const unknownMsgs = [
  "Huh?",
  "What?",
  "You don't know how to {cmd}.",
  "{cmd}?! You have no idea!",
  "What's {cmd} mean?",
  "You're not sure you really want to {cmd}...",
  "You can't {cmd}.",
  "{cmd} isn't a thing. Stop trying to make it a thing."
];

export default function unknownCmd(cmd) {
  let msg = unknownMsgs[Math.floor(Math.random()*unknownMsgs.length)];
  msg = msg.replace(/{cmd}/g, cmd);
  this.write(msg);
};