import verbs from "../verbs.json";
import items from "../items.json";

// Import user commands.
import ask from "../Commands/ask.js";
import clear from "../Commands/clear.js";
import combine from "../Commands/combine.js";
import give from "../Commands/give.js";
import incant from "../Commands/incant.js";
import incantations from "../Commands/incantations.js";
import listInventory from "../Commands/listInventory.js";
import look from "../Commands/look.js";
import move from "../Commands/move.js";
import take from "../Commands/take.js";
import use from "../Commands/use.js";

// Import script commands.
import addItem from "../ScriptCommands/addItem.js";
import choice from "../ScriptCommands/choice.js";
import callCommon from "../ScriptCommands/callCommon.js";
import decVar from "../ScriptCommands/decVar.js";
import dialog from "../ScriptCommands/dialog.js";
import end from "../ScriptCommands/end.js";
import gameOver from "../ScriptCommands/gameOver.js";
import ifFlag from "../ScriptCommands/ifFlag.js";
import ifFlagWrite from "../ScriptCommands/ifFlagWrite.js";
import ifHasItem from "../ScriptCommands/ifHasItem.js";
import ifRoom from "../ScriptCommands/ifRoom.js";
import ifVar from "../ScriptCommands/ifVar.js";
import incVar from "../ScriptCommands/incVar.js";
import invokeRoom from "../ScriptCommands/invokeRoom.js";
import ifIsIn from "../ScriptCommands/ifIsIn.js";
import pickOne from "../ScriptCommands/pickOne.js";
import removeItem from "../ScriptCommands/removeItem.js";
import saveGame from "../ScriptCommands/saveGame.js";
import setFlag from "../ScriptCommands/setFlag.js";
import switchBranch from "../ScriptCommands/switchBranch.js";
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
import getVarValue from "./getVarValue.js";
import handleChoiceInput from "./handleChoiceInput.js";
import handleDarkRoom from "./handleDarkRoom.js";
import handleDevCmd from "./handleDevCmd.js";
import handleUserEntry from "./handleUserEntry.js";
import knowsAnyIncantations from "./knowsAnyIncantations.js";
import loadRoom from "../ScriptCommands/loadRoom.js";
import parseCmds from "./parseCmds.js";
import parseStringCmd from "./parseStringCmd.js";
import setVarValue from "./setVarValue.js";
import showFeatures from "./showFeatures.js";
import unknownCmd from "../Helpers/unknownCmd.js";
import unknownTarget from "./unknownTarget.js";

export default function getGameState(loadGame, updateScroll, update) {
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
    globalVars: {},
    // The database of rooms.
    rooms: getRoomDictionary(),
    // Whether or not the game has reached its end.
    isEnd: false,
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
    // The cmds to process after user input.
    waitCmds: null,
    // The current user entry.
    userEntry: null,
    // The last direction command entered by the user that caused a room load.
    lastMoveDir: null,

    // User Commands
    ask,
    clear,
    combine,
    give,
    incant,
    incantations,
    listInventory,
    move,
    take,
    use,

    // Script Commands
    addItem,
    choice,
    callCommon,
    decVar,
    dialog,
    end,
    gameOver,
    ifFlag,
    ifFlagWrite,
    ifHasItem,
    ifRoom,
    ifVar,
    incVar,
    invokeRoom,
    ifIsIn,
    pickOne,
    removeItem,
    saveGame,
    setFlag,
    switchBranch,
    unsetFlag,
    waitForInput,
    write,

    // Helpers
    findItem,
    findTarget,
    getFeature,
    getFlag,
    getLocalVars,
    getVarValue,
    handleChoiceInput,
    handleDarkRoom,
    handleDevCmd,
    handleUserEntry,
    knowsAnyIncantations,
    loadRoom,
    look,
    parseCmds,
    parseStringCmd,
    setVarValue,
    showFeatures,
    unknownCmd,
    unknownTarget,
    update,
    updateScroll,
  };

  let savedGame = null;
  if (loadGame) {
    savedGame = localStorage.getItem('game_state');
    if (savedGame) {
      savedGame = JSON.parse(savedGame);
      if (savedGame) {
        let currRoomSlug = savedGame.currRoomSlug;
        let inv = savedGame.inventory;
        delete savedGame.inventory;
        delete savedGame.currRoomSlug;
        Object.assign(gameState, savedGame);

        inv.forEach(x => {
          let item = null;
          if (typeof (x) === 'string') {
            item = items.find(item => item.id === x);
          } else if (typeof (x) === 'object') {
            item = items.find(item => item.id === x.id);
          }
          
          if (item) {
            gameState.inventory.push(item);
          }
        });

        gameState.loadRoom(currRoomSlug);
      }
    }
  }

  return gameState;
}