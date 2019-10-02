import { Board } from './Board.js';
import { Player } from './Player.js';
import { Weapon } from './Weapon.js';
import { Panel } from './Panel.js';


const startWeapons = [new Weapon('Shooting stars',
        'stars.png',
        10),
        new Weapon('Rocket',
        'rocket.png',
        10)
];
        

const players = [new Player('Player1',
        'alien.png', startWeapons[0]),
    new Player('Player2',
        'astronaut.png', startWeapons[1])
];


const weapons = [new Weapon('Asteroid',
        'asteroid.png',
        20),
    new Weapon('Comet',
        'comet.png',
        15),
    new Weapon('Fighter',
        'fighter.png',
        10),
    new Weapon('Phaser',
        'phaser.png',
        5)
];


export class App {
    constructor(size) {
        this.size = size;
        this.panels = this.initPanel();
        this.board = this.initBoard(size);
    }


    initPanel() {
        this.panels = [new Panel('Panel1', players[0]),
                     new Panel('Panel2', players[1])
        ];
        return this.panels;
    }

    initBoard(size) {
        this.board = new Board(size, players, weapons);
        return this.board;
    }


}
