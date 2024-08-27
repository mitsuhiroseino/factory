import { Creator } from '../Creator';
import { Registry } from '../Registry';
import { RegistrationSetting } from '../types';
import { Warehouse } from '../Warehouse';

/**
 * FactoryBaseのコンフィグ
 */
export type FactoryBaseConfig<P extends any> = FactoryBaseConfigBase<P> & {
  /**
   * Warehouse
   */
  warehouse?: Warehouse;

  /**
   * Creator
   */
  creator?: Creator;

  /**
   * Registry
   */
  registry?: Registry;
};

/**
 * FactoryBaseのコンフィグ
 */
export type FactoryBaseConfigBase<P extends any> = {
  /**
   * カテゴリー
   */
  category: string;

  /**
   * プロダクト
   */
  products?: RegistrationSetting<P>[];
};
