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
   * サービス
   */
  services?: RegistrationSetting<S>[];
};
