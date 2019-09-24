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

    blockRandomSquare() {
        var blockedCount = 0;
        while (blockedCount < 10) {
            let r = Math.floor(Math.random() * this.size);
            let c = Math.floor(Math.random() * this.size);
            let tdId = `sq_${r}_${c}`;
            let square = new Square(tdId);
            if (!square.blocked) {
                square.blocked = true;
                blockedCount++
            }
        }
    }


    placePlayer() {
        let playerCount = 0;
        while (playerCount < 2) {
            let r1 = Math.floor(Math.random() * this.size); // this part is too repetitive?
            let r2 = Math.floor(Math.random() * this.size);
            let c1 = Math.floor(Math.random() * this.size);
            let c2 = Math.floor(Math.random() * this.size);
            if (Math.abs(c2 - c1) > 1 || Math.abs(r2 - r1) > 1) { // this is to make sure the players are not close together
                let tdId1 = `sq_${r1}_${c1}`;
                let square1 = Square.getById(tdId1);
                let tdId2 = `sq_${r2}_${c2}`;
                let square2 = Square.getById(tdId2);
                if (!square1.blocked && $('#' + tdId1).children().length === 0 && // I still have this problem, if I try to check !square1.player, I get errors: unrecognized expression # or unrecognized expression [object object]  
                    !square2.blocked && $('#' + tdId2).children().length === 0) {
                    square1.player = this.players[0];
                    square2.player = this.players[1];
                    playerCount++;
                }
            }
        }
    }


    placeWeapon() {
        let weaponCount = 0;
        while (weaponCount < 4) {
            let r = Math.floor(Math.random() * this.size);
            let c = Math.floor(Math.random() * this.size);
            let tdId = `sq_${r}_${c}`;
            let square = Square.getById(tdId);
            if (!square.blocked && $('#' + tdId).children().length === 0) { // same problem as above
                let w = this.weapons.pop();
                square.weapon = w;
                weaponCount++;
            }
        }
    }
}
