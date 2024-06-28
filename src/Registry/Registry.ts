import asArray from '@visue/utils/array/asArray';
import isPlainObject from 'lodash/isPlainObject';
import warehouse from '../Warehouse';
import {
  IService,
  RegistrableService,
  RegistrationInformation,
  ServiceConfig,
  ServiceConstructor,
  ServiceInformation,
} from '../types';

/**
 * サービスを登録するためのクラス
 */
class Registry {
  /**
   * クラスを管理下に置く
   * @param target クラス
   */
  register<S extends IService = IService, C extends ServiceConfig = ServiceConfig>(
    category: string,
    targets: RegistrableService<S, C> | RegistrableService<S, C>[],
  ) {
    for (const target of asArray(targets)) {
      this._register(category, target);
    }
  }

  private _register<I extends IService = IService, C extends ServiceConfig = ServiceConfig>(
    category: string,
    target: RegistrableService<I, C>,
  ) {
    let service: RegistrationInformation<I, C>;
    if (isPlainObject(target)) {
      // Productの場合
      const serviceConfig = target as ServiceInformation<I, C>;
      service = {
        ...serviceConfig,
        singletonConfig: { ...serviceConfig.singletonConfig },
      };
    } else {
      // FactoryableConstructorの場合
      service = {
        Class: target as ServiceConstructor<I>,
      };
    }
    // 情報を登録
    const { TYPE, ALTS } = service.Class;
    warehouse.register(category, TYPE, service);
    if (ALTS) {
      // 代替種別でも登録
      ALTS.forEach((alt) => {
        warehouse.register(category, alt, service);
      });
    }
  }

  /**
   * サービスのクラスを取得する
   * @param type 種別
   * @returns
   */
  resolve<S extends IService = IService>(category: string, type: string): ServiceConstructor<S> {
    return warehouse.get(category, type).Class;
  }
}

export default new Registry();
