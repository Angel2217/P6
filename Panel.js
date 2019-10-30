
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
      .append('<div class="panel-image">' + `<img src=images/${this.player.image}>` + '</div>')
      .append('<div class="life-points">' + '<p> life points </p>' + '<p class="points-number">' + this.player.points + '</p>' + '</div>' + '<hr> </hr>')
      .append('<div class="panel-weapon">' + '<p> your weapon </p>' + `<img src=images/${this.player.weapon.image}>` + '</div>')
      .append('<div class="panel-weapon-name">' + this.player.weapon.name + '</div>')
      .append('<div class="panel-damage">' + this.player.weapon.damage + '</div>');
    return panel;
  }


  swapWeapon(player) {
    let elem = $('#' + this.id)[0];
    this.player = player;
    $('.panel-weapon', elem).html('<p> your weapon </p>' + player.weapon.image);
    $('.panel-weapon-name', elem).html(player.weapon.name);
    $('.panel-damage', elem).html(player.weapon.damage);
  }


  updatePoints(player) {
    let elem = $('#' + this.id)[0];
    $('.life-points', elem).html('<p> life points </p>' + '<p class = "points-number">' + player.points + '</p>');
  }


  addButton() {
    let elem = $('#' + this.id)[0];
    $(elem).append('<input type="button" class="button attack" value="Attack!">')
      .append('<input type="button" class="button defend" value="Defend">');
  }


  setAttack(handler) {
    let elem = $('#' + this.id)[0];
    let button = $('.attack', elem);
    $(button).addClass('fighting');
    $(button).click(handler);
  }


  resetAttack() {
    let elem = $('#' + this.id)[0];
    let button = $('.attack', elem);
    $(button).removeClass('fighting');
    $(button).off();
  }


  setDefend(handler) {
    let elem = $('#' + this.id)[0];
    let button = $('.defend', elem);
    $(button).addClass('fighting');
    $(button).click(handler);
  }


  resetDefend() {
    let elem = $('#' + this.id)[0];
    let button = $('.defend', elem);
    $(button).removeClass('fighting');
    $(button).off();
  }


  static getByPlayer(player) {
    let elem0 = $('.panel')[0];
    let panelName0 = $('.panel-name', elem0).html();
    let id0 = $(elem0).attr('id');
    let div0 = $(elem0).parent().attr('id');
    if (panelName0 == player.name) {
      return new Panel(id0, div0, player);
    } else {
      let elem1 = $('.panel')[1];
      let id1 = $(elem1).attr('id');
      let div1 = $(elem1).parent().attr('id');
      return new Panel(id1, div1, player);
    }
  }


}
