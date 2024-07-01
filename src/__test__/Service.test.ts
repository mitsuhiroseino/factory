import registry from 'src/Registry';
import Service from 'src/Service';

@Service('test', 'test1')
class Service1 {}

@Service('test', 'test2', ['TEST_2', 'test-2'])
class Service2 {}

describe('Service', () => {
  test('type', () => {
    const result = registry.resolve('test', 'test1');
    expect(result).toBe(Service1);
  });

  test('type & alts', () => {
    const result1 = registry.resolve('test', 'test2');
    expect(result1).toBe(Service2);
    const result2 = registry.resolve('test', 'TEST_2');
    expect(result2).toBe(Service2);
    const result3 = registry.resolve('test', 'test-2');
    expect(result3).toBe(Service2);
  });
});
