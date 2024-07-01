import Product from 'src/Product';
import registry from 'src/Registry';

@Product('test', 'test1')
class Product1 {}

@Product('test', 'test2', ['TEST_2', 'test-2'])
class Product2 {}

describe('Product', () => {
  test('type', () => {
    const result = registry.resolve('test', 'test1');
    expect(result).toBe(Product1);
  });

  test('type & alts', () => {
    const result1 = registry.resolve('test', 'test2');
    expect(result1).toBe(Product2);
    const result2 = registry.resolve('test', 'TEST_2');
    expect(result2).toBe(Product2);
    const result3 = registry.resolve('test', 'test-2');
    expect(result3).toBe(Product2);
  });
});
