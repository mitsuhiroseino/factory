import generateId from '@visue/utils/identifier/generateId';
import Factory from 'src/Factory';
import TestProduct1 from './products/TestProduct1';
import TestProduct2 from './products/TestProduct2';

describe('Factory', () => {
  test('constructor', () => {
    const category = generateId();
    const type1 = generateId();
    const type2 = generateId();
    const uuid = generateId();
    const factory = new Factory({
      category,
      products: [
        { type: type1, Class: TestProduct1, singleton: true, singletonArgs: [{ uuid }] },
        { type: type2, Class: TestProduct2 },
      ],
    });
    const result1 = factory.get(type1);
    expect(result1).toBeInstanceOf(TestProduct1);
    const result2 = factory.get(type2);
    expect(result2).toBeInstanceOf(TestProduct2);
  });

  test('register', () => {
    const category = generateId();
    const type = generateId();
    const uuid = generateId();
    const factory = new Factory({ category });
    factory.register(type, TestProduct1, { singleton: true, singletonArgs: [{ uuid }] });
    const result1 = factory.get(type);
    expect(result1).toBeInstanceOf(TestProduct1);
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
      { type: type1, Class: TestProduct1, singleton: true, singletonArgs: [{ uuid }] },
      { type: type2, Class: TestProduct2 },
    ]);
    const result1 = factory.get(type1);
    expect(result1).toBeInstanceOf(TestProduct1);
    const result2 = factory.get(type2);
    expect(result2).toBeInstanceOf(TestProduct2);
  });

  test('get', () => {
    const category = generateId();
    const type = generateId();
    const uuid = generateId();
    const factory = new Factory({ category });
    factory.register(type, TestProduct1, { singleton: true, singletonArgs: [{ uuid }] });
    const result1 = factory.get(type);
    expect(result1).toBeInstanceOf(TestProduct1);
    const result2 = factory.get(type);
    expect(result2).toBe(result1);
  });

  test('from', () => {
    const category = generateId();
    const type1 = generateId();
    const type2 = generateId();
    const uuid = generateId();
    const factory = new Factory({ category });
    factory.registerAll([
      { type: type1, Class: TestProduct1, singleton: true, singletonArgs: [{ uuid }] },
      { type: type2, Class: TestProduct2 },
    ]);
    const result = factory.from([type1, type2]);
    expect(result[0]).toBeInstanceOf(TestProduct1);
    expect(result[1]).toBeInstanceOf(TestProduct2);
  });

  test('create', () => {
    const category = generateId();
    const type = generateId();
    const uuid1 = generateId();
    const uuid2 = generateId();
    const factory = new Factory({ category });
    factory.register(type, TestProduct1);
    const result1: TestProduct1 = factory.create(type, [{ uuid: uuid1 }]);
    expect(result1).toBeInstanceOf(TestProduct1);
    expect(result1.uuid).toBe(uuid1);
    const result2: TestProduct1 = factory.create(type, [{ uuid: uuid2 }]);
    expect(result2).toBeInstanceOf(TestProduct1);
    expect(result2.uuid).toBe(uuid2);
  });

  test('has', () => {
    const category = generateId();
    const type = generateId();
    const uuid = generateId();
    const factory = new Factory({ category });
    factory.register(type, TestProduct1, { singleton: true, singletonArgs: [{ uuid }] });
    const result1 = factory.has(type);
    expect(result1).toBe(true);
    const result2 = factory.has('abc');
    expect(result2).toBe(false);
  });
});
