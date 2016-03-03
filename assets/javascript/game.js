$( document ).ready(function() {
    console.log( "ready!" );

//the questions object is in question.js
//initialize some global variables that will be needed

var totalCorrect = 0;
var totalWrong = 0;
var unanswered = 0;

var questionNum = -1;
var userChoice = -1;
var displayTime = 0;
var secondsLeft = 0 ;
var winaudio = new Audio('assets/audio/ding.mp3');
var loseaudio = new Audio('assets/audio/buzz.mp3');
//start the first game.  All subsequent games are started by the user clicking the 'new game' button.

nextQuestion();

//displays time left and if time runs out then the endQuestion function is called.
function showTime(){
	$("#time").text(secondsLeft);
	secondsLeft--;
	if (secondsLeft == -1){
		endQuestion();
	}
};
//this is the 'new game' button and starts a new game by resetting the necessary variables.
$(".newGame").click(function(){
	if(questionNum == -1){
		totalCorrect = 0;
		totalWrong = 0;
		unanswered = 0;
		nextQuestion();
	}
	
});
//The nextQuestion function increments the quesitonNum pointer and calls the startNextQuestion
function nextQuestion(){
	if (questionNum < allQuestions.length-1){
	questionNum++;
	startNextQuestion(questionNum);
	}else{	
	$("#question").text("You got " +Math.round(totalCorrect/allQuestions.length*100) +"% correct");
	$(".choices").empty();
	$("#answer").text("");
	$("#result").text("");
	questionNum = -1;
	}
};
//startNextQuestion gets the browser ready for the next question and then calls displayChoices.
function startNextQuestion(q){
	$("#time").text(30);
	$("#question").val("");
	$(".choices").empty();
	$("#answer").text("Click The Correct Choice");
	$("#answer").css('color', 'red');
	$("#answer").css('background','lightblue');
	$("#result").text("Good Luck!");
	displayChoices(q);
};
//Displays all the choices and sets up hover and click listening events.
function displayChoices(i){
	userChoice = -1;
	questionNum = i;
	secondsLeft = 29;/////SET to 29 instead of 30 because of delay in processing the code.  User still sees 30 and has 30 seconds.
	clearTimeout(displayTime);
	displayTime = setInterval(showTime,1000);
	$("#question").html("<p>" + allQuestions[i].question + "</p>");
	$("#answer").text("Click The Correct Choice");
	$("#answer").css('color', 'red');
	$("#answer").css('background','lightblue');
	$("#result").text("Good Luck!");
	var choiceArray = allQuestions[i].choices
	answer = choiceArray[allQuestions[i].correctChoice];
	for (k=0; k<choiceArray.length; k++){
		$(".choices").append("<p><span id = q" + k + ">" + choiceArray[k] +  "</span></p>");
			//this area creates click event for user's choice and puts their choice in a div
			$('#q' + k).click(function(){
				$(this).css('color', 'white');
				$(this).css('background','red');
				//$("#answer").text($(this).text());//Removed when changed the functionality of the game to show what the correct choice is
				$("#answer").text("Correct Choice: " + answer);
				$("#answer").css('color', 'white');
				$("#answer").css('background','blue');
				if (userChoice == -1){
					userChoice = ($(this).attr('id'))[1];
					endQuestion();
				};
			});
			//this creates hover on and off color change
			$('#q' + k).hover(function(){					
				//idnum = $(this).attr("id");
				$(this).css('color', 'white');
				$(this).css('background','red');
					}, function(){
					$(this).css('color', 'black');
					$(this).css('background','lightgrey');
					});
	}//closes for loop k
};//closes the displayChoices function
//the endQuestion function checks to see if the user made the correct choice or not (or no choice made due to time out flag -1)
function endQuestion(){
	if (userChoice == allQuestions[questionNum].correctChoice){
					totalCorrect++;
					$("#result").text("Correct!");
					winaudio.play();
				}else if (userChoice == -1){
					unanswered++;
					loseaudio.play();
					$("#result").text("No Choice Made");
				}else{
					totalWrong++;
					loseaudio.play();
					$("#result").text("Wrong!");
				};
				$("#time").text(0);
				$("#right").text(totalCorrect);
				$("#wrong").text(totalWrong);
				$("#unanswered").text(unanswered);
				clearInterval(displayTime);
				displayTime = setTimeout(nextQuestion,1000);//delay before changing questions
	}//closes endQuestion

});//closes the $JQuery


