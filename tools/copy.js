/**
 *
 */

import Promise from 'bluebird';
import fs from './lib/fs';
import pkg from '../package.json';
import ecosystem from './ecosystem.config.js';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  const ncp = Promise.promisify(require('ncp'));

  await Promise.all([
    ncp('src/public', 'build/public'),
  ]);

  await fs.writeFile('./build/package.json', JSON.stringify({
    private: true,
    engines: pkg.engines,
    dependencies: pkg.dependencies,
    scripts: {
      start: 'node server.js',
    },
  }, null, 2));

  await fs.writeFile('./build/ecosystem.json', JSON.stringify({
    apps: ecosystem.apps,
  }, null, 2));
}

export default copy;
