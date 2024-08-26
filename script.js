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
  // Add event listeners to checkboxes to trigger newQuestion on change
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", newQuestion);
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
    "(parseInt(userAnswer) === calculateResult()) " +
      (parseInt(userAnswer) === calculateResult())
  );

  // Check if the user answer is correct
  if (parseInt(userAnswer) === calculateResult()) {
    result.classList.remove("is-hidden");
    resultDiv.innerHTML = `Rigtigt, ${getQuestion()} ${userAnswer}`;
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
  // Get the level of the question
  const level = document.querySelector(
    'input[name="levelRadio"]:checked'
  ).value;
  switch (level) {
    case "1":
      return generateQuestionLevel1();
    case "2":
      return generateQuestionLevel2();
    case "3":
      return generateQuestionLevel3();
    case "4":
      return generateQuestionLevel4();
    default:
      return generateQuestionLevel1();
  }
}

// Function to generate a random level 1 question
function generateQuestionLevel1() {
  // Get the possible operators
  const operators = getOperators();
  console.log("operators: ", operators);
  // Generate a random math symbol from the chosen operators
  const operator = getRndOperator(operators);
  switch (operator) {
    case "+":
      return generateQuestionLevel1Plus();
    case "-":
      return generateQuestionLevel1Minus();
    case "*":
      return generateQuestionLevel1Multiply();
    case "/":
      return generateQuestionLevel1Divide();
  }
}
// Function to generate a random level 2 question
function generateQuestionLevel2() {
  // Get the possible operators
  const operators = getOperators();
  console.log("operators: ", operators);
  // Generate a random math symbol from the chosen operators
  const operator = getRndOperator(operators);
  switch (operator) {
    case "+":
      return generateQuestionLevel2Plus();
    case "-":
      return generateQuestionLevel2Minus();
    case "*":
      return generateQuestionLevel2Multiply();
    case "/":
      return generateQuestionLevel2Divide();
  }
}

function generateQuestionLevel3() {
  // Get the possible operators
  const operators = getOperators();
  console.log("operators: ", operators);
  // Generate a random math symbol from the chosen operators
  const operator = getRndOperator(operators);
  switch (operator) {
    case "+":
      return generateQuestionLevel3Plus();
    case "-":
      return generateQuestionLevel3Minus();
    case "*":
      return generateQuestionLevel3Multiply();
    case "/":
      return generateQuestionLevel3Divide();
  }
}

function generateQuestionLevel4() {
  // Get the possible operators
  const operators = getOperators();
  console.log("operators: ", operators);
  // Generate a random math symbol from the chosen operators
  const operator = getRndOperator(operators);
  switch (operator) {
    case "+":
      return generateQuestionLevel4Plus();
    case "-":
      return generateQuestionLevel4Minus();
    case "*":
      return generateQuestionLevel4Multiply();
    case "/":
      return generateQuestionLevel4Divide();
  }
}

// Function to generate a level 1 plus operator question
function generateQuestionLevel1Plus() {
  // Generate a random number between 1 and 10
  const num1 = getRndInteger(1, 10);
  // Generate another random number between 1 and 10
  const num2 = getRndInteger(1, 10);
  return `${num1} + ${num2} =`;
}
// Function to generate a level 2 plus operator question
function generateQuestionLevel2Plus() {
  // Generate a random number between 0 and 20
  const num1 = getRndInteger(0, 20);
  // Generate another random number between 0 and 20
  const num2 = getRndInteger(0, 20);
  // Generate the question text
  return `${num1} + ${num2} =`;
}

function generateQuestionLevel3Plus() {
  // Generate a random number between 11 and 50
  const num1 = getRndInteger(11, 50);
  // Generate another random number between 11 and 50
  const num2 = getRndInteger(11, 50);
  return `${num1} + ${num2} =`;
}

function generateQuestionLevel4Plus() {
  if (getRndInteger(0, 1) == 0) {
    // Generate a random number between 11 and 100
    const num1 = getRndInteger(11, 100);
    // Generate another random number between 11 and 100
    const num2 = getRndInteger(11, 100);
    return `${num1} + ${num2} =`;
  } else {
    const num1 = getRndInteger(11, 50);
    const num2 = getRndInteger(11, 50);
    const num3 = getRndInteger(11, 50);
    return `${num1} + ${num2} + ${num3} =`;
  }
}

// Function to generate a level 1 minus operator question
function generateQuestionLevel1Minus() {
  // Generate a random number between 1 and 10
  const num1 = getRndInteger(1, 10);
  // Generate another random number between 1 and 10
  const num2 = getRndInteger(1, 10);
  const question = `${num1} - ${num2} =`;
  if (calculateResult(question) < 0) {
    return `${num2} - ${num1} =`;
  } else {
    return question;
  }
}

// Function to generate a level 2 minus operator question
function generateQuestionLevel2Minus() {
  // Generate a random number between 0 and 20
  const num1 = getRndInteger(0, 20);
  // Generate another random number between 0 and 20
  const num2 = getRndInteger(0, 20);
  const question = `${num1} - ${num2} =`;
  // To aviod negative results, we switch the numbers if the result is negative
  if (calculateResult(question) < 0) {
    return `${num2} - ${num1} =`;
  } else {
    return question;
  }
}

