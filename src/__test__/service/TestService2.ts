export type TestService2Config = {
  uuid?: string;
};

export default class TestService2 {
  uuid: string;

  constructor(config: TestService2Config = {}) {
    this.uuid = config.uuid;
  }
}
