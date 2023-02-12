import { useEffect, useState } from "react"
import { Cell } from "./Cell"

export function App(){
  const [moves, setMoves] = useState<(string|null)[]>(Array(9).fill(null))
  const [turn, setTurn] = useState<"X" | "O">("X")
  const [winner, setWinner] = useState<boolean>(false)

  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const reset = ()=>{
    setMoves(state => state.map((v) => null)) 
    setTurn("O")
    setWinner(false)
  }

  const showMessage = () => winner ? `'${turn}' win!` : `'${turn}' turn`

  const changeTurn = () => setTurn((state : string) => state === "X" ? "O" : "X")

  const onClick = (index : number) =>
    () => {
      if(winner || moves[index])
        return

      setMoves(state => state.map((v, i) => i === index ? turn : v))
    }

  const showCells = () => moves.map((v : string | null, i : number) => <Cell key={i} value={v} onClick={onClick(i)} />)

  const isWinner = ()=>{
    for(let combination of winningCombination){
      const isWin = combination.every((v : number) => moves[v] === turn)
      if(isWin)
        return true
    }
    return false
  }

  

  useEffect(()=>{
    if(isWinner())
      setWinner(true)
    else
      changeTurn()
  }, [moves])

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
