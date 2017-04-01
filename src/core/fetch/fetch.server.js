/**
 * Server-side fetch implementation.
 */

import Promise from 'bluebird';
import fetch, { Request, Headers, Response } from 'node-fetch';

fetch.Promise = Promise;
Response.Promise = Promise;

export { fetch as default, Request, Headers, Response };
