// Business Logic
function PigDice(){
  this.players = [];
}

PigDice.prototype.addPlayers = function(player){
  this.players.push(player);
}

function Players(name, turn=false){
  this.name = name;
  this.totalPoints = 0;
  this.turnPoints = 0;
  this.turn = turn;
}

Players.prototype.calculateTurnPoints = function(diceRoll){
  if (diceRoll === 1){
    this.turnPoints = 0;
    this.turn = false;
  } else {
    this.turnPoints += diceRoll;
  }
}

Players.prototype.endTurn = function(){
  this.turn = false;
  this.totalPoints += this.turnPoints;
  this.turnPoints = 0;
  }
}

Players.prototype.checkWinStatus = function() {
  if (this.totalPoints >= 100) {
    alert ("you won!");
  }
}

function diceRoll() {
  return Math.floor(Math.random()*6 + 1);
}



// User Interface Logic

$(document).ready(function(){
  var pigDice = new PigDice();
  var player1Name;
  var player2Name;

  var player1;
  var player2;

  $("#players-form").submit(function(event){
    event.preventDefault();
    player1Name = $("#player1Name").val();
    player2Name = $("#player2Name").val();

    $("#game").show();
    $("#players-form").hide();

    // $(".player1Name").text(player1Name);
    // $(".player2Name").text(player2Name);

    player1 = new Players(player1Name, true);
    player2 = new Players(player2Name);
    pigDice.addPlayers(player1);
    pigDice.addPlayers(player2);

    console.log(pigDice.players);

    pigDice.players.forEach(function(player){
      if (player.turn === true){
        $(".player1Name").text(player1Name);
      }
    })
  });

  $("#player1Roll").click(function(){
    var roll = diceRoll();
    $(".diceRoll1").text(roll);
    pigDice.players.forEach(function(player){
      if (player.turn === true){
        player.calculateTurnPoints(roll);
        $(".player1TurnPoints").text(player.turnPoints);
        player.checkWinStatus();
      }
    });
  });

  $("#hold").click(function(){
    pigDice.players.forEach(function(player){
      if (player.turn === true){
        player.endTurn();
        $(".player1TotalPoints").text(player.totalPoints);
        $(".player1TurnPoints").text(player.turnPoints);
      }
    });

    $("#endTurn").click(function(){

      pigDice.players.forEach(function(player){
        if (player.turn === false){
          player.turn = true;
        }
        $(".player1Name").text(player1Name);
        $(".player1TurnPoints").text(player.turnPoints);
        $(".player1TotalPoints").text(player.totalPoints);
      });
    });
  });

  // $("#player2Roll").click(function(){
  //   var roll = diceRoll();
  //   $(".diceRoll2").text(roll);
  //   player2.calculateTurnPoints(roll);
  //   $(".player2TurnPoints").text(player2.turnPoints);
  //   player1.checkWinStatus();
  // });
  //
  // $("#endTurnPlayer2").click(function(){
  //   player1.endTurn();
  //   $(".player2TotalPoints").text(player2.totalPoints);
  //   $(".player2TurnPoints").text(player2.turnPoints);
  // });

});
