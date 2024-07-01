import { Constructor } from '@visue/utils';
import { RegisteredInformation, RegisterOptions, RegistrationSetting } from '../types';
import warehouse from '../Warehouse';

/**
 * サービスを登録するためのクラス
 */
class Registry {
  registerAll<S extends any>(category: string, services: RegistrationSetting<S>[]) {
    for (const service of services) {
      this._register(category, service);
    }
  }

  register<S extends any>(category: string, type: string, Class: Constructor<S>, options?: RegisterOptions) {
    const setting: RegistrationSetting<S> = {
      type,
      Class,
      ...options,
    };
    this._register(category, setting);
  }

  private _register<S extends any>(category: string, setting: RegistrationSetting<S>) {
    let service: RegisteredInformation<S> = {
      category,
      ...setting,
    };
    if (setting.singletonArgs) {
      service.singletonArgs = [].concat(setting.singletonArgs);
    }
    // 情報を登録
    warehouse.register(service);
  }

  /**
   * サービスのクラスを取得する
   * @param type 種別
   * @returns
   */
  resolve<S extends any>(category: string, type: string): Constructor<S> {
    return warehouse.get(category, type).Class;
  }
}

export default Registry;
