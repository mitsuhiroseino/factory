import asArray from '@visue/utils/array/asArray';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import warehouse from '../Warehouse';
import { ServiceConfig } from '../types';

/**
 * サービスのインスタンスを作るクラス
 */
class Creator {
  /**
   * インスタンスを取得する
   * @param target
   * @returns
   */
  get<S>(category: string, target: string | ServiceConfig | any): S {
    if (isPlainObject(target)) {
      const conifg = target as ServiceConfig;
      return this.create(category, conifg.type, conifg.args);
    } else if (isString(target)) {
      return this.create(category, target as string);
    } else {
      return target as S;
    }
  }

  /**
   * インスタンスを纏めて取得する
   * @param targets
   * @returns
   */
  from<S extends any>(category: string, targets: string | ServiceConfig | S | (string | ServiceConfig | S)[]): S[] {
    return asArray(targets).map((target) => this.get<S>(category, target));
  }

  /**
   * 設定を元にインスタンスを生成して返却する
   * @param target 種別または設定
   * @param config 設定
   */
  create<S extends any>(category: string, type: string, args: unknown[] = []): S {
    const service = warehouse.get(category, type);
    const { Class: ServiceClass, singleton, singletonArgs, instance } = service;
    if (singleton) {
      // シングルトンの場合
      // シングルトンインスタンスを返す
      if (!instance) {
        service.instance = new ServiceClass(...singletonArgs);
      }
      return service.instance;
    } else {
      // クラスの場合
      // 新しいインスタンスを作る
      return new ServiceClass(...args);
    }
  }
}
export default new Creator();
