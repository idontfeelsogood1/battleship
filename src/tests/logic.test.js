import {Ship} from '../modules/logic.js'
import {Gameboard} from '../modules/logic.js'


describe('Gameboard canPlaceShip method', () => {
    it('Return false if cords is out of bound', () => {
        let game = new Gameboard()
        let ship = new Ship(4, 'ship 1')
        expect(game.canPlaceShip([10, 0], 'x', ship)).toBeFalsy()
        expect(game.canPlaceShip([0, 10], 'x', ship)).toBeFalsy()
    })
    it('Return false if ship doesnt fit the board (x axis)', () => {
        let game = new Gameboard()
        let ship = new Ship(4, 'ship 1')
        expect(game.canPlaceShip([7, 7], 'x', ship)).toBeFalsy()
    })
    it('Return true if ship fits the board (x axis)', () => {
        let game = new Gameboard()
        let ship = new Ship(4, 'ship 1')
        expect(game.canPlaceShip([0, 6], 'x', ship)).toBeTruthy()
        expect(game.canPlaceShip([6, 6], 'x', ship)).toBeTruthy()
    })
    it('Return false if ship doesnt fit the board (y axis)', () => {
        let game = new Gameboard()
        let ship = new Ship(4, 'ship 1')
        expect(game.canPlaceShip([7, 7], 'y', ship)).toBeFalsy()
    })
    it('Return true if ship fits the board (y axis)', () => {
        let game = new Gameboard()
        let ship = new Ship(4, 'ship 1')
        expect(game.canPlaceShip([6, 0], 'y', ship)).toBeTruthy()
        expect(game.canPlaceShip([6, 6], 'y', ship)).toBeTruthy()
    })
    it('Return false if theres a ship at that direction', () => {
        let game = new Gameboard()
        let ship = new Ship(4, 'ship 1')
        game.placeShip([3, 0], 'x', ship)
        expect(game.canPlaceShip([0, 0], 'x', ship)).toBeFalsy()
    })
})

describe('Gameboard canReceiveAttack method', () => {
    it('Return false if cords is null or contains a sunken ship', () => {
        let game = new Gameboard()
        let ship = new Ship(4, 'ship 1')
        expect(game.canReceiveAttack([0, 6])).toBeFalsy()
        game.placeShip([0, 6], 'x', ship)
        game.board[0][6].sunk = true
        expect(game.canReceiveAttack([0, 6])).toBeFalsy()
    })
    it('Return true if cords is not null and ship hasnt sunk', () => {
        let game = new Gameboard()
        let ship = new Ship(4, 'ship 1')
        game.placeShip([0, 6], 'x', ship) 
        expect(game.canReceiveAttack([0, 6])).toBeTruthy()
    }) 
})
