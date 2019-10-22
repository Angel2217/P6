import { Player } from './Player.js';
import { Weapon } from './Weapon.js';

export class Square {
    constructor(id) {
        this.id = id;
    }


    get blocked() {
        let elem = $('#' + this.id);
        return $(elem).hasClass('blocked');
    }

    set blocked(bool) {
        let elem = $('#' + this.id);
        if (bool) {
            $(elem).addClass('blocked');
        } else {
            $(elem).removeClass('blocked');
        }
    }


    get player() {
        let weapon = null;
        let p = null;
        let td = $('#' + this.id + ' .player');
        if (td.length > 0) {
            let elem = td[0];
            let name = $(elem).attr('id');
            let image = $('.player-image', elem).html();
            let points = $('.player-points', elem).html();
            let w = $('#' + name + ' .weapon');
            if (w.length > 0) {
                let wElem = w[0];
                let wName = $(wElem).attr('id');
                let wImage = $('.weapon-image', wElem).html();
                let wDamage = $('.damage', wElem).html();
                weapon = new Weapon(wName, wImage, wDamage);
            }
            p = new Player(name, image, points, weapon);
        }
        return p
    }


    set player(p) {
        let td = $('#' + this.id)[0];
        if (p === null) {
            $('.player', td).remove();
        } else {
            $(td).append(p.elem);
        }
    }

    
    get weapon() {
        let w = null;
        let td = $('#' + this.id + ' .weapon');
        if (td.length > 0) {
            let elem = td[0];
            let name = $(elem).attr('id');
            let image = $('.weapon-image', elem).html();
            let damage = $('.damage', elem).html();
            w = new Weapon(name, image, damage);
        }
        return w
    }


    set weapon(w) {
        let td = $('#' + this.id)[0];
        if (w === null) {
            $('.weapon', td).remove();
        } else {
            $(td).append(w.elem);
        }
    }


    static getByLocation(r, c) {
        return new Square(`sq_${r}_${c}`);
    }


    static getById(tdId) {
        return new Square(tdId);

    }

    get location() {
        let loc = {
            row: Number((this.id)[3]),
            col: Number((this.id)[5])
        }
        return loc
    }


    static getActivePlayerSquare(bool) {
        let div = $('.player')[0];
        let name = $(div).attr('id');
        let p = new Player(name);
        if (p.active === bool) {
            let tdId = $(div).parent().attr('id');
            return new Square(tdId);
        } else {
            let div = $('.player')[1];
            let tdId = $(div).parent().attr('id');
            return new Square(tdId);
        }
    }


    setValid(handler) {
        let elem = $('#' + this.id)[0];
        $(elem).addClass('valid');
        $(elem).click(handler);
    }


    resetValid() {
        let elem = $('#' + this.id)[0];
        $(elem).removeClass('valid');
        $(elem).off();
    }


    get hidden() {
        let elem = $('#' + this.id);
        return $(elem).hasClass('hidden');
    }

    set hidden(bool) {
        let elem = $('#' + this.id);
        if (bool) {
            $(elem).addClass('hidden');
        } else {
            $(elem).removeClass('hidden');
        }
    }



}
