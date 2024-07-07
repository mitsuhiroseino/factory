import asArray from '@visue/utils/array/asArray';
import isPlainObject from 'lodash/isPlainObject';
import { Creator } from '../../Creator';
import { ProductConfig } from '../../types';
import { EasyProductConfig } from '../types';

/**
 * プロダクトのインスタンスを作るクラス
 */
class EasyCreator extends Creator {
  /**
   * インスタンスを取得する
   * @param target
   * @returns
   */
  get<P>(category: string, target: string | EasyProductConfig | P): P {
    return super.get(category, this._toProductConfig(target));
  }

  /**
   * インスタンスを纏めて取得する
   * @param targets
   * @returns
   */
  from<P extends any>(
    category: string,
    targets: string | EasyProductConfig | P | (string | EasyProductConfig | P)[],
  ): P[] {
    return super.from(
      category,
      asArray(targets).map((target) => this._toProductConfig(target)),
    );
  }

  create<P extends any>(category: string, target: string | EasyProductConfig, config: EasyProductConfig): P {
    let type: string, args;
    if (isPlainObject(target)) {
      const { type: t, ...c } = target;
      type = t;
      args = [c];
    } else {
      type = target;
      if (config) {
        args = [config];
      }
    }
    return super.create(category, type, args);
  }

  private _toProductConfig<P>(target: string | EasyProductConfig | P): string | ProductConfig | P {
    if (isPlainObject(target)) {
      const { type, ...config } = target as EasyProductConfig;
      return { type, args: [config] };
    } else {
      return target;
    }
  }
}
export default EasyCreator;
