import generateId from '@visue/utils/identifier/generateId';
import registry from 'src/Registry';
import warehouse from 'src/Warehouse';
import TestProduct1 from './products/TestProduct1';
import TestProduct2 from './products/TestProduct2';

describe('Registry', () => {
  describe('register', () => {
    test('クラス', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestProduct1);
      const result = warehouse.get(category, type);
      expect(result).toEqual({ category, type, Class: TestProduct1 });
    });

    test('シングルトン', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestProduct1, { singleton: true, singletonArgs: [123, 'abc'] });
      const result = warehouse.get(category, type);
      expect(result).toEqual({ category, type, Class: TestProduct1, singleton: true, singletonArgs: [123, 'abc'] });
    });
  });

  describe('registerAll', () => {
    test('クラス', () => {
      const category = generateId();
      const type1 = generateId();
      const type2 = generateId();
      registry.registerAll(category, [
        { type: type1, Class: TestProduct1 },
        { type: type2, Class: TestProduct2 },
      ]);
      const result1 = warehouse.get(category, type1);
      expect(result1).toEqual({ category, type: type1, Class: TestProduct1 });
      const result2 = warehouse.get(category, type2);
      expect(result2).toEqual({ category, type: type2, Class: TestProduct2 });
    });

    test('シングルトン', () => {
      const category = generateId();
      const type1 = generateId();
      const type2 = generateId();
      registry.registerAll(category, [
        { type: type1, Class: TestProduct1, singleton: true, singletonArgs: [123, 'abc'] },
        { type: type2, Class: TestProduct2, singleton: true, singletonArgs: [123, 'ABC'] },
      ]);
      const result1 = warehouse.get(category, type1);
      expect(result1).toEqual({
        category,
        type: type1,
        Class: TestProduct1,
        singleton: true,
        singletonArgs: [123, 'abc'],
      });
      const result2 = warehouse.get(category, type2);
      expect(result2).toEqual({
        category,
        type: type2,
        Class: TestProduct2,
        singleton: true,
        singletonArgs: [123, 'ABC'],
      });
    });

    test('クラス & シングルトン', () => {
      const category = generateId();
      const type1 = generateId();
      const type2 = generateId();
      registry.registerAll(category, [
        { type: type1, Class: TestProduct1 },
        { type: type2, Class: TestProduct2, singleton: true, singletonArgs: [123, 'ABC'] },
      ]);
      const result1 = warehouse.get(category, type1);
      expect(result1).toEqual({
        category,
        type: type1,
        Class: TestProduct1,
      });
      const result2 = warehouse.get(category, type2);
      expect(result2).toEqual({
        category,
        type: type2,
        Class: TestProduct2,
        singleton: true,
        singletonArgs: [123, 'ABC'],
      });
    });
  });

  describe('resolve', () => {
    test('あり', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestProduct1);
      const result = registry.resolve(category, type);
      expect(result).toBe(TestProduct1);
    });

    test('カテゴリーなし', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestProduct1);
      expect(() => {
        const result = registry.resolve('abc', type);
      }).toThrow();
    });

    test('種別なし', () => {
      const category = generateId();
      const type = generateId();
      registry.register(category, type, TestProduct1);
      expect(() => {
        const result = registry.resolve(category, 'abc');
      }).toThrow();
    });
  });
});
