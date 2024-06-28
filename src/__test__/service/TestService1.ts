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
   * 種別
   */
  static ALTS = ['Test1', 'TEST1'];

  /**
   * ID
   */
  readonly $id;

  /**
   * 種別
   */
  readonly type;
}
