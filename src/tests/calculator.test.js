const { add, subtract, multiply, divide, calculate } = require('../calculator');

describe('calculator math operations', () => {
  test('adds numbers from the calculator example', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(10, 7)).toBe(17);
  });

  test('subtracts numbers from the calculator example', () => {
    expect(subtract(10, 4)).toBe(6);
    expect(subtract(8, 12)).toBe(-4);
  });

  test('multiplies numbers from the calculator example', () => {
    expect(multiply(45, 2)).toBe(90);
    expect(multiply(-6, 4)).toBe(-24);
  });

  test('divides numbers from the calculator example', () => {
    expect(divide(20, 5)).toBe(4);
    expect(divide(9, 3)).toBe(3);
    expect(divide(7, 2)).toBe(3.5);
  });

  test.each([
    ['add', 'add', 2, 3, 5],
    ['subtract', 'subtract', 10, 4, 6],
    ['multiply', 'multiply', 45, 2, 90],
    ['divide', 'divide', 20, 5, 4],
    ['add symbol', '+', 8, 2, 10],
    ['subtract symbol', '-', 9, 3, 6],
    ['multiply symbol', '*', 4, 6, 24],
    ['divide symbol', '/', 21, 7, 3],
  ])('calculate supports the %s operation', (_label, operation, a, b, expected) => {
    expect(calculate(operation, a, b)).toBe(expected);
  });
});

describe('calculator error handling', () => {
  test('throws an error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero.');
  });

  test('throws an error for unsupported operations', () => {
    expect(() => calculate('modulus', 10, 2)).toThrow('Unsupported operation');
  });

  test('throws a helpful error for invalid numeric input', () => {
    expect(() => calculate('add', 'abc', 2)).toThrow('Invalid first number');
  });
});
