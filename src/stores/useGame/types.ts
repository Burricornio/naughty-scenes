export interface PlayersObject {
  player1: string
  player2: string
}
export interface Players {
  playerNames: PlayersObject
}

export enum GameMode {
  UNSELECTED = 0,
  IMPRO = 1,
  ACTOR = 2,
  DIRECTOR = 3
}

export enum GameModeName {
  IMPRO = 'Impro',
  ACTOR = 'Actor',
  DIRECTOR = 'Director'
}
