import request from 'superagent';
import { API_BASE_HEADERS } from '../config';

export const HttpMethod = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  HEAD: 'HEAD',
  PUT: 'PUT',
});

/**
 * Async XHR Request
 * @private
 */
class AsyncRequest {
  /**
   * Constructor
   * @param {string} url - The url
   * @param {HttpMethod} method  The network request method
   * @param {*} data - The network request data
   * @param {func} onSuccess - Success callback
   * @param {func} onError - Failure callback
   * @param {Array} headers - Network request headers eg [{name: 'Accept', value: 'application/json'}]
   */
  constructor(url, method, data, onSuccess, onError, headers = []) {
    const defaultHeaders = [
      { name: 'Content-Type', value: 'application/json' },
      { name: 'Accept', value: 'application/json' },
      ...API_BASE_HEADERS,
    ];

    // Merge in default headers if they dont already exist
    defaultHeaders.forEach(h => {
      if (!headers.find(n => n.name.toLowerCase() === h.name.toLowerCase())) {
        headers.push(h);
      }
    });

    const empty = () => {};

    this.config = Object.freeze({
      url,
      data,
      method: method || HttpMethod.POST,
      onSuccess: onSuccess || empty,
      onError: onError || empty,
      headers,
    });

    // Perform the underlying request
    this._operate();
  }

  /**
   * Abort the network request
   */
  abort() {
    if (this._xhr && typeof this._xhr.abort === 'function') {
      this._xhr.abort();
    }
  }

  /**
   * Network request worker
   * @private
   */
  _operate() {
    this.abort();

    this._xhr = request(
      this.config.method,
      this.config.url,
    );

    switch (this.config.method) {
      case HttpMethod.POST:
      case HttpMethod.PUT:
      case HttpMethod.DELETE:
        this._xhr.send(this.config.data);
        break;
      case HttpMethod.GET:
      case HttpMethod.HEAD:
      default:
        this._xhr.query(this.config.data);
        break;
    }

    if (this.config.headers && this.config.headers.length) {
      this.config.headers.forEach((h) => {
        this._xhr.set(h.name, h.value);
      });
    }

    this._xhr.then(this.config.onSuccess).catch(this.config.onError);
  }
}

/**
 * Http network module for making XHR requests
 * @example
 * NetworkService.post('http://www.server.com/api/example',
 *   {someProperty: true},
 *   (response) => {
 *      alert('Success')
 *   },
 *   (response) => {
 *     alert('error')
 *   )
 * );
 */
export default class NetworkService {
  /**
   * Perform a HTTP post method
   * @param {string} url - The url to post to
   * @param {*} data - The data to post
   * @param {func} onSuccess - The success callback
   * @param {func} onError - The error callback
   * @param {Array} headers - Request headers eg [{name: 'Accept', value: 'application/json'}]
   * @returns {AsyncRequest}
   */
  static post(url, data, onSuccess, onError, headers) {
    return new AsyncRequest(url, HttpMethod.POST, data, onSuccess, onError, headers);
  }

  /**
   * Perform a HTTP get method
   * @param {string} url - The url to post to
   * @param {*} data - The data to send as query string
   * @param {func} onSuccess - The success callback
   * @param {func} onError - The error callback
   * @param {Array} headers - Request headers eg [{name: 'Accept', value: 'application/json'}]
   * @returns {AsyncRequest}
   */
  static get(url, data, onSuccess, onError, headers) {
    return new AsyncRequest(url, HttpMethod.GET, data, onSuccess, onError, headers);
  }

  /**
   * Perform a HTTP delete method
   * @param {string} url - The url to delete to
   * @param {*} data - The data to send
   * @param {func} onSuccess - The success callback
   * @param {func} onError - The error callback
   * @param {Array} headers - Request headers eg [{name: 'Accept', value: 'application/json'}]
   * @returns {AsyncRequest}
   */
  static del(url, data, onSuccess, onError, headers) {
    return new AsyncRequest(url, HttpMethod.DELETE, data, onSuccess, onError, headers);
  }

  /**
   * Perform a HTTP put method
   * @param {string} url - The url to put to
   * @param {*} data - The data to send
   * @param {func} onSuccess - The success callback
   * @param {func} onError - The error callback
   * @param {Array} headers - Request headers eg [{name: 'Accept', value: 'application/json'}]
   * @returns {AsyncRequest}
   */
  static put(url, data, onSuccess, onError, headers) {
    return new AsyncRequest(url, HttpMethod.PUT, data, onSuccess, onError, headers);
  }
}