export type TestService1Config = {
  uuid?: string;
};

export default class TestService1 {
  uuid: string;

  constructor(config: TestService1Config = {}) {
    this.uuid = config.uuid;
  }
}
