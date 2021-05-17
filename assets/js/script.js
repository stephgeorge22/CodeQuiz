// array of objects to hold questions, choices and answers
var questions = [
    {
        question: "The condition in an if / else statement is enclosed with ________.",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "3. parenthesis",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger us:",
        choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log",
    },
    {
        question: "Commonly used data types Do Not include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts",
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3. quotes",
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above",
    },
];

// link html elements to javascript variables 
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var intro = document.querySelector("#intro");
var quiz = document.querySelector("#quiz");
var startBtn = document.querySelector("#start-btn");
var highScore = document.querySelector("#highScore");
var points = document.querySelector("#points");
var form = document.querySelector("#form");
var username = document.querySelector("#username");
var signup = document.querySelector("#signup");

var questionIndex = 0;
var correctCount = 0;

// start quiz
function startQuiz() {
    // hide quiz introduction
    intro.setAttribute("class", "hide");

    // show quiz
    quiz.setAttribute("class", "show");

    renderQuestion();
};

// 50 second quiz for 5 questions
var time = 1;
var intervalId;

// time 
function updateTime() {
  time--;
  console.log(time);
  timerEl.textContent = "Time: " + time;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {
  
  if (time == 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);
  
  questionEl.textContent = questions[questionIndex].question;

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;
 

  // create dynamic buttons
  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("button");
    questionListItem.textContent = choices[i];
    questionListItem.setAttribute("class", "choices");
    optionListEl.append(questionListItem); 
  } 
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {

    // define horizontal line
    // var line = document.createElement("hr");
    // line.setAttribute("width", "100px");
    // document.body.appendChild(line);

  clearInterval(intervalId);
  if (event.target.matches("button")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      time = time - 5;
      timerEl.textContent = time;
    }
    // $('#line-div').html(line);
  }
  setTimeout(nextQuestion, 2000);
}

function endQuiz() {
    clearInterval(intervalId);
    // var body = document.body;

    // hide quiz
    quiz.setAttribute("class", "hide");

    // show form 
    form.setAttribute("class", "show");

    points.innerHTML = "Game over, your final score is " + correctCount + "! \nEnter initials:";
    points.setAttribute("class", "gameOver");

    let inputScore  = document.getElementById('signup');

    inputScore.addEventListener('submit', (event) => {
        
        let userInitials = inputScore.elements['userInitials'];
       
        highScores();

        return false;
    });
}
  
function highScores() {

    // hide quiz
    intro.setAttribute("class", "hide");

     // hide quiz
     quiz.setAttribute("class", "hide");

     // hide form 
     form.setAttribute("class", "hide");

     // show high scores
     highScore.setAttribute("class", "show");

// highscore will use json.parse and json.stringify to push and pull the items into local storage and make them appear on the page.
    // var win = JSON.parse(window.localStorage.getItem("userInitials.value"))

    // window.localStorage.setItem('initials', JSON.stringify(initials));

    localStorage.setItem('userInitials.value', JSON.stringify(userInitials.value));


//store highscore to local storage
    // var input = document.getElementById("saveServer");
    // localStorage.setItem("server", input.val());
    // window.localStorage.setItem("initials", JSON.stringify(initials));

    //Go to high score page
    console.log("187");
    var body = document.body;
    body.innerHTML = "HIGHSCORE";
    body.setAttribute("class", "score");

    //save high score with initials

    //display high score with initials 

}


optionListEl.addEventListener("click", checkAnswer);

// start quiz on button click
startBtn.onclick = startQuiz; 

