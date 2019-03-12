$(document).ready(function() {
    // this function will create the opening page and start the game with bootstrap button
  
    function openingPage() {
      openScreen =
        "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
      $("#mainArea").append(openScreen);
    }
  
    openingPage();
  
    //on-click
  
    $("#mainArea").on("click", ".start-button", function(event) {
      event.preventDefault();
  
      $(".jumbotron").hide();
  
      generateQuestions();
  
      timerWrapper();
    }); // Closes start-button click
  
    $("body").on("click", ".answer", function(event) {
      selectedAnswer = $(this).text();
      //ternary operator, if/else replacement
      selectedAnswer === correctAnswers[questionCounter]
        ? //alert("testing");
          (clearInterval(theClock), generateWin())
        : //alert("wrong answer!");
          (clearInterval(theClock), generateLoss());
    }); 
  
    $("body").on("click", ".reset-button", function(event) {
      resetGame();
    }); // Closes reset-button click
  });
  // time out function
  function timeoutLoss() {
    unansweredTally++;
    gameHTML =
      "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
      counter +
      "</span></p>" +
      "<p class='text-center'>You ran out of time!  The correct answer was: " +
      correctAnswers[questionCounter] +
      "</p>">
    $("#mainArea").html(gameHTML);
    setTimeout(wait, 3000);
  }
  // correct function
  function generateWin() {
    correctTally++;
    gameHTML =
      "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
      counter +
      "</span></p>" +
      "<p class='text-center'>Correct! The answer is: " +
      correctAnswers[questionCounter] +
      "</p>";
    $("#mainArea").html(gameHTML);
  
    setTimeout(wait, 3000);
  }
  // function for incorrect
  function generateLoss() {
    incorrectTally++;
    gameHTML =
      "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
      counter +
      "</span></p>" +
      "<p class='text-center'>Wrong! The correct answer is: " +
      correctAnswers[questionCounter] +
      "</p>";
    $("#mainArea").html(gameHTML);
    setTimeout(wait, 3000);
  }
  
  // function to generate question
  function generateQuestions() {
    gameHTML =
      "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" +
      questionArray[questionCounter] +
      "</p><p class='first-answer answer'>A. " +
      answerArray[questionCounter][0] +
      "</p><p class='answer'>B. " +
      answerArray[questionCounter][1] +
      "</p><p class='answer'>C. " +
      answerArray[questionCounter][2] +
      "</p><p class='answer'>D. " +
      answerArray[questionCounter][3] +
      "</p>";
    $("#mainArea").html(gameHTML);
  }
  
  function wait() {
    //    saw this on w3, seems to be functioning correctly
    questionCounter < 7
      ? (questionCounter++, generateQuestions(), (counter = 30), timerWrapper())
      : finalScreen();
  }
  
  function timerWrapper() {
    theClock = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
      if (counter === 0) {
        clearInterval(theClock);
        timeoutLoss();
      }
      if (counter > 0) {
        counter--;
      }
      $(".timer").html(counter);
    }
  }
  
  function finalScreen() {
    gameHTML =
      "<p class='text-center timer-p'>Time: <span class='timer'>" +
      counter +
      "</span></p>" +
      "<p class='text-center'>Here is your score!" +
      "</p>" +
      "<p class='summary-correct'>Correct Answers: " +
      correctTally +
      "</p>" +
      "<p>Wrong Answers: " +
      incorrectTally +
      "</p>" +
      "<p>Unanswered: " +
      unansweredTally +
      "</p>" +
      "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $("#mainArea").html(gameHTML);
  }
  // reset variables
  function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 30;
    generateQuestions();
    timerWrapper();
  }
  
  var openScreen;
  var gameHTML;
  var counter = 30;
  var questionArray = [
    "Who's nickname was The Great Bambino?",
    "In what year did the infamous 'Black Sox' Scandal happen?",
    "How many championships do the now Miami Marlins have?",
    "What year was the first for The Colorado Rockies",
    "Where is the Baseball Hall of Fame located?",
    "What is the name of The Cincinatti Reds baseball stadium?",
    "Who was the 2003 World Series MVP?",
    "Who had the game winning hit in Game 7 of the 1997 World Series?"
  ];
  
  var answerArray = [
    ["Babe Ruth", "Frank Thomas", "Derek Jeter", "Manny Ramirez"],
    ["1929", "2005", "1919", "1963"],
    ["0", "2", "3", "9"],
    ["1992", "1993", "1995", "1997"],
    ["Canton", "Miami", "Denver", "Cooperstown"],
    [
      "Fenway Park",
      "Guaranteed Rate Field",
      "Great American Ball Park",
      "Wrigley Field"
    ],
    ["Pudge Rodriguez", "Juan Pierre", "Miguel Cabrera", "Josh Beckett"],
    ["Edgar Renteria", "Craig Counsell", "Gary Sheffield", "Charles Johnson"]
  ];
  
  var correctAnswers = [
    "A. Babe Ruth",
    "C. 1919",
    "B. 2",
    "B. 1993",
    "D. Cooperstown",
    "C. Great American Ball Park",
    "D. Josh Beckett",
    "A. Edgar Renteria"
  ];
  
  var questionCounter = 0;
  var selecterAnswer;
  var theClock;
  var correctTally = 0;
  var incorrectTally = 0;
  var unansweredTally = 0;
  