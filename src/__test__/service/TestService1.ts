import { IService } from 'src/types';

export default class TestService1 implements IService {
  /**
   * カテゴリー
   */
  static readonly CATEGORY = 'test';

  /**
   * 種別
   */
  static TYPE = 'test1';

  /**
   * ID
   */
  readonly $id = 'abc';

  /**
   * 種別
   */
  readonly type = TestService1.TYPE;
}
