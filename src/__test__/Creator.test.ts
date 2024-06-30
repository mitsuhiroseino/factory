import generateId from '@visue/utils/identifier/generateId';
import creator from 'src/Creator';
import registry from 'src/Registry';
import TestService1 from './service/TestService1';

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
});
