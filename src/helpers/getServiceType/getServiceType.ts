import { IService, ServiceConstructor } from '../../types';

const getServiceType = (instance: IService) => (instance.constructor as ServiceConstructor).TYPE;
export default getServiceType;
