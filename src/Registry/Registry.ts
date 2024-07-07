import { Constructor } from '@visue/utils';
import { RegisteredInformation, RegisterOptions, RegistrationSetting } from '../types';
import warehouse from '../Warehouse';

/**
 * プロダクトを登録するためのクラス
 */
class Registry {
  registerAll<P extends any>(category: string, products: RegistrationSetting<P>[]) {
    for (const product of products) {
      this._register(category, product);
    }
  }

  register<P extends any>(category: string, type: string, Class: Constructor<P>, options?: RegisterOptions) {
    const setting: RegistrationSetting<P> = {
      type,
      Class,
      ...options,
    };
    this._register(category, setting);
  }

  private _register<P extends any>(category: string, setting: RegistrationSetting<P>) {
    let product: RegisteredInformation<P> = {
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
  resolve<P extends any>(category: string, type: string): Constructor<P> {
    return warehouse.get(category, type).Class;
  }
}

export default Registry;
