
export class Panel {
    constructor(id, player) {
        this.id = id;
        this.player = player;
        this._createPanel();
    }
  
 
    _createPanel() {
        let panel = $('<div>')
          .appendTo('#myApp')  
          .attr('id', this.id)
          .addClass('panel')
          .append('<div class="panel-name">' + this.player.name + '</div>')
          .append('<div class="panel-image">' + `<img src = images/${this.player.image}>` + '</div>')
          .append('<div class="life-points">' + '<p> life points </p>' + 100 + '</div>' + '<hr> </hr>')
          .append('<div class="panel-weapon">' + '<p> your weapon </p>' + `<img src = images/${this.player.weapon.image}>` + '</div>')
          .append('<div class="panel-damage">' + this.player.weapon.damage + '</div>')
    
        return panel
      }
    
  } 
