import { formatGameCode } from "./formatGameCode"

export const getRecapParams = game =>
  "?gdate=" + formatGameCode(game.date) + "&gid=" + game.game_id
