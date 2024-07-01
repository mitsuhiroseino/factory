export type TestProduct2Config = {
  uuid?: string;
};

export default class TestProduct2 {
  uuid: string;

  constructor(config: TestProduct2Config = {}) {
    this.uuid = config.uuid;
  }
}
