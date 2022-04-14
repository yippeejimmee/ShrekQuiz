var startBtn = document.querySelector("#startBtn");
var question = document.querySelector(".question");
var answers = Array.from(document.querySelectorAll(".answer"));
var titlePage = document.querySelector(".titlePage");
var questionPage = document.querySelector(".questionPage");
var countdown = document.querySelector(".countdown");
var wrong = document.querySelector(".wrong");
var correct = document.querySelector(".correct");
var correctChoice = true;
var currentQuestion = {};
var questionIndex = 0;
var questionAll = [];

var startingTime;
var timeLeft;
//var idTitlePage = document.querySelector("#idTitlePage")

function runGame() {
    titlePage.classList.add('hidden');
    questionPage.classList.remove('hidden');
    startingTime = 60;
    questionAll = [...questions];

    /*currentQuestion = questionAll[questionIndex];
    question.textContent = currentQuestion.question;
    console.log(answers);*/

    countDownFunc();
    setQuestion();
}

var questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        option1: '  1. <div>',
        option2: '  2. <script>',
        option3: '  3. <h1>',
        option4: '  4. <section>',
        answer: 2,
    },
    {
        question: 'What does CSS stand for?',
        option1: '  1. Cascading Style Sheet',
        option2: '  2. Columns of Single Style',
        option3: '  3. Corner Stacked Styling',
        option4: '  4. Crazy Super Style',
        answer: 1,
    },
    {
        question: 'Which of these is NOT a unit of measurement in CSS?',
        option1: '  1. pixel',
        option2: '  2. bold',
        option3: '  3. REM',
        option4: '  4. VW',
        answer: 2,
    },
    {
        question: 'Which element goes at the bottom of the webpage?',
        option1: '  1. <section>',
        option2: '  2. <p>',
        option3: '  3. <body>',
        option4: '  4. <footer>',
        answer: 4,
    },  
]

function countDownFunc() {
    timeLeft = setInterval(function() {
        console.log(startingTime);
        startingTime--;
        countdown.textContent = "Time Left: " + startingTime;

        if(startingTime <= -1) {
            clearInterval(timeLeft);
            let tryAgain = confirm("You didn't complete it in time! Try again?")
            if (tryAgain) {
                countdown.textContent = "Time Left: 60";
                questionIndex = 0;
                runGame();
            }
            else {
                countdown.textContent = "Time Left: 60";
                questionIndex = 0;
                titlePage.classList.remove('hidden');
                questionPage.classList.add('hidden');
                alert("Don't give up! You can do it!!");
                return;
            }
        }
    }, 1000);
}

function setQuestion () {
    questionAll = [...questions];

    /*if(questionIndex > 3) {
        localStorage.setItem('score', startingTime);
        questionPage.classList.add('hidden');
        return;
    } */

    //questionIndex++;
    currentQuestion = questionAll[questionIndex];
    question.textContent = currentQuestion.question;

    answers.forEach(selection => {
        const number = selection.dataset['number']
        selection.textContent = currentQuestion['option' + number];
    })
}

answers.forEach(selection => {
    selection.addEventListener('click', e => {
        if(e.target.dataset['number'] != currentQuestion.answer) {
            startingTime = startingTime - 10;
            wrong.classList.remove('hidden');
            setTimeout(function(){
            wrong.classList.add('hidden');
        }, 1000);

        return
        }
        
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        if(selectedAnswer){
            correct.classList.remove('hidden');
            setTimeout(function(){
                correct.classList.add('hidden');
            }, 1000);
        setNewQuestion();
        }
    })
})

function setNewQuestion () {
    questionAll = [...questions];

    if(questionIndex > 2) {
        localStorage.setItem('score', startingTime);
        questionPage.classList.add('hidden');
        return;
    } 
    questionIndex++;

    currentQuestion = questionAll[questionIndex];
    question.textContent = currentQuestion.question;

    answers.forEach(selection => {
        const number = selection.dataset['number']
        selection.textContent = currentQuestion['option' + number];
    })
}

startBtn.addEventListener("click", runGame);

