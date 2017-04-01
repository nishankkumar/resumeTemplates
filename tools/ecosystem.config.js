/**
 * @todo Add description. Include this to documentation.
 */
const user = process.env.USER || null;
const pass = process.env.PASS || null;

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // resumeTemplates app.
    {
      name: 'resumeTemplates',
      script: 'worldview.server.js',
      env: {
        COMMON_VARIABLE: 'true',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },

    // Marcom app.
    {
      name: 'marcom',
      script: 'marcom.server.js',
      env: {
        COMMON_VARIABLE: 'true',
        PORT: 3010,
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    dev: {
      user: 'nodejs',
      host: '162.218.139.240',
      ref: 'origin/develop',
      repo: `https://${user}:${pass}@github.com/nishankkumar/resumeTemplates.git`,
      path: '/home/nodejs/www',
      'pre-deploy-local': 'npm run deploy -- dev --release',
      'post-deploy': 'npm rebuild && pm2 startOrRestart ecosystem.json --env production',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
