import { createBox } from '@/lib/box'
import type { InferBoxType } from '@/lib/box'
import type { GameStatus, Player } from '@/domain/entities'

export const gameBox = createBox({
  status: 'playing' as GameStatus,
  winner: null as Option<Player>,
  currentPlayer: 'X' as Player,
  board: Array(3)
    .fill(null)
    .map(() => Array(3).fill('')) as Player[][],
})

export type GameBox = typeof gameBox
export type GameBoxState = InferBoxType<GameBox>
