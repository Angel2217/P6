import { Board } from './Board.js';
import { Player } from './Player.js';
import { Weapon } from './Weapon.js';
import { Panel } from './Panel.js';


const startWeapons = [new Weapon('ShootingStars',
        'stars.png',
        10),
    new Weapon('Rocket',
        'rocket.png',
        10)
];


const players = [new Player('alien',
        'alien.png', 100, startWeapons[0]),
    new Player('human',
        'astronaut.png', 100, startWeapons[1])
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
        this.board = this.initBoard(size);
        this.panels = this.initPanel();
    }


    initBoard(size) {
        return new Board(this, size, players, weapons);
    }


    initPanel() {
        return [new Panel('Panel1', '#myApp', players[0]),
            new Panel('Panel2', '#myApp', players[1])
        ];
    }


    updatePanel(player) {
        let playerName = $(player).attr('name');
        let panelPlayer = $(this.panels[0].player).attr('name');
        if (panelPlayer === playerName) {
            this.panels[0].changePanel(player);
        } else {
            this.panels[1].changePanel(player);
        }
    }

}
