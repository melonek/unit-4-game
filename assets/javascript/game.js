var player;
var defender;
var baseAttack = 0;
var charArray = [];
var playerReady = false;
var defenderReady = false;

function Character(name, hp, ap, counter, pic) {
  this.name = name;
  this.healthPoints = hp;
  this.attackPower = ap;
  this.counterAttackPower = counter;
  this.pic = pic;
}

Character.prototype.increaseAttack = function() {
  this.attackPower += baseAttack;
};

Character.prototype.attack = function(Obj) {
  Obj.healthPoints -= this.attackPower;
  $("#msg").html(
    "You attacked " + Obj.name + " for " + this.attackPower + " damage points."
  );
  this.increaseAttack();
};

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

function initCharacters() {
  var luke = new Character(
    "Luke Skywalker",
    150,
    20,
    20,
    "./assets/images/luke.jpg"
  );
  var vader = new Character(
    "Darth Vader",
    190,
    15,
    12,
    "./assets/images/vader.jpg"
  );
  var obi = new Character(
    "Qui-Gon Jinn",
    180,
    40,
    7,
    "./assets/images/qui.jpg"
  );
  var chew = new Character("Yoda", 170, 40, 20, "./assets/images/yoda.jpg");
  charArray.push(luke, vader, obi, chew);
}

function setBaseAttack(Obj) {
  baseAttack = Obj.attackPower;
}

function isAlive(Obj) {
  if (Obj.healthPoints > 0) {
    return true;
  }
  return false;
}

function isWinner() {
  if (charArray.length == 0 && player.healthPoints > 0) return true;
  else return false;
}

function characterCards(divID) {
  $(divID)
    .children()
    .remove();
  for (var i = 0; i < charArray.length; i++) {
    $(divID).append("<div />");
    $(divID + " div:last-child").addClass("card");
    $(divID + " div:last-child").append("<img />");
    $(divID + " img:last-child").attr("id", charArray[i].name);
    $(divID + " img:last-child").attr("class", "card-img-top");
    $(divID + " img:last-child").attr("src", charArray[i].pic);
    $(divID + " img:last-child").attr("width", 150);
    $(divID + " div:last-child").append(charArray[i].name + "<br>");
    $(divID + " div:last-child").append("HP: " + charArray[i].healthPoints);
    $(divID + " idv:last-child").append();
  }
}

function updatePics(fromDivID, toDivID) {
  $(fromDivID)
    .children()
    .remove();
  for (var i = 0; i < charArray.length; i++) {
    $(toDivID).append("<img />");
    $(toDivID + " img:last-child").attr("id", charArray[i].name);
    $(toDivID + " img:last-child").attr("src", charArray[i].pic);
    $(toDivID + " img:last-child").attr("width", 150);
    $(toDivID + " img:last-child").addClass("img-thumbnail");
  }
}

function playAudio() {
  var audio = new Audio("./assets/music/theme.mp3");
  audio.play();
}

function changeView() {
  $("#selectionMenu").empty();
  $("#fight").show();
}

$(document).on("click", "img", function() {
  if (playerReady && !defenderReady && this.id != player.name) {
    for (var j = 0; j < charArray.length; j++) {
      if (charArray[j].name == this.id) {
        defender = charArray[j];
        charArray.splice(j, 1);
        defenderReady = true;
        $("#msg").html("Click the button to attack!");
      }
    }
    $("#defenderDiv").append(this);
    $("#defenderDiv").append("<br>" + defender.name);
    $("#defenderHealthDiv").append("HP: " + defender.healthPoints);
  }

  if (!playerReady) {
    for (var i = 0; i < charArray.length; i++) {
      if (charArray[i].name == this.id) {
        player = charArray[i];
        playAudio();
        $("body").css({
          "background-image": "url('./assets/images/" + this.id[0] + ".jpg')"
        });
        setBaseAttack(player);
        charArray.splice(i, 1);
        playerReady = true;
        changeView();
        $("#msg").html("Pick an enemy to fight!");
      }
    }
    updatePics("#game", "#defendersLeftDiv");
    $("#playerDiv").append(this);
    $("#playerDiv").append(player.name);
    $("#playerHealthDiv").append("HP: " + player.healthPoints);
  }
});

$(document).on("click", "#attackBtn", function() {
  if (playerReady && defenderReady) {
    if (isAlive(player) && isAlive(defender)) {
      player.attack(defender);
      defender.counterAttack(player);
      $("#playerHealthDiv").html("HP: " + player.healthPoints);
      $("#defenderHealthDiv").html("HP: " + defender.healthPoints);
      if (!isAlive(defender)) {
        $("#defenderHealthDiv").html("DEFETED!");
        $("#playerHealthDiv").html("Enemy defeated!");
        $("#msg").html("Pick another enemy to battle...");
      }
      if (!isAlive(player)) {
        $("#playerHealthDiv").html("YOU LOST!");
        $("#msg").html("Try again...");
        $("#attackBtn").html("Restart Game");
        $(document).on("click", "#attackBtn", function() {
          location.reload();
        });
      }
    }
    if (!isAlive(defender)) {
      $("#defenderDiv")
        .children()
        .remove();
      $("#defenderDiv").html("");
      $("#defenderHealthDiv").html("");
      defenderReady = false;
      if (isWinner()) {
        $("#fight").hide();
        $("#globalMsg").show();
      }
    }
  }
});

$(document).ready(function() {
  $("#fight").hide();
  $("#globalMsg").hide();
  initCharacters();
  characterCards("#game");
});
