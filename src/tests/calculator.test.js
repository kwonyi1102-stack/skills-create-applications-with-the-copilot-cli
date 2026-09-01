const { add, subtract, multiply, divide, modulo, power, squareRoot, calculate } = require('../calculator');

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

  test('computes modulo and power and root values', () => {
    expect(modulo(17, 5)).toBe(2);
    expect(power(2, 8)).toBe(256);
    expect(squareRoot(9)).toBe(3);
  });

  test.each([
    ['add', 'add', 2, 3, 5],
    ['subtract', 'subtract', 10, 4, 6],
    ['multiply', 'multiply', 45, 2, 90],
    ['divide', 'divide', 20, 5, 4],
    ['modulo', 'modulo', 17, 5, 2],
    ['power', 'power', 2, 8, 256],
    ['square root', 'squareRoot', 9, undefined, 3],
    ['add symbol', '+', 8, 2, 10],
    ['subtract symbol', '-', 9, 3, 6],
    ['multiply symbol', '*', 4, 6, 24],
    ['divide symbol', '/', 21, 7, 3],
    ['modulo symbol', '%', 17, 5, 2],
    ['power symbol', '^', 3, 4, 81],
  ])('calculate supports the %s operation', (_label, operation, a, b, expected) => {
    if (operation === 'squareRoot') {
      expect(calculate(operation, a, undefined)).toBe(expected);
      return;
    }

    expect(calculate(operation, a, b)).toBe(expected);
  });
});

describe('calculator error handling', () => {
  test('throws an error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero.');
    expect(() => modulo(10, 0)).toThrow('Cannot divide by zero.');
  });

  test('throws an error when square root is calculated for a negative number', () => {
    expect(() => squareRoot(-4)).toThrow('Cannot calculate square root of a negative number.');
  });

  test('throws an error for unsupported operations', () => {
    expect(() => calculate('modulus', 10, 2)).toThrow('Unsupported operation');
  });

  test('throws a helpful error for invalid numeric input', () => {
    expect(() => calculate('add', 'abc', 2)).toThrow('Invalid first number');
  });
});
