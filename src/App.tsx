import { useEffect, useState } from "react"
import { Cell } from "./Cell"
import { isDraw, isWinner } from "./utils"

export function App(){
  const [moves, setMoves] = useState<Moves>(Array(9).fill(null))
  const [turn, setTurn] = useState<Turn>("X")
  const [status, setStatus] = useState<Status>(null)

  const reset = ()=>{
    setMoves(state => state.map((v) => null)) 
    setTurn("X")
    setStatus(null)
  }

  const showMessage = () => status === "winner" ? `'${turn}' win!` : status === "draw" ? "It's a draw" : `'${turn}' turn`

  const changeTurn = () => setTurn((state : string) => state === "X" ? "O" : "X")

  const onClick = (index : number) =>
    () => {
      if(status || moves[index])
        return

      const updatedMoves = moves.map((v, i) => i === index ? turn : v)
      setMoves(updatedMoves)

      if(isWinner(updatedMoves, turn))
        setStatus("winner")
      else if(isDraw(updatedMoves))
        setStatus("draw")
      else
        changeTurn()
    }

  const showCells = () => moves.map((v : Turn | null, i : number) => <Cell key={i} value={v} onClick={onClick(i)} />)

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div>
          <div className="text-center font-white">
            <h1>Tic tac toe</h1>
            <p className="fs-3">{showMessage()}</p>
          </div>

          <div className="grid gap-2">{showCells()}</div>

          <div className="row justify-content-center my-4">
            <button className="button" onClick={reset}>Restart</button>
          </div>
        </div>
    </div>
  )
}
