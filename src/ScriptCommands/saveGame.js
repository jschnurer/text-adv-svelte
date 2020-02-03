export default function saveGame() {
  let savedGame = JSON.stringify(
    Object.assign(
      {},
      {
        options: gameState.options,
        inventory: gameState.inventory,
        roomVars: gameState.roomVars,
        globalVars: gameState.globalVars,
        exploredRooms: Object.keys(gameState.rooms)
          .filter(x => gameState.rooms[x].explored)
          .map(x => gameState.rooms[x]),
        isGameOver: gameState.isGameOver,
        room: gameState.room
      }
    )
  );

  localStorage.setItem("game_state", savedGame);
};