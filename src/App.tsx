import { motion } from 'framer-motion'

import { useBox } from '@/lib/box'

import { gameBox } from '@/stores/game'
import { reset, setPlayer, validateGame } from '@/stores/game/actions'

import Square from '@/components/Square'

export default function App() {
  const game = useBox(gameBox)
  const { board, winner, status, currentPlayer: player } = game

  return (
    <main className="grid place-items-center w-full h-screen text-zinc-600 bg-gradient-to-br from-purple-600 to-indigo-600">
      <motion.div
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 bg-white rounded-2xl shadow-xl px-24 py-12"
      >
        <motion.h1
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.125, duration: 0.5 }}
          className="text-center text-6xl font-bold tracking-tighter bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
        >
          TicTacToe
        </motion.h1>
        <motion.div
          initial={{ x: -64, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-2 text-xl">
            Status: {status}
            {winner && (
              <>
                {' '}
                - <span>Winner: {winner}</span>
              </>
            )}
          </p>
          <button
            className="border py-1 rounded px-8 transition ease-in-out hover:border-transparent hover:text-white hover:bg-purple-600"
            onClick={reset}
          >
            Reset
          </button>
        </motion.div>
        <div className="mt-4 grid gap-4 self-center">
          {board.map((row, rowIndex) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 + rowIndex * 0.125, duration: 0.5 }}
              className="flex gap-4"
              key={rowIndex}
            >
              {row.map((column, columnIndex) => (
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.25 + rowIndex * 0.125 + columnIndex * 0.125,
                    duration: 0.5,
                  }}
                  key={columnIndex}
                >
                  <Square
                    handleClick={() => {
                      if (status === 'win') {
                        return
                      }

                      setPlayer(rowIndex, columnIndex, player)
                      validateGame(game)
                    }}
                    type={column}
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  )
}
