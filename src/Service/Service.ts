import { Constructor } from '@visue/utils';
import registry from '../Registry';

export default function Service(category: string, type: string, alts?: string[]) {
  return function (Target: Constructor) {
    registry.register(category, type, Target);
    if (alts) {
      for (const alt of alts) {
        registry.register(category, alt, Target);
      }
    }
  };
}
