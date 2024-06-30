import generateId from '@visue/utils/identifier/generateId';
import registry from 'src/Registry';
import warehouse from 'src/Warehouse';
import TestService1 from './service/TestService1';
import TestService2 from './service/TestService2';

describe('Registry', () => {
  describe('register', () => {
    test('クラス', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestService1);
      const result = warehouse.get(category, type);
      expect(result).toEqual({ category, type, Class: TestService1 });
    });

    test('シングルトン', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestService1, { singleton: true, singletonArgs: [123, 'abc'] });
      const result = warehouse.get(category, type);
      expect(result).toEqual({ category, type, Class: TestService1, singleton: true, singletonArgs: [123, 'abc'] });
    });
  });

  describe('registerAll', () => {
    test('クラス', () => {
      const category = generateId();
      const type1 = generateId();
      const type2 = generateId();
      registry.registerAll(category, [
        { type: type1, Class: TestService1 },
        { type: type2, Class: TestService2 },
      ]);
      const result1 = warehouse.get(category, type1);
      expect(result1).toEqual({ category, type: type1, Class: TestService1 });
      const result2 = warehouse.get(category, type2);
      expect(result2).toEqual({ category, type: type2, Class: TestService2 });
    });

    test('シングルトン', () => {
      const category = generateId();
      const type1 = generateId();
      const type2 = generateId();
      registry.registerAll(category, [
        { type: type1, Class: TestService1, singleton: true, singletonArgs: [123, 'abc'] },
        { type: type2, Class: TestService2, singleton: true, singletonArgs: [123, 'ABC'] },
      ]);
      const result1 = warehouse.get(category, type1);
      expect(result1).toEqual({
        category,
        type: type1,
        Class: TestService1,
        singleton: true,
        singletonArgs: [123, 'abc'],
      });
      const result2 = warehouse.get(category, type2);
      expect(result2).toEqual({
        category,
        type: type2,
        Class: TestService2,
        singleton: true,
        singletonArgs: [123, 'ABC'],
      });
    });

    test('クラス & シングルトン', () => {
      const category = generateId();
      const type1 = generateId();
      const type2 = generateId();
      registry.registerAll(category, [
        { type: type1, Class: TestService1 },
        { type: type2, Class: TestService2, singleton: true, singletonArgs: [123, 'ABC'] },
      ]);
      const result1 = warehouse.get(category, type1);
      expect(result1).toEqual({
        category,
        type: type1,
        Class: TestService1,
      });
      const result2 = warehouse.get(category, type2);
      expect(result2).toEqual({
        category,
        type: type2,
        Class: TestService2,
        singleton: true,
        singletonArgs: [123, 'ABC'],
      });
    });
  });

  describe('resolve', () => {
    test('あり', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestService1);
      const result = registry.resolve(category, type);
      expect(result).toBe(TestService1);
    });

    test('カテゴリーなし', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestService1);
      expect(() => {
        const result = registry.resolve('abc', type);
      }).toThrow();
    });

    test('種別なし', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestService1);
      expect(() => {
        const result = registry.resolve(category, 'abc');
      }).toThrow();
    });
  });
});
