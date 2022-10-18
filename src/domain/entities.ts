export type None = ''
export type Cross = 'X'
export type Circle = 'O'

export type Player = None | Cross | Circle

type Playing = 'playing'
type Draw = 'draw'
type Win = 'win'
export type GameStatus = Playing | Draw | Win
