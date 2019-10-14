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

//Performs an attack:

Character.prototype.attack = function(Obj) {
  Obj.healthPoints -= this.attackPower;
  $("#msg").html(
    "You attacked " + Obj.name + "for " + this.attackPower + " damage points."
  );
  this.increaseAttack();
};

//Performs a counter attack:
Character.prototype.counterAttack = function(Obj) {
  Obj.healthPoints -= this.counterAttackPower;
  $("#msg").append(
    "<br>" +
      this.name +
      " counter attacked you for " +
      this.counterAttackPower +
      " damage points."
  );
};

//Initialize all the characters
function initCharacters() {
  var luke = new Character(
    "Luke Skylwaker",
    100,
    10,
    5,
    "./assets/images/luke.jpg"
  );
  var vader = new Character(
    "Darth Vader",
    200,
    50,
    30,
    "./assets/images/vader.jpg"
  );
  var qui = new Character(
    "Qui-Gon Jinn",
    150,
    15,
    5,
    "./assets/images/qui.jpg"
  );
  var yoda = new Character("Yoda", 180, 30, 15, "./assets/images/yoda.jpg");
  charArray.push(luke, vader, qui, yoda);
}

//"save" the original attack value
function setBaseAttack(Obj) {
  baseAttack = Obj.attackPower;
}
//Is character still alive?
function isAlive(Obj) {
  if (Obj.healthPoints > 0) {
    return true;
  }
}

//Did player win?
function isWinner(){
    if (charArray.length ==0 && player.healthPoints > 0)
    return true;
    else return false;
}

//Append characters to the div on the screen
function characterImages (divId)

