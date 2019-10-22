
export class Panel {
  constructor(id, div, player) {
    this.id = id;
    this.div = div;
    this.player = player;
    this._createPanel();
  }


  _createPanel() {
    let panel = $('<div>')
      .appendTo(this.div)
      .attr('id', this.id)
      .addClass('panel')
      .append('<div class="panel-name">' + this.player.name + '</div>')
      .append('<div class="panel-image">' + `<img src = images/${this.player.image}>` + '</div>')
      .append('<div class="life-points">' + '<p> life points </p>' + this.player.points + '</div>' + '<hr> </hr>')
      .append('<div class="panel-weapon">' + '<p> your weapon </p>' + `<img src = images/${this.player.weapon.image}>` + '</div>')
      .append('<div class="panel-damage">' + this.player.weapon.damage + '</div>')

    return panel
  }


  changePanel(player) {
    let elem = ('#' + this.id);
    $('.life-points', elem).html('<p> life points </p>' + player.points);
    $('.panel-weapon', elem).html('<p> your weapon </p>' + player.weapon.image);
    $('.panel-damage', elem).html(player.weapon.damage);
  }


}
