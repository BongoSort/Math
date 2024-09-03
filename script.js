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
    "(parseInt(userAnswer) === calculateResult(getQuestion())) " +
      (parseInt(userAnswer) === calculateResult(getQuestion()))
  );

  // Check if the user answer is correct
  if (parseInt(userAnswer) === calculateResult(getQuestion())) {
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
    case "5":
      return generateQuestionLevel5();
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

function generateQuestionLevel5() {
  console.log("generateQuestionLevel5 called");
  // Get the possible operators
  const operators = getOperators();
  // If only a single operator is chosen, generate hard question for that operator
  if (operators.length == 1) {
    switch (operators[0]) {
      case "+":
        return generateQuestionLevel5Plus();
      case "-":
        return generateQuestionLevel5Minus();
      case "*":
        return generateQuestionLevel5Multiply();
      case "/":
        return generateQuestionLevel5Divide();
    }
  } else {
    // If more operators are chosen, generate a combined operator question
    return generateQuestionLevel5Mixed();
  }
}

// Function to generate a dynamic plus operator question
// from: the lowest number in the range
// to: the highest number in the range
// numOfExps: the number of expressions in the question, default is 1
function generateQuestionPlus(from, to, numOfExps = 1) {
  let question = "";
  for (i = 0; i <= numOfExps; i++) {
    question += getRndInteger(from, to);
    if (i < numOfExps) {
      question += " + ";
    } else {
      question += " =";
    }
  }
  return question;
}

// Function to generate a level 1 plus operator question
function generateQuestionLevel1Plus() {
  return generateQuestionPlus(1, 10);
}
// Function to generate a level 2 plus operator question
function generateQuestionLevel2Plus() {
  return generateQuestionPlus(0, 20);
}

// Function to generate a level 3 plus operator question
function generateQuestionLevel3Plus() {
  return generateQuestionPlus(11, 50);
}

// Function to generate a level 4 plus operator question
function generateQuestionLevel4Plus() {
  if (getRndInteger(0, 1) == 0) {
    // Generate a question with one expression
    return generateQuestionPlus(11, 100, 1);
  } else {
    // Generate a question with two expressions
    return generateQuestionPlus(11, 50, 2);
  }
}

// Function to generate a level 5 plus operator question
function generateQuestionLevel5Plus() {
  if (getRndInteger(0, 1) == 0) {
    // Generate a question with two expressions
    return generateQuestionPlus(11, 100, 2);
  } else {
    // Generate a question with three expressions
    return generateQuestionPlus(11, 50, 3);
  }
}

// Function to generate a dynamic minus operator question, that guarantees to be non-negative
// from: the lowest number in the range
// to: the highest number in the range
function generateQuestionMinusEasy(from, to) {
  const num1 = getRndInteger(from, to);
  const num2 = getRndInteger(from, to);
  const question = `${num1} - ${num2} =`;
  if (calculateResult(question) < 0) {
    return `${num2} - ${num1} =`;
  } else {
    return question;
  }
}

// Function to generate a dynamic minus operator question, that can be negative
// from: the lowest number in the range
// to: the highest number in the range
// numOfExps: the number of expressions in the question, default is 1
function generateQuestionMinus(from, to, numOfExps = 1) {
  let question = "";
  for (i = 0; i <= numOfExps; i++) {
    question += getRndInteger(from, to);
    if (i < numOfExps) {
      question += " - ";
    } else {
      question += " =";
    }
  }
  return question;
}

// Function to generate a level 1 minus operator question
function generateQuestionLevel1Minus() {
  return generateQuestionMinusEasy(1, 10);
}

// Function to generate a level 2 minus operator question
function generateQuestionLevel2Minus() {
  return generateQuestionMinusEasy(0, 20);
}

// Function to generate a level 3 minus operator question
function generateQuestionLevel3Minus() {
  return generateQuestionMinus(11, 50);
}

// Function to generate a level 4 minus operator question
function generateQuestionLevel4Minus() {
  if (getRndInteger(0, 1) == 0) {
    return generateQuestionMinus(0, 100, 1);
  } else {
    return generateQuestionMinus(11, 50, 2);
  }
}

// Function to generate a level 5 minus operator question
function generateQuestionLevel5Minus() {
  if (getRndInteger(0, 1) == 0) {
    return generateQuestionMinus(11, 100, 2);
  } else {
    return generateQuestionMinus(11, 50, 3);
  }
}

// Function to generate a dynamic multiply operator question
// from: the lowest number in the range
// to: the highest number in the range
// numOfExps: the number of expressions in the question, default is 1
function generateQuestionMultiply(from, to, numOfExps = 1) {
  let question = "";
  for (i = 0; i <= numOfExps; i++) {
    question += getRndInteger(from, to);
    if (i < numOfExps) {
      question += " * ";
    } else {
      question += " =";
    }
  }
  return question;
}

// Function to generate a level 1 multiply operator question
function generateQuestionLevel1Multiply() {
  return generateQuestionMultiply(1, 10);
}

// Function to generate a level 2 multiply operator question
function generateQuestionLevel2Multiply() {
  return generateQuestionMultiply(0, 10);
}

// Function to generate a level 3 multiply operator question
function generateQuestionLevel3Multiply() {
  return generateQuestionMultiply(0, 20);
}

// Function to generate a level 4 multiply operator question
function generateQuestionLevel4Multiply() {
  return generateQuestionMultiply(3, 30);
}

// Function to generate a level 5 multiply operator question
function generateQuestionLevel5Multiply() {
  return generateQuestionMultiply(11, 50);
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
    // If we have tried 10 times, return a warning and a simple fraction, should not happen.
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

function generateQuestionLevel5Divide() {
  // Generate a calculatable fraction from the number
  return getCalculatableFractionFromRange(17, 120);
}

// Function to generate a level 5 question with mixed operators
function generateQuestionLevel5Mixed() {
  console.log("generateQuestionLevel5Mixed called");
  let questionFirstHalf = createFirstHalfOfQuestion();
  // temp cleanup
  questionFirstHalf = questionFirstHalf.replace("=", "");
  console.log("questionFirstHalf: ", questionFirstHalf);
  const questionSecondhalf = createSecondHalfOfQuestion();
  console.log("questionSecondhalf: ", questionSecondhalf);

  return `${questionFirstHalf} ${questionSecondhalf}`;
}

function createFirstHalfOfQuestion() {
  let operators = getOperators();
  console.log("operators: ", operators);
  // Choose a random math symbol from the chosen operators
  const operator = getRndOperator(operators);
  console.log("operator: ", operator);
  switch (operator) {
    case "+":
      return generateQuestionLevel4Plus();
    case "-":
      return generateQuestionLevel4Minus();
    case "*":
      return generateQuestionLevel4Multiply();
    case "/":
      return getCalculatableFractionFromRange(12, 100);
  }
}

function createSecondHalfOfQuestion() {
  let operators = getOperators();
  console.log("operators: ", operators);
  // Remove "/" from the operators for easier results
  operators = operators.filter((operator) => operator !== "/");
  // Choose a random math symbol from the chosen operators
  const operator = getRndOperator(operators);
  console.log("operator: ", operator);
  switch (operator) {
    case "+":
      return `+ ${getRndInteger(1, 10)} =`;
    case "-":
      return `- ${getRndInteger(1, 10)} =`;
    case "*":
      return `* ${getRndInteger(1, 10)} =`;
  }
}

// Calculate the result of the question
function calculateResult(question) {
  console.log("question in calculate result: ", question);
  // Trim the question string to remove any extra spaces
  const trimmedQuestion = question.trim();
  // Remove the "=" from the question
  const expression = trimmedQuestion.replace("=", "");
  // Evaluate the question using the eval function
  return eval(expression);
}

// Function to calculate the result of a fraction
function calculateFraction(fraction) {
  const trimmedFraction = fraction.trim();
  const expression = trimmedFraction.replace("=", "");
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
  console.log("questionText in newQuestion: ", questionText);
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

// Function to get the values of the checked checkboxes, guaranteeing at least one math sign
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
  console.log("Set Question called");
  console.log("question in set Q: ", question);
  document.getElementById("question").innerHTML = question;
}
