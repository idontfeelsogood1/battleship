import {Ship} from '../modules/logic.js'
import {Player} from '../modules/logic.js'

function populateGameBoard(gameboardId) {
    const widthLimit = 10
    const heightLimit = 10

    let board = document.querySelector(gameboardId) 

    for (let x = 0; x < heightLimit; x++) {
        let row = document.createElement('div')
        for (let y = 0; y < widthLimit; y++) {
            let square = document.createElement('div')
            square.setAttribute('data-x', x)
            square.setAttribute('data-y', y)
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

    let squaresCallbacks = new Map()

    player.gameboard.ships = shipArr.slice()
    player.shipToPlace = shipArr.slice()
    computer.gameboard.ships = shipArr.slice()
    computer.shipToPlace = shipArr.slice()

    populateGameBoard('#playerBoard')
    populateGameBoard('#computerBoard')

    // x axis is the default
    updateSquareEvent(player, '#playerBoard', 'x', squaresCallbacks)
    // change axis upon click
    changeAxis(player, '#playerBoard', squaresCallbacks)
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

function updateSquareEvent(player, gameboardId, axis, squaresCallbacks) {
    let squares = document.querySelectorAll(`${gameboardId} > div > div`) // nodelist
    
    for (let square of squares) {
        let callback = () => {
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
        }

        // remove current square previous callback
        if (squaresCallbacks.has(square)) {
            square.removeEventListener('click', squaresCallbacks.get(square))
        }

        // store current square callback
        squaresCallbacks.set(square, callback)
        square.addEventListener('click', callback)
    }
}

function changeAxis(player, gameboardId, squaresCallbacks) {
    let btn = document.querySelector('#rotate-btn')
    btn.addEventListener('click', () => {
        if (btn.value === 'horizontal') {
            let axis = 'y'
            btn.value = 'vertical'
            btn.textContent = 'Vertical'
            updateSquareEvent(player, gameboardId, axis, squaresCallbacks)
            return
        }
        if (btn.value === 'vertical') {
            let axis = 'x'
            btn.value = 'horizontal'
            btn.textContent = 'Horizontal'
            updateSquareEvent(player, gameboardId, axis, squaresCallbacks)
            return
        }
    })
}