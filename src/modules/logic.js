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
        if (this.hit === this.length) this.sunk = true
    }
}

export class Gameboard {
    constructor() {
        this.board = []
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
}

let game = new Gameboard()
let ship = new Ship(4, 'ship 1')
console.log(game.placeShip([0, 6], 'x', ship))
console.log(game.board)