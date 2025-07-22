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

function startGame(player, computer, playerGameboardId, computerGameboardId, squaresCallbacks, computerSquareCallbacks) {
    // check player's shipToPlace
    if (player.shipToPlace.length !== 0) {
        alert('Place all ships first!')
        return
    }

    // disable axis change button and disable start button
    document.querySelector('#rotate-btn').disabled = true
    document.querySelector('#start-btn').disabled = true

    // remove player's square listeners
    let squares = document.querySelectorAll(`${playerGameboardId} > div > div`) // nodelist
    for (let square of squares) {
        if (squaresCallbacks.has(square)) {
            square.removeEventListener('click', squaresCallbacks.get(square))
        }
    }

    let computerSquares = document.querySelectorAll(`${computerGameboardId} > div > div`) // nodelist
    for (let square of computerSquares) {
        let callback = () => {
            // player attacked computer
            let computer_x = parseInt(square.getAttribute('data-x'))
            let computer_y = parseInt(square.getAttribute('data-y'))
            let cords = [computer_x, computer_y]

            if (computer.gameboard.canReceiveAttack(cords)) {
                computer.gameboard.receiveAttack(cords)
                square.style.backgroundColor = 'red'
                square.removeEventListener('click', computerSquareCallbacks.get(square))
                if (computer.gameboard.allShipSunken()) {
                    alert('Player Won!')
                    window.location.reload()
                    return
                }
            } else {
                square.style.backgroundColor = 'gray'
                square.removeEventListener('click', computerSquareCallbacks.get(square))
            }

            // computer attacks player
            do {
                var playerCords = computerMoves()
                var playerSquare = document.querySelector(`${playerGameboardId} [data-x="${playerCords[0]}"][data-y="${playerCords[1]}"]`)
            } while (playerSquare.disabled)
           
            if (player.gameboard.canReceiveAttack(playerCords)) {
                player.gameboard.receiveAttack(playerCords)  
                playerSquare.style.backgroundColor = 'red'
                playerSquare.disabled = true
                if (player.gameboard.allShipSunken()) {
                    alert('Computer Won!')
                    window.location.reload()
                    return
                }
            } else {
                playerSquare.style.backgroundColor = 'gray'
                playerSquare.disabled = true
            }
        }

        square.addEventListener('click', callback)
        computerSquareCallbacks.set(square, callback)
    }
}

function computerMoves() {
    let max = 10
    let min = 0
    let x = Math.floor(Math.random() * (max - min) + min);
    let y = Math.floor(Math.random() * (max - min) + min);

    return [x, y]
}

function generateRandomAxis(max) {
    if (Math.floor(Math.random() * max) === 0) return 'x'
    else return 'y'
}

function generateComputerShips(computer) {
    while (computer.shipToPlace.length !== 0) {
        let cords = computerMoves()
        let ship = computer.shipToPlace[0]
        let axis = generateRandomAxis(2)

        if (computer.gameboard.canPlaceShip(cords, axis, ship)) {
            computer.gameboard.placeShip(cords, axis, ship)
            computer.shipToPlace.shift()
        }
    }
}

export function newGame() {
    let player = new Player('player')
    let computer = new Player('computer')

    const playerShips = [
        new Ship(5),
        new Ship(4),
        new Ship(3),
        new Ship(3),
        new Ship(2),
    ];

    const computerShips = [
        new Ship(5),
        new Ship(4),
        new Ship(3),
        new Ship(3),
        new Ship(2),
    ];

    let squaresCallbacks = new Map()
    let computerSquareCallbacks = new Map()

    player.gameboard.ships = playerShips.slice()
    player.shipToPlace = playerShips.slice()
    computer.gameboard.ships = computerShips.slice()
    computer.shipToPlace = computerShips.slice()

    populateGameBoard('#playerBoard')
    populateGameBoard('#computerBoard')
    // generate computer's ship
    generateComputerShips(computer)

    // x axis is the default
    updateSquareEvent(player, '#playerBoard', 'x', squaresCallbacks)
    // change axis upon change axis click
    changeAxis(player, '#playerBoard', squaresCallbacks)
    // start the game when start button clicked
    document.querySelector('#start-btn')
    .addEventListener('click', () => {
        startGame(player, computer, '#playerBoard', '#computerBoard', squaresCallbacks, computerSquareCallbacks)
    })
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