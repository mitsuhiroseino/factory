import asArray from '@visue/utils/array/asArray';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import warehouse from '../Warehouse';
import setupFactoryable from '../helpers/setupService';
import {
  IService,
  RegistrableService,
  RegistrationInformation,
  ServiceConfig,
  ServiceConstructor,
  ServiceInformation,
} from '../types';

class Creator<I extends IService = IService, C extends ServiceConfig = ServiceConfig> {
  /**
   * 管理しているクラスの情報
   */
  private _warehouse = warehouse;

  /**
   * クラスを管理下に置く
   * @param target クラス
   */
  register(category: string, targets: RegistrableService<I, C> | RegistrableService<I, C>[]) {
    for (const target of asArray(targets)) {
      this._register(category, target);
    }
  }

  private _register(category: string, target: RegistrableService<I, C>) {
    let product: RegistrationInformation<I, C>;
    if (isPlainObject(target)) {
      // Productの場合
      const productConfig = target as ServiceInformation<I, C>;
      product = {
        ...productConfig,
        singletonConfig: { ...productConfig.singletonConfig },
      };
    } else {
      // FactoryableConstructorの場合
      product = {
        Class: target as ServiceConstructor<I>,
      };
    }
    // 情報を登録
    const { TYPE, ALTS } = product.Class;
    this._warehouse.register(category, TYPE, product);
    if (ALTS) {
      // 代替種別でも登録
      ALTS.forEach((alt) => {
        this._warehouse.register(category, alt, product);
      });
    }
  }

  /**
   * targetがFactoryableConfigの場合はインスタンスを取得する
   * @param target
   * @returns
   */
  get(category: string, target: string | C | I): I {
    if (isString(target) || isPlainObject(target)) {
      return this.create(category, target as string | C);
    } else {
      return target as I;
    }
  }

  /**
   * targetsがtypeやFactoryableConfigの場合はインスタンスを取得する
   * @param targets
   * @returns
   */
  from(category: string, targets: string | C | I | (string | C | I)[]): I[] {
    return asArray(targets).map((target) => this.get(category, target));
  }

  /**
   * コンフィグを元にインスタンスを生成して返却する
   * @param target タイプまたはコンフィグ
   * @param config コンフィグ
   */
  create(category: string, target: C | string, config?: Omit<C, 'type'>): I {
    let type, cfg;
    if (isString(target)) {
      type = target;
      cfg = { type, ...config };
    } else {
      type = target.type;
      cfg = target;
    }
    const product = this._warehouse.get(category, type);
    const { Class: ProductClass, singleton, singletonConfig, instance } = product;
    if (singleton) {
      // シングルトンの場合
      // シングルトンインスタンスを返す
      if (!instance) {
        product.instance = this._createInstance(ProductClass, singletonConfig);
      }
      return product.instance;
    } else if (ProductClass) {
      // クラスの場合
      // 新しいインスタンスを作る
      return this._createInstance(ProductClass, cfg);
    }
  }

  /**
   * Productのクラスを取得する
   * @param type 種別
   * @returns
   */
  resolve(category: string, type: string): ServiceConstructor<I> {
    return this._warehouse.get(category, type).Class;
  }

  /**
   * 指定の種別が存在するか
   * @param type 種別
   * @returns
   */
  has(category: string, type: string): boolean {
    return this._warehouse.has(category, type);
  }

  private _createInstance(ProductClass: ServiceConstructor<I, C>, config?: C) {
    const instance = new ProductClass(config);
    setupFactoryable(instance, config);
    return instance;
  }
}
export default new Creator();
