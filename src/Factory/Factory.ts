import { Constructor } from '@visue/utils';
import creator from '../Creator';
import registry from '../Registry';
import { ProductConfig, RegisterOptions, RegistrationSetting } from '../types';
import warehouse from '../Warehouse';
import { FactoryConfig } from './types';

/**
 * ファクトリークラス
 * Registry、Creator、Warehouseのメソッドにアクセスする
 */
class Factory<S extends any = any, C extends FactoryConfig<S> = FactoryConfig<S>> {
  /**
   * Warehouse
   */
  private _warehouse = warehouse;

  /**
   * Creator
   */
  private _creator = creator;

  /**
   * Registry
   */
  private _registry = registry;

  /**
   * カテゴリー
   */
  private _category: string;

  constructor(config: C) {
    const { category, products: products } = config;
    this._category = category;
    if (products) {
      this.registerAll(products);
    }
  }

  /**
   * productを纏めて登録する
   * @param products クラス
   */
  registerAll(products: RegistrationSetting<S>[]) {
    this._registry.registerAll(this._category, products);
  }

  /**
   * productを登録する
   * @param product クラス
   */
  register(type: string, Class: Constructor<S>, options?: RegisterOptions) {
    this._registry.register(this._category, type, Class, options);
  }

  /**
   * targetが文字列の場合はインスタンスを取得する
   * 文字列以外の場合はそのまま返す
   * @param target
   * @returns
   */
  get(target: string | ProductConfig | any): S {
    return this._creator.get<S>(this._category, target);
  }

  /**
   * インスタンスを纏めて取得する
   * @param targets
   * @returns
   */
  from(targets: string | ProductConfig | any | (string | ProductConfig | any)[]): S[] {
    return this._creator.from<S>(this._category, targets);
  }

  /**
   * インスタンスを生成する
   * @param type 種別
   * @param config コンフィグ
   */
  create(type: string, args?: unknown[]): S {
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
export default Factory;
