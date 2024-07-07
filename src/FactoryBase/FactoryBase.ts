import { Constructor } from '@visue/utils';
import { Creator } from '../Creator';
import { Registry } from '../Registry';
import { ProductConfig, RegisterOptions, RegistrationSetting } from '../types';
import { Warehouse } from '../Warehouse';
import { FactoryBaseConfig } from './types';

/**
 * ファクトリーの基底クラス
 * Registry、Creator、Warehouseのメソッドにアクセスする
 */
class FactoryBase<P extends any = any, C extends FactoryBaseConfig<P> = FactoryBaseConfig<P>> {
  /**
   * Warehouse
   */
  protected _warehouse: Warehouse;

  /**
   * Creator
   */
  protected _creator: Creator;

  /**
   * Registry
   */
  protected _registry: Registry;

  /**
   * カテゴリー
   */
  protected _category: string;

  constructor(config: C) {
    const { category, products } = config;
    this._category = category;
    if (products) {
      this.registerAll(products);
    }
  }

  /**
   * productを纏めて登録する
   * @param products クラス
   */
  registerAll(products: RegistrationSetting<P>[]) {
    this._registry.registerAll(this._category, products);
  }

  /**
   * productを登録する
   * @param product クラス
   */
  register(type: string, Class: Constructor<P>, options?: RegisterOptions) {
    this._registry.register(this._category, type, Class, options);
  }

  /**
   * targetが文字列の場合はインスタンスを取得する
   * 文字列以外の場合はそのまま返す
   * @param target
   * @returns
   */
  get<P>(target: string | ProductConfig | any): P {
    return this._creator.get<P>(this._category, target);
  }

  /**
   * インスタンスを纏めて取得する
   * @param targets
   * @returns
   */
  from(targets: string | ProductConfig | any | (string | ProductConfig | any)[]): P[] {
    return this._creator.from<P>(this._category, targets);
  }

  /**
   * インスタンスを生成する
   * @param type 種別
   * @param config コンフィグ
   */
  create<P>(type: string, args?: unknown[]): P {
    return this._creator.create(this._category, type, args);
  }

  /**
   * 指定の種別が存在するか判定する
   * @param type 種別
   * @returns
   */
  has(type: string): boolean {
    return this._warehouse.has(this._category, type);
  }
}
export default FactoryBase;
