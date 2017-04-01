/**
 * Redux midleware.
 */
import fetch, { fetchData } from '../core/api';
import { API_URL } from '../config';

/**
 * Special method to pass user cookie in server-side API request.
 */
function createFetchKnowingCookie({ cookie }, fn) {
  if (!process.env.BROWSER) {
    return (url, options = {}) => {
      // Target url validation.
      const isApiUrl = url.indexOf(API_URL) === 0;

      // pass cookie only for itself.
      if (isApiUrl && options.credentials === 'include') {
        const headers = {
          ...options.headers,
          cookie,
        };
        return fn(url, { ...options, headers });
      }

      return fn(url, options);
    };
  }

  return fn;
}

export default function createHelpers(config) {
  const fetchKnowingCookie = createFetchKnowingCookie(config, fetch);
  const fetchDataKnowingCookie = createFetchKnowingCookie(config, fetchData);

  return {
    fetch: fetchKnowingCookie,
    fetchData: fetchDataKnowingCookie,
    history: config.history,
  };
}
