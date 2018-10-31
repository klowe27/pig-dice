// Business Logic
function PigDice(){
  this.players = [];
}

PigDice.prototype.addPlayers = function(player){
  this.players.push(player);
}

function Players(name, turn=false){
  this.name = name;
  this.turn = turn;
  this.totalPoints = 0;
  this.turnPoints = 0;
}

Players.prototype.calculateTurnPoints = function(dice1, dice2){

  if (dice1 === 1 && dice2 === 1){
    this.totalPoints = 0;
    $("#hold").addClass("disabled");
    $("#roll").addClass("disabled");
  } else if (dice1 === 1 || dice2 === 1){
    this.turnPoints = 0;
    $("#hold").addClass("disabled");
    $("#roll").addClass("disabled");

  } else {
    var diceTotal = dice1 + dice2;
    this.turnPoints += diceTotal
  }
}

function diceImg1(roll) {
  if (roll === 1 ) {
    $(".diceRoll1").html("<img src='img/dice1.jpeg'>");
  }
  else if (roll === 2) {
    $(".diceRoll1").html("<img src='img/dice2.jpeg'>");
  }
  else if (roll === 3) {
    $(".diceRoll1").html("<img src='img/dice3.jpeg'>");
  }
  else if (roll === 4) {
    $(".diceRoll1").html("<img src='img/dice4.jpeg'>");
  }
  else if (roll === 5) {
    $(".diceRoll1").html("<img src='img/dice5.jpeg'>");
  }
  else {
    $(".diceRoll1").html("<img src='img/dice6.jpeg'>");
  }
}

function diceImg2(roll) {
  if (roll === 1 ) {
    $(".diceRoll2").html("<img src='img/dice1.jpeg'>");
  }
  else if (roll === 2) {
    $(".diceRoll2").html("<img src='img/dice2.jpeg'>");
  }
  else if (roll === 3) {
    $(".diceRoll2").html("<img src='img/dice3.jpeg'>");
  }
  else if (roll === 4) {
    $(".diceRoll2").html("<img src='img/dice4.jpeg'>");
  }
  else if (roll === 5) {
    $(".diceRoll2").html("<img src='img/dice5.jpeg'>");
  }
  else {
    $(".diceRoll2").html("<img src='img/dice6.jpeg'>");
  }
}

Players.prototype.hold = function(){
  $("#hold").addClass("disabled");
  $("#roll").addClass("disabled");
  this.totalPoints += this.turnPoints;
  this.turnPoints = 0;
}

Players.prototype.checkWinStatus = function() {
  if (this.totalPoints >= 100) {
    alert("you won!");
  }
}

function diceRoll() {
  return Math.floor(Math.random()*6 + 1);
}



// User Interface Logic

$(document).ready(function(){

  var pigDice = new PigDice();
  var player1;
  var player2;

  $("#players-form").submit(function(event){
    event.preventDefault();
    var player1Name = $("#player1Name").val();
    var player2Name = $("#player2Name").val();

    $("#game").show();
    $("#players-form").hide();

    player1 = new Players(player1Name, true);
    player2 = new Players(player2Name);
    pigDice.addPlayers(player1);
    pigDice.addPlayers(player2);

    $(".player1").text(player1.name);
    $(".player2").text(player2.name);
    $(".totalPoints1").text(player1.totalPoints);
    $(".totalPoints2").text(player2.totalPoints);

    pigDice.players.forEach(function(player){
      if (player.turn === true){
        $(".playerName").text(player1Name);
        $(".turnPoints").text(player.turnPoints);
      }
    })
  });

  $("#roll").click(function(){
    var roll1 = diceRoll();
    var roll2 = diceRoll();
    diceImg1(roll1);
    diceImg2(roll2);
    pigDice.players.forEach(function(player){
      if (player.turn === true){
        player.calculateTurnPoints(roll1, roll2);
        $(".turnPoints").text(player.turnPoints);
      }
    });
  });

  $("#hold").click(function(){
    pigDice.players.forEach(function(player){
      if (player.turn === true){
        player.hold();
        $(".turnPoints").text(player.turnPoints);
        player.checkWinStatus();
      }
    });
    $(".totalPoints1").text(player1.totalPoints);
    $(".totalPoints2").text(player2.totalPoints);
  });

  $("#endTurn").click(function(){
    $("#hold").removeClass("disabled");
    $("#roll").removeClass("disabled");
    $(".totalPoints1").text(player1.totalPoints);
    $(".totalPoints2").text(player2.totalPoints);
    var nextPlayer;
    pigDice.players.forEach(function(player){
      if (player.turn === false){
        nextPlayer = player.name;
      }
    });
    pigDice.players.forEach(function(player){
      if (player.turn === true){
        player.turn = false;
      }
    });
    pigDice.players.forEach(function(player){
      if (player.name === nextPlayer){
        player.turn = true;
      }
    });
    pigDice.players.forEach(function(player){
      if (player.turn === true){
        $(".diceRoll1").text("");
        $(".diceRoll2").text("");
        $(".playerName").text(player.name);
        $(".turnPoints").text(player.turnPoints);
        $(".totalPoints").text(player.totalPoints);
      }
    });
  });

});
