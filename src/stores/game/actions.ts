import { gameBox } from '@/stores/game'
import type { GameStatus, Player } from '@/domain/entities'
import type { GameBoxState } from '@/stores/game'

export const setPlayer = (
  row: number,
  column: number,
  player: Player
): boolean => {
  const board = gameBox.getInner('board')
  const currentPlayer = gameBox.getInner('currentPlayer')

  if (board[row][column] !== '') {
    return false
  }

  board[row][column] = player

  gameBox.set({ board })
  gameBox.set({
    currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
  })

  return true
}

const isDraw = (board: Player[][]): boolean => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return false
      }
    }
  }

  return true
}

const hasWon = (board: Player[][]): Option<Player> => {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return board[i][0]
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    ) {
      return board[0][i]
    }
  }

  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return board[0][0]
  }

  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return board[0][2]
  }

  return null
}

export const validateGame = (game: GameBoxState) => {
  const winner = hasWon(game.board)

  if (winner) {
    gameBox.set({
      winner: winner,
      status: 'win',
    })

    return
  }

  if (isDraw(game.board)) {
    gameBox.set({
      status: 'draw',
    })
  }
}

export const reset = () => {
  gameBox.set({
    status: 'playing' as GameStatus,
    winner: null as Option<Player>,
    currentPlayer: 'X' as Player,
    board: Array(3)
      .fill(null)
      .map(() => Array(3).fill('')) as Player[][],
  })
}
