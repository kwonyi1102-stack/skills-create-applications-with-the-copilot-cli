#!/usr/bin/env node

/**
 * CLI calculator for basic arithmetic operations.
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * - modulo
 * - exponentiation (power)
 * - square root
 *
 * Examples:
 * node src/calculator.js add 5 3
 * node src/calculator.js multiply 7 4
 * node src/calculator.js power 2 8
 * node src/calculator.js squareRoot 9
 */

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero.");
  }

  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero.");
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error("Cannot calculate square root of a negative number.");
  }

  return Math.sqrt(n);
}

function parseNumber(value, label) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new Error(`Invalid ${label}: "${value}". Please enter a valid number.`);
  }

  return number;
}

function validateNumericInput(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`Invalid ${label}: "${value}". Please enter a valid number.`);
  }
}

function calculate(operation, a, b) {
  if (typeof operation !== 'string' || operation.trim() === '') {
    throw new Error('Unsupported operation: "". Supported operations are add, subtract, multiply, divide, modulo, power, and squareRoot.');
  }

  const normalizedOperation = operation.toLowerCase();

  switch (normalizedOperation) {
    case "add":
    case "+":
      validateNumericInput(a, 'first number');
      validateNumericInput(b, 'second number');
      return add(a, b);
    case "subtract":
    case "-":
      validateNumericInput(a, 'first number');
      validateNumericInput(b, 'second number');
      return subtract(a, b);
    case "multiply":
    case "*":
      validateNumericInput(a, 'first number');
      validateNumericInput(b, 'second number');
      return multiply(a, b);
    case "divide":
    case "/":
      validateNumericInput(a, 'first number');
      validateNumericInput(b, 'second number');
      return divide(a, b);
    case "modulo":
    case "mod":
    case "%":
      validateNumericInput(a, 'first number');
      validateNumericInput(b, 'second number');
      return modulo(a, b);
    case "power":
    case "pow":
    case "^":
      validateNumericInput(a, 'first number');
      validateNumericInput(b, 'second number');
      return power(a, b);
    case "squareroot":
    case "sqrt":
      validateNumericInput(a, 'number');
      return squareRoot(a);
    default:
      throw new Error(`Unsupported operation: "${operation}". Supported operations are add, subtract, multiply, divide, modulo, power, and squareRoot.`);
  }
}

function printUsage() {
  console.log("Usage: node src/calculator.js <operation> <number1> [number2]");
  console.log("Supported operations: add, subtract, multiply, divide, modulo, power, squareRoot");
  console.log("Examples:");
  console.log("  node src/calculator.js add 5 3");
  console.log("  node src/calculator.js subtract 10 2");
  console.log("  node src/calculator.js multiply 4 6");
  console.log("  node src/calculator.js divide 21 3");
  console.log("  node src/calculator.js modulo 17 5");
  console.log("  node src/calculator.js power 2 8");
  console.log("  node src/calculator.js squareRoot 9");
}

if (require.main === module) {
  try {
    const [operation, leftValue, rightValue] = process.argv.slice(2);

    if (!operation) {
      printUsage();
      process.exit(1);
    }

    if (['squareroot', 'sqrt'].includes(operation.toLowerCase())) {
      if (!leftValue) {
        printUsage();
        process.exit(1);
      }

      const number = parseNumber(leftValue, 'number');
      const result = calculate(operation, number, undefined);
      console.log(`Result: ${result}`);
      process.exit(0);
    }

    if (!leftValue || !rightValue) {
      printUsage();
      process.exit(1);
    }

    const firstNumber = parseNumber(leftValue, "first number");
    const secondNumber = parseNumber(rightValue, "second number");
    const result = calculate(operation, firstNumber, secondNumber);

    console.log(`Result: ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    printUsage();
    process.exit(1);
  }
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
};
