/**
 * @File Application and API integration configuration.
 */

// App.

// resumeTemplates specific.
export const port = process.env.PORT || 3000;
export const hostname = process.env.WEBSITE_HOSTNAME || 'localhost';
export const host = process.env.APP_HOST || 'localhost';
export const APP_URL = `https://${hostname}`;

// Marcom specific.
export const marcomPort = process.env.PORT || 3010;
export const marcomHostname = process.env.MARCOM_WEBSITE_HOSTNAME || 'localhost';
export const marcomHost = process.env.APP_HOST || 'localhost';
export const MARCOM_APP_URL = `https://${marcomHostname}`;

// Recaptcha.
export const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY || '';

// API
export const API_HOST = process.env.API_HOST || 'localhost';
export const API_PROTOCOL = process.env.API_PROTOCOL || 'http';
// export const API_PORT = process.env.API_PORT || (API_PROTOCOL === 'http' ? 80 : 443);
export const API_ENDPOINT = process.env.API_ENDPOINT || '/api/v3'; // Current API version is 3.

// export const API_URL = process.env.BROWSER ? `${API_PROTOCOL}://${API_HOST}:${API_PORT}` : `${API_PROTOCOL}://${API_HOST}`;
export const API_URL = `${API_PROTOCOL}://${API_HOST}`;
export const API_ENDPOINT_URL = `${API_URL}${API_ENDPOINT}`;

// Piano.
export const PIANO_AID = process.env.PIANO_AID || '';
export const PIANO_DEBUG = process.env.PIANO_DEBUG === 'true' || false;
export const PIANO_SANDBOX = process.env.PIANO_SANDBOX === 'true' || false;
export const PIANO_SRC = PIANO_SANDBOX ? '//sandbox.tinypass.com/api/tinypass.min.js' : '//cdn.tinypass.com/api/tinypass.min.js';
export const GOOGLE_TAG_MANAGER_ID = process.env.GOOGLE_TAG_MANAGER_ID || '';

export const STRIPE_SRC = process.env.STRIPE_SRC || 'https://js.stripe.com/v2/';

// Forum
export const FORUM_URL = process.env.FORUM_URL || 'https://4bytes.vanillastaging.com/sso';
export const FORUM_API_CLIENT_ID = process.env.FORUM_API_CLIENT_ID || '';

// Hubspot
export const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID || '';
