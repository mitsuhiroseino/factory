import ensureId from '@visue/utils/identifier/ensureId';
import { IService, ServiceConfig } from '../../types';
import getFactoryableType from '../getServiceType';

const setupService = <I extends IService = IService, C extends ServiceConfig = ServiceConfig>(
  instance: I,
  config: C,
) => {
  const values = {
    $id: ensureId(config),
    type: getFactoryableType(instance),
  };
  Object.assign(instance, values);
};
export default setupService;
