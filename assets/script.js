// DOCUMENT SELECTORS
let startBtn = document.querySelector('#start-button');
let timerEl = document.querySelector('#timer');
let mainEl = document.querySelector('#main');
let homeLi = document.querySelector('#home-link');
let highscoreLi = document.querySelector('#highscore-link')

// GLOBAL VARIABLES
let timerInterval;
let secondsLeft;
let quizSelection;
let quizQuestions;
let quizAnswers;

// HTML QUIZ
const htmlQuestions = [
    'What does HTML stand for?',
    'The <title> element must be located inside...',
    'Which tag is used to create a hyperlink?',
    'How do you open a link in a new window?',
    '<h3> is the largest default heading tag.',
    'Which of the following table tags is used to create a table row?',
    'Which of the following HTML tags is NOT valid?',
    'Which of the following is NOT an HTML attribute?',
    'What HTML form input must be used to present multiple options, but select only one?',
];
const htmlAnswers = [
    [['Hyper Text Markup Language', true], ['Hot Mail', false], ['How to Make Lasagna', false]],
    [['the <head> element', true], ['the <body> element', false]],
    [['<a>', true], ['<img>', false], ['<dl>', false], ['<link>', false]],
    [['target="_new"', false], ['target="_window"', false], ['target="_blank"', true]],
    [['True', false], ['False', true]],
    [['<th>', false], ['<td>', false], ['<tr>', true], ['<table>', false]],
    [['<h1>', false], ['<h8>', true], ['<h4>', false], ['<h5>', false]],
    [['alt', false], ['target', false], ['fontSize', true], ['id', false]],
    [['<input type="text">', false], ['<input type="radio">', true], ['<input type="checkbox">', false]],
];

// CSS QUIZ
const cssQuestions = [
    'Which CSS selector would we use if we wanted to define a style for a unique element?',
    'What does CSS stand for?',
    'What is the correct HTML for referring to an external style sheet?',
    'Where in an HTML document is the correct place to refer to an external style sheet?',
    'Which HTML tag is used to define an internal style sheet?',
    'Which HTML attribute is used to define inline styles?',
    'Which property is used to change the background color?',
    'Which CSS property controls the text size?'
];

const cssAnswers = [
    [['id', true], ['text', false], ['class', false]],
    [['Cascading Style Sheets', true], ['Computer Style Sheets', false], ['Colorful Style Sheets', false], ['Creative Style Sheets', false]],
    [['<style src="mystyle.css">', false], ['<stylesheet>mystyle.css</stylesheet>', false], ['<link rel="stylesheet" type="text/css" href="mystyle.css">', true]],
    [['In the <head> section', true], ['In the <body> section', false], ['At the end of the document', false]],
    [['<css>', false], ['<style>', true], ['<script>', false]],
    [['class', false], ['style', true], ['styles', false], ['font', false]],
    [['background-color', true], ['bgcolor', false], ['color', false]],
    [['text-size', false], ['font-size', true], ['text-style', false], ['font-style', false]]
];

// JS QUIZ
const javascriptQuestions = [
    'Inside which HTML element do we put the JavaScript?',
    'Where is the correct place to insert JavaScript?',
    'What is the correct syntax for referring to an external script called "script.js"?',
    'How would you write "Hello World" in an alert box?',
    'Which of the following is a correct way to create a function in JavaScript?',
    'How do you call a function named "myFunction"?',
    'How do you write an IF statement in JavaScript?',
    'How do you write an IF statement for executing some code if "i" is NOT equal to 5?',
    'How can you add a comment in JavaScript?'
];

const javascriptAnswers = [
    [['<scripting>', false], ['<javascript>', false], ['<script>', true], ['<js>', false]],
    [['Both the <head> section and the <body> section are correct', true], ['The <body> section', false], ['The <head> section', false]],
    [['<script src="script.js">', true], ['<script href="script.js">', false], ['<script name="script.js">', false]],
    [['alert("Hello World");', true], ['alertBox("Hello World")', false], ['msg("Hello World");', false], ['msgBox("Hello World");', false]],
    [['function:myFunction() {}', false], ['function = myFunction() {}', false], ['function myFunction() {}', true]],
    [['call myFunction()', false], ['myFunction()', true], ['call function myFunction()', false]],
    [['if i = 5 {}', false], ['if i == 5 then {}', false], ['if i = 5 then {}', false], ['if (i == 5) {}', true]],
    [['if i <> 5', false], ['if (i <> 5)', false], ['if i=! 5 then', false], ['if (i !== 5)', true]],
    [['//This is a comment', true], ['\'This is a comment', false], ['<!--This is a comment-->', false]]
];

