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
         let p = null;
         let td = $('#' + this.id + ' .player');
         if (td) {
             let name = $('#' + this.id + ' .name');
             p = new Player(name);
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
         if (td) {
             let name = $('#' + this.id + ' .weapon-name');
             let image = $('#' + this.id + ' .weapon-image');
             let damage = $('#' + this.id + ' .damage');
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

     static getById(id) {
         return new Square(id);
     }


 } 