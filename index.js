import fetch from 'isomorphic-unfetch';
import querystring from 'querystring';

export default class GoveeClient {
  constructor(config) {
    this.api_key = config.api_key;
    this.basePath = "https://developer-api.govee.com";
  }

  request(endpoint = "", options = {}) {
    let url = this.basePath + endpoint;

    let headers = {
      'Govee-API-Key': this.api_key,
      'Content-type': 'application/json'
    };

    let config = {
        ...options,
        headers
    };

    return fetch(url, config).then(r => {
      if (r.ok) {
        if (endpoint != "/ping") {
          return r.json();
        } else {
          return r.text();
        }
      }
      console.log(r.status);
      throw new Error(r);
    })
  }

  ping() {
    let config = {
      method: 'GET'
    };
    return this.request("/ping", config);
  }

  deviceList() {
    let config = {
      method: 'GET'
    };
    return this.request("/v1/devices", config);
  }

  deviceControl(body) {
    const config = {
      method: 'PUT',
      body: JSON.stringify(body)
    }
    return this.request("/v1/devices/control", config);
  }

  deviceState(options) {
    let qs = options ? "?" + querystring.stringify(options) : "";

    let url = "/v1/devices/state" + qs;
    let config = {
      method: 'GET'
    };
    return this.request(url, config);
  }
}
