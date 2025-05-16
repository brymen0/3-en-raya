import { WINNER_COMBOS} from "./constants"

export const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if (boardToCheck[a] && boardToCheck[a]===boardToCheck[b] &&  boardToCheck[a]===boardToCheck[c])
        return boardToCheck[a]
    }
    return null
}

export const checkEndGame = (boardToCheck) => {
    return boardToCheck.every((square) => square != null)
}

export const saveGameToStorage = ({board, turn}) => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}