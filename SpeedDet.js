// Prompts the user for an input
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input the car speed: ', (input) => {
  const speed = parseInt(input); // Converts input to integer
  console.log(speedDet(speed));
  rl.close();
});

// Function to determine the fine
function speedDet(speed){
    if (speed < 70){
        return 'Ok'
    } else {
        let points = (speed - 70)/5
            if (points > 12){
                return 'License Suspended'
            } else {
                return `Points: ${points}`
            }
    }
}
