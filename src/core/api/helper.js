/**
 * @File Helpers for api request.
 */
import extend from 'extend';
import cookie from 'react-cookie';

// List of methods with CSRF protection.
const tokenMethods = ['PUT', 'POST', 'DELETE', 'OPTIONS', 'GET'];

/**
 * Helper function to add default options.
 */
export default function mergeDefaultOptions(options) {
  const token = cookie.load('X-CSRF-Token');
  const isToken = (
    options.method && tokenMethods.indexOf(options.method) !== -1 && token
  ) || false;

  const headers = {
    'Content-Type': 'application/json',
    ...isToken ? { 'X-CSRF-Token': token } : {},
  };

  const opts = extend(true,
    { headers },
    options
  );
  return opts;
}
