import { Constructor } from '@visue/utils';
import creator from '../Creator';
import registry from '../Registry';
import { RegisterOptions, RegistrationSetting } from '../types';
import warehouse from '../Warehouse';
import { FactoryConfig } from './types';

/**
 * Creatorで製造するサービスの管理を行うクラス
 * Creatorとservicesを直接紐づけることで循環参照が発生することを回避する
 */
class Factory<S extends any = any, MC extends FactoryConfig<S> = FactoryConfig<S>> {
  /**
   * Warehouse
   */
  private _warehouse = warehouse;

  /**
   * Creator
   */
  private _creator = creator;

  /**
   * Registry
   */
  private _registry = registry;

  private _category: string;

  constructor(config: MC) {
    const { category, services } = config;
    this._category = category;
    if (services) {
      this.registerAll(services);
    }
  }

  /**
   * serviceをCreatorに登録する
   * @param service クラス
   */
  registerAll(services: RegistrationSetting<S>[]) {
    this._registry.registerAll(this._category, services);
  }

  /**
   * serviceをCreatorに登録する
   * @param service クラス
   */
  register(type: string, Class: Constructor<S>, options?: RegisterOptions) {
    this._registry.register(this._category, type, Class, options);
  }

  /**
   * targetがFactoryableConfigの場合はインスタンスを取得する
   * @param target
   * @returns
   */
  get(target: string | S): S {
    return this._creator.get<S>(this._category, target);
  }

  /**
   * targetsがtypeやFactoryableConfigの場合はインスタンスを取得する
   * @param targets
   * @returns
   */
  from(targets: string | S | (string | S)[]): S[] {
    return this._creator.from<S>(this._category, targets);
  }

  /**
   * インスタンスを生成して返却する
   * @param type 種別
   * @param config コンフィグ
   */
  create(type: string, args?: unknown[]): S {
    return this._creator.create(this._category, type, args);
  }

  /**
   * 指定の種別が存在するか
   * @param type 種別
   * @returns
   */
  has(type: string): boolean {
    return this._warehouse.has(this._category, type);
  }
}
export default Factory;
