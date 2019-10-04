import { Square } from './Square.js';


export class Board {
    constructor(size, players, weapons) {
        this.size = size;
        this.players = players;
        this.weapons = weapons;
        this.table = this.createTable();
        this.randomSquare = this.getRandomSquare();
        this.blockRandomSquare();
        this.placePlayer();
        this.placeWeapon();
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
        let tdId = `sq_${r}_${c}`;
        let square = Square.getById(tdId);
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

}
