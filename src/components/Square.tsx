import type { Player } from '@/domain/entities'

type SquareProps = {
  type: Player
  handleClick: () => void
}

export default function Square({ type, handleClick }: SquareProps) {
  return (
    <button
      onClick={handleClick}
      className="text-2xl border w-16 h-16 hover:bg-gray-100"
    >
      {type}
    </button>
  )
}
