import generateId from '@visue/utils/identifier/generateId';
import Factory from 'src/Factory';
import TestService1 from './service/TestService1';
import TestService2 from './service/TestService2';

describe('Factory', () => {
  test('register', () => {
    const category = generateId();
    const type = generateId();
    const uuid = generateId();
    const factory = new Factory({ category });
    factory.register(type, TestService1, { singleton: true, singletonArgs: [{ uuid }] });
    const result1 = factory.get(type);
    expect(result1).toBeInstanceOf(TestService1);
    const result2 = factory.get(type);
    expect(result2).toBe(result1);
  });

  test('registerAll', () => {
    const category = generateId();
    const type1 = generateId();
    const type2 = generateId();
    const uuid = generateId();
    const factory = new Factory({ category });
    factory.registerAll([
      { type: type1, Class: TestService1, singleton: true, singletonArgs: [{ uuid }] },
      { type: type2, Class: TestService2 },
    ]);
    const result1 = factory.get(type1);
    expect(result1).toBeInstanceOf(TestService1);
    const result2 = factory.get(type2);
    expect(result2).toBeInstanceOf(TestService2);
  });
});
