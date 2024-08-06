// Variables to store the question text and correct answer
let questionText;
let correctAnswer;

// Set up the initial question and answer
document.addEventListener('DOMContentLoaded', (event) => {
  // Generate a new question
  newQuestion();
  // Add event listeners to the input field
  document.getElementById('submitButton').addEventListener('click', checkAnswer);
  document.getElementById('answer').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  });
  // Add event listener to the new question button
  document.getElementById('newQuestionButton').addEventListener('click', newQuestion);
});

// Function to check the answer
function checkAnswer() {
  // Get the user input
  const userAnswer = document.getElementById('answer').value;

  // Get the result div to display the result
  const resultDiv = document.getElementById('result');

  // Check if the user answer is correct
  if (parseInt(userAnswer) === correctAnswer) {
      resultDiv.innerHTML = 'Rigtigt!';
      resultDiv.style.color = 'green';
  } else {
      resultDiv.innerHTML = 'Forkert, prøv igen!';
      resultDiv.style.color = 'red';
  }
};

// Function to generate a random question
function generateQuestion() {
  // Generate a random number between 1 and 10
  const num1 = getRndInteger(1,10);
  // Generate another random number between 1 and 10
  const num2 = getRndInteger(1,10);
  // Generate a math symbol randomly
  const symbols = ['+', '-'];
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  // Generate the question text
  return `${num1} ${symbol} ${num2}`;
}


// Function to generate a new question and update the UI
function newQuestion() {
  questionText = generateQuestion();
  correctAnswer = generateAnswer();
  document.getElementById('question').textContent = questionText;
  document.getElementById('answer').value = '';
  document.getElementById('result').innerHTML = '';
}

// Calculates the answer based on the question text 
function generateAnswer() {
  // Split the question text based on the space character
  const parts = questionText.split(' ');
  // Get the first number
  const num1 = parseInt(parts[0]);
  // Get the math symbol
  const symbol = parts[1];
  // Get the second number
  const num2 = parseInt(parts[2]);
  // Calculate the answer based on the symbol
  switch (symbol) {
      case '+':
          return num1 + num2;
      case '-':
          return num1 - num2;
      default:
          return null;
  }
}

// Function to generate a random integer between min and max, both inclusive
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}