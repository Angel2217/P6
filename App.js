import { Board } from './Board.js';
import { Player } from './Player.js';
import { Weapon } from './Weapon.js';
import { Panel } from './Panel.js';


const startWeapons = [new Weapon('Stars',
        'stars.png',
        10),
    new Weapon('Rocket',
        'rocket.png',
        10)
];


const players = [new Player('Alien',
        'alien.png', 100, startWeapons[0]),
    new Player('Human',
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
        this.board = this._initBoard(size);
        this.panels = this._initPanel();
    }


    _initBoard(size) {
        return new Board(this, size, players, weapons);
    }


    _initPanel() {
        return [new Panel('Panel1', '#myApp', players[0]),
            new Panel('Panel2', '#myApp', players[1])
        ];
    }


    updatePanel(player) {
        let playerName = $(player).attr('name');
        let panelPlayer = $(this.panels[0].player).attr('name');
        if (panelPlayer === playerName) {
            this.panels[0].swapWeapon(player);
        } else {
            this.panels[1].swapWeapon(player);
        }
    }


    setButtons(player) {
        this.panels[0].addButton();
        this.panels[1].addButton();
        this.addHandler(player);
    }


    addHandler(player) {
        let attackHandlerWithThis = App.prototype.attackHandler.bind(this);
        let fightingPanel = Panel.getByPlayer(player);
        fightingPanel.setAttack(attackHandlerWithThis);
        let defendHandlerWithThis = App.prototype.defendHandler.bind(this);
        fightingPanel.setDefend(defendHandlerWithThis);
    }


    attackHandler(e) {
        let panelId = $(e.currentTarget).parent().attr('id');
        if (panelId === this.panels[0].id) {
            this.attack(this.panels[0], this.panels[1]);
            this.addHandler(this.panels[1].player);
        } else {
            this.attack(this.panels[1], this.panels[0]);
            this.addHandler(this.panels[0].player);
        }
        if (this.attack.over == false) {
            this.board.switchActivePlayer();
        }
    }


    defendHandler(e) {
        let panelId = $(e.currentTarget).parent().attr('id');
        $('.defense').removeClass('defense');
        $(e.currentTarget).addClass('defense');
        if (panelId === this.panels[0].id) {
            this.defend(this.panels[0]);
            this.addHandler(this.panels[1].player);
        } else {
            this.defend(this.panels[1]);
            this.addHandler(this.panels[0].player);
        }
        this.board.switchActivePlayer();
    }


    attack(panel1, panel2) {
        $('.defense').removeClass('defense');
        let damage = panel1.player.weapon.damage;
        if (this.defend.called == true) {
            damage = panel1.player.weapon.damage / 2;
            this.defend.called = false;
        }
        let lifePoints = panel2.player.points -= damage;
        panel2.updatePoints(panel2.player);
        panel1.resetAttack();
        panel1.resetDefend();
        if (lifePoints < 1) {
            panel2.player.points = 0;
            panel2.updatePoints(panel2.player);
            this.gameOver()
            this.attack.over = true;
        } else {
            this.attack.over = false;
        }
    }


    defend(panel1) {
        this.defend.called = true;
        panel1.resetAttack();
        panel1.resetDefend();
    }


    gameOver() {
        $('#wrapper').fadeOut(1100);
        $('.background').fadeOut(3500);
        $('body').append('<div id="game-over"><p>galaxy over</p></div>');
    }


}