function generateQuestionLevel3Minus() {
  // Generate a random number between 0 and 20
  const num1 = getRndInteger(0, 20);
  // Generate another random number between 0 and 20
  const num2 = getRndInteger(0, 20);
  // Now we allow negative results
  return `${num1} - ${num2} =`;
}

function generateQuestionLevel4Minus() {
  if (getRndInteger(0, 1) == 0) {
    // Generate a random number between 0 and 100
    const num1 = getRndInteger(0, 100);
    // Generate another random number between 0 and 100
    const num2 = getRndInteger(0, 100);
    return `${num1} - ${num2} =`;
  } else {
    const num1 = getRndInteger(11, 50);
    const num2 = getRndInteger(11, 50);
    const num3 = getRndInteger(11, 50);
    return `${num1} - ${num2} - ${num3} =`;
  }
}

// Function to generate a level 1 multiply operator question
function generateQuestionLevel1Multiply() {
  // Generate a random number between 1 and 10
  const num1 = getRndInteger(1, 10);
  // Generate another random number between 1 and 10
  const num2 = getRndInteger(1, 10);
  return `${num1} * ${num2} =`;
}

// Function to generate a level 2 multiply operator question
function generateQuestionLevel2Multiply() {
  // Generate a random number between 0 and 10
  const num1 = getRndInteger(0, 10);
  // Generate another random number between 0 and 10
  const num2 = getRndInteger(0, 10);
  // Generate the question text
  return `${num1} * ${num2} =`;
}

function generateQuestionLevel3Multiply() {
  // Generate a random number between 0 and 10
  const num1 = getRndInteger(0, 10);
  // Generate another random number between 0 and 10
  const num2 = getRndInteger(11, 20);
  // Generate the question text
  return `${num1} * ${num2} =`;
}

function generateQuestionLevel4Multiply() {
  // Generate a random number between 3 and 20
  const num1 = getRndInteger(3, 20);
  // Generate another random number between 11 and 20
  const num2 = getRndInteger(11, 30);
  // Generate the question text
  return `${num1} * ${num2} =`;
}

// Function to generate a level 1 divide operator question
function generateQuestionLevel1Divide() {
  // Generate an easy calculatable fraction
  const num1 = getRndInteger(1, 10);
  const factors = [];
  for (let i = 1; i <= num1; i++) {
    if (num1 % i === 0) {
      factors.push(i);
    }
  }
  num2 = factors[getRndInteger(0, factors.length - 1)];
  return `${num1} / ${num2} =`;
}

// Function to generate a level 2 divide operator question
function generateQuestionLevel2Divide() {
  // Generate an calculatable fraction
  const num1 = getRndInteger(0, 20);
  const factors = [];
  // We allow 0 to be the numerator
  if (num1 === 0) {
    const num2 = getRndInteger(1, 20);
    return `${num1} / ${num2} =`;
  }
  for (let i = 1; i <= num1; i++) {
    if (num1 % i === 0) {
      factors.push(i);
    }
  }
  const num2 = factors[getRndInteger(0, factors.length - 1)];
  return `${num1} / ${num2} =`;
}

// Function to generate a level 3 divide operator question
function generateQuestionLevel3Divide() {
  // Generate a calculatable fraction from the number
  return getCalculatableFractionFromRange(12, 50);
}

// Function to generate a calculatable fraction from the range given
function getCalculatableFractionFromRange(from, to, tries = 0) {
  const num = getRndInteger(from, to);
  const factors = [];
  for (let i = 2; i <= num; i++) {
    if (num % i === 0) {
      factors.push(i);
    }
  }
  // Remove the very easy fractions
  console.log("factors length: ", factors.length);
  factors.pop();
  factors.shift();
  if (factors.length === 0) {
    tries++;
    if (tries > 9) {
      console.log("Warning, tries > 9");
      return `1 / 2 =`;
    }
    return getCalculatableFractionFromRange(from, to, tries);
  } else {
    num2 = factors[getRndInteger(0, factors.length - 1)];
    return `${num} / ${num2} =`;
  }
}

// Function to generate a level 4 divide operator question
function generateQuestionLevel4Divide() {
  // Generate a calculatable fraction from the number
  return getCalculatableFractionFromRange(12, 100);
}

// Calculate the result of the question
function calculateResult() {
  const question = getQuestion();
  // Trim the question string to remove any extra spaces
  const trimmedQuestion = question.trim();
  // Remove the "=" from the question
  const expression = trimmedQuestion.replace("=", "");
  // Evaluate the question using the eval function
  return eval(expression);
}

// Function to get a random operator fom the list of operators
function getRndOperator(operators) {
  return operators[Math.floor(Math.random() * operators.length)];
}

// Function to generate a new question and update the UI
function newQuestion() {
  const questionText = generateQuestion();
  // Set the question text in the UI
  setQuestion(questionText);
  // Log the correct answer to the console for now
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
  let values = [];
  // Loop through NodeList of checkboxes and add their values to the array
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      values.push(checkbox.value);
    }
  });
  console.log("values: ", values);
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

function getQuestion() {
  return document.getElementById("question").innerHTML;
}

function setQuestion(question) {
  document.getElementById("question").innerHTML = question;
}
