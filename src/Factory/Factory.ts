import creator from '../Creator';
import registry from '../Registry';
import warehouse from '../Warehouse';
import { IService, RegistrableService, ServiceConfig } from '../types';
import { FactoryConfig } from './types';

/**
 * Creatorで製造するサービスの管理を行うクラス
 * Creatorとservicesを直接紐づけることで循環参照が発生することを回避する
 */
class Factory<
  S extends IService = IService,
  C extends ServiceConfig = ServiceConfig,
  MC extends FactoryConfig<S, C> = FactoryConfig<S, C>,
> {
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
    this.register(services);
  }
  /**
   * serviceをCreatorに登録する
   * @param service クラス
   */
  register(services: RegistrableService<S, C> | RegistrableService<S, C>[]) {
    this._registry.register(this._category, services);
  }

  /**
   * targetがFactoryableConfigの場合はインスタンスを取得する
   * @param target
   * @returns
   */
  get(target: string | C | S): S {
    return this._creator.get<S>(this._category, target);
  }

  /**
   * targetsがtypeやFactoryableConfigの場合はインスタンスを取得する
   * @param targets
   * @returns
   */
  from(targets: string | C | S | (string | C | S)[]): S[] {
    return this._creator.from<S>(this._category, targets);
  }

  /**
   * コンフィグを元にインスタンスを生成して返却する
   * @param target タイプまたはコンフィグ
   * @param config コンフィグ
   */
  create(target: C | string, config?: Omit<C, 'type'>): S {
    return this._creator.create(this._category, target, config);
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
