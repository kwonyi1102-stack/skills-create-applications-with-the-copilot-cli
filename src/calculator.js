#!/usr/bin/env node

/**
 * CLI calculator for basic arithmetic operations.
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 *
 * Examples:
 * node src/calculator.js add 5 3
 * node src/calculator.js multiply 7 4
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
    throw new Error('Unsupported operation: "". Supported operations are add, subtract, multiply, and divide.');
  }

  validateNumericInput(a, 'first number');
  validateNumericInput(b, 'second number');

  const normalizedOperation = operation.toLowerCase();

  switch (normalizedOperation) {
    case "add":
    case "+":
      return add(a, b);
    case "subtract":
    case "-":
      return subtract(a, b);
    case "multiply":
    case "*":
      return multiply(a, b);
    case "divide":
    case "/":
      return divide(a, b);
    default:
      throw new Error(`Unsupported operation: "${operation}". Supported operations are add, subtract, multiply, and divide.`);
  }
}

function printUsage() {
  console.log("Usage: node src/calculator.js <operation> <number1> <number2>");
  console.log("Supported operations: add, subtract, multiply, divide");
  console.log("Examples:");
  console.log("  node src/calculator.js add 5 3");
  console.log("  node src/calculator.js subtract 10 2");
  console.log("  node src/calculator.js multiply 4 6");
  console.log("  node src/calculator.js divide 21 3");
}

if (require.main === module) {
  try {
    const [operation, leftValue, rightValue] = process.argv.slice(2);

    if (!operation || !leftValue || !rightValue) {
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
  calculate,
};
