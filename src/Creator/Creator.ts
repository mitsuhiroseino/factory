import asArray from '@visue/utils/array/asArray';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import warehouse from '../Warehouse';
import setupFactoryable from '../helpers/setupService';
import { IService, ServiceConfig, ServiceConstructor } from '../types';

/**
 * サービスのインスタンスを作るクラス
 */
class Creator {
  /**
   * インスタンスを取得する
   * @param target
   * @returns
   */
  get<S extends IService = IService, C extends ServiceConfig = ServiceConfig>(
    category: string,
    target: string | C | S,
  ): S {
    if (isString(target) || isPlainObject(target)) {
      return this.create(category, target as string | C);
    } else {
      return target as S;
    }
  }

  /**
   * インスタンスを纏めて取得する
   * @param targets
   * @returns
   */
  from<S extends IService = IService, C extends ServiceConfig = ServiceConfig>(
    category: string,
    targets: string | C | S | (string | C | S)[],
  ): S[] {
    return asArray(targets).map((target) => this.get<S, C>(category, target));
  }

  /**
   * 設定を元にインスタンスを生成して返却する
   * @param target 種別または設定
   * @param config 設定
   */
  create<S extends IService = IService, C extends ServiceConfig = ServiceConfig>(
    category: string,
    target: C | string,
    config?: Omit<C, 'type'>,
  ): S {
    let type, cfg;
    if (isString(target)) {
      type = target;
      cfg = { type, ...config };
    } else {
      type = target.type;
      cfg = target;
    }
    const service = warehouse.get(category, type);
    const { Class: ServiceClass, singleton, singletonConfig, instance } = service;
    if (singleton) {
      // シングルトンの場合
      // シングルトンインスタンスを返す
      if (!instance) {
        service.instance = this._createInstance(ServiceClass, singletonConfig);
      }
      return service.instance;
    } else if (ServiceClass) {
      // クラスの場合
      // 新しいインスタンスを作る
      return this._createInstance(ServiceClass, cfg);
    }
  }

  private _createInstance<S extends IService = IService, C extends ServiceConfig = ServiceConfig>(
    ServiceClass: ServiceConstructor<S, C>,
    config?: C,
  ) {
    const instance = new ServiceClass(config);
    setupFactoryable(instance, config);
    return instance;
  }
}
export default new Creator();
