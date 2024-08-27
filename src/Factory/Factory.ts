import creator from '../Creator';
import FactoryBase from '../FactoryBase';
import registry from '../Registry';
import warehouse from '../Warehouse';
import { FactoryConfig } from './types';

/**
 * ファクトリークラス
 * Registry、Creator、Warehouseのメソッドにアクセスする
 */
class Factory<P extends any = any, C extends FactoryConfig<P> = FactoryConfig<P>> extends FactoryBase<P, C> {
  constructor(config: C) {
    super({ warehouse, creator, registry, ...config });
  }
}
export default Factory;
