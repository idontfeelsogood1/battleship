import {Ship} from '../modules/logic.js'
import {Gameboard} from '../modules/logic.js'
import {Player} from '../modules/logic.js'

function populateGameBoard(gameboard) {
    const widthLimit = 10
    const heightLimit = 10

    let board = document.querySelector(gameboard) 

    for (let i = 0; i < heightLimit; i++) {
        let row = document.createElement('div')
        for (let j = 0; j < widthLimit; j++) {
            let square = document.createElement('div')
            square.setAttribute('data-x', i)
            square.setAttribute('data-y', j)
            row.appendChild(square)
        }
        board.appendChild(row)
    }
}

export function newGame() {
    let player = new Player('player')
    let computer = new Player('computer')

    let ship1 = new Ship(5)
    let ship2 = new Ship(4)
    let ship3 = new Ship(3)
    let ship4 = new Ship(3)
    let ship5 = new Ship(2)
    let shipArr = [ship1, ship2, ship3, ship4, ship5]

    player.gameboard.ships = shipArr.slice()
    player.shipToPlace = shipArr.slice()
    computer.gameboard.ships = shipArr.slice()
    computer.shipToPlace = shipArr.slice()

    populateGameBoard('#playerBoard')
    populateGameBoard('#computerBoard')

    // x axis is the default
    squareEvent(player, '#playerBoard', 'x')
}

function renderShip(cords, shipLength, axis) {
    let x = cords[0]
    let y = cords[1]

    // if x direction
    if (axis === 'x') {
        // place ship horizontally
        let x_current = x
        for (let i = 0; i < shipLength; i++) {
            let current = document.querySelector(`[data-x="${x_current}"][data-y="${y}"]`)
            current.style.backgroundColor = 'blue'
            x_current++
        }
    }

    // if y direction
    if (axis === 'y') {
        // place ship vertically
        let y_current = y
        for (let i = 0; i < shipLength; i++) {
            let current = document.querySelector(`[data-x="${x}"][data-y="${y_current}"]`)
            current.style.backgroundColor = 'blue'
            y_current++
        }       
    } 

}

function squareEvent(player, gameboardId, axis) {
    let squares = document.querySelectorAll(`${gameboardId} > div > div`) // nodelist
    for (let square of squares) {
        square.addEventListener('click', () => {
            let x = parseInt(square.getAttribute('data-x'))
            let y = parseInt(square.getAttribute('data-y'))
            let cords = [x, y]
            let currentShip = player.shipToPlace[0]

            if (currentShip !== undefined) {
                if (player.gameboard.canPlaceShip(cords, axis, currentShip)) {
                    // place ship in logic gameboard
                    player.gameboard.placeShip(cords, axis, currentShip)
                    // render ship on DOM
                    renderShip(cords, currentShip.length, axis)
                    player.shipToPlace.shift()
                }
            }
        })
    }
}