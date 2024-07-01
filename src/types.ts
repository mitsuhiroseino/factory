import { Constructor } from '@visue/utils';

/**
 * 登録する情報
 */
export type RegistrationSetting<S = any> = RegisterOptions & {
  /**
   * 種別
   */
  type: string;

  /**
   * クラス
   */
  Class: Constructor<S>;
};

/**
 * 登録された情報
 */
export type RegisteredInformation<S = any> = RegistrationSetting<S> & {
  /**
   * カテゴリー
   */
  category;

  /**
   * シングルトンインスタンス
   */
  instance?: S;
};

export type RegisterOptions<A = unknown[]> = {
  /**
   * シングルトン
   */
  singleton?: boolean;

  /**
   * シングルトンインスタンス生成時の設定
   */
  singletonArgs?: A;
};

/**
 * 登録可能なサービス
 */
export type RegistrableService<S = any> = Constructor<S> | RegistrationSetting<S>;

/**
 * サービスのインスタンスを取得する際の設定
 */
export type ServiceConfig = {
  /**
   * 種別
   */
  type: string;

  /**
   * コンストラクターの引数
   */
  args?: unknown[];
};
