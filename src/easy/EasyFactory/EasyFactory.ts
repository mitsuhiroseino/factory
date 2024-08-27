import FactoryBase from '../../FactoryBase';
import registry from '../../Registry';
import warehouse from '../../Warehouse';
import creator from '../EasyCreator';
import { EasyProduct } from '../types';
import { EasyFactoryConfig } from './types';

/**
 * ファクトリークラス
 * Registry、Creator、Warehouseのメソッドにアクセスする
 */
class EasyFactory<
  P extends EasyProduct = EasyProduct,
  C extends EasyFactoryConfig<P> = EasyFactoryConfig<P>,
> extends FactoryBase<P, C> {
  constructor(config: C) {
    super({ warehouse, creator, registry, ...config });
  }
}
export default EasyFactory;
