import generateId from '@visue/utils/identifier/generateId';
import creator from 'src/Creator';
import registry from 'src/Registry';
import TestService1 from './service/TestService1';
import TestService2 from './service/TestService2';

describe('Creator', () => {
  describe('create', () => {
    test('without args', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestService1);
      const result = creator.create(category, type);
      expect(result).toBeInstanceOf(TestService1);
    });

    test('with args', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestService1);
      const uuid = generateId();
      const result: TestService1 = creator.create(category, type, [{ uuid }]);
      expect(result).toBeInstanceOf(TestService1);
      expect(result.uuid).toBe(uuid);
    });

    test('singleton', () => {
      const category = generateId();
      const type = generateId();
      const uuid = generateId();
      registry.register(category, type, TestService1, { singleton: true, singletonArgs: [{ uuid }] });
      const result1: TestService1 = creator.create(category, type);
      expect(result1).toBeInstanceOf(TestService1);
      expect(result1.uuid).toBe(uuid);
      const result2: TestService1 = creator.create(category, type);
      expect(result2).toBeInstanceOf(TestService1);
      expect(result2.uuid).toBe(uuid);
      expect(result1).toBe(result2);
    });
  });

  describe('get', () => {
    test('string', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestService1);
      const result = creator.get(category, type);
      expect(result).toBeInstanceOf(TestService1);
    });

    test('instance', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestService1);
      const instance = new TestService1();
      const result = creator.get(category, instance);
      expect(result).toBe(instance);
    });
  });

  describe('from', () => {
    const category = generateId();
    const type1 = generateId();
    const type2 = generateId();
    const uuid = generateId();
    registry.registerAll(category, [
      { type: type1, Class: TestService1, singleton: true, singletonArgs: [{ uuid }] },
      { type: type2, Class: TestService2 },
    ]);
    const result1 = creator.from(category, [type1, type2]);
    expect(result1[0]).toBeInstanceOf(TestService1);
    expect(result1[1]).toBeInstanceOf(TestService2);
    const result2 = creator.from(category, [type1, type2]);
    expect(result2[0]).toBeInstanceOf(TestService1);
    expect(result2[1]).toBeInstanceOf(TestService2);
    expect(result2[0]).toBe(result1[0]);
    expect(result2[1]).not.toBe(result1[1]);
  });
});