// runs on page load
function init() {
    renderHome();
}

// NAVBAR //
homeLi.addEventListener('click', renderHome);
highscoreLi.addEventListener('click', renderScoreboard);

function initializeTimer() {
    secondsLeft = 75;

    if (!timerInterval) {
        timerInterval = setInterval(function () {
            secondsLeft--;
            timerEl.textContent = secondsLeft;

            if (secondsLeft <= 0) {
                endQuiz();
            }
        }, 1000);
    }
}

function stopTime() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    secondsLeft = 0;
    timerEl.textContent = secondsLeft;
}

// HOMEPAGE RENDERING //
function renderHome() {
    resetQuiz();
    // check if timer is initialized
    if (timerInterval) {
        stopTime();
    }

    mainEl.textContent = '';

    renderTitle('Coding Quiz Challenge');

    let par = document.createElement('p');
    par.textContent = 'Select a category below for the language you would like to take a quiz on. You will have 75 seconds to complete all 9 questions! At the end, enter your initials to be added to the leaderboard.';

    let categoryDiv = document.createElement('div');
    categoryDiv.classList.add('selection-div');

    let categoryLabel = document.createElement('label');
    categoryLabel.textContent = 'Select a Category:'

    let categorySelect = document.createElement('select');
    categorySelect.setAttribute('id', 'quiz-select')

    categorySelect.appendChild(createChoice('HTML Basics'));
    categorySelect.appendChild(createChoice('CSS Basics'));
    categorySelect.appendChild(createChoice('JavaScript Basics'));

    categoryDiv.appendChild(categoryLabel);
    categoryDiv.appendChild(categorySelect);

    let startButton = document.createElement('button');
    startButton.textContent = 'Start Quiz!';
    startButton.setAttribute('id', 'start-button');
    startButton.addEventListener('click', startQuiz);

    mainEl.appendChild(par);
    mainEl.appendChild(categoryDiv);
    mainEl.appendChild(startButton);
}

function createChoice(choiceName) {
    let choice = document.createElement('option');
    choice.textContent = choiceName;
    return choice;
}

// HIGHSCORE PAGE RENDERING
function renderScoreboard() {
    mainEl.textContent = '';
    resetQuiz();

    // check if timer is initialized
    if (timerInterval) {
        stopTime();
    }

    let scoreboard = JSON.parse(localStorage.getItem('scoreboard'));
    
    renderTitle('Leaderboard')

    if (!scoreboard) {
        let par = document.createElement('p');
        par.textContent = 'It looks like there are no high scores yet! Will you be the first one?'
        mainEl.appendChild(par);
       
        let button = document.createElement('button');
        button.textContent = 'Back to Home';
        button.addEventListener('click', renderHome);
        mainEl.appendChild(button)

        return
    }


    let playerUl = document.createElement('ul');
    playerUl.classList.add('scoreboard-list');

    for (let i = 0; i < scoreboard.length; i++) {
        let playerLi = document.createElement('li');
        playerLi.classList.add('scoreboard-item');
        playerLi.textContent = `${scoreboard[i].name} -- ${scoreboard[i].score}`;
        playerUl.appendChild(playerLi);
    }


    let homeButton = document.createElement('button');
    homeButton.textContent = 'Back to Home';
    homeButton.addEventListener('click', renderHome);

    let resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Highscores'
    resetButton.addEventListener('click', function() {
        localStorage.clear();
        renderScoreboard();
    });

    mainEl.appendChild(playerUl);
    mainEl.appendChild(homeButton);
    mainEl.appendChild(resetButton);
}

function addHighScore() {
    let scoreboard = JSON.parse(localStorage.getItem('scoreboard'));

    // validation of empty scoreboard
    if (scoreboard == null) {
        scoreboard = [];
    }

    let playerName = document.getElementById('initials-input').value.toUpperCase();
    let playerScore = secondsLeft;

    let player = {
        'name': playerName,
        'score': playerScore
    };

    // push player object onto localStorage array, then sort array highest to lowest
    scoreboard.push(player);                      
    scoreboard.sort((a, b) => b.score - a.score); 
    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
}

// QUIZ RENDERING + HANDLING

// sets questions based on home selection, starts timer, and prints the first question
function startQuiz() {
    setQuiz();
    mainEl.textContent = '';
    initializeTimer(); 
    renderQuestion();
}

