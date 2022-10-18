import { motion } from 'framer-motion'
import type { Player } from '@/domain/entities'
import { XMarkIcon, StopIcon } from '@heroicons/react/24/outline'

type SquareProps = {
  type: Player
  handleClick: () => void
}

export default function Square({ type, handleClick }: SquareProps) {
  return (
    <motion.button
      key={type}
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.25 }}
      onClick={handleClick}
      className="grid place-items-center w-16 h-16 border rounded"
    >
      {type === 'X' ? (
        <XMarkIcon className="w-12 h-12 text-purple-600" />
      ) : type === 'O' ? (
        <StopIcon className="w-12 h-12 text-indigo-600" />
      ) : (
        ''
      )}
    </motion.button>
  )
}
