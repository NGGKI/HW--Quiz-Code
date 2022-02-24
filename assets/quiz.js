// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timer = document.getElementById("timer");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question: "How many chances told by Doctor Strange after his vision, that the world can be saved from Thanos invasion?  ",
        choiceA: "10",
        choiceB: "5",
        choiceC: "1",
        correct: "C"
    }, {
        question: "What does CSS stand for?",
        choiceA: "Chris Evans",
        choiceB: "Daniel Craig",
        choiceC: "Jim Carrey",
        correct: "A"
    }, {
        question: "What does JS stand for?",
        choiceA: "Pepper Potts",
        choiceB: "Tony Stark",
        choiceC: "Morgan Stark",
        correct: "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
let TIMER;
let score = 0;

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
    document.getElementById('para').style.display = "none"
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

// checkAnwer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(timer);
        scoreRender();
        console.log("chay roi");
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
    sec -= 12;
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

}


//timer
var sec = 40;
function startTimer() {
    var timer = setInterval(function () {
        sec--;
        document.getElementById('timer').innerHTML = sec;
        if (sec <= 0) {
            clearInterval(timer);
            alert("you lost!")
        }
    }, 1000);
}



















