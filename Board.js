import { Square } from './Square.js';


export class Board {
    constructor(size, players, weapons) {
        this.size = size;
        this.players = players;
        this.weapons = weapons;
        this.table = this.createTable();
        this.blockRandomSquare();
        this.placePlayer();
        this.placeWeapon();
        this.setActivePlayer();
        this.squares = this.checkValidSquares();
        this.highlightValidSquares();
        this.movePlayer();
        this.registerKeyHandler();
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


    setActivePlayer() {
        this.players[0].active = true;
    }


    checkValidSquares() {
        let squares = [];
        let playerSquare = Square.getActivePlayerSquare(true);
        let r = playerSquare.location.row;
        let c = playerSquare.location.col;
        for (let i = 1; i < 4; i++) {
            let square = Square.getByLocation(r - i, c);
            if (r - i > -1 && r - i < 8 && !square.blocked && !square.player) {
                squares.push(square)
            } else {
                break
            }
        };
        for (let i = 1; i < 4; i++) {
            let square = Square.getByLocation(r + i, c);
            if (r + i > -1 && r + i < 8 && !square.blocked && !square.player) {
                squares.push(square)
            } else {
                break
            }
        };
        for (let i = 1; i < 4; i++) {
            let square = Square.getByLocation(r, c - i);
            if (c - i > -1 && c - i < 8 && !square.blocked && !square.player) {
                squares.push(square)
            } else {
                break
            }
        };
        for (let i = 1; i < 4; i++) {
            let square = Square.getByLocation(r, c + i);
            if (c + i > -1 && c + i < 8 && !square.blocked && !square.player) {
                squares.push(square)
            } else {
                break
            }
        }
        return squares
    }


    highlightValidSquares() {
        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i].valid = true;
        }
    }


    movePlayer() {
        var self = this;
        $('.valid').click(function () {
            let sq1 = Square.getActivePlayerSquare(true);
            let p = sq1.player;
            let tdId = $(this).attr('id');
            let sq2 = Square.getById(tdId);
            sq1.player = null;
            sq2.player = p;
            self.switchActivePlayer();
        });
    }


    switchActivePlayer() {
        this.unhighlightValidSquares();
        let sq1 = Square.getActivePlayerSquare(true);
        let p1 = sq1.player;
        let sq2 = Square.getActivePlayerSquare(false);
        let p2 = sq2.player;
        p1.active = false;
        p2.active = true;
    }


    unhighlightValidSquares() {
        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i].valid = false;
        }
    }


    registerKeyHandler() {
        let keyHandlerWithThis = Board.prototype.movePlayer.bind(this);
        $(document).on('click', keyHandlerWithThis);
    }


}
