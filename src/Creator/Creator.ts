import asArray from '@visue/utils/array/asArray';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import warehouse from '../Warehouse';
import { ProductConfig } from '../types';

/**
 * プロダクトのインスタンスを作るクラス
 */
class Creator {
  /**
   * インスタンスを取得する
   * @param target
   * @returns
   */
  get<S>(category: string, target: string | ProductConfig | any): S {
    if (isPlainObject(target)) {
      const conifg = target as ProductConfig;
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
  from<S extends any>(category: string, targets: string | ProductConfig | S | (string | ProductConfig | S)[]): S[] {
    return asArray(targets).map((target) => this.get<S>(category, target));
  }

  /**
   * 設定を元にインスタンスを生成して返却する
   * @param target 種別または設定
   * @param config 設定
   */
  create<S extends any>(category: string, type: string, args: unknown[] = []): S {
    const product = warehouse.get(category, type);
    const { Class: ProductClass, singleton, singletonArgs, instance } = product;
    if (singleton) {
      // シングルトンの場合
      // シングルトンインスタンスを返す
      if (!instance) {
        product.instance = new ProductClass(...singletonArgs);
      }
      return product.instance;
    } else {
      // クラスの場合
      // 新しいインスタンスを作る
      return new ProductClass(...args);
    }
  }
}
export default Creator;
