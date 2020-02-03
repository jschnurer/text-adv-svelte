export default function saveGame() {
  let savedGame = JSON.stringify(
    Object.assign(
      {},
      {
        options: this.options,
        inventory: this.inventory,
        roomVars: this.roomVars,
        globalVars: this.globalVars,
        exploredRooms: Object.keys(this.rooms)
          .filter(x => this.rooms[x].explored)
          .map(x => this.rooms[x]),
        isGameOver: this.isGameOver,
        room: this.room
      }
    )
  );

  localStorage.setItem("game_state", savedGame);
};