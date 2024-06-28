import Factory from 'src/Factory';
import TestService1 from './service/TestService1';

describe('Creator', () => {
  test('register', () => {
    const factory = new Factory({ category: 'register' });
    factory.register(TestService1);
    const result = factory.get(TestService1.TYPE);
    expect(result).toBeInstanceOf(TestService1);
  });

  test('from', () => {
    const factory = new Factory({ category: 'from' });
    factory.register(TestService1);
    const result = factory.from(TestService1.TYPE);
    expect(result[0]).toBeInstanceOf(TestService1);
  });
});
