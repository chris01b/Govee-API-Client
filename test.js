import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised).should();

import GoveeClient from './index.js';

const api = new GoveeClient({
  api_key: "9bc5341a-076d-4c0c-89f8-5703968b1669"
});

describe("ping", () => {
  it("should return \"Pong\" if the Govee API is up", () => {
    return api.ping().should.eventually.equal('Pong');
  });
});

describe("deviceList", () => {
  it("receives 200 code", () => {
    return api.deviceList().then(data => {
      return data.code.should.equal(200);
    });
  });
  it("processes successfully", () => {
    return api.deviceList().then(data => {
      return data.message.should.equal("Success");
    });
  });
});