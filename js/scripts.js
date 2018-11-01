// Business Logic
var pigDice = new PigDice();
var player1;
var player2;
var roll1;
var roll2;

function roll(){
  roll1 = diceRoll();
  roll2 = diceRoll();
  diceImg1(roll1);
  diceImg2(roll2);
  pigDice.players.forEach(function(player){
    if (player.turn === true){
      rolled1 = player.calculateTurnPoints(roll1, roll2);
      $(".turnPoints").text(player.turnPoints);
    }
  });
}

function endTurn() {
  pigDice.players.forEach(function(player){
    if (player.turn === true){
      player.endTurn();
      $(".turnPoints").text(player.turnPoints);
      player.checkWinStatus();
    }
  });
  $("#roll").show();
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
      $(".diceRoll1").html("<img src='img/dice0.jpeg'>");
      $(".diceRoll2").html("<img src='img/dice0.jpeg'>");
      $(".playerName").text(player.name);
      $(".turnPoints").text(player.turnPoints);
      $(".totalPoints").text(player.totalPoints);
      if (player.name === "computer"){
        $("#roll").hide();
        $("#endTurn").hide();
        computerTurn();
      }
      if (player.name !== "computer") {
        $("#roll").show();
        $("#endTurn").show();
      }
    }
  });
}

function diceRoll() {
  return Math.floor(Math.random()*6 + 1);
}

function diceImg1(roll) {
  $(".diceRoll1").html("<img src='img/dice" + roll + ".jpeg'>");
}

function diceImg2(roll) {
  $(".diceRoll2").html("<img src='img/dice" + roll + ".jpeg'>");
}

function computerTurn() {
  roll();
  if (roll1 === 1 || roll2 === 1) {
    setTimeout(endTurn, 2000);
  } else {
    setTimeout(roll, 2000);
  }
}

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
    this.turnPoints = 0;
    $("#roll").hide();
  } else if (dice1 === 1 || dice2 === 1){
    this.turnPoints = 0;
    $("#roll").hide();
  } else {
    var diceTotal = dice1 + dice2;
    this.turnPoints += diceTotal
  }
}

Players.prototype.endTurn = function(){
  this.totalPoints += this.turnPoints;
  this.turnPoints = 0;
}

Players.prototype.checkWinStatus = function() {
  if (this.totalPoints >= 100) {
    if (player1.turn === true) {
      $("#player1").css("background-color", "#00e6ac");
      $(".player1Winner").show();
      alert("I'm coming for you. - computer");
    } else if (player2.turn === true) {
      $("#player2").css("background-color", "#00e6ac");
      $(".player2Winner").show();
    }
  }
}


// User Interface Logic
$(document).ready(function(){

  $("#1v1").click(function(){
    $(".pickPlayersButtons").hide();
    $("#players-form").show();
  });

  $("#1vcomputer").click(function(){
    $(".pickPlayersButtons").hide();
    $("#players-form").show();
    $("#players-2-form").hide();
  });

  $("#players-form").submit(function(event){
    event.preventDefault();
    var player1Name = $("#player1Name").val();
    var player2Name = $("#player2Name").val();

    $("#game").show();
    $("#players-form").hide();

    if (!player2Name) {
      player2Name = "computer";
    }

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
        $(".playerName").text(player.name);
        $(".turnPoints").text(player.turnPoints);
      }
    })
  });

  $("#roll").click(function(){
    roll();
  });

  $("#endTurn").click(function(){
    endTurn();
  });

});
