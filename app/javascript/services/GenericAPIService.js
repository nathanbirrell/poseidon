import Promise from 'bluebird';
// import APIError from 'core/models/APIError';
import NetworkService from './NetworkService';

export default class GenericAPIService {
  static _execute(method, endpoint, payload, factoryFn, isAuthenticated = false) {
    return new Promise((resolve, reject, onCancel) => {
      let Service = NetworkService;
      if (isAuthenticated) { Service = NetworkService; }

      const req = Service[method](endpoint, payload, (response) => {
        if (factoryFn) {
          resolve(factoryFn(response.body));
        } else {
          resolve(response.body);
        }
        return response.body;
      }, (err) => {
        try {
          reject(new Error(err.response.body.errorDescription));
        } catch (e) {
          reject(err);
        }
      });

      onCancel(() => {
        if (req && req.abort) {
          req.abort();
        }
      });
    });
  }

  static get(...params) {
    return this._execute('get', ...params);
  }

  static post(...params) {
    return this._execute('post', ...params);
  }

  static put(...params) {
    return this._execute('put', ...params);
  }

  static del(...params) {
    return this._execute('del', ...params);
  }
}
