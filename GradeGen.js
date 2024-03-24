// Prompts the user to enter the student's mark
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input the student mark between 0-100: ', (input) => {
  const marks = parseInt(input); // Converts input to integer
  console.log("Grade: " + calculateGrade(marks));
  rl.close();
});

// A function that returns the grade of the student
function calculateGrade(marks) {
  if (marks < 40) {
    return 'E';
  } else if (marks <= 49) {
    return 'D';
  } else if (marks <= 59) {
    return 'C';
  } else if (marks <= 79) {
    return 'B';
  } else {
    return 'A';
  }
}

