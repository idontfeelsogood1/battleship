export class Ship {
    constructor(length) {
        this.length = length
        this.hit = 0
    }

    registerHit() {
        this.hit += 1
    }

    isSunk() {
        if (this.hit === this.length) {
            return true
        }
        return false
    }
}

export class Gameboard {
    constructor() {
        this.board = []
        this.ships = []
        this.generateBoard()
    }

    generateBoard() {
        for (let i = 0; i < 10; i++) {
            const row = new Array(10).fill(null);
            this.board.push(row);
        }
    }

    canPlaceShip(cords, axis, ship) {
        let x = cords[0]
        let y = cords[1]

        // check if cords is out of bound
        if (!(x >= 0 && x < 10) || !(y >= 0 && y < 10)) return false

        // if x direction
        if (axis === 'x') {
            // check if current direction already has a ship or out of bounds
            let x_current = x
            if (x + ship.length > 10) return false
            for (let i = 0; i < ship.length; i++) { 
                if (this.board[x_current][y] !== null)  return false
                x_current++
            }
            // if ship fits the board
            return true 
        }

        // if y direction
        if (axis === 'y') {
            // check if current direction already has a ship or out of bounds
            let y_current = y
            if (y + ship.length > 10) return false
            for (let i = 0; i < ship.length; i++) {
                if (this.board[x][y_current] !== null) return false 
                y_current++
            }
            // if ship fits the board
            return true  
        } 
    }

    placeShip(cords, axis, ship) {
        let x = cords[0]
        let y = cords[1]

        // if x direction
        if (axis === 'x') {
            // place ship horizontally
            let x_current = x
            for (let i = 0; i < ship.length; i++) {
                this.board[x_current][y] = ship
                x_current++
            }
        }

        // if x direction
        if (axis === 'y') {
            // place ship vertically
            let y_current = y
            for (let i = 0; i < ship.length; i++) {
                this.board[x][y_current] = ship
                y_current++
            }       
        } 

    }

    registerShip(ship) {
        this.ships.push(ship)
    }

    canReceiveAttack(cords) {
        let x = cords[0]
        let y = cords[1]

        // if cord is null or cords contain a sunken ship return false
        if (this.board[x][y] === null) return false
        if (this.board[x][y].isSunk()) return false

        // if cord is not null and ship hasnt sunk return true
        return true
    }

    receiveAttack(cords) {
        let x = cords[0]
        let y = cords[1]
        this.board[x][y].registerHit()
    }

    allShipSunken() {
        for (let ship of this.ships) {
            if (ship.isSunk() === false) return false
        }
        return true
    }
}

export class Player {
    constructor(name) {
        this.name = name
        this.shipToPlace = []
        this.gameboard = new Gameboard()
    }
}
