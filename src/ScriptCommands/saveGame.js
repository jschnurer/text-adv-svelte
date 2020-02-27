export default function saveGame() {
  let savedGame = JSON.stringify(
    Object.assign(
      {},
      {
        options: this.options,
        inventory: this.inventory.map(x => x.id),
        roomVars: this.roomVars,
        globalVars: this.globalVars,
        currRoomSlug: this.room.slug,
      }
    )
  );

  localStorage.setItem("game_state", savedGame);
};