import { Square } from './Square.js';


export class Board {
    constructor(app, size, players, weapons) {
        this.app = app;
        this.size = size;
        this.table = this._createTable();
        this.blockRandomSquare();
        this.placePlayer(players);
        this.placeWeapon(weapons);
        this.squares = this.checkValidSquares();
        this.highlightValidSquares();
    }


    _createTable() {
        var tableElem = $('<table>').appendTo('#myApp');
        $(tableElem).attr('id', 'myTable')

        for (let r = 0; r < this.size; r++) {
            var row = $('<tr>').appendTo(tableElem);

            for (let c = 0; c < this.size; c++) {
                let tdId = `sq_${r}_${c}`;
                $('<td>')
                    .attr('id', tdId)
                    .appendTo(row);
            }
        }
        return tableElem;
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
                blockedCount++;
            }
        }
    }


    placePlayer(players) {
        let playerCount = 0;
        while (playerCount < 2) {
            let square1 = this.getRandomSquare();
            let square2 = this.getRandomSquare();
            if (!this.playerIsNearby(square1, square2)) {
                if (!square1.blocked && !square2.blocked) {
                    square1.player = players[0];
                    square2.player = players[1];
                    playerCount += 2;
                    players[0].active = true;
                }
            }
        }
    }


    playerIsNearby(square1, square2) {
        let r1 = square1.location.row;
        let r2 = square2.location.row;
        let c1 = square1.location.col;
        let c2 = square2.location.col;
        if (Math.abs(r2 - r1) === 1 && Math.abs(c2 - c1) === 0 ||
            Math.abs(r2 - r1) === 0 && Math.abs(c2 - c1) === 1) {
            return true;
        } else {
            return false;
        }
    }


    placeWeapon(weapons) {
        while (weapons.length > 0) {
            let square = this.getRandomSquare();
            if (!square.blocked && !square.weapon && !square.player) {
                let w = weapons.pop();
                square.weapon = w;
            }
        }
    }


    checkValidSquares() {
        let squares = [];
        let playerSquare = Square.getActivePlayerSquare(true);
        let r = playerSquare.location.row;
        let c = playerSquare.location.col;
        for (let i = 1; i < 4; i++) {
            let square = Square.getByLocation(r - i, c);
            if (r - i > -1 && r - i < 8 && !square.blocked && !square.player) {
                squares.push(square);
            } else {
                break;
            }
        };
        for (let i = 1; i < 4; i++) {
            let square = Square.getByLocation(r + i, c);
            if (r + i > -1 && r + i < 8 && !square.blocked && !square.player) {
                squares.push(square);
            } else {
                break;
            }
        };
        for (let i = 1; i < 4; i++) {
            let square = Square.getByLocation(r, c - i);
            if (c - i > -1 && c - i < 8 && !square.blocked && !square.player) {
                squares.push(square);
            } else {
                break;
            }
        };
        for (let i = 1; i < 4; i++) {
            let square = Square.getByLocation(r, c + i);
            if (c + i > -1 && c + i < 8 && !square.blocked && !square.player) {
                squares.push(square);
            } else {
                break;
            }
        }
        return squares;
    }


    highlightValidSquares() {
        let clickHandlerWithThis = Board.prototype.clickHandler.bind(this);
        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i].setValid(clickHandlerWithThis);
        }
    }


    clickHandler(e) {
        let tdId = $(e.currentTarget).attr('id');
        if (this.movePlayer(tdId)) {
            this.switchActivePlayer();
            this.unhighlightValidSquares();
            this.squares = this.checkValidSquares();
            this.highlightValidSquares();
        }
    }


    movePlayer(id) {
        let sq1 = Square.getActivePlayerSquare(true);
        sq1.hidden = false;
        let p1 = sq1.player;
        let sq2 = Square.getById(id);
        if (sq2.weapon) {
            let w1 = p1.weapon;
            let w2 = sq2.weapon;
            p1.changeWeapon(w1, w2);
            sq2.weapon = null;
            sq2.weapon = w1;
            sq2.hidden = true;
            this.app.updatePanel(p1);
        }
        sq2.player = p1;
        sq1.player = null;
        let otherPlayerSq = Square.getActivePlayerSquare(false);
        if (this.playerIsNearby(sq2, otherPlayerSq)) {
            this.enterFightMode(p1);
            return false;
        } else {
            return true;
        }

    }


    switchActivePlayer() {
        let sq1 = Square.getActivePlayerSquare(true);
        let p1 = sq1.player;
        let sq2 = Square.getActivePlayerSquare(false);
        let p2 = sq2.player;
        p1.active = false;
        p2.active = true;
    }


    unhighlightValidSquares() {
        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i].resetValid();
        }
    }


    enterFightMode(p1) {
        this.app.setButtons(p1);
        this.unhighlightValidSquares();
    }


}
