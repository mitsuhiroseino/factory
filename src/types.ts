import { Constructor } from '@visue/utils';

/**
 * 登録可能なプロダクト
 */
export type RegistrableProduct<P = any> = Constructor<P> | RegistrationSetting<P>;

/**
 * 登録する情報
 */
export type RegistrationSetting<P = any, A = unknown[]> = RegisterOptions<A> & {
  /**
   * 種別
   */
  type: string;

  /**
   * クラス
   */
  Class: Constructor<P>;
};

/**
 * 登録された情報
 */
export type RegisteredInformation<P = any> = RegistrationSetting<P> & {
  /**
   * カテゴリー
   */
  category;

  /**
   * シングルトンインスタンス
   */
  instance?: P;
};

/**
 * 登録処理のオプション
 */
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
 * プロダクトのインスタンスを取得する際の設定
 */
export type ProductConfig = {
  /**
   * 種別
   */
  type: string;

  /**
   * コンストラクターの引数
   */
  args?: unknown[];
};
