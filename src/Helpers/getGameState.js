import verbs from "../verbs.json";
import items from "../items.json";

// Import user commands.
import look from "../Commands/look.js";
import take from "../Commands/take.js";
import move from "../Commands/move.js";
import listInventory from "../Commands/listInventory.js";
import clear from "../Commands/clear.js";

// Import script commands.
import addItem from "../ScriptCommands/addItem.js";
import choice from "../ScriptCommands/choice.js";
import destroyFeature from "../ScriptCommands/destroyFeature.js";
import gameOver from "../ScriptCommands/gameOver.js";
import ifFlag from "../ScriptCommands/ifFlag.js";
import ifRoom from "../ScriptCommands/ifRoom.js";
import ifVar from "../ScriptCommands/ifVar.js";
import invokeRoom from "../ScriptCommands/invokeRoom.js";
import saveGame from "../ScriptCommands/saveGame.js";
import setFlag from "../ScriptCommands/setFlag.js";
import setVar from "../ScriptCommands/setVar.js";
import updateLook from "../ScriptCommands/updateLook.js";
import updateRoomDesc from "../ScriptCommands/updateRoomDesc.js";
import removeItem from "../ScriptCommands/addItem.js";
import write from "../ScriptCommands/write.js";

// Import helper functions
import loadRoom from "../ScriptCommands/loadRoom.js";
import getFeature from "./getFeature.js";
import showFeatures from "./showFeatures.js";
import parseCmds from "./parseCmds.js";
import parseStringCmd from "./parseStringCmd.js";
import unknownCmd from "../Helpers/unknownCmd.js";
import unknownTarget from "./unknownTarget.js";
import findTarget from "./findTarget.js";
import getRoomDictionary from "./getRoomDictionary.js";
import handleUserEntry from "./handleUserEntry.js";
import handleChoiceInput from "./handleChoiceInput.js";
import getLocalVars from "./getLocalVars.js";

export default function getGameState() {
  let savedGame = localStorage.getItem('game_state');
  if(savedGame) {
    savedGame = JSON.parse(savedGame);
  }

  let gameState = {
    options: {
      showHints: false,
    },
    inventory: [],
    roomVars: [],
    globalVars: [],
    rooms: getRoomDictionary(),
    isGameOver: false,
    room: null,
    text: '',
    allowedVerbs: verbs,
    items,

    // User Commands
    clear,
    listInventory,
    look,
    move,
    take,

    // Script Commands
    addItem,
    choice,
    destroyFeature,
    gameOver,
    ifFlag,
    ifRoom,
    ifVar,
    invokeRoom,
    removeItem,
    saveGame,
    setFlag,
    setVar,
    updateLook,
    updateRoomDesc,
    write,

    // Helpers
    loadRoom,
    showFeatures,
    parseCmds,
    parseStringCmd,
    getLocalVars,
    getFeature,
    unknownCmd,
    unknownTarget,
    findTarget,
    handleChoiceInput,
    handleUserEntry,
  };

  if (savedGame) {
    let exploredRooms = savedGame.exploredRooms;
    delete savedGame.exploredRooms;
    Object.assign(gameState, savedGame);
    exploredRooms.forEach(x => {
      gameState.rooms[gameState.room.slug] = x;
    });

    gameState.rooms[gameState.room.slug] = gameState.room;
  }
  
  return gameState;
}