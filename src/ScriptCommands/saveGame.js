export default function saveGame() {
  let savedGame = JSON.stringify(
    Object.assign(
      {},
      {
        options: this.options,
        inventory: this.inventory,
        roomVars: this.roomVars,
        globalVars: this.globalVars,
        isGameOver: this.isGameOver,
        currRoomSlug: this.room.slug,
      }
    )
  );

  localStorage.setItem("game_state", savedGame);
};