import { RegistrationSetting } from '../types';

/**
 * Factoryのコンフィグ
 */
export type FactoryConfig<S extends any> = {
  /**
   * カテゴリー
   */
  category: string;

  /**
   * プロダクト
   */
  products?: RegistrationSetting<S>[];
};
