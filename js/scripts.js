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

Players.prototype.calculateTurnPoints = function(diceRoll){

  if (diceRoll === 1){
    this.turnPoints = 0;
    $("#hold").addClass("disabled");
    $("#roll").addClass("disabled");
  } else {
    this.turnPoints += diceRoll;
  }
}

function diceImg(roll) {
  if (roll === 1 ) {
    $(".diceRoll").html("<img src='img/dice1.jpeg'>");
  }
  else if (roll === 2) {
    $(".diceRoll").html("<img src='img/dice2.jpeg'>");
  }
  else if (roll === 3) {
    $(".diceRoll").html("<img src='img/dice3.jpeg'>");
  }
  else if (roll === 4) {
    $(".diceRoll").html("<img src='img/dice4.jpeg'>");
  }
  else if (roll === 5) {
    $(".diceRoll").html("<img src='img/dice5.jpeg'>");
  }
  else {
    $(".diceRoll").html("<img src='img/dice6.jpeg'>");
  }
}

Players.prototype.hold = function(){
  $("#hold").addClass("disabled");
  $("#roll").addClass("disabled");
  this.totalPoints += this.turnPoints;
  this.turnPoints = 0;
}

Players.prototype.checkWinStatus = function() {
  if (this.totalPoints >= 10) {
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
    var roll = diceRoll();
    diceImg(roll);
    pigDice.players.forEach(function(player){
      if (player.turn === true){
        player.calculateTurnPoints(roll);
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
        $(".diceRoll").text("");
        $(".playerName").text(player.name);
        $(".turnPoints").text(player.turnPoints);
        $(".totalPoints").text(player.totalPoints);
      }
    });
  });

});
