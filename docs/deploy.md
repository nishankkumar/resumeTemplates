## Deployment

For some reason we have special git repositroy for deployment.
It contain compilet and optimized code and assets.
https://github.com/Thinktiv/StratforWorldviewDevDeploy

**Mapping schema:**

*Type*   | *Source branch*  | *Deployment branch*  | *Instance*
-------- | ---------------- | -------------------- | ----------
prod     | master           | master               | production
stage    | stage            | stage                | stage/dev
dev      | develop          | develop              | dev

### Build and Deploy to GIT repo (Local machine)
- Clone repository https://github.com/Thinktiv/StratforWorldview
`Example: git@github.com:Thinktiv/StratforWorldview.git`

- Checkout to **Source** branch.

- Update .env file in root directory as per the setup. [See variable list here.](./env.md)

- Run command: `npm install`

- Run command:
  * `npm run deploy -- dev` to deploy to `StratforWorldviewDevDeploy:develop`
  * `npm run deploy -- stage` to deploy to `StratforWorldviewDevDeploy:stage`
  * `npm run deploy -- prod` to deploy to `StratforWorldviewDevDeploy:master`

  **Example:**
  `npm run deploy -- dev --release`

  Changes from your **current** branch will be pushed to `StratforWorldviewDevDeploy:develop`.

### Deploy to target server (PM2)
Read about [pm2 deploy](http://pm2.keymetrics.io/docs/usage/deployment/)
Configuration for **pm2 deploy** stored in [ecosystem.config.js](../tools/ecosystem.config.js)

- Clone repository https://github.com/Thinktiv/StratforWorldview
`Example: git@github.com:Thinktiv/StratforWorldview.git`

- Checkout to **Source** branch.

- Update .env file in root directory as per the setup. [See variable list here.](./env.md)

- Run command: `npm install`

- Run command:
`pm2 deploy tools/ecosystem.config.js dev|stage|prod`

  This command will create new build, push it to build repository.
  Then target server will be updated from deployment repository and restart apllication to applay updates.

- **Note!** If you are using `https` auth on target server you may run command:

  `USER=git-user-name PASS=git-password pm2 deploy tools/ecosystem.config.js dev`

#### Available commands:
    setup                run remote setup commands
    update               update deploy to the latest release
    revert [n]           revert to [n]th last deployment or 1
    curr[ent]            output current release commit
    prev[ious]           output previous release commit
    exec|run <cmd>       execute the given <cmd>
    list                 list previous deploy commits
    [ref]                deploy to [ref], the "ref" setting, or latest tag

#### Basic Examples:

    First initialize remote production host:
    $ pm2 deploy tools/ecosystem.config.js dev setup

    Then deploy new code:
    $ pm2 deploy tools/ecosystem.config.js dev

    If I want to revert to the previous commit:
    $ pm2 deploy tools/ecosystem.config.js dev revert 1

    Execute a command on remote server:
    $ pm2 deploy tools/ecosystem.config.js dev exec "pm2 restart all"

    PM2 will look by default to the ecosystem.config.js file so you dont need to give the file name:
    $ pm2 deploy production
    Else you have to tell PM2 the name of your ecosystem file

    More examples in https://github.com/Unitech/pm2

