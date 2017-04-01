# Project structure

* build - Build folder. Contain building result.
* docs - Documentation folder.
* hooks - Git hooks for DEV's usage. (Used by `shared-git-hooks`)
* src - Source code folder.
* test - Tests folder
* tools - @See [README.md](../tools/README.md)
* .env - [Local enviroument variables](./env.md).
* .env.default - Default variables.
* package.json

# Src - folder

* actions - Contain Reudux actions.
* components - A right place for components.
* core - Specific libraries for application like `history`, 'fetch' and etc.
* public - Should comtain static files like images.
* reducers - Reducers folder.
* routes - Worldview specific: Contain routes and containers for each page.
* routes-marcom - Marcom specific: Contain routes and containers for each page.
* store - Redux storrage helpers and logger.
* theme - Contain global `sass` styles for application.
* ma_client.js - Marcom client-side js.
* wv_client.js - Worldview client-side js.
* config.js - Main configuration file for application.
* ma_server.js - Marcom server-side js.
* wv_server.js - Worldview server-side js.