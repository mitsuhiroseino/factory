/**
 * 簡易ファクトリー用クラスの設定
 */
export type EasyProductConfig<C extends object = any> = C & {
  /**
   * 種別
   */
  type: string;
};

/**
 * コンストラクター引数に設定を1つ受け取るクラス
 */
export type EasyProduct = any;
