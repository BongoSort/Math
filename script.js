document.getElementById('submitButton').addEventListener('click', function() {
  // Get the user input
  const userAnswer = document.getElementById('answer').value;

  // The correct answer for the statement "1 + 1"
  const correctAnswer = 2;

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
});
