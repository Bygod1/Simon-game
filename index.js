var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})
$(".start").click(function(){
  if(!started)
  {
    nextSequence();
    started=true;
  }
})
function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  //console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}


function playSound(randomChosenColour)
{
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    if(userClickedPattern.length===gamePattern.length)
    {
        setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  }
  else {
    playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press the start Key to Restart");
      restartGame();
  }
}

function restartGame()
{
  level=0;
  gamePattern=[];
  started=false;
}
