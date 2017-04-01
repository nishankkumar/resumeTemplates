/**
 * @File Contain functions for API request.
 */
import fetch from '../fetch';
import mergeDefaultOptions from './helper';

/**
 * Main function to make api request.
 */
function apiFetch(url, options) {
  const opts = mergeDefaultOptions(options);
  return fetch(url, opts);
}

/**
 * Function to get JSON data from API request.
 * @todo Add request/response validation.
 */
async function fetchData(url, options) {
  const resp = await apiFetch(url, options);
  let data = null;

  try {
    data = await resp.json(); // Because we expected json only.
  } catch (e) {
    // data = await resp.text();
  }

  if (!resp.ok) {
    const message = (data && data.message) ? data.message : resp.statusText;
    const error = new Error(message);
    error.status = resp.status;
    throw error;
  }

  return data;
}

export { apiFetch as default, fetchData };
