import generateId from '@visue/utils/identifier/generateId';
import creator from 'src/Creator';
import registry from 'src/Registry';
import TestProduct1 from './products/TestProduct1';
import TestProduct2 from './products/TestProduct2';

describe('Creator', () => {
  describe('create', () => {
    test('without args', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestProduct1);
      const result = creator.create(category, type);
      expect(result).toBeInstanceOf(TestProduct1);
    });

    test('with args', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestProduct1);
      const uuid = generateId();
      const result: TestProduct1 = creator.create(category, type, [{ uuid }]);
      expect(result).toBeInstanceOf(TestProduct1);
      expect(result.uuid).toBe(uuid);
    });

    test('singleton', () => {
      const category = generateId();
      const type = generateId();
      const uuid = generateId();
      registry.register(category, type, TestProduct1, { singleton: true, singletonArgs: [{ uuid }] });
      const result1: TestProduct1 = creator.create(category, type);
      expect(result1).toBeInstanceOf(TestProduct1);
      expect(result1.uuid).toBe(uuid);
      const result2: TestProduct1 = creator.create(category, type);
      expect(result2).toBeInstanceOf(TestProduct1);
      expect(result2.uuid).toBe(uuid);
      expect(result1).toBe(result2);
    });
  });

  describe('get', () => {
    test('string', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestProduct1);
      const result = creator.get(category, type);
      expect(result).toBeInstanceOf(TestProduct1);
    });

    test('config', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestProduct1);
      const uuid = generateId();
      const result: TestProduct1 = creator.get(category, { type, args: [{ uuid }] });
      expect(result).toBeInstanceOf(TestProduct1);
      expect(result.uuid).toBe(uuid);
    });

    test('instance', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestProduct1);
      const instance = new TestProduct1();
      const result = creator.get(category, instance);
      expect(result).toBe(instance);
    });
  });

  test('from', () => {
    const category = generateId();
    const type1a = generateId();
    const type1b = generateId();
    const type2a = generateId();
    const uuid1a = generateId();
    const uuid1b = generateId();
    const uuid2a = generateId();
    const uuid2b = generateId();
    registry.registerAll(category, [
      { type: type1a, Class: TestProduct1, singleton: true, singletonArgs: [{ uuid: uuid1a }] },
      { type: type1b, Class: TestProduct1 },
      { type: type2a, Class: TestProduct2 },
    ]);
    const product2b = new TestProduct2({ uuid: uuid2b });
    const result1 = creator.from(category, [
      type1a,
      { type: type1b, args: [{ uuid: uuid1b }] },
      { type: type2a, args: [{ uuid: uuid2a }] },
      product2b,
    ]);
    expect(result1[0]).toBeInstanceOf(TestProduct1);
    expect(result1[1]).toBeInstanceOf(TestProduct1);
    expect(result1[2]).toBeInstanceOf(TestProduct2);
    expect(result1[3]).toBeInstanceOf(TestProduct2);
    const result2 = creator.from(category, [
      type1a,
      { type: type1b, args: [{ uuid: uuid1b }] },
      { type: type2a, args: [{ uuid: uuid2a }] },
      product2b,
    ]);
    expect(result2[0]).toBeInstanceOf(TestProduct1);
    expect(result2[1]).toBeInstanceOf(TestProduct1);
    expect(result2[2]).toBeInstanceOf(TestProduct2);
    expect(result2[3]).toBeInstanceOf(TestProduct2);

    expect(result2[0]).toBe(result1[0]);
    expect(result2[1]).not.toBe(result1[1]);
    expect(result2[2]).not.toBe(result1[2]);
    expect(result2[3]).toBe(result1[3]);
  });
});
