import request from 'reqwest';
import setting from './setting';
import share from './share';
import { info, error } from './util/logger';
import postHandle from './post_handle';

/**
 * Make a request.
 *
 * @param name Defined request name.
 * @param params Request params.
 * @param successCallback Success callback.
 * @param errorCallback Error callback.
 */
export default function(name, params, successCallback, errorCallback) {
  if (!name) return;

  // Current options.
  const options = share.optionsCollection[name];
  // Common options.
  const commonOptions = share.optionsCollection.common || {};

  if (!options) {
    error(`name '${name}' is not configured.`);
    return;
  }

  // Index to select item.
  const index = share.env;

  // Http method, default is `GET`.
  const method = (options.method && options.method[index]) || 'get';

  // Stringify request params.
  const stringify = (options.stringify && options.stringify[index]) || !1;

  // Fetch options.
  const settings = (options.settings && options.settings[index]) || {};

  // url
  const url = (options.url && options.url[index]) || '';

  // Request keys.
  const requestKeys = (options.requestKeys && options.requestKeys[index]) || {};

  // Pre handle.
  const preHandle = options.preHandle && options.preHandle[index];

  const commonPreHandle = commonOptions.preHandle && commonOptions.preHandle[index];

  // implement
  const implement = options.implement && options.implement[index];

  // Real request params.
  let realParams = Object.assign({}, params || {});

  // Request keys mapping handling.
  Object.keys(realParams).forEach(key => {
    const newKey = requestKeys[key];
    if (newKey && typeof newKey === 'string') {
      // Make a new key.
      realParams[newKey] = realParams[key];
      // Delete old key.
      delete realParams[key];
    }
  });

  // Pre handling.
  if (commonPreHandle) {
    const result = commonPreHandle(realParams);

    // If return a new object, use it.
    if (result) realParams = result;
  }
  if (preHandle) {
    const result = preHandle(realParams);

    // If return a new object, use it.
    if (result) realParams = result;
  }

  // Custom implement.
  if (implement) {
    implement(result => {
      if (setting.debug) {
        info(`custom ajax implement for '${name}', and request params is:`, realParams);
        info(`result for '${name}' is:`, result);
      }

      successCallback(postHandle(result, realParams, name));
    });
  } else {
    settings.url = url;
    settings.method = method;
    settings.data = stringify ? JSON.stringify(realParams) : realParams;
    settings.type = 'json';
    settings.success = result => {
      if (successCallback) successCallback(postHandle(result, realParams, name));
    };
    settings.error = err => {
      if (errorCallback) errorCallback(err);
    };

    request(settings);
  }
}
