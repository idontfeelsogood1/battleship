export class Ship {
    constructor(length) {
        this.length = length
        this.hit = 0
        this.sunk = false
    }

    hit() {
        this.hit += 1
    }

    isSunk() {
        if (this.hit === this.length) {
            this.sunk = true
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
        const heightLimit = 10
        const widthLimit = 10

        let x = cords[0]
        let y = cords[1]

        // check if cords is out of bound
        if (!(x >= 0 && x < 10) || !(y >= 0 && y < 10)) return false
        // if theres already a ship at that cord
        if (this.board[x][y] !== null) return false

        // if x direction
        if (axis === 'x') {
            // find the available index for ship
            let length = widthLimit - y
            // check if ship doesnt fit the board
            if (ship.length > length) return false
            // if ship fits the board
            return true  
        } 
        // if y direction
        if (axis === 'y') {
            // find the available index for ship
            let length = heightLimit - x
            // check if ship doesnt fit the board
            if (ship.length > length) return false
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
            let y_current = y
            for (let i = 0; i < ship.length; i++) {
                this.board[x][y_current] = ship
                y_current++
            }       
        } 
        // if y direction
        if (axis === 'y') {
            // place ship vertically
            let x_current = x
            for (let i = 0; i < ship.length; i++) {
                this.board[x_current][y] = ship
                x_current++
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
        if (this.board[x][y].sunk === true) return false

        // if cord is not null and ship hasnt sunk return true
        return true
    }

    receiveAttack(cords) {
        let x = cords[0]
        let y = cords[1]
        this.board[x][y].hit()
    }

    allShipSunken() {
        for (let ship of this.ships) {
            if (ship.sunk === false) return false
        }
        return true
    }
}

export class Player {
    constructor(name) {
        this.name = name
        this.game = new Gameboard()
    }
}
