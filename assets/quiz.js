// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const timer = document.getElementById("timer");
const scoreDiv = document.getElementById("scoreContainer");
const myScore = document.getElementById("score");
var scoreForm = document.getElementById("scoreform");
var scoreList = document.getElementById("scorelist");
var saveBtn = document.getElementById("savebtn");
var afterGame = document.getElementById("aftergame");
var goBack = document.getElementById("goback");
var reset = document.getElementById("reset");
var viewScore = document.getElementById("viewscore");

// create some variables
var textInner = "";

var saved = localStorage.getItem("saved");

// create our questions
let questions = [
  {
    question:
      "How many chances told by Doctor Strange after his vision, that the world can be saved from Thanos invasion?  ",
    choiceA: "10",
    choiceB: "5",
    choiceC: "1",
    correct: "C",
  },
  {
    question: "What does CSS stand for?",
    choiceA: "Chris Evans",
    choiceB: "Daniel Craig",
    choiceC: "Jim Carrey",
    correct: "A",
  },
  {
    question: "What does JS stand for?",
    choiceA: "Pepper Potts",
    choiceB: "Tony Stark",
    choiceC: "Morgan Stark",
    correct: "C",
  },
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;

// render a question
function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  start.style.display = "none";
  viewScore.style.display = "none";
  document.getElementById("para").style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  startTimer();
}

// render progress
function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}

//timer
var sec = 50;
function startTimer() {
  window.countTimer = setInterval(function () {
    sec--;
    document.getElementById("timer").innerHTML = sec;
    if (sec <= 0) {
      clearInterval(window.countTimer);
      alert("you lost!");
    }
  }, 1000);
}
// checkAnwer

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    answerIsCorrect();
  } else {
    answerIsWrong();
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(window.countTimer);
    scoreRender();
  }
}

// answer is correct
function answerIsCorrect() {
  document.getElementById("result").innerText = "Right!";
}

// answer is Wrong
function answerIsWrong() {
  document.getElementById("result").innerText = "Wrongggg!";
  sec -= 10;
}

// score render
function scoreRender() {
  scoreDiv.style.display = "block";
  quiz.style.display = "none";
  const textTimeRemaining = `Your score is ${sec}`;
  myScore.textContent = textTimeRemaining + " points";
}

function getArrayScore() {
  var localArrayScore = [];//block scope

  if (localStorage.getItem("arrayScore")) {
    localArrayScore = localStorage.getItem("arrayScore");
    localArrayScore = JSON.parse(localArrayScore);
  }

  console.log(localArrayScore)
  return localArrayScore;
}

function renderScoreList(tagHTML, arrayExisted) {
  var textInner = "";
  for (const element of arrayExisted) {
    textInner += `<li> ${element.username}: ${element.timer}`;
  }
  // arrayScore.forEach(item => {
  //     textInner += `<li> ${item.username}: ${item.timer} points </li>`
  // });

  return (tagHTML.innerHTML = textInner);
}

// create function to handle the form
function handleFormSubmit(event) {
  event.preventDefault();

  var userName = $('input[name="name-input"]').val();

  // page load

  var newScore = { username: userName, timer: sec };

  const arrayScore = getArrayScore();

  arrayScore.push(newScore); // push any new info to local storage
  var stringArray = JSON.stringify(arrayScore);
  localStorage.setItem("arrayScore", stringArray); // save to local storage

  if (!userName) {
    alert("Enter your name, pleassssse!");
    return;
  }

  renderScoreList(scoreList, arrayScore);

  $('input[name="name-input"]').val("");

  scoreForm.style.display = "none";
  afterGame.style.display = "block";
}

saveBtn.addEventListener("click", handleFormSubmit);

reset.addEventListener("click", () => {
  localStorage.removeItem("arrayScore");
  scoreList.innerHTML = "";
});

goBack.addEventListener("click", function () {
  document.location.reload(true);
});

viewScore.addEventListener("click", () => {
  viewScore.style.display = "none";
  document.getElementById("para").style.display = "none";
  document.getElementById("start").style.display = "none";
  document.getElementById("scoreform").style.display = "none";
  document.getElementById("scoreContainer").style.display = "block";
  document.getElementById("aftergame").style.display = "block";
  scoreList.style.display = "block";

  const arrayScore = getArrayScore();
  renderScoreList(scoreList, arrayScore);
});
