import loadRoom from "./loadRoom.js";
import look from "./look.js";
import showFeatures from "./showFeatures.js";
import parseCmds from "./parseCmds.js";
import parseStringCmd from "./parseStringCmd.js";
import ifVar from "./ifVar.js";
import getLocalVars from "./getLocalVars.js";
import write from "./write.js";
import getFeature from "./getFeature.js";
import updateRoomDesc from "./updateRoomDesc.js";
import ifRoom from "./ifRoom.js";
import setVar from "./setVar.js";
import addItem from "./addItem.js";
import removeItem from "./addItem.js";
import destroyFeature from "./destroyFeature.js";
import take from "./take.js";
import move from "./move.js";
import unknownCmd from "./unknownCmd.js";
import unknownTarget from "./unknownTarget.js";
import findTarget from "./findTarget.js";
import invokeRoom from "./invokeRoom.js";
import listInventory from "./listInventory.js";
import gameOver from "./gameOver.js";
import handleChoiceInput from "./handleChoiceInput.js";
import choice from "./choice.js";

export default function getGameState() {
  return {
    inventory: [],
    gameVars: [],
    rooms: {},
    isGameOver: false,
    room: null,
    text: '',
    loadRoom,
    look,
    showFeatures,
    parseCmds,
    parseStringCmd,
    ifVar,
    getLocalVars,
    write,
    getFeature,
    updateRoomDesc,
    ifRoom,
    setVar,
    addItem,
    removeItem,
    destroyFeature,
    take,
    move,
    unknownCmd,
    unknownTarget,
    findTarget,
    invokeRoom,
    listInventory,
    gameOver,
    choice,
    handleChoiceInput,
  };
}