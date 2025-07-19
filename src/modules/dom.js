import {Ship} from '../modules/logic.js'
import {Gameboard} from '../modules/logic.js'
import {Player} from '../modules/logic.js'

export function populateGameBoard() {
    const widthLimit = 10
    const heightLimit = 10

    let gameboards = document.querySelectorAll('.gameboard') // node list
    gameboards.forEach((board) => {
        for (let i = 0; i < heightLimit; i++) {
            let row = document.createElement('div')
            for (let j = 0; j < widthLimit; j++) {
                let square = document.createElement('div')
                row.appendChild(square)
            }
            board.appendChild(row)
        }
    });
}