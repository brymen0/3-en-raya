import { useEffect, useState} from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square"
import { TURNS} from "./constants"
import { checkEndGame, checkWinner, saveGameToStorage, resetGameStorage} from "./logic"
import { WinnerModal } from "./components/WinnerModal"
import { Board } from "./components/Board"

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board') 
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null) //null si no hay ganador y false si hay empate

  const updateBoard = (index) => {
    if (board[index] || winner ) return //si ya tiene algo no actualiza
    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //guardar partida
    saveGameToStorage({board:newBoard, turn:newTurn})
    //verificar si hay ganador
    const newWinner = checkWinner(newBoard)
   
    if (newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) setWinner(false)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  return (
    <main className="board">
      <h1>3 en raya</h1>
      <Board board={board} updateBoard={updateBoard}/>

      <section className="turn">
        <Square isSelected={turn===TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn===TURNS.O}>{TURNS.O}</Square>
      </section>
      
      <WinnerModal winner={winner} resetGame={resetGame}/>

      <section className="resetGame">
        <button onClick={resetGame}>Reiniciar juego</button>
      </section>
    </main>
    )
}

export default App
