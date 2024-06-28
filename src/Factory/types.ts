import { IService, RegistrableService, ServiceConfig, ServiceConstructor, ServiceInformation } from '../types';

/**
 * Factoryのコンフィグ
 */
export type FactoryConfig<I extends IService = IService, C extends ServiceConfig = ServiceConfig> = {
  /**
   * カテゴリー
   */
  category: string;

  /**
   * サービス
   */
  services?: RegistrableService<I, C>[];
};
