import { RegisteredInformation } from '../types';

/**
 * サービスを管理するシングルトンインスタンス
 */
class Warehouse {
  /**
   * 登録情報
   */
  private _services: { [category: string]: { [type: string]: RegisteredInformation<any> } } = {};

  /**
   * サービスを登録する
   * @param category カテゴリー
   * @param type 種別
   * @param service 登録情報
   */
  register(service: RegisteredInformation<any>) {
    const { category, type } = service;
    let services = this._services[category] || {};
    if (type in services) {
      console.warn(`${type} of ${category} is duplicated.`);
    }
    services[type] = service;
    this._services[category] = services;
  }

  /**
   * 登録情報を取得する
   * @param category カテゴリー
   * @param type 種別
   * @returns 登録情報
   */
  get(category: string, type: string): RegisteredInformation<any> {
    const services = this._services[category];
    const service = services?.[type];
    if (service) {
      return service;
    } else {
      throw new Error(`${type} of ${category} is not registered.`);
    }
  }

  /**
   * 登録情報の有無を確認する
   * @param category カテゴリー
   * @param type 種別
   * @returns
   */
  has(category: string, type: string): boolean {
    const products = this._services[category];
    return products ? type in products : false;
  }
}

export default Warehouse;
