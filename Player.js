export class Player {
    constructor(name, image, weapon) {
      this.name = name;
      this.image = image;
      this.weapon = weapon;
    
  
  
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
        .addClass('player')
        .append('<div class="player-name">' + this.name + '</div>')
        .append('<div class="player-image">' + `<img src = images/${this.image}>` + '</div>')
        
      return elem
    }
    
  } 
