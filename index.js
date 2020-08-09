const fetch = require('isomorphic-unfetch');
const querystring = require('querystring');

class GoveeClient {
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

    return fetch(url, config).then(res => {
      if (res.ok) {
        if (endpoint != "/ping") {
          return res.json();
        } else {
          return res.text();
        }
      }
      throw new Error(res);
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

  turn(mode, model, device) {
    return new Promise((resolve, reject) => {
      if ((mode !== 'on' || mode === 'off') && (mode === 'on' || mode !== 'off')) {
        reject(new Error("Incorrect turn parameter"));
      } else {
        let params = {
          'device': device,
          'model': model,
          'cmd' : {
            'name': 'turn',
            'value': mode
          }
        };
        this.deviceControl(params).then(res => {
          resolve(res);
        }).catch(e => {reject(e)});
      }
    });
  }
}

exports.GoveeClient = GoveeClient;