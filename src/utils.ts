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

export function isWinner(moves : Moves, turn : Turn) : boolean{
    for(let combination of winningCombination){
        const isWin = combination.every((v : number) => moves[v] === turn)
        if(isWin)
        return true
    }
    return false
}

export function isDraw(moves : Moves) : boolean{
    return moves.every((v)=> v !== null)
} 
    