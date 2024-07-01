import { RegisteredInformation } from '../types';

/**
 * プロダクトを管理するシングルトンインスタンス
 */
class Warehouse {
  /**
   * 登録情報
   */
  private _products: { [category: string]: { [type: string]: RegisteredInformation<any> } } = {};

  /**
   * プロダクトを登録する
   * @param category カテゴリー
   * @param type 種別
   * @param product 登録情報
   */
  register(product: RegisteredInformation<any>) {
    const { category, type } = product;
    let products = this._products[category] || {};
    if (type in products) {
      console.warn(`${type} of ${category} is duplicated.`);
    }
    products[type] = product;
    this._products[category] = products;
  }

  /**
   * 登録情報を取得する
   * @param category カテゴリー
   * @param type 種別
   * @returns 登録情報
   */
  get(category: string, type: string): RegisteredInformation<any> {
    const products = this._products[category];
    const product = products?.[type];
    if (product) {
      return product;
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
    const products = this._products[category];
    return products ? type in products : false;
  }
}

export default Warehouse;
