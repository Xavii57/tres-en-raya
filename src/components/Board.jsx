import { Square } from './Square.jsx'

export function BoardModel ({ board, uptdateBoard }) {
  return (
    <>
      {board.map((square, index) => {
        return (
          <Square key={index} index={index} uptdateBoard={uptdateBoard}>
            {square}
          </Square>
        )
      })}
    </>
  )
}
