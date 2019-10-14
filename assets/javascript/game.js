//Loads the document:
$(document).ready(function() {
  document.body.style.backgroundImage = "url('./assets/images/background.jpg')";
  //play song theme: starwars
});

//Global variables:
var baseAttack = 0;
var player;
var defender;
var charArray = [];
var playerSelected = false;
var defenderSelected = false;

//Constructor:

function Character(name, hp, ap, counter, pic) {
  this.name = name;
  this.hp = hp;
  this.ap = ap;
  this.counter = counter;
  this.pic = pic;
}

//Function to increase strength:

Character.prototype.increaseAttack = function() {
  this.attackPower += baseAttack;
};

Character.prototype.attack = function(Obj) {};
