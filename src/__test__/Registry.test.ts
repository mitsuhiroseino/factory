import generateId from '@visue/utils/identifier/generateId';
import registry from 'src/Registry';
import warehouse from 'src/Warehouse';
import TestService1 from './service/TestService1';
import TestService2 from './service/TestService2';

describe('Registry', () => {
  describe('register', () => {
    test('クラス 1件', () => {
      const category = generateId();
      registry.register(category, TestService1);
      const result = warehouse.get(category, TestService1.TYPE);
      expect(result).toEqual({ Class: TestService1 });
      const result1 = warehouse.get(category, TestService1.ALTS[0]);
      expect(result1).toEqual({ Class: TestService1 });
      const result2 = warehouse.get(category, TestService1.ALTS[1]);
      expect(result2).toEqual({ Class: TestService1 });
    });

    test('クラス 2件', () => {
      const category = generateId();
      registry.register(category, [TestService1, TestService2]);
      const result1 = warehouse.get(category, TestService1.TYPE);
      expect(result1).toEqual({ Class: TestService1 });
      const result2 = warehouse.get(category, TestService2.TYPE);
      expect(result2).toEqual({ Class: TestService2 });
    });

    test('登録情報 1件', () => {
      const category = generateId();
      registry.register(category, { Class: TestService1, singleton: true, singletonConfig: {} });
      const result = warehouse.get(category, TestService1.TYPE);
      expect(result).toEqual({ Class: TestService1, singleton: true, singletonConfig: {} });
    });

    test('登録情報 2件', () => {
      const category = generateId();
      registry.register(category, [
        { Class: TestService1, singleton: true, singletonConfig: {} },
        { Class: TestService2 },
      ]);
      const result1 = warehouse.get(category, TestService1.TYPE);
      expect(result1).toEqual({ Class: TestService1, singleton: true, singletonConfig: {} });
      const result2 = warehouse.get(category, TestService2.TYPE);
      expect(result2).toEqual({ Class: TestService2 });
    });
  });

  describe('resolve', () => {
    test('あり', () => {
      const category = generateId();
      registry.register(category, TestService1);
      const result = registry.resolve(category, TestService1.TYPE);
      expect(result).toBe(TestService1);
    });

    test('カテゴリーなし', () => {
      const category = generateId();
      registry.register(category, TestService1);
      expect(() => {
        const result = registry.resolve('abc', TestService1.TYPE);
      }).toThrow();
    });

    test('種別なし', () => {
      const category = generateId();
      registry.register(category, TestService1);
      expect(() => {
        const result = registry.resolve(category, TestService2.TYPE);
      }).toThrow();
    });
  });
});
