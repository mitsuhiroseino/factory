import { Identifiable } from '@visue/utils/identifier';

/**
 * サービスのコンフィグ
 */
export type ServiceConfig = Identifiable & {
  /**
   * 種別
   */
  type?: string;
};

/**
 * サービスのインターフェイス
 */
export interface IService extends Identifiable {
  /**
   * 種別
   */
  readonly type: string;
}

/**
 * サービスのコンストラクター
 */
export type ServiceConstructor<I extends IService = IService, C extends ServiceConfig = ServiceConfig> = (new (
  config: C,
) => I) & {
  /**
   * カテゴリー
   */
  CATEGORY: string;

  /**
   * 種別
   */
  TYPE: string;

  /**
   * 代替種別
   */
  ALTS?: string[];
};

/**
 * 登録する情報
 */
export type ServiceInformation<I extends IService = IService, C extends ServiceConfig = ServiceConfig> = {
  /**
   * クラス
   */
  Class?: ServiceConstructor<I, C>;

  /**
   * シングルトン
   */
  singleton?: boolean;

  /**
   * シングルトンインスタンス生成時の設定
   */
  singletonConfig?: C;
};

/**
 * 登録された情報
 */
export type RegistrationInformation<
  I extends IService = IService,
  C extends ServiceConfig = ServiceConfig,
> = ServiceInformation<I, C> & {
  /**
   * シングルトンインスタンス
   */
  instance?: I;
};

/**
 * 登録可能なサービス
 */
export type RegistrableService<
  I extends IService = IService,
  C extends ServiceConfig = ServiceConfig,
> = ServiceConstructor<I, C> & ServiceInformation<I, C>;
