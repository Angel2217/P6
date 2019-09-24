export class Weapon {
  constructor(name, image, damage) {
    this.name = name;
    this.image = image;
    this.damage = damage;


    let myDiv = $('#' + name); 
    if (myDiv.length === 0) {
      this.elem = this._createElem(); 
    } else {
      this.elem = myDiv[0]; 
    }

  }

  _createElem() {
    let elem = $('<div>')
      .attr('id', this.name)
      .addClass('weapon')
      .append('<div class="weapon-name">' + this.name + '</div>')
      .append('<div class="weapon-image">' + this.image + '</div>')
      .append('<div class="damage">' + this.damage + '</div>');
    return elem
  }

} 