let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let levelStr = "level 0";
let currLevel = 0;
let userClickedPattern = [];

function nextSequence() {
  userClickedPattern = [];
  currLevel += 1;
  $("h1").text(levelStr + currLevel);
  let randomNumber = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColors[randomNumber]);
  animatePress(buttonColors[randomNumber]);
}

function animatePress(currentColor) {
  var currButton = "#" + currentColor;
  $(currButton).addClass("pressed");
  setTimeout(function () {
    $(currButton).removeClass("pressed");
  }, 50);

  $(currButton).fadeOut(100).fadeIn(100);
  const audio = new Audio("./sounds/" + currentColor + ".mp3");
  audio.play();
}

$(".btn").click(function () {
  var userClickedButton = this.id;
  userClickedPattern.push(userClickedButton);
  animatePress(userClickedButton);
  checkAnswer(userClickedPattern.length - 1);
});

let isKeyPressed = false;
$(".restartGameButton").on("click", function () {
  if (isKeyPressed != true) {
    setTimeout(function () {
      nextSequence();
    }, 500);
  }
  isKeyPressed = true;
  $(".restartGameButton").css("visibility", "hidden");
});

function checkAnswer(currentLevel) {
  console.log("game: ", gamePattern);
  console.log("user: ", userClickedPattern);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $(".restartGameButton").text("RESTART");
    $(".restartGameButton").css("visibility", "visible");
    $("h1").text("uh ho...Game Over !");
    const audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  isKeyPressed = false;
  currLevel = 0;
  gamePattern = [];
}