// sets quizQuestions + quizAnswers as the chosen array
function setQuiz() {
    quizSelection = document.querySelector('#quiz-select').value;

    if (quizSelection === 'HTML Basics') {
        quizQuestions = JSON.parse(JSON.stringify(htmlQuestions));
        quizAnswers = JSON.parse(JSON.stringify(htmlAnswers));
    } else if (quizSelection === 'CSS Basics') {
        quizQuestions = JSON.parse(JSON.stringify(cssQuestions));
        quizAnswers = JSON.parse(JSON.stringify(cssAnswers));
    } else if (quizSelection === 'JavaScript Basics') {
        quizQuestions = JSON.parse(JSON.stringify(javascriptQuestions));
        quizAnswers = JSON.parse(JSON.stringify(javascriptAnswers));
    } else {
        quizQuestions = JSON.parse(JSON.stringify(questions));
        quizAnswers = JSON.parse(JSON.stringify(answers));
    }
}

function resetQuiz() {
    quizQuestions = null;
    quizAnswers = null;
    resetTimer();
}

function endQuiz() {
    if (secondsLeft < 0) {
        secondsLeft = 0;
        timerEl.textContent = secondsLeft;
    }
    stopTime();

    let affirmations = ['Keep it up, pal!', 'You\'re doing great!', 'I bet you could do this with your eyes closed!', 'I\'m sure everyone would be impressed if they saw you take this quiz!', 'Steve Jobs? Is that you?!', 'Excelsior!']

    let pageTitle = document.createElement('h1');
    pageTitle.textContent = 'Quiz Over!';

    let quizResults = document.createElement('p');
    quizResults.textContent = `You scored ${secondsLeft} points. ${affirmations[randomNumber(affirmations.length)]}`;

    let initialsPrompt = document.createElement('p');
    initialsPrompt.textContent = 'Please enter your initials:'
    initialsPrompt.classList.add('enter-initials')

    let initialsInput = document.createElement('input');
    initialsInput.classList.add('initials-input');
    initialsInput.setAttribute('id', 'initials-input');
    initialsInput.maxLength = 3;
    initialsInput.size = 4;

    let highscoreButton = document.createElement('button');
    highscoreButton.textContent = 'Go to Highscores';

    highscoreButton.addEventListener('click', function () {
        if (initialsInput.value) {
            addHighScore();
            resetQuiz();
            renderScoreboard();
        }
    })

    mainEl.textContent = '';

    mainEl.appendChild(pageTitle);
    mainEl.appendChild(quizResults);
    mainEl.appendChild(initialsPrompt);
    mainEl.appendChild(initialsInput);
    mainEl.appendChild(highscoreButton);
};

function renderQuestion() {
    // check if there are any remaining questions
    if (quizQuestions.length === 0) {
        return endQuiz();
    }

    mainEl.textContent = '';
    
    let card = document.createElement('div');
    card.classList.add('card');
    
    let icon = document.createElement('i');
    icon.classList.add('fas');
    icon.classList.add('fa-question-circle');
    icon.classList.add('fa-4x');
    card.appendChild(icon);

    // generate a random number based on the number of questions available
    randomNum = randomNumber(quizQuestions.length);

    card.appendChild(renderQuestionTitle(quizQuestions[randomNum]));

    let listOptions = document.createElement('ol');

    // print questions depending on how many there are for that question
    for (let i = 0; i < quizAnswers[randomNum].length; i++) {
        listOptions.appendChild(createAnswerChoice(randomNum, i));
    }

    card.appendChild(listOptions);

    mainEl.appendChild(card);
}

function createAnswerChoice(randomNum, index) {
    let answer = document.createElement('li');

    answer.classList.add('answer-choice');
    answer.addEventListener('click', checkAnswer);
    answer.textContent = quizAnswers[randomNum][index][0];
    answer.dataset.answer = quizAnswers[randomNum][index][1];

    return answer;
}

function checkAnswer() {
    // check to see if the answer is correct, then remove it from its array
    if (this.dataset.answer === 'true') {
        this.classList.add('correct');

        quizQuestions.splice(randomNum, 1);
        quizAnswers.splice(randomNum, 1);

        setTimeout(renderQuestion, 500);
    } else {
        // notify user of wrong answer, then add 15 second penalty
        if (!this.textContent.endsWith('❌')) {
            this.textContent = `${this.textContent} ❌`;
            secondsLeft -= 15;
        }
    }
}

// UTILITY
function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

function renderTitle(titleContent) {
    let title = document.createElement('h1');
    title.textContent = titleContent;
    title.classList.add('page-title');

    mainEl.appendChild(title);
}

function renderQuestionTitle(titleContent) {
    let title = document.createElement('h2');
    title.textContent = titleContent;
    title.classList.add('question-title');

    return title;
}