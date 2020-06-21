
var userClickedPattern = [];
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

$(document).keypress(function() {
	if(!started) {
		//$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

$(".btn").click(function() {

	var userChosenColor = this.id;
	userClickedPattern.push(userChosenColor);

	playSound(userChosenColor);
	animationPressed(userChosenColor);

	checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

	if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

		if(gamePattern.length === userClickedPattern.length) {

			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	}
	else {

		playSound("wrong");

		$("body").addClass("game-over");
		setTimeout(function() {
			$("body").removeClass("game-over");
		}, 200);

		$("h1").html("Game Over, Press Any Key to Restart");

		startOver();
	}
}

function nextSequence() {

	userClickedPattern = [];

	level++;
	$("h1").html("Level " + level);

	var randomNumber = Math.floor(Math.random()*4);
	var randomChosenColor = buttonColours[randomNumber];
	gamePattern.push(randomChosenColor);

	$("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100);
	playSound(randomChosenColor);
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animationPressed(button) {

	$("#" + button).addClass("pressed");

	setTimeout( function () {
		$("#" + button).removeClass("pressed");
	}, 100);
}
