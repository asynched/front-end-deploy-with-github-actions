import { useBox } from '@/lib/box'

import { gameBox } from '@/stores/game'
import { reset, setPlayer, validateGame } from '@/stores/game/actions'

import Square from '@/components/Square'

export default function App() {
  const game = useBox(gameBox)
  const { board, winner, status, currentPlayer: player } = game

  return (
    <main className="grid place-items-center w-full h-screen text-zinc-600">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tighter text-zinc-900">
          Tic-tac-toe
        </h1>
        <div className="text-center">
          <p className="mb-2">
            Status: {status}
            {winner && (
              <>
                {' '}
                - <span>Winner: {winner}</span>
              </>
            )}
          </p>
          <button className="text-sm border py-1 px-4" onClick={reset}>
            Reset
          </button>
        </div>
        <div className="grid self-center">
          {board.map((row, rowIndex) => (
            <div className="flex" key={rowIndex}>
              {row.map((column, columnIndex) => (
                <Square
                  handleClick={() => {
                    if (status === 'win') {
                      return
                    }

                    setPlayer(rowIndex, columnIndex, player)
                    validateGame(game)
                  }}
                  key={columnIndex}
                  type={column}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
