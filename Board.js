import { Square } from './Square.js';


export class Board {
    constructor(size, players, weapons) {
        this.size = size;
        this.players = players;
        this.weapons = weapons;
        this.table = this.createTable();
        this.getRandomSquare();
        this.blockRandomSquare();
        this.placePlayer();
        this.placeWeapon();
        this.squares = this.checkValidSquares();
        this.highlightValidSquares();
    }


    createTable() {
        var tableElem = $("<table>").appendTo('#myApp');
        $(tableElem).attr('id', 'myTable')

        for (let r = 0; r < this.size; r++) {
            var row = $("<tr>").appendTo(tableElem);

            for (let c = 0; c < this.size; c++) {
                let tdId = `sq_${r}_${c}`;
                $("<td>")
                    .attr("id", tdId)
                    .appendTo(row);
            }
        }
        return tableElem
    }


    getRandomSquare() {
        let r = Math.floor(Math.random() * this.size);
        let c = Math.floor(Math.random() * this.size);
        let square = Square.getByLocation(r, c);
        return square;
    }


    blockRandomSquare() {
        var blockedCount = 0;
        while (blockedCount < 10) {
            let square = this.getRandomSquare();
            if (!square.blocked) {
                square.blocked = true;
                blockedCount++
            }
        }
    }


    placePlayer() {
        let playerCount = 0;
        while (playerCount < 2) {
            let square1 = this.getRandomSquare();
            let square2 = this.getRandomSquare();
            if (!this.playerIsNearby(square1, square2)) {
                if (!square1.blocked && !square2.blocked) {
                    square1.player = this.players[0];
                    square2.player = this.players[1];
                    playerCount += 2;
                }
            }
        }
    }


    playerIsNearby(square1, square2) {
        let r1 = square1.location.row;
        let r2 = square2.location.row;
        let c1 = square1.location.col;
        let c2 = square2.location.col;
        if (Math.abs(r2 - r1) < 2 && Math.abs(c2 - c1) < 2) {
            return true;
        } else {
            return false;
        }
    }


    placeWeapon() {
        while (this.weapons.length > 0) {
            let square = this.getRandomSquare();
            if (!square.blocked && !square.weapon && !square.player) {
                let w = this.weapons.pop();
                square.weapon = w;
            }
        }
    }


    checkValidSquares() {
        let squares = [[],[],[],[]];
        let playerSquare = Square.getPlayerSquare();
        playerSquare.player.playing = true;
        let r = playerSquare.location.row;
        let c = playerSquare.location.col;
        for (let i = 1; i < 4; i++) {
            let square = Square.getByLocation(r + i, c);
            squares[0].push(square);
            square = Square.getByLocation(r - i, c);
            squares[1].push(square);
            square = Square.getByLocation(r, c - i);
            squares[2].push(square);
            square = Square.getByLocation(r, c + i);
            squares[3].push(square);
        }
        return squares
    }


    highlightValidSquares() {
        for (let a = 0; a < this.squares.length; a++) {
            for (let i = 0; i < this.squares[a].length; i++) {
                if (!this.squares[a][i].blocked && !this.squares[a][i].player) {
                    this.squares[a][i].active = true;
                } else {
                    break;
                }
            }
        }
    }

}
