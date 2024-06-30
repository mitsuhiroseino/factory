import generateId from '@visue/utils/identifier/generateId';
import warehouse from 'src/Warehouse';
import TestService1 from './service/TestService1';
import TestService2 from './service/TestService2';

describe('Warehouse', () => {
  describe('register', () => {
    test('1件', () => {
      const category = generateId();
      const type = generateId();
      warehouse.register({ category, type, Class: TestService1 });
      const result = warehouse.get(category, type);
      expect(result).toEqual({ category, type, Class: TestService1 });
    });

    test('2件', () => {
      const category = generateId();
      const type1 = generateId();
      const type2 = generateId();
      warehouse.register({ category, type: type1, Class: TestService1 });
      warehouse.register({ category, type: type2, Class: TestService2 });
      const result = warehouse.get(category, type1);
      expect(result).toEqual({ category, type: type1, Class: TestService1 });
    });

    test('重複', () => {
      console.warn = jest.fn();
      const category = generateId();
      const type = generateId();
      warehouse.register({ category, type: type, Class: TestService1 });
      warehouse.register({ category, type: type, Class: TestService2 });
      expect(console.warn).toHaveBeenCalledWith(`${type} of ${category} is duplicated.`);
    });
  });

  describe('get', () => {
    test('カテゴリーなし', () => {
      const category = generateId();
      const type = generateId();
      warehouse.register({ category, type: type, Class: TestService1 });
      expect(() => {
        const result = warehouse.get('abc', type);
      }).toThrow();
    });

    test('種別なし', () => {
      const category = generateId();
      const type = generateId();
      warehouse.register({ category, type: type, Class: TestService1 });
      expect(() => {
        const result = warehouse.get(category, 'abc');
      }).toThrow();
    });
  });

  describe('has', () => {
    test('あり', () => {
      const category = generateId();
      const type = generateId();
      warehouse.register({ category, type: type, Class: TestService1 });
      const result = warehouse.has(category, type);
      expect(result).toBe(true);
    });

    test('カテゴリーなし', () => {
      const category = generateId();
      const type = generateId();
      warehouse.register({ category, type: type, Class: TestService1 });
      const result = warehouse.has('abc', type);
      expect(result).toBe(false);
    });

    test('種別なし', () => {
      const category = generateId();
      const type = generateId();
      warehouse.register({ category, type: type, Class: TestService1 });
      const result = warehouse.has(category, 'abc');
      expect(result).toBe(false);
    });
  });
});
