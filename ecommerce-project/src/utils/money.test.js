import { it, expect, describe } from 'vitest'
import { formatMoney } from './money'

// this is test suite of unit test>> best practice is to always have test suite even when we only have one test
describe('formatMoney', () => {
  it('format 1999 cents as $19.99', () => {
    expect(formatMoney(1999)).toBe('$19.99')
  });
  it('display 2 decimals', () => {
    expect(formatMoney(1090)).toBe('$10.90');
    expect(formatMoney(100)).toBe('$1.00');
  })
});