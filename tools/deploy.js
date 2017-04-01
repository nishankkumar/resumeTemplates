/**
 *
 */

import GitRepo from 'git-repository';
import mkdirp from 'mkdirp';
import { execSync } from 'child_process';
import { GIT_URL, GIT_BRANCHES } from './deploy.config';
import run from './run';
import build from './build';
// import bumpVersion from '../scripts/bump-version';
// import readme from '../scripts/readme';

function getRemote(type) {
  return {
    url: GIT_URL,
    branch: GIT_BRANCHES[type] || 'develop',
    name: 'production',
  };
}

/**
 * Deploy the contents of the `/build` folder to a remote
 * server via Git.
 */
async function deploy() {
  let type = null;
  const types = Object.keys(GIT_BRANCHES).map((key) => {
    if (process.argv.includes(key)) {
      type = key;
    }
    return key;
  });

  if (!type) {
    throw new Error(
      `
      Branch ${type} not configured.
      You can use only: ${types}
      Example: npm run deploy -- dev
      `
    );
  }

  const remote = getRemote(type);

  // Create build directory if it doesn't exist
  await mkdirp.sync('./build');

  // Initialize a new Git repository inside the `/build` folder
  // if it doesn't exist yet
  const repo = await GitRepo.open('build', { init: true });
  await repo.setRemote(remote.name, remote.url);

  // Fetch the remote repository if it exists
  if ((await repo.hasRef(remote.url, remote.branch))) {
    await repo.fetch(remote.name);
    execSync(`cd ./build && git checkout ${remote.branch}`);
    // Delete all local tags first
    // execSync('cd ./build && git tag -l | xargs git tag -d');
    // Sync with remote tags
    // execSync('cd ./build && git fetch --tags production');
    await repo.reset(`${remote.name}/${remote.branch}`, { hard: true });
    await repo.clean({ force: true });
  }


  // Require package.json of ./build to keep track of deployed version
  // const currentVersion = require('../build/package').version || '0.0.1';
  // await run(build, currentVersion);
  await run(build);

  // Install node modules.
  try {
    // const buildProd = execSync('cd ./build && yarn install --prod');
    const buildProd = execSync('cd ./build && npm install --production');
    console.log('Build output:-', buildProd.toString());
  } catch (e) {
    console.error('Build failed with error:- ', e.toString());
  }

  // Push the contents of the build folder to the remote server via Git
  try {
    await repo.add('--all .');
    const date = new Date();
    await repo.commit(`Build: ${date}`);
    // await bumpVersion();
    // await readme();
  } catch (e) {
    console.log(e);
  }
  await repo.push(remote.name, remote.branch);
  // execSync(`cd ${__dirname}/../build/ && git push --follow-tags`);
}

export default deploy;
