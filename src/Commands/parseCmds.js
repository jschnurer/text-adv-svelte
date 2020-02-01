export default function parseCmds(cmds, feature) {
  let bail = false;

  cmds.forEach(cmd => {
    if (bail) {
      return;
    }

    if (typeof cmd === "string") {
      if (!this.parseStringCmd(cmd, feature)) {
        bail = true;
      }
      return;
    }
    switch (cmd.cmd) {
      case "write":
        this.write.apply(this, cmd.args);
        break;
      case "ifGVar":
        this.ifVar.apply(this, [this.gameVars, ...cmd.args, feature]);
        break;
      case "setGVar":
        this.setVar.apply(this, [this.gameVars, ...cmd.args, feature]);
        break;
      case "ifLVar":
        this.ifVar.apply(this, [this.getLocalVars(), ...cmd.args, feature]);
        break;
      case "setLVar":
        this.setVar.apply(this, [this.getLocalVars(), ...cmd.args, feature]);
        break;
      case "addItem":
        this.addItem.apply(this, cmd.args);
        break;
      case "removeItem":
        this.removeItem.apply(this, cmd.args);
        break;
      case "destroyFeature":
        this.destroyFeature.apply(this, cmd.args);
        break;
      case "ifRoom":
        this.ifRoom.apply(this, cmd.args);
        break;
      case "choice":
        this.choice.apply(this, cmd.args);
        break;
    }
  });
};