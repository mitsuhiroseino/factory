import { Constructor } from '@visue/utils';
import { RegisteredInformation, RegisterOptions, RegistrationSetting } from '../types';
import warehouse from '../Warehouse';

/**
 * プロダクトを登録するためのクラス
 */
class Registry {
  registerAll<S extends any>(category: string, products: RegistrationSetting<S>[]) {
    for (const product of products) {
      this._register(category, product);
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
    let product: RegisteredInformation<S> = {
      category,
      ...setting,
    };
    if (setting.singletonArgs) {
      product.singletonArgs = [].concat(setting.singletonArgs);
    }
    // 情報を登録
    warehouse.register(product);
  }

  /**
   * プロダクトのクラスを取得する
   * @param type 種別
   * @returns
   */
  resolve<S extends any>(category: string, type: string): Constructor<S> {
    return warehouse.get(category, type).Class;
  }
}

export default Registry;
