// Prompts the user for gross salary, pension, and mortgage input
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Input your gross salary: ", (salary) => {
  const grossSalary = parseInt(salary); // Converts input to integer
  console.log("NHIF:", calculateNHIF(grossSalary));

  rl.question("Input your monthly personal pension contribution: ", (pens) => {
    const persPension = parseInt(pens); // Converts input to integer
    const pension = calcPension(persPension, grossSalary);

    rl.question("Input your monthly mortgage interest: ", (mortgage) => {
      const mortgageInterest = parseInt(mortgage);
      const taxableIncome = calcTaxableIncome(persPension, grossSalary, mortgageInterest, calcPension);

      rl.question("Input your monthly insurance premium: ", (premium) => {
        const insurancePremium = parseInt(premium);
        const insRelief = calcInsRelief(insurancePremium);
        const paye = calcPaye(taxableIncome, insRelief)

        // Prints out the outputs
        console.log("Gross Salary:", grossSalary);
        console.log("Monthly Pension Contribution:", persPension);
        console.log("Monthly mortgage interest:", mortgageInterest);
        console.log("Monthly insurance premium:", insurancePremium);
        console.log("Insurance Relief:", insRelief);
        console.log("Pension:", pension);
        console.log("Taxable Income:", taxableIncome);
        console.log("Paye:", paye)
        rl.close(); // Close the readline interface
      });
    });
  });
});

// A function that calculates the NHIF amount
function calculateNHIF(grossSalary) {
  if (grossSalary < 5999) {
    return 150;
  } else if (grossSalary < 7999) {
    return 300;
  } else if (grossSalary < 11999) {
    return 400;
  } else if (grossSalary < 14999) {
    return 500;
  } else if (grossSalary < 19999) {
    return 600;
  } else if (grossSalary < 24999) {
    return 750;
  } else if (grossSalary < 29999) {
    return 850;
  } else if (grossSalary < 34999) {
    return 900;
  } else if (grossSalary < 39999) {
    return 950;
  } else if (grossSalary < 44999) {
    return 1000;
  } else if (grossSalary < 49999) {
    return 1100;
  } else if (grossSalary < 59999) {
    return 1200;
  } else if (grossSalary < 69999) {
    return 1300;
  } else if (grossSalary < 79999) {
    return 1400;
  } else if (grossSalary < 89999) {
    return 1500;
  } else if (grossSalary < 99999) {
    return 1600;
  } else {
    return 1700;
  }
}

// The PAYE is calculated on gross income minus the pension contribution and the mortgage interest
// Function to calculate the taxable income
function calcTaxableIncome(persPension, grossSalary, mortgageInterest, calcPension) {
  const pension = calcPension(persPension, grossSalary);
  if (pension > 20000) {
    const taxableIncome = grossSalary - mortgageInterest - 20000;
    return taxableIncome;
  } else {
    const taxableIncome = grossSalary - mortgageInterest - pension;
    return taxableIncome;
  }
}

// Function to calculate the PAYE
function calcPaye(taxableIncome, insRelief) {
  if (taxableIncome <= 24000) {
    return 0.1 * taxableIncome - (insRelief - 2400); //2400 is the personal relief
  } else if (taxableIncome <= 32333) {
    return 0.25 * taxableIncome - (insRelief - 2400);
  } else if (taxableIncome <= 500000) {
    return 0.3 * taxableIncome - (insRelief - 2400);
  } else if (taxableIncome <= 800000) {
    return 0.325 * taxableIncome - (insRelief - 2400);
  } else {
    return 0.35 * taxableIncome - (insRelief - 2400);
  }
}

// A function that calculates the pension amount, personal contribution plus the NSSF
function calcPension(persPension, grossSalary) {
  const nssf = 0.06 * grossSalary; // calculates the nssf
  const pension = persPension + nssf;
  return pension;
}

// A function that calculates the relief amounts
function calcInsRelief(insurancePremium) {
  const insRelief = 0.15 * insurancePremium;
  return insRelief;
}

// A function that returns the net pay
function calcNetPay(grossSalary, calcPaye, calculateNHIF) {
    const nhif = calculateNHIF(grossSalary)
    const paye = calcPaye(calcTaxableIncome, calcInsRelief);
    const netPay = grossSalary - paye - nhif;
    console.log("Net Pay:", netPay);
}

