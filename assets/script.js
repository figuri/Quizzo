const quizContainer = document.getElementById("quiz-container");
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const resultsContainer = document.getElementById("results-container");

const quizData = [
  {
    question: "Who has scored the most points ever in an NBA career?",
    choices: ["LeBron James", "Michael Jordan", "Shaquille O'Neal", "Kareem Abdul-Jabbar"],
    correctAnswer: 0,
    userAnswer: null
  },
  {
    question: "Which NBA player has scored the most 3-point goals ever in a single game and a single season?",
    choices: ["Steve Nash", "Kobe Bryant", "Kevin Durant", "Stephen Curry"],
    correctAnswer: 3,
    userAnswer: null
  },
  {
    question: "Which NBA team has the most NBA championship wins of all time?",
    choices: ["LA Lakers", "GS Warriors", "HOU Rockets", "BOS Celtics"],
    correctAnswer: 3,
    userAnswer: null
  },
  {
    question: "Which former NBA champion holds the record for the most points scored in a single arena?",
    choices: ["Larry Bird", "Magic Johnson", "Kobe Bryant", "Bill Russell"],
    correctAnswer: 2,
    userAnswer: null
  },
];

const totalTime = 30;
let timeRemaining = totalTime;
let timerInterval;
let currentQuestionIndex = 0;

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
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  return `${padZero(minutes)}:${padZero(secondsRemaining)}`;
}

function padZero(number) {
  return number.toString().padStart(2, "0");
}

function endTest() {
  quizFinished = true;
  clearInterval(timerInterval);
  quizContainer.style.display = "none";
  saveScoreContainer.style.display = "block";
  resultsContainer.style.display = "none";
  
  let correctAnswers = 0;
  let wrongAnswers = 0;

  for (const question of quizData) {
    if (question.userAnswer === question.correctAnswer) {
      correctAnswers++;
    } else {
      wrongAnswers++;
    }
  }

  resultsContainer.innerHTML = `
    <h2>Quiz Results</h2>
    <p>Correct Answers: ${correctAnswers}</p>
    <p>Wrong Answers: ${wrongAnswers}</p>
  `;

  quizContainer.style.display = "none";
  resultsContainer.style.display = "block";
}

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  const questionElement = document.getElementById("question");
  const choicesContainer = document.getElementsByClassName("choice");

  questionElement.textContent = currentQuestion.question;

  for (let i = 0; i < choicesContainer.length; i++) {
    choicesContainer[i].textContent = currentQuestion.choices[i];
    choicesContainer[i].setAttribute("data-index", i);
  }
}

function handleChoiceClick(event) {
  const selectedChoice = event.target;
  const selectedChoiceIndex = parseInt(selectedChoice.getAttribute("data-index"));

  quizData[currentQuestionIndex].userAnswer = selectedChoiceIndex;

  handleNextButtonClick();
}

function handleNextButtonClick() {
  currentQuestionIndex++;

  if (currentQuestionIndex >= quizData.length) {
    clearInterval(timerInterval);
    endTest();
    return;
  }

  loadQuestion();
}

function initializeQuiz() {
  startButton.addEventListener("click", handleStartButtonClick);
  const choicesContainer = document.getElementsByClassName("choice");

  for (let i = 0; i < choicesContainer.length; i++) {
    choicesContainer[i].addEventListener("click", handleChoiceClick);
  }
}

function handleStartButtonClick() {
  startTimer();
  loadQuestion();
  startButton.disabled = true;
}

initializeQuiz();

const saveScoreContainer = document.getElementById("save-score-container");
const saveScoreButton = document.getElementById("save-score-button");
const goBackButton = document.getElementById("go-back-button");

saveScoreButton.addEventListener("click", handleSaveScore);
goBackButton.addEventListener("click", handleGoBack);

function handleSaveScore() {
  const initialsInput = document.getElementById("initials");
  const initials = initialsInput.value;
    saveScore(initials, correctAnswers);
    resetQuiz();
  }
  
  function handleGoBack() {
    saveScoreContainer.style.display = "none";
    resetQuiz();
  }

  