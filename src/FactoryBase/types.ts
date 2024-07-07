import { RegistrationSetting } from '../types';

/**
 * FactoryBaseのコンフィグ
 */
export type FactoryBaseConfig<P extends any> = {
  /**
   * カテゴリー
   */
  category: string;

  /**
   * プロダクト
   */
  products?: RegistrationSetting<P>[];
};
