// Variables to store the question text and correct answer
let questionText;

// Set up the initial question and answer
document.addEventListener("DOMContentLoaded", () => {
  // Generate a new question
  newQuestion();

  // Add event listeners to the input field
  document
    .getElementById("submitButton")
    .addEventListener("click", checkAnswer);
  document
    .getElementById("answer")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        checkAnswer();
      }
    });

  // Add event listener to the new question button
  document
    .getElementById("newQuestionButton")
    .addEventListener("click", newQuestion);
  // Add event listeners to radio buttons to trigger newQuestion on change
  document.querySelectorAll('input[name="levelRadio"]').forEach((radio) => {
    radio.addEventListener("change", newQuestion);
  });
});

// Function to check the answer
function checkAnswer() {
  console.log("checkAnswer called");
  // Get the user input
  const userAnswer = document.getElementById("answer").value;
  if (userAnswer.trim() === "") {
    return;
  }
  // Get the result div to display the result
  const resultDiv = document.getElementById("result");

  console.log(
    "(parseInt(userAnswer) === resultOfQuestion(questionText)) " +
      (parseInt(userAnswer) === calculateResult(questionText))
  );

  // Check if the user answer is correct
  if (parseInt(userAnswer) === calculateResult(questionText)) {
    result.classList.remove("is-hidden");
    resultDiv.innerHTML = `Rigtigt, ${questionText} ${userAnswer}`;
    resultDiv.style.color = "green";
    // and then generate a new question
    newQuestion();
  } else {
    result.classList.remove("is-hidden");
    resultDiv.innerHTML = `Forkert, ${userAnswer} er ikke det rigtige svar.`;
    resultDiv.style.color = "red";
    clearInputField();
  }
}

// Function to generate a random question
function generateQuestion() {
  const operators = getOperators();
  console.log("operators: ", operators);

  // Get the level of the question
  const level = document.querySelector(
    'input[name="levelRadio"]:checked'
  ).value;
  switch (level) {
    case "1":
      return generateQuestion1();
    case "2":
      return generateQuestion2();
    case "3":
      return generateQuestion3();
    default:
      return generateQuestion1();
  }
}

// TODO fix for / og *
// Function to generate a random level 1 question
function generateQuestion1() {
  // Get the possible operators
  const operators = getOperators();
  console.log("operators: ", operators);
  // Generate a random math symbol from the chosen operators
  const operator = getRndOperator(operators);
  switch (operator) {
    case "+":
      question = generateQuestionPlus1();
    case "-":
      generateQuestionMinus1();
    case "*":
      generateQuestionMultiply1();
    case "/":
      generateQuestionDivide1();
  }
}

// Function to generate a random level 1 question
function generateQuestionPlus1() {
  // Generate a random number between 1 and 10
  const num1 = getRndInteger(1, 10);
  // Generate another random number between 1 and 10
  const num2 = getRndInteger(1, 10);

  return `${num1} + ${num2} =`;
}

// Function to generate a random level 1 question
function generateQuestionMinus1() {
  // Generate a random number between 1 and 10
  const num1 = getRndInteger(1, 10);
  // Generate another random number between 1 and 10
  const num2 = getRndInteger(1, 10);
  if (calculateResult(question) < 0) {
    return `${num2} - ${num1} =`;
  } else {
    return `${num1} - ${num2} =`;
  }
}

function generateQuestionMultiply1() {
  // Generate a random number between 1 and 10
  const num1 = getRndInteger(1, 10);
  // Generate another random number between 1 and 10
  const num2 = getRndInteger(1, 10);

  return `${num1} * ${num2} =`;
}

// Function to generate a random level 2 question
function generateQuestion2() {
  // Generate a random number between 0 and 20
  const num1 = getRndInteger(0, 20);
  // Generate another random number between 0 and 20
  const num2 = getRndInteger(0, 20);
  // Generate a math symbol randomly
  const symbols = ["+", "-"];
  const symbol = getRndOperator(symbols);
  const eq = "=";
  // Generate the question text
  const question = `${num1} ${symbol} ${num2} ${eq}`;
  // To aviod negative results, we switch the numbers if the result is negative
  if (calculateResult(question) < 0) {
    return `${num2} ${symbol} ${num1} ${eq}`;
  } else {
    return question;
  }
}

// Function to generate a random level 3 question
function generateQuestion3() {
  // Generate a math symbol randomly
  const symbols = ["+", "-", "*", "/"];
  const symbol = getRndOperator(symbols);
  // Generate a random number between 0 and 1
  let num1;
  let num2;
  console.log(getRndInteger(1, 50));
  switch (symbol) {
    case "/":
      console.log("divi");
      // Generate an easy calculatable fraction
      num1 = getRndInteger(1, 10);
      const factors = [];
      for (let i = 1; i <= num1; i++) {
        if (num1 % i === 0) {
          factors.push(i);
        }
      }
      num2 = factors[getRndInteger(0, factors.length - 1)];
      break;
    case "*":
      console.log("multi");
      num1 = getRndInteger(0, 10);
      num2 = getRndInteger(0, 10);
      break;
    case "+":
      console.log("plus");
      num1 = getRndInteger(1, 25);
      num2 = getRndInteger(1, 25);
      break;
    case "-":
      console.log("minus");
      num1 = getRndInteger(0, 20);
      num2 = getRndInteger(0, 20);
      break;
  }

  const eq = "=";
  // Generate the question text
  const question = `${num1} ${symbol} ${num2} ${eq}`;
  // To aviod negative results, we switch the numbers if the result is negative
  if (calculateResult(question) < 0) {
    return `${num2} ${symbol} ${num1} ${eq}`;
  } else {
    return question;
  }
}

function calculateResult(question) {
  // Split the question text based on the space character
  const parts = question.split(" ");
  // Get the first number
  const num1 = parseInt(parts[0]);
  // Get the math symbol
  const symbol = parts[1];
  // Get the second number
  const num2 = parseInt(parts[2]);
  // Calculate the answer based on the symbol
  switch (symbol) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      if (num2 === 0) {
        //TODO: handle division by zero
        return num1 / 1;
      }
      return num1 / num2;
    default:
      return "???";
  }
}

// Function to get a random operator fom the list of operators
function getRndOperator(operators) {
  return operators[Math.floor(Math.random() * operators.length)];
}

// Function to generate a new question and update the UI
function newQuestion() {
  questionText = generateQuestion();

  // Update the question element with the question text
  document.getElementById("question").innerHTML = questionText;

  // Log the correct answer to the console
  console.log("correctAnswer " + calculateResult(questionText));
  // Clear the input field
  clearInputField();
}

// Function to clear the input field
function clearInputField() {
  document.getElementById("answer").value = "";
}

// Function to generate a random integer between min and max, both inclusive
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getOperators() {
  // Get the checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  // Get the values of the checkboxes
  values = [];
  // Loop through NodeList of checkboxes and add their values to the array
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      values.push(checkbox.value);
    }
  });
  // Make sure there are at least one mathsign
  if (values.length === 0) {
    values.push("+");
    // Show that the plus checkbox is checked
    document.getElementById("plus").checked = true;
  }
  // Print the array of values or do something with it
  console.log("Checked values: ", values);
  return values;
}
