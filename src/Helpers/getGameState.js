import verbs from "../verbs.json";
import items from "../items.json";

// Import user commands.
import ask from "../Commands/ask.js";
import clear from "../Commands/clear.js";
import combine from "../Commands/combine.js";
import give from "../Commands/give.js";
import listInventory from "../Commands/listInventory.js";
import lookRoom from "../ScriptCommands/lookRoom.js";
import move from "../Commands/move.js";
import take from "../Commands/take.js";
import use from "../Commands/use.js";

// Import script commands.
import addItem from "../ScriptCommands/addItem.js";
import choice from "../ScriptCommands/choice.js";
import destroyFeature from "../ScriptCommands/destroyFeature.js";
import gameOver from "../ScriptCommands/gameOver.js";
import ifFlag from "../ScriptCommands/ifFlag.js";
import ifHasItem from "../ScriptCommands/ifHasItem.js";
import ifRoom from "../ScriptCommands/ifRoom.js";
import invokeRoom from "../ScriptCommands/invokeRoom.js";
import removeItem from "../ScriptCommands/removeItem.js";
import saveGame from "../ScriptCommands/saveGame.js";
import setFlag from "../ScriptCommands/setFlag.js";
import unsetFlag from "../ScriptCommands/unsetFlag.js";
import waitForInput from "../ScriptCommands/waitForInput.js";
import write from "../ScriptCommands/write.js";

// Import helper functions
import findItem from "./findItem.js";
import findTarget from "./findTarget.js";
import getFeature from "./getFeature.js";
import getFlag from "./getFlag.js";
import getLocalVars from "./getLocalVars.js";
import getRoomDictionary from "./getRoomDictionary.js";
import handleChoiceInput from "./handleChoiceInput.js";
import handleDevCmd from "./handleDevCmd.js";
import handleUserEntry from "./handleUserEntry.js";
import loadRoom from "../ScriptCommands/loadRoom.js";
import parseCmds from "./parseCmds.js";
import parseStringCmd from "./parseStringCmd.js";
import showFeatures from "./showFeatures.js";
import tryObjectInteraction from "./tryObjectInteraction.js";
import unknownCmd from "../Helpers/unknownCmd.js";
import unknownTarget from "./unknownTarget.js";

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
    // The current depth of write capturing (0 means output to screen).
    writeCapturing: 0,
    // If we 
    waitCmds: null,

    // User Commands
    ask,
    clear,
    combine,
    give,
    listInventory,
    move,
    take,
    use,

    // Script Commands
    addItem,
    ifHasItem,
    choice,
    destroyFeature,
    gameOver,
    ifFlag,
    ifRoom,
    invokeRoom,
    removeItem,
    saveGame,
    setFlag,
    unsetFlag,
    waitForInput,
    write,

    // Helpers
    findItem,
    findTarget,
    getFeature,
    getFlag,
    getLocalVars,
    handleChoiceInput,
    handleDevCmd,
    handleUserEntry,
    loadRoom,
    lookRoom,
    parseCmds,
    parseStringCmd,
    showFeatures,
    tryObjectInteraction,
    unknownCmd,
    unknownTarget,
  };

  if (savedGame) {
    let currRoomSlug = savedGame.currRoomSlug;
    delete savedGame.currRoomSlug;
    Object.assign(gameState, savedGame);
    gameState.room = gameState.rooms[currRoomSlug];
  }

  return gameState;
}