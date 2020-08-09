const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const g = require('./index.js');

const api = new g.GoveeClient({
  api_key: process.env.API_KEY 
});

describe("ping", () => {
  it("should return \"Pong\" if the Govee API is up", () => {
    return api.ping().should.eventually.equal('Pong');
  });
});

describe("deviceList", () => {
  it("receives 200 code", () => {
    return api.deviceList().then(res => {
      return res.code.should.equal(200);
    });
  });
  it("processes successfully", () => {
    return api.deviceList().then(res => {
      return res.message.should.equal("Success");
    });
  });
});
