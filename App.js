import { Board } from './Board.js';
import { Player } from './Player.js';
import { Weapon } from './Weapon.js';


export class App {
    constructor(size) {
        this.board = this.initBoard(size);
    }

    initBoard(size, players, weapons) {
        players = [new Player('Player1',
                '<img src="images/alien.png">'),
            new Player('Player2',
                '<img src="images/astronaut.png">')
        ];
        weapons = [new Weapon('Asteroid',
                '<img src="images/asteroid.png">',
                20),
            new Weapon('Comet',
                '<img src="images/comet.png">',
                15),
            new Weapon('Fighter',
                '<img src="images/fighter.png">',
                10),
            new Weapon('Phaser',
                '<img src="images/phaser.png">',
                5)
        ];
        this.board = new Board(size, players, weapons);
        return this.board;
    }

}