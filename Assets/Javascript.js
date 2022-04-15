var startBtn = document.querySelector("#startBtn");
var question = document.querySelector(".question");
var answers = Array.from(document.querySelectorAll(".answer"));
var titlePage = document.querySelector(".titlePage");
var questionPage = document.querySelector(".questionPage");
var countdown = document.querySelector(".countdown");
var wrong = document.querySelector(".wrong");
var correct = document.querySelector(".correct");
var includeName = document.querySelector(".includeName");
var finalScore = document.querySelector(".finalTimeScore");
var yourName = document.querySelector("form");
var nameInput = document.querySelector("#nameInitials");
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
var highScoreBoard = document.querySelector("#highScoresList")
var clearScores = document.querySelector(".clearScores");
var tryAgain = document.querySelector(".tryAgain")
var highScoreTable = document.querySelector(".highScoreTable")
var highScoresLink = document.querySelector(".highScoresLink")
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

    countDownFunc();
    setQuestion();
}

//setting up array of objects with question, options and correct answer choice
var questions = [
    {
        question: 'Where does Shrek Live?',
        option1: '  1. A cave',
        option2: '  2. A swamp',
        option3: '  3. A castle',
        option4: '  4. A cave',
        answer: 2,
    },
    {
        question: "What is Shrek's favorite drink?",
        option1: '  1. An eyetini',
        option2: '  2. A leg of ale',
        option3: '  3. Warm glass of mud',
        option4: '  4. Cauldron broth',
        answer: 1,
    },
    {
        question: 'What food item does Shrek compare orgres to?',
        option1: '  1. Turnips',
        option2: '  2. Onions',
        option3: '  3. Carrots',
        option4: '  4. Pies',
        answer: 2,
    },
    {
        question: 'What is the name of the princess he rescues?',
        option1: '  1. Fedora',
        option2: '  2. Flora',
        option3: '  3. Fauna',
        option4: '  4. Fiona',
        answer: 4,
    },  
    {
        question: "What is Princess Fiona's secret?",
        option1: '  1. She is a witch',
        option2: '  2. She turns into an ogre',
        option3: '  3. She is actually a prince',
        option4: '  4. She knows how to code',
        answer: 2,
    },
    {
        question: "What is the name of Shrek's best friend?",
        option1: '  1. Donkey',
        option2: '  2. Chris',
        option3: '  3. Farquaad',
        option4: '  4. Michael',
        answer: 1,
    },
    {
        question: 'How does Shrek break the curse?',
        option1: '  1. Hug',
        option2: '  2. Murder',
        option3: '  3. Kiss',
        option4: '  4. High Five',
        answer: 3,
    },
    {
        question: "What is Donkey's favorite breakfast?",
        option1: '  1. Pancakes',
        option2: '  2. Waffles',
        option3: '  3. Bacon',
        option4: '  4. Toast',
        answer: 2,
    },
]

//calling time count down function
function countDownFunc() {
    timeLeft = setInterval(function() {
        console.log(startingTime);
        startingTime--;
        countdown.textContent = "Time Left: " + startingTime;

        //Time expiration, prompting try again or give up
        if(startingTime <= -1) {
            clearInterval(timeLeft);
            let tryAgain = confirm("You didn't complete it in time! Try again or GET OUT OF MY SWAMP!")
            if (tryAgain) {
                countdown.textContent = "Time Left: 60";
                //trying again resets the question index to zero to start question at the beginning
                questionIndex = 0;
                runGame();
            }

            //giving up hides the questions container and displays the mainpage container as well as resetting time and question index
            else {
                countdown.textContent = "Time Left: 60";
                questionIndex = 0;
                titlePage.classList.remove('hidden');
                questionPage.classList.add('hidden');
                alert("Fine. LEAVE! and don't even come back!");
                return;
            }
        }
    }, 1000);
}

function setQuestion () {
    //spreading operator to extract values from the question array
    questionAll = [...questions];

    //set up 
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

    if(questionIndex > 6) {
        localStorage.setItem('userScore', startingTime);
        questionPage.classList.add('hidden');
        finalScore.textContent = startingTime;
        clearInterval(timeLeft);
        includeName.classList.remove('hidden');
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


yourName.addEventListener("submit", function(e){
    e.preventDefault();
    var userNameInput = document.querySelector("#nameInitials").value;
    console.log(userNameInput);
    var yourScore = localStorage.userScore;
    console.log(yourScore);
    var nameScore = {
        score: yourScore,
        name: userNameInput
    }
includeName.classList.add('hidden');
    highScores.push(nameScore);

    localStorage.setItem('highScores', JSON.stringify(highScores))
    //window.location.assign("/");

    console.log(highScores);
    highScoresList.innerHTML = highScores.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`
    }).join('');
    highScoreTable.classList.remove('hidden');
    
});


clearScores.addEventListener("click", function(e){
    e.preventDefault();
    window.localStorage.removeItem('highScores');
    highScoresList.innerHTML = highScores.map(score => {
        return `<li id="highScoresList"></li>`
    }).join('');
})

tryAgain.addEventListener("click", function(e){
    e.preventDefault();
    highScoreTable.classList.add('hidden');
    titlePage.classList.remove('hidden');
    countdown.textContent = "Time Left: 60";
    questionIndex = 0;
})

highScoresLink.addEventListener("click", function(e){
    e.preventDefault();
    highScoreTable.classList.remove('hidden');
    titlePage.classList.add('hidden');
    questionPage.classList.add('hidden');
    clearInterval(timeLeft);
})
    



startBtn.addEventListener("click", runGame)

