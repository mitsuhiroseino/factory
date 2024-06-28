import { IService } from 'src/types';

export default class TestService2 implements IService {
  /**
   * カテゴリー
   */
  static readonly CATEGORY = 'test';

  /**
   * 種別
   */
  static TYPE = 'test2';

  /**
   * ID
   */
  readonly $id;

  /**
   * 種別
   */
  readonly type;
}
