$( document ).ready(function() {
    console.log( "ready!" );

//array of objects.  each element is an object containing a question, an array of choices, correct choice (which element of choices array)
var allQuestions = [

	{
			question : "Of which software product category was CP/M a part?",
			choices : ["spreadsheet","OS","word processing","browser","image editing"],	
			correctChoice : 1
	},

	{
			question : "What company invented the 'floppy disk'?",
			choices : ["Atari","Hewlett Packard","Intel","Apple","IBM"],	
			correctChoice : 4
		},
	
	{
			question : "In what year did Al Gore invent the internet?",
			choices : ["1980","1983","1987","1989","He didn't"],	
			correctChoice : 4
		},
	
	{
			question : "What company manufactured the DEC 1099 Mini-computer?",
			choices : ["Daimetric Electronics","Dell","Intel","Digital Equipment","None of the above"],	
			correctChoice : 3
		},
	
	{
			question : "The first computer 'mouse' was made of what material?",
			choices : ["silica/carbon","plastic","wood","aluminum","cardboard"],	
			correctChoice : 2
		},
	
	{
			question : "Along with whom did Bill Gates found Microsoft?",
			choices : ["No one","Steve Wozniak","Warren Buffet","Paul Allen","Larry Ellison"],	
			correctChoice : 3
		},
	
	{
			question : "Who is regarded as the inventor of the Java programming language?",
			choices : ["Bill Gates","James Gosling","Steve Jobs","Larry Ellison","Samuel Richards, III"],	
			correctChoice : 1
		},
	
	{
			question : "The first patent application for the microprocessor was filed by Intel in what year?",
			choices : ["Intel wasn't the first to file","1979","1969","1971","1968"],	
			correctChoice : 0
		},
	
	{
			question : "What is widely considered the first electronic computer?",
			choices : ["HAL","ENIAC","SIAGO","BXI583","Brainiac-7"],	
			correctChoice : 1
		},
	
	{
			question : "Which of the following is NOT a computer language?",
			choices : ["MUMPS","PL1","BASIC","PASCAL","LED-EX"],	
			correctChoice : 4
		},
	{	
			question : "Which Google vice president co-designed TCP/IP and is regarded by some as the father of the Internet?",
			choices : ["Vint Cerf","Laslow Verring","Steve Jobs","Bill Gates","Albert Einstein"],
			correctChoice : 0
		},

	{		question : "Vint Cerf is regarded as the father of the Internet but who is the person that actually invented the World Wide Web?",
			choices : ["Vint Cerf did that too!","Tim Berners-Lee","Steve Jobs","Bill Gates","Raymond Altervanzt"],
			correctChoice : 1
		},
	{
			question : "Who is famous for developing the Mosaic web browser at the University of Illinois? Mosaic was later renamed to Netscape Navigator.",
			choices : ["Larry Ellison","Brian Mosaic","Joshua Redman","Alan Sikes","Marc Andreessen"],
			correctChoice : 4
		},
	{		
			question : "How many bits are in a byte?",
			choices : ["4","2","10","8","3"],
			correctChoice : 3
		},
	{
			question : "What was the first OS for Personal Computers?",
			choices : ["PCDOS","CP/M","Windows 95","Unix","ZX19"],
			correctChoice : 1
		},
	{
			question : "What chess-playing computer, developed by IBM, defeated world champion Garry Kasparov in 1997?",
			choices : ["ENIAC","HAL","RAMBO-9","SQQKING-920","DEEP BLUE"],
			correctChoice : 4

		},
	{
			
			question : "Who said this: Taking LSD was a profound experience, one of the most important things in my life. LSD shows you that there’s﻿ another side to the coin, and you can’t remember it when it wears off, but you know it. It reinforced my sense of what was important—creating great things instead of making money, putting things back into the stream of history and of human consciousness as much as I could.",
			choices : ["Albert Einstein","Steve Jobs","Timothy Leary","Jimi Hendrix","Barrack Obama"],
			correctChoice : 1
	},


	{
			question : "What is the ERROR number on the Internet for: Site Access Forbidden/Password Protected?",
			choices : ["1212","403","448","72","9872-012"],
			correctChoice : 1

		},
	{
			question : "What is the Binary Equivalent to 29?",
			choices : ["11101","01011","01111","1001000","1100101"],
			correctChoice : 0
	},

	{	
			question : "This is an example of what computer language:   loop      mov     al,[si]    ; Load AL from [src]  ?",
			choices : ["Pascal","BASIC","COBOL","PL1","Assembly"],
			correctChoice : 4
		}

	


];
//initialize some global variables that will be needed

$(".newGame").click(function(){
	if(questionNum == -1){
		totalCorrect = 0;
		totalWrong = 0;
		unanswered = 0;
		nextQuestion();
	}
	
});

var totalCorrect = 0;
var totalWrong = 0;
var unanswered = 0;

var questionNum = -1;
var userChoice = -1;
var displayTime = 0;
var secondsLeft = 0 ;
var winaudio = new Audio('assets/audio/ding.mp3');
var loseaudio = new Audio('assets/audio/buzz.mp3');


function poseQuestion(i){
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
};//closes the poseQuestion function

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

//displays time left
function showTime(){
	$("#time").text(secondsLeft);
	secondsLeft--;
	if (secondsLeft == -1){
		endQuestion();
	}
};

function startGame(q){
	$("#time").text(30);
	$("#question").val("");
	$(".choices").empty();
	$("#answer").text("Click The Correct Choice");
	$("#answer").css('color', 'red');
	$("#answer").css('background','lightblue');
	$("#result").text("Good Luck!");
	poseQuestion(q);
};

function nextQuestion(){
	if (questionNum < allQuestions.length-1){
	questionNum++;
	startGame(questionNum);
	}else{	
	$("#question").text("You got " +Math.round(totalCorrect/allQuestions.length*100) +"% correct");
	$(".choices").empty();
	$("#answer").text("");
	$("#result").text("");
	questionNum = -1;
	}
};

nextQuestion();
});//closes the $JQuery


