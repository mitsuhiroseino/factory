export type TestProduct1Config = {
  uuid?: string;
};

export default class TestProduct1 {
  uuid: string;

  constructor(config: TestProduct1Config = {}) {
    this.uuid = config.uuid;
  }
}
