var basketballQuiz = [
    {
        question: "Who has scored the most points ever in an nba career",
        choices: ["Lebron James", "Micheal Jordan", "Shaquille Oneal", "Kareem Abdul Jabbar"],
        correctAnswer: 0,
        userAnswer: null
    },
    {
        question: "Which Nba player has scored the most 3 point goals ever in a single game and a single season",
        choices: ["Steve Nash", "Kobe Bryant", "Kevin Durant", "Stephen Curry"],
        correctAnswer: 3,
        userAnswer: null
    },
    {
        question: "Which Nba team has the most Nba championship wins of all time",
        choices: ["LA Lakers", "GS Warriors", "HOU Rockets", "BOS Celtics"],
        correctAnswer: 3,
        userAnswer: null
    },
    {
        question: "Which former Nba Champion holds the record for the most points scored in a single Arena",
        choices: ["Larry Bird", "Magic Johnson", "Kobe Bryant", "Bill Russel"],
        correctAnswer: 2,
        userAnswer: null
    },
];

const quizContainer = document.getElementById("test");
const timerContainer = document.getElementById("timer");
const startButton = document.getElementById("start-button");

const totalTime = 30;
let timeRemaining = totalTime;
let timerInterval;

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timeRemaining > 0) {
        timeRemaining--;
        timerElement.textContent = formatTime(timeRemaining);
    } else {
        clearInterval(timerInterval);
        endTest();
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 30);
    const secondsRemaining = seconds % 30;
    return `${padZero(minutes)}:${padZero(secondsRemaining)}`;
}