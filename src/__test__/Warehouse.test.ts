import generateId from '@visue/utils/identifier/generateId';
import warehouse from 'src/Warehouse';
import TestService1 from './service/TestService1';
import TestService2 from './service/TestService2';

describe('Warehouse', () => {
  describe('register', () => {
    test('1件', () => {
      const category = generateId();
      warehouse.register(category, TestService1.TYPE, { Class: TestService1 });
      const result = warehouse.get(category, TestService1.TYPE);
      expect(result).toEqual({ Class: TestService1 });
    });

    test('2件', () => {
      const category = generateId();
      warehouse.register(category, TestService1.TYPE, { Class: TestService1 });
      warehouse.register(category, TestService2.TYPE, { Class: TestService2 });
      const result = warehouse.get(category, TestService1.TYPE);
      expect(result).toEqual({ Class: TestService1 });
    });

    test('重複', () => {
      console.warn = jest.fn();
      const category = generateId();
      warehouse.register(category, TestService1.TYPE, { Class: TestService1 });
      warehouse.register(category, TestService1.TYPE, { Class: TestService2 });
      expect(console.warn).toHaveBeenCalledWith(`${TestService1.TYPE} of ${category} is duplicated.`);
    });
  });

  describe('get', () => {
    test('カテゴリーなし', () => {
      const category = generateId();
      warehouse.register(category, TestService1.TYPE, { Class: TestService1 });
      expect(() => {
        const result = warehouse.get('abc', TestService1.TYPE);
      }).toThrow();
    });

    test('種別なし', () => {
      const category = generateId();
      warehouse.register(category, TestService1.TYPE, { Class: TestService1 });
      expect(() => {
        const result = warehouse.get(category, TestService2.TYPE);
      }).toThrow();
    });
  });

  describe('has', () => {
    test('あり', () => {
      const category = generateId();
      warehouse.register(category, TestService1.TYPE, { Class: TestService1 });
      const result = warehouse.has(category, TestService1.TYPE);
      expect(result).toBe(true);
    });

    test('カテゴリーなし', () => {
      const category = generateId();
      warehouse.register(category, TestService1.TYPE, { Class: TestService1 });
      const result = warehouse.has('abc', TestService1.TYPE);
      expect(result).toBe(false);
    });

    test('種別なし', () => {
      const category = generateId();
      warehouse.register(category, TestService1.TYPE, { Class: TestService1 });
      const result = warehouse.has(category, TestService2.TYPE);
      expect(result).toBe(false);
    });
  });
});
