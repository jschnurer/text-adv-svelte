import verbs from "../verbs.json";
import items from "../items.json";

// Import user commands.
import clear from "../Commands/clear.js";
import combineWith from "../Commands/combineWith.js";
import listInventory from "../Commands/listInventory.js";
import look from "../Commands/look.js";
import move from "../Commands/move.js";
import take from "../Commands/take.js";

// Import script commands.
import addItem from "../ScriptCommands/addItem.js";
import choice from "../ScriptCommands/choice.js";
import destroyFeature from "../ScriptCommands/destroyFeature.js";
import gameOver from "../ScriptCommands/gameOver.js";
import ifFlag from "../ScriptCommands/ifFlag.js";
import ifRoom from "../ScriptCommands/ifRoom.js";
import invokeRoom from "../ScriptCommands/invokeRoom.js";
import saveGame from "../ScriptCommands/saveGame.js";
import setFlag from "../ScriptCommands/setFlag.js";
import removeItem from "../ScriptCommands/removeItem.js";
import write from "../ScriptCommands/write.js";

// Import helper functions
import loadRoom from "../ScriptCommands/loadRoom.js";
import getFeature from "./getFeature.js";
import getFlag from "./getFlag.js";
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

export default function getGameState(loadGame) {
  let savedGame = null;
  if (loadGame) {
    savedGame = localStorage.getItem('game_state');
    if (savedGame) {
      savedGame = JSON.parse(savedGame);
    }
  }

  let gameState = {
    // Options for the game.
    options: {
      // Determines whether or not to highlight interactable words.
      showHints: false,
    },
    // The player's current inventory of items.
    inventory: [],
    // Variables that are isolated by room.
    roomVars: {},
    // Variables that are global to the entire game.
    globalVars: [],
    // The database of rooms.
    rooms: getRoomDictionary(),
    // Whether or not the game is in a game over state.
    isGameOver: false,
    // The current room.
    room: null,
    // The current text being outputted to the screen.
    text: '',
    // The list of allowed verbs the player can type.
    allowedVerbs: verbs,
    // The database of items.
    items,

    // User Commands
    clear,
    combineWith,
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
    invokeRoom,
    removeItem,
    saveGame,
    setFlag,
    write,

    // Helpers
    writeCapturing: false,
    loadRoom,
    showFeatures,
    parseCmds,
    parseStringCmd,
    getLocalVars,
    getFeature,
    getFlag,
    unknownCmd,
    unknownTarget,
    findTarget,
    handleChoiceInput,
    handleUserEntry,
  };

  if (savedGame) {
    let currRoomSlug = savedGame.currRoomSlug;
    delete savedGame.currRoomSlug;
    Object.assign(gameState, savedGame);
    gameState.room = gameState.rooms[currRoomSlug];
  }

  return gameState;
}