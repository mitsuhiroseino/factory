import { Constructor, Optional } from '@visue/utils';

/**
 * 登録する情報
 */
export type RegistrationSetting<I = any> = RegisterOptions & {
  /**
   * 種別
   */
  type: string;

  /**
   * クラス
   */
  Class: Constructor<I>;
};

/**
 * 登録された情報
 */
export type RegisteredInformation<I = any> = RegistrationSetting<I> & {
  /**
   * カテゴリー
   */
  category;

  /**
   * シングルトンインスタンス
   */
  instance?: I;
};

export type RegisterOptions<ARGS = unknown[]> = {
  /**
   * シングルトン
   */
  singleton?: boolean;

  /**
   * シングルトンインスタンス生成時の設定
   */
  singletonArgs?: ARGS;
};

/**
 * 登録可能なサービス
 */
export type RegistrableService<I = any> = Constructor<I> | RegistrationSetting<I>;

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
